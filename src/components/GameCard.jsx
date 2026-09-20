import Psychology from '@mui/icons-material/Psychology';

export default function GameCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !card.matched) {
      handleChoice(card)
    }
  }

  return (
    <div className="relative h-24 min-[375px]:h-28 sm:h-36 md:h-40 lg:h-44 w-full group cursor-pointer" onClick={handleClick} style={{ perspective: '1000px' }}>
      <div 
        className="w-full h-full transition-transform duration-500 relative"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card (Planet showing) - Note that it's rotated 180deg by default so when the container flips 180deg this becomes 360/0deg */}
        <div 
          className="absolute inset-0 w-full h-full bg-white/10 rounded-2xl border border-white/20 flex flex-col items-center justify-center p-2 backdrop-blur-md shadow-xl shadow-white/5"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img src={card.src} alt={card.name} className="w-10 h-10 min-[375px]:w-12 min-[375px]:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          <p className="text-white text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2 font-medium tracking-wide">{card.name}</p>
        </div>

        {/* Back of Card (Cover) */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all shadow-lg text-zinc-500 group-hover:text-amber-400"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <Psychology className="w-8 h-8 sm:w-10 sm:h-10 opacity-70 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    </div>
  )
}