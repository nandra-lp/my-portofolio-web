import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projects";
import DetailAbout from "./DetailAbout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Email from "@mui/icons-material/Email";
import gsap from "gsap";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Angka-angka di bawah diturunkan dari repo — sesuaikan bila bertambah.
const STATS = [
  { value: `${projects.length}+`, label: "Proyek Diselesaikan" },
  { value: "6+", label: "Teknologi Dipelajari" },
  { value: "1", label: "Pengalaman Magang Backend" },
];

const cardClass =
  "h-full rounded-xl border border-white/10 bg-slate-900/50 p-6 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-slate-800/60 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]";

export default function About() {
  const [sectionRef, isVisible] = useScrollReveal(0.35);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);
  const ctaRef = useRef(null);

  /* ===============================
     GSAP Entrance Animation (Optimized)
  =============================== */
  useEffect(() => {
    if (!isVisible || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl.from(badgeRef.current, { opacity: 0, y: 12, duration: 0.6 })
        .from(titleRef.current, { opacity: 0, y: 28 }, "-=0.3")
        .from(descRef.current, { opacity: 0, y: 20 }, "-=0.4")
        .from(statsRef.current, { opacity: 0, y: 16 }, "-=0.4")
        .from(cardsRef.current, { opacity: 0, y: 16, stagger: 0.1 }, "-=0.35")
        .fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: "60%", // Disesuaikan agar progres terlihat mantap
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .from(ctaRef.current, { opacity: 0, y: 14, duration: 0.6 }, "-=0.9");
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible, sectionRef]);

  return (
    <section
      id="about"
      ref={sectionRef}
      // Background base bernuansa Navy/Slate gelap yang clean
      className="relative overflow-hidden bg-slate-950 py-32"
    >
      {/* Ambient Background Glow (Amber/Navy) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-600/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div ref={badgeRef} className="mb-6 inline-flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="text-sm font-medium uppercase tracking-wider text-amber-400/80">
            Tentang Saya
          </span>
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        {/* Header */}
        <h2
          ref={titleRef}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          Tentang <span className="text-slate-400">Saya</span>
        </h2>

        <div ref={descRef} className="mx-auto mb-12 max-w-2xl space-y-4">
          <p className="text-lg leading-relaxed text-slate-300">
            Junior Full-stack Developer yang siap belajar dan beradaptasi
            cepat. Fokus membangun sistem yang andal, efisien, dan terus
            berkembang lewat proyek nyata.
          </p>
          <p className="leading-relaxed text-slate-400">
            Saat ini saya mendalami frontend lewat React dan memperluas
            pengalaman backend lewat program magang di Evermos — membangun
            API dengan Golang, aplikasi mobile dengan Flutter, dan antarmuka
            web yang responsif.
          </p>
        </div>

        {/* Stats — bukti ringkas, bukan sekadar klaim */}
        <div
          ref={statsRef}
          className="mx-auto mb-14 grid max-w-2xl grid-cols-3 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-5 backdrop-blur-sm"
            >
              <p className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-3xl font-bold text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-6 text-left lg:grid-cols-3">
          {/* Card 1: Stack yang dipelajari */}
          <div ref={(el) => (cardsRef.current[0] = el)} className="h-full">
            <DetailAbout
              title={
                <span className="flex items-center gap-2 font-semibold text-white">
                  <MenuBookIcon className="text-amber-400" fontSize="small" />
                  Fokus Pembelajaran
                </span>
              }
              items={[
                "React & JavaScript ES6+",
                "Next.js (Dasar)",
                "Flutter & Dart",
                "Golang untuk Backend",
                "Tailwind CSS",
              ]}
              // Desain flat minimalist dengan aksen gold/amber saat di-hover
              className={cardClass}
            />
          </div>

          {/* Card 2: Hal yang dikerjakan */}
          <div ref={(el) => (cardsRef.current[1] = el)} className="h-full">
            <DetailAbout
              title={
                <span className="flex items-center gap-2 font-semibold text-white">
                  <CodeIcon className="text-amber-400" fontSize="small" />
                  Yang Saya Kerjakan
                </span>
              }
              items={[
                "UI responsif dengan React",
                "Integrasi REST API",
                "Aplikasi mobile Flutter",
                "API & layanan Golang",
                "Git & workflow kolaborasi",
              ]}
              className={cardClass}
            />
          </div>

          {/* Card 3: Progress */}
          <div ref={(el) => (cardsRef.current[2] = el)} className="h-full">
            <div
              className={`${cardClass} flex h-full flex-col justify-center`}
            >
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <TrendingUpIcon className="text-amber-400" fontSize="small" />
                Progress Belajar
              </h4>

              <div className="mb-2 flex justify-between text-xs font-medium text-slate-400">
                <span>Fundamental</span>
                <span>Implementasi</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  ref={progressBarRef}
                  className="h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  style={{ width: "0%" }}
                />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                Konsisten mengasah fundamental, praktik integrasi
                antar-platform secara langsung, serta memastikan kualitas
                kode meningkat pada setiap eksekusi proyek.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/project"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-105 hover:bg-amber-400"
          >
            Lihat Proyek
            <ArrowForward style={{ fontSize: 16 }} />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/5"
          >
            <Email style={{ fontSize: 16 }} />
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}
