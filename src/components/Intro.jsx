import { ArrowRight, Mail } from "lucide-react";

export default function Intro() {
  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
      "
    >
      {/* Subtle radial glow (static, no animation) */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.12),_transparent_60%)]
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Nandra
          <span className="block text-sky-400 text-xl mt-3 font-medium">
            Frontend Developer
          </span>
        </h1>

        <div className="mx-auto mt-6 h-1 w-24 bg-sky-400 rounded-full" />

        <p className="mt-8 text-gray-300 text-lg leading-relaxed">
          Membangun website yang{" "}
          <span className="text-sky-400 font-medium">cepat</span>,{" "}
          <span className="text-cyan-400 font-medium">responsif</span>, dan{" "}
          <span className="text-sky-300 font-medium">modern</span>.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["React", "Next.js", "Tailwind", "TypeScript"].map((t) => (
            <span
              key={t}
              className="
                px-4 py-2
                bg-white/5 border border-white/10
                rounded-lg text-sm text-gray-200
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
              bg-sky-500 text-white rounded-lg font-medium
              hover:bg-sky-400
              focus:outline-none focus:ring-2 focus:ring-sky-400/50
              transition-colors
            "
          >
            Lihat Proyek <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            className="
              flex items-center gap-2 px-6 py-3
              border border-white/10 text-white rounded-lg font-medium
              hover:bg-white/5 hover:border-white/20
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
