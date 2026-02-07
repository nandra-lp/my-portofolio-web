import { ArrowRight, Mail } from "lucide-react";

export default function Intro() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      {/* Subtle Neutral Highlight (no color tint) */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),_transparent_60%)]
          pointer-events-none
        "
      />
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Nandra
          <span className="block text-zinc-300 text-xl mt-3 font-medium">
            Frontend Developer
          </span>
        </h1>

        <div className="mx-auto mt-6 h-1 w-24 bg-zinc-700 rounded-full" />

        <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
          Membangun website yang{" "}
          <span className="text-white font-medium">cepat</span>,{" "}
          <span className="text-zinc-200 font-medium">responsif</span>, dan{" "}
          <span className="text-zinc-300 font-medium">modern</span>.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["React", "Next.js", "Tailwind", "TypeScript"].map((t) => (
            <span
              key={t}
              className="
                px-4 py-2
                bg-white/5 border border-white/10
                rounded-lg text-sm text-zinc-200
                backdrop-blur-sm
              "
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <a
            href="#projects"
            className="
              flex items-center gap-2 px-6 py-3
              bg-zinc-100 text-black rounded-lg font-medium
              hover:bg-white
              focus:outline-none focus:ring-2 focus:ring-white/30
              transition-colors
            "
          >
            Lihat Proyek <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            className="
              flex items-center gap-2 px-6 py-3
              border border-white/15 text-white rounded-lg font-medium
              hover:bg-white/5 hover:border-white/25
              focus:outline-none focus:ring-2 focus:ring-white/20
              transition-colors
          "
          >
            <Mail size={16} /> Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}
