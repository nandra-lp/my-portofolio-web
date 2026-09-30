import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Email from "@mui/icons-material/Email";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import gsap from "gsap";
import wm from "../assets/nl-gmi-nbg.png";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TECH_STACK = ["ReactJS", "Next.js", "Flutter", "Golang"];

export default function Intro() {
  const sectionRef = useRef(null);
  const statusRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const paraRef = useRef(null);
  const tagsRef = useRef([]);
  const ctaRef = useRef(null);
  const wmRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Hormati prefers-reduced-motion: konten tetap terlihat tanpa animasi.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      /* ── Entrance timeline ── */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.from(statusRef.current, { opacity: 0, y: -12, duration: 0.6 })
        .from(nameRef.current, { opacity: 0, y: 36, duration: 0.9 }, "-=0.3")
        .from(
          subtitleRef.current,
          { opacity: 0, y: 16, duration: 0.65 },
          "-=0.55",
        )
        /* divider: expand dari tengah → kiri-kanan */
        .from(
          dividerRef.current,
          { scaleX: 0, duration: 0.75, ease: "power2.inOut" },
          "-=0.35",
        )
        .from(paraRef.current, { opacity: 0, y: 14, duration: 0.65 }, "-=0.5")
        /* tech chips — stagger per item */
        .from(
          tagsRef.current,
          { opacity: 0, y: 12, scale: 0.94, stagger: 0.09, duration: 0.5 },
          "-=0.35",
        )
        /* CTA buttons */
        .from(ctaRef.current, { opacity: 0, y: 14, duration: 0.6 }, "-=0.25")
        /* scroll indicator fade in */
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 0.5 },
          "-=0.15",
        );

      /* ── Watermark — smooth float ── */
      gsap.to(wmRef.current, {
        y: -22,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ── Scroll indicator — subtle bounce ── */
      gsap.to(scrollIndicatorRef.current, {
        y: 7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* Ambient Glow — tanpa -z-10 agar tidak tenggelam di belakang background section */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/10 blur-[120px]"
      />

      {/* ── Watermark ── */}
      <div
        ref={wmRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url(${wm})` }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
        {/* Status ketersediaan */}
        <div ref={statusRef} className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/[0.07] px-4 py-1.5 text-xs font-medium tracking-wide text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Tersedia untuk kolaborasi
          </span>
        </div>

        {/* Name — gradasi Gold pada nama belakang */}
        <h1
          ref={nameRef}
          className="text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          Nandra{" "}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Luthfi
          </span>
        </h1>

        {/* Role subtitle */}
        <span
          ref={subtitleRef}
          className="mt-4 block text-lg font-medium tracking-wide text-slate-400 md:text-2xl"
        >
          Full-stack Developer
        </span>

        {/* Animated divider — aksen amber */}
        <div className="mt-7 flex justify-center">
          <div
            ref={dividerRef}
            className="h-px w-32 origin-center bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          />
        </div>

        {/* Tagline */}
        <p
          ref={paraRef}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          Membangun arsitektur sistem yang{" "}
          <span className="font-medium text-white">andal</span>,{" "}
          <span className="font-medium text-amber-100">efisien</span>, dan{" "}
          <span className="font-medium text-amber-200">modern</span>.
        </p>

        {/* Tech Stack chips */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((t, i) => (
            <span
              key={t}
              ref={(el) => (tagsRef.current[i] = el)}
              className="
                cursor-default select-none rounded-full
                border border-white/10 bg-slate-800/40 px-5
                py-2 text-sm font-medium text-slate-300
                backdrop-blur-md transition-all duration-300
                hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-white hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)]
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-12 flex flex-wrap justify-center gap-5">
          <Button
            component={Link}
            to="/project"
            variant="contained"
            disableElevation
            endIcon={<ArrowForward style={{ fontSize: 18 }} />}
            sx={{
              borderRadius: "9999px", // rounded-full
              textTransform: "none",
              fontWeight: 600,
              padding: "12px 32px",
              backgroundColor: "#f59e0b", // amber-500
              color: "#1e293b", // slate-800
              "&:hover": {
                backgroundColor: "#fbbf24", // amber-400
                boxShadow: "0 0 30px rgba(245,158,11,0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Lihat Proyek
          </Button>

          <Button
            href="#contact"
            variant="outlined"
            startIcon={<Email style={{ fontSize: 18 }} />}
            sx={{
              borderRadius: "9999px",
              textTransform: "none",
              fontWeight: 600,
              padding: "12px 32px",
              borderColor: "rgba(255,255,255,0.15)",
              color: "#cbd5e1", // slate-300
              backgroundColor: "rgba(30,41,59,0.4)", // slate-800/40
              "&:hover": {
                backgroundColor: "rgba(245,158,11,0.1)", // amber-500/10
                borderColor: "rgba(245,158,11,0.4)", // amber-400/40
                color: "white",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Hubungi Saya
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-500 uppercase">
          Scroll
        </span>
        <KeyboardArrowDown
          style={{ fontSize: 18 }}
          className="text-amber-500/70"
        />
      </div>
    </section>
  );
}
