import { useState, useEffect, useCallback, useRef } from "react";
import { cardImages } from "../assets/planets/planets";
import GameCard from "../components/GameCard";
import ReplayIcon from '@mui/icons-material/Replay';
import EmojiEvents from '@mui/icons-material/EmojiEvents';

const BEST_SCORE_KEY = "planet-memory-best";
const TOTAL_PAIRS = cardImages.length;

/** Fisher-Yates shuffle — uniform, tidak bias seperti sort(() => Math.random() - 0.5). */
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** crypto.randomUUID tidak tersedia di browser lama / non-secure context. */
function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `card-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function createShuffledCards() {
  return shuffleArray([...cardImages, ...cardImages]).map((card) => ({
    ...card,
    id: generateId(),
    matched: false,
  }));
}

function readBestScore() {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    const value = Number.parseInt(raw ?? "", 10);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------- */
/* HUD pill — satu bahasa visual untuk semua statistik */
const PILL_CLASS =
  "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-md";

function StatPill({ label, value, accent = false, live = false, children, ...rest }) {
  return (
    <div className={PILL_CLASS} {...rest}>
      <span className="text-slate-400 text-sm mr-2">{label}:</span>
      <span
        className={`font-medium text-lg ${accent ? "text-amber-400" : "text-white"}`}
        {...(live ? { "aria-live": "polite" } : {})}
      >
        {value}
      </span>
      {children}
    </div>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState(() => createShuffledCards());
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [best, setBest] = useState(readBestScore);

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const shuffleCards = useCallback(() => {
    clearTimers();
    setCards(createShuffledCards());
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setIsWon(false);
    setDisabled(false);
  }, [clearTimers]);

  const handleChoice = useCallback(
    (card) => {
      if (disabled || card.matched) return;

      if (!choiceOne) {
        setChoiceOne(card);
      } else if (choiceOne.id !== card.id) {
        setChoiceTwo(card);
        setDisabled(true);
        setTurns((prev) => prev + 1);

        // Cek match langsung di handler
        if (choiceOne.src === card.src) {
          // Match found - update cards langsung
          setCards((prev) =>
            prev.map((c) =>
              c.src === choiceOne.src ? { ...c, matched: true } : c,
            ),
          );

          const timer = setTimeout(() => {
            setChoiceOne(null);
            setChoiceTwo(null);
            setDisabled(false);
          }, 400);

          timersRef.current.push(timer);
        } else {
          // No match - flip back setelah delay
          const timer = setTimeout(() => {
            setChoiceOne(null);
            setChoiceTwo(null);
            setDisabled(false);
          }, 1000);

          timersRef.current.push(timer);
        }
      }
    },
    [choiceOne, disabled],
  );

  // Effect hanya untuk cek win condition — overlay menang menetap
  // sampai pemain menekan "Main Lagi" (tidak auto-reshuffle).
  useEffect(() => {
    if (cards.length === 0 || !cards.every((card) => card.matched)) return;

    const timer = setTimeout(() => {
      setIsWon(true);
      setBest((prevBest) => {
        if (prevBest !== null && turns >= prevBest) return prevBest;
        try {
          localStorage.setItem(BEST_SCORE_KEY, String(turns));
        } catch {
          // abaikan: storage tidak tersedia (mode privat, dsb.)
        }
        return turns;
      });
    }, 600);

    timersRef.current.push(timer);
    return () => clearTimeout(timer);
  }, [cards, turns]);

  const matchedPairs = cards.filter((c) => c.matched).length / 2;
  const progress = Math.round((matchedPairs / TOTAL_PAIRS) * 100);
  const isRecord = isWon && best !== null && turns <= best;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 relative overflow-hidden flex flex-col items-center px-4 pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center mb-8 relative z-10 gap-5">
        <span className="inline-flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="text-sm font-medium text-amber-400/80 tracking-wider uppercase">
            Playground
          </span>
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </span>

        <div>
          <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
            Planet Memory
          </h1>

          <p className="text-slate-400 text-sm mt-2">Temukan semua {TOTAL_PAIRS} pasangan planet</p>
        </div>

        {/* HUD — selaras: semua pil memakai StatPill yang sama */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <StatPill label="Langkah" value={turns} live />

          <StatPill label="Pasangan" value={`${matchedPairs}/${TOTAL_PAIRS}`}>
            <span className="ml-3 inline-block h-1.5 w-16 sm:w-20 overflow-hidden rounded-full bg-white/10 align-middle">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </span>
            <span className="sr-only">{`Progres ${progress} persen`}</span>
          </StatPill>

          {/* Selalu dirender (tampil "–" bila belum ada) agar HUD tidak bergeser */}
          <StatPill
            label="Terbaik"
            value={best ?? "–"}
            accent
            aria-label={best !== null ? `Skor terbaik ${best} langkah` : "Belum ada skor terbaik"}
          />

          <button
            onClick={shuffleCards}
            className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/10 bg-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 text-white transition-all duration-300 shadow-lg"
          >
            <ReplayIcon className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-500" />
            <span className="font-medium">Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-4 gap-2 min-[375px]:gap-3 md:gap-4 lg:gap-6">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card.id === choiceOne?.id ||
                card.id === choiceTwo?.id ||
                card.matched
              }
              disabled={disabled}
            />
          ))}
        </div>

        {isWon && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl" />

            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Permainan selesai dalam ${turns} langkah`}
              className="relative w-full max-w-md mx-auto bg-slate-900 border border-amber-400/30 p-6 sm:p-8 rounded-3xl text-center shadow-[0_0_60px_rgba(245,158,11,0.15)]"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10">
                <EmojiEvents className="text-amber-400" />
              </span>

              <h2 className="text-3xl font-bold text-white mb-2">
                Luar Biasa!
              </h2>

              <p className="text-slate-300 mb-1">
                {TOTAL_PAIRS} pasangan dalam {turns} langkah
              </p>
              {isRecord ? (
                <p className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-300">
                  <EmojiEvents style={{ fontSize: 14 }} aria-hidden="true" />
                  Rekor terbaik baru!
                </p>
              ) : (
                <p className="text-slate-500 text-sm mb-6">
                  Terbaik: {best ?? turns} langkah
                </p>
              )}

              <button
                onClick={shuffleCards}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <ReplayIcon className="w-5 h-5" />
                Main Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
