import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import DetailAbout from "./DetailAbout";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import gsap from "gsap";

export default function About() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.35 });
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);

  /* ===============================
     GSAP Entrance Animation (Optimized)
  =============================== */
  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl.fromTo(titleRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0 })
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.4",
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.35",
        )
        .to(
          progressBarRef.current,
          {
            width: "45%",
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);



  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-32"
    >

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Header */}
        <h2
          ref={titleRef}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          Tentang <span className="text-zinc-300">Saya</span>
        </h2>

        <p
          ref={descRef}
          className="mx-auto mb-12 max-w-2xl text-lg text-zinc-400 leading-relaxed"
        >
          Saya adalah Programmer React JS pemula yang sedang terus berkembang.
          Fokus belajar membangun UI modern, memahami fundamental frontend, dan
          berkembang melalui proyek nyata.
        </p>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div ref={(el) => (cardsRef.current[0] = el)}>
            <DetailAbout
              title={
                <span className="flex items-center gap-2">
                  <MenuBookIcon className="text-amber-400" fontSize="small" />
                  Yang Sedang Dipelajari
                </span>
              }
              items={[
                "React (Fundamental)",
                "JavaScript ES6+",
                "Tailwind CSS",
                "REST API (Basic)",
                "Git & Workflow Dasar",
              ]}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
            />
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUpIcon className="text-amber-400" fontSize="small" />
              Progress Belajar
            </h4>

            <div className="mb-2 flex justify-between text-xs text-zinc-400">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>

            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                style={{ width: "0%" }}
              />
            </div>

            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Fokus pada konsistensi belajar, praktik langsung, dan memperbaiki
              kualitas kode secara bertahap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
