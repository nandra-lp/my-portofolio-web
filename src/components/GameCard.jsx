import { Icon } from "./ui/Icon";

export default function GameCard({ card, handleChoice, flipped, disabled }) {
  const isDisabled = disabled || card.matched;

  const handleKeyDown = (e) => {
    if (isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleChoice(card);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleChoice(card)}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      aria-label={
        card.matched
          ? `Kartu ${card.name} (pasangan cocok)`
          : flipped
            ? `Kartu ${card.name}`
            : "Kartu tertutup, tekan untuk membuka"
      }
      aria-pressed={flipped}
      className={`group relative w-full aspect-square rounded-2xl text-left transition-shadow duration-300 disabled:cursor-default ${
        card.matched ? "ring-2 ring-primary" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 motion-reduce:transition-none"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card (Planet showing) - Note that it's rotated 180deg by default so when the container flips 180deg this becomes 360/0deg */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl border border-border bg-surface p-2 shadow-md"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={card.src}
            alt={card.name}
            loading="lazy"
            decoding="async"
            width="80"
            height="80"
            className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <p className="mt-1 text-[10px] font-medium tracking-wide text-heading sm:mt-2 sm:text-xs md:text-sm">
            {card.name}
          </p>
        </div>

        {/* Back of Card (Cover) */}
        <div
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface-hover text-muted shadow-xs transition-colors group-hover:border-primary/40 group-hover:text-primary"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
        >
          <Icon name="globe" className="h-8 w-8 opacity-70 sm:h-10 sm:w-10" />
        </div>
      </div>
    </button>
  );
}
