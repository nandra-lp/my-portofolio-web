import { useState, useEffect } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

export default function ProjectCard({ title, description, tags = [], link }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        group relative cursor-pointer overflow-hidden rounded-xl
        border border-white/10 bg-white/[0.02] backdrop-blur-sm p-7
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-sky-500/40
        hover:bg-gradient-to-br from-white/[0.04] to-sky-900/5
        hover:shadow-[0_20px_40px_-20px_rgba(56,189,248,0.35)]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div
            className="
              rounded-xl bg-white/[0.05] p-3
              transition-all duration-300 ease-out
              group-hover:scale-110
              group-hover:bg-gradient-to-br from-sky-500/20 to-cyan-500/10
            "
          >
            <Code2 className="h-6 w-6 text-sky-400 group-hover:text-cyan-300 transition-colors" />
          </div>

          <div
            className={`
              rounded-lg bg-white/[0.03] p-2
              transition-all duration-300 ease-out
              ${isHovered ? "-translate-y-1 translate-x-1 bg-sky-500/20" : ""}
            `}
          >
            <ArrowUpRight
              className={`
                h-5 w-5 transition-all duration-300
                ${isHovered ? "scale-110 text-cyan-300" : "text-gray-500"}
              `}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-sky-100">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-gray-300">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="
                  rounded-lg border border-sky-500/20
                  bg-gradient-to-r from-sky-500/15 to-cyan-500/10
                  px-3 py-1.5 text-xs font-medium text-sky-300
                  transition-all duration-300
                  group-hover:-translate-y-0.5
                  group-hover:border-sky-500/30
                "
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      {link && (
        <a
          href={link}
          className="absolute inset-0 z-20"
          aria-label={`View ${title} project`}
        />
      )}
    </div>
  );
}
