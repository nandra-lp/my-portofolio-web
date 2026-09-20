import { useState, useEffect } from "react";
import CallMadeIcon from '@mui/icons-material/CallMade';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

export default function ProjectCard({ title, description, tags = [], link, image }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl flex flex-col h-full
        border border-white/10
        bg-zinc-950/50 backdrop-blur-md
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-amber-500/30
        hover:bg-zinc-900/50
        hover:shadow-[0_20px_40px_-20px_rgba(245,158,11,0.15)]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle hover glow behind the card content */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden border-b border-white/5">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900/50">
            <FolderSpecialIcon className="h-12 w-12 text-zinc-700" />
          </div>
        )}
        
        {/* Dark overlay for better blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Floating Icon on Hover */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className={`
              flex items-center justify-center h-10 w-10
              rounded-full border border-white/10
              bg-black/50 backdrop-blur-md
              transition-all duration-300
              group-hover:bg-amber-500/20 group-hover:border-amber-500/50
              ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-2"}
            `}
          >
            <CallMadeIcon className="h-5 w-5 text-white group-hover:text-amber-400 transition-colors" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-zinc-200">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-zinc-400 flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="
                  rounded-md
                  border border-white/10
                  bg-white/5
                  px-2.5 py-1
                  text-xs font-medium text-zinc-300
                  transition-all duration-300
                  group-hover:bg-amber-500/10
                  group-hover:text-amber-400
                  group-hover:border-amber-500/20
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Invisible Link Wrapper */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20"
          aria-label={`View ${title} project`}
        />
      )}
    </div>
  );
}
