import { useState, useEffect, useCallback, useRef } from "react";
import { cardImages } from "../assets/planets/planets";
import GameCard from "../components/GameCard";
import ReplayIcon from '@mui/icons-material/Replay';

function createShuffledCards() {
  return [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      id: crypto.randomUUID(),
      matched: false,
    }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState(() => createShuffledCards());
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const shuffleCards = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];

    setCards(createShuffledCards());
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setIsWon(false);
    setDisabled(false);
  }, []);

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

  // Effect hanya untuk cek win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      const timer = setTimeout(() => {
        setIsWon(true);

        const shuffleTimer = setTimeout(() => {
          shuffleCards();
        }, 2000);

        timersRef.current.push(shuffleTimer);
      }, 600);

      timersRef.current.push(timer);
      return () => clearTimeout(timer);
    }
  }, [cards, shuffleCards]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden flex flex-col items-center py-20 px-4 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8 relative z-10 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
            Planet Memory
          </h1>

          <p className="text-zinc-400 text-sm">Temukan semua pasangan planet</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="text-zinc-400 text-sm mr-2">Langkah:</span>
            <span className="text-white font-medium text-lg">{turns}</span>
          </div>

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
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto relative z-10 pb-20">
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
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl" />

            <div className="relative w-[90%] max-w-md mx-auto bg-zinc-900 border border-white/20 p-6 sm:p-8 rounded-2xl text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                Luar Biasa 🎉
              </h2>

              <p className="text-zinc-300 mb-6">
                Kamu menyelesaikannya dalam {turns} langkah
              </p>

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
