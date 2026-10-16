import { useState, useEffect, useCallback, useRef } from "react";
import { cardImages } from "../assets/planets/planets";
import GameCard from "../components/GameCard";
import { Icon } from "../components/ui/Icon";
import { Badge } from "../components/ui/Tag";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { StatPill } from "../components/ui/StatPill";

const BEST_SCORE_KEY = "planet-memory-best";
const TOTAL_PAIRS = cardImages.length;

/** Integer acak 0..maxExclusive-1. CSPRNG bila tersedia, fallback Math.random. */
function secureRandomInt(maxExclusive) {
  if (maxExclusive <= 1) return 0;
  try {
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const range = maxExclusive;
      const maxUint32 = 0xffffffff;
      // Rejection sampling agar tidak modulo-bias.
      const limit = maxUint32 - (maxUint32 % range);
      const out = new Uint32Array(1);
      let value = limit;
      while (value >= limit) {
        crypto.getRandomValues(out);
        value = out[0];
      }
      return value % range;
    }
  } catch {
    // abaikan: fallback ke Math.random di bawah.
  }
  return Math.floor(Math.random() * maxExclusive);
}

/** Fisher-Yates shuffle — uniform, tidak bias seperti sort(() => Math.random() - 0.5). */
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** crypto.randomUUID tidak tersedia di browser lama / non-secure context. */
function generateId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch {
    // abaikan: pakai fallback di bawah.
  }
  return `card-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Hitung pasangan identik yang bersebelahan (linear) — layout seperti ini terlalu mudah. */
function countAdjacentPairs(deck) {
  let count = 0;
  for (let i = 0; i < deck.length - 1; i += 1) {
    if (deck[i].src === deck[i + 1].src) count += 1;
  }
  return count;
}

function createShuffledCards() {
  const base = [...cardImages, ...cardImages];
  let best = shuffleArray(base);
  let bestScore = countAdjacentPairs(best);
  // Tolak layout yang memberi pasangan gratis; coba lagi hingga bersih (max 50x).
  for (let attempt = 1; attempt < 50 && bestScore > 0; attempt += 1) {
    const candidate = shuffleArray(base);
    const score = countAdjacentPairs(candidate);
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best.map((card) => ({
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

export default function MemoryGame() {
  const [cards, setCards] = useState(() => createShuffledCards());
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [best, setBest] = useState(readBestScore);

  const timersRef = useRef([]);
  const playAgainRef = useRef(null);
  const restartRef = useRef(null);
  const prevWonRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (isWon) {
      playAgainRef.current?.focus();
    } else if (prevWonRef.current) {
      // Dialog menang baru saja ditutup via "Main Lagi" —
      // kembalikan fokus agar tidak hilang ke <body>.
      restartRef.current?.focus();
    }
    prevWonRef.current = isWon;
  }, [isWon]);

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
              c.src === choiceOne.src ? { ...c, matched: true } : c
            )
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
    [choiceOne, disabled]
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
    <section id="planet-memory-game" aria-label="Game Planet Memory" className="scroll-mt-20 bg-background pb-12 sm:pb-16 lg:scroll-mt-24 lg:pb-16">
      {/* Header */}
      <Container narrow className="mb-6 flex w-full flex-col items-center gap-4 text-center sm:mb-8 lg:mb-6">
        <div>
          <h2 className="heading-2">Planet Memory</h2>
          <p className="body-sm mt-2">
            Temukan semua {TOTAL_PAIRS} pasangan planet
          </p>
        </div>

        {/* HUD — selaras: semua pil memakai StatPill yang sama */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <StatPill label="Langkah" value={turns} live />

          <StatPill label="Pasangan" value={`${matchedPairs}/${TOTAL_PAIRS}`}>
            <span
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progres ${progress} persen`}
              className="ml-3 inline-block h-1.5 w-16 overflow-hidden rounded-full bg-border align-middle sm:w-20"
            >
              <span
                className="block h-full rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </span>
          </StatPill>

          {/* Selalu dirender (tampil "–" bila belum ada) agar HUD tidak bergeser */}
          <StatPill
            label="Terbaik"
            value={best ?? "–"}
            accent
            role="status"
            aria-label={
              best !== null
                ? `Skor terbaik ${best} langkah`
                : "Belum ada skor terbaik"
            }
          />

          <Button
            ref={restartRef}
            onClick={shuffleCards}
            variant="secondary"
            size="sm"
            className="shadow-xs"
          >
            <Icon name="refresh" className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">Mulai Ulang</span>
          </Button>
        </div>

        <p className="text-xs text-muted">
          Dapat dimainkan dengan keyboard — Tab untuk berpindah, Enter untuk membuka kartu.
        </p>
      </Container>

      {/* Arena — panel pengelompok agar board terbaca sebagai satu kesatuan */}
      <Container narrow className="w-full lg:max-w-4xl">
        <div className="relative rounded-2xl border border-border bg-surface p-3 shadow-xs sm:p-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {cards.map((card, index) => (
              <GameCard
                key={card.id}
                card={card}
                index={index}
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
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-navy/40 backdrop-blur-sm"
              />

              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Permainan selesai dalam ${turns} langkah`}
                className="card relative mx-auto w-full max-w-md p-6 text-center sm:p-8"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-amber-800">
                  <Icon name="trophy" className="h-7 w-7" aria-hidden="true" />
                </span>

                <h3 className="heading-3 mb-2">Luar Biasa!</h3>

                <p className="body mb-4">
                  {TOTAL_PAIRS} pasangan dalam {turns} langkah
                </p>

                <dl className="mb-6 flex items-center justify-center gap-6">
                  <div>
                    <dt className="caption">Langkah</dt>
                    <dd className="mt-1 text-2xl font-bold tabular-nums text-heading">
                      {turns}
                    </dd>
                  </div>
                  <div aria-hidden="true" className="h-10 w-px bg-border" />
                  <div>
                    <dt className="caption">Terbaik</dt>
                    <dd className="mt-1 text-2xl font-bold tabular-nums text-heading">
                      {best ?? turns}
                    </dd>
                  </div>
                </dl>

                {isRecord && (
                  <p className="mb-6">
                    <Badge variant="accent">Rekor terbaik baru!</Badge>
                  </p>
                )}

                <Button
                  ref={playAgainRef}
                  onClick={shuffleCards}
                  variant="accent"
                >
                  <Icon name="refresh" className="h-5 w-5" aria-hidden="true" />
                  Main Lagi
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
