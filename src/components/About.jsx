import { useEffect, useRef, useState } from "react";
import DetailAbout from "./DetailAbout";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

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

  /* ===============================
     Intersection Observer (Once)
  =============================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // 🔥 stop observing after trigger
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_60%)] pointer-events-none" />

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
              title="Yang Sedang Dipelajari"
              items={[
                "React (Fundamental)",
                "JavaScript ES6+",
                "Tailwind CSS",
                "REST API (Basic)",
                "Git & Workflow Dasar",
              ]}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
            />
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm"
          >
            <h4 className="mb-4 text-lg font-semibold text-white">
              Progress Belajar
            </h4>

            <div className="mb-2 flex justify-between text-xs text-zinc-400">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>

            <div className="h-2 w-full rounded-full bg-white/10">
              <div
                ref={progressBarRef}
                className="h-2 rounded-full bg-white"
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
