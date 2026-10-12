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
    <div className="flex min-h-screen flex-col items-center bg-background px-4 pb-20 pt-16">
      {/* Header */}
      <Container className="mb-8 flex w-full flex-col items-center gap-5 text-center">
        <span className="inline-flex items-center gap-3">
          <span className="h-px w-10 bg-border" aria-hidden="true" />
          <span className="label">Playground</span>
          <span className="h-px w-10 bg-border" aria-hidden="true" />
        </span>

        <div>
          <h1 className="heading-2">Planet Memory</h1>
          <p className="body-sm mt-2">
            Temukan semua {TOTAL_PAIRS} pasangan planet
          </p>
        </div>

        {/* HUD — selaras: semua pil memakai StatPill yang sama */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <StatPill label="Langkah" value={turns} live />

          <StatPill label="Pasangan" value={`${matchedPairs}/${TOTAL_PAIRS}`}>
            <span className="ml-3 inline-block h-1.5 w-16 overflow-hidden rounded-full bg-border align-middle sm:w-20">
              <span
                className="block h-full rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
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
            aria-label={
              best !== null
                ? `Skor terbaik ${best} langkah`
                : "Belum ada skor terbaik"
            }
          />

          <Button
            onClick={shuffleCards}
            variant="secondary"
            size="sm"
            className="shadow-sm"
          >
            <Icon name="refresh" className="h-4 w-4" />
            <span className="font-medium">Mulai Ulang</span>
          </Button>
        </div>
      </Container>

      {/* Game Grid */}
      <Container className="relative w-full">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
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
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl bg-[var(--color-navy)/0.4] backdrop-blur-sm"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Permainan selesai dalam ${turns} langkah`}
              className="relative mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 text-center shadow-xl sm:p-8"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-amber-800">
                <Icon name="trophy" className="h-7 w-7" />
              </span>

              <h2 className="heading-3 mb-2">Luar Biasa!</h2>

              <p className="body mb-1">
                {TOTAL_PAIRS} pasangan dalam {turns} langkah
              </p>
              {isRecord ? (
                <p className="mb-6">
                  <Badge variant="accent">Rekor terbaik baru!</Badge>
                </p>
              ) : (
                <p className="body-sm mb-6">
                  Terbaik: {best ?? turns} langkah
                </p>
              )}

              <Button
                onClick={shuffleCards}
                variant="accent"
              >
                <Icon name="refresh" className="h-5 w-5" />
                Main Lagi
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
