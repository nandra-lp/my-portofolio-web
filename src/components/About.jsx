import { useEffect, useRef, useState } from "react";
import DetailAbout from "./DetailAbout";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out", duration: 0.8 } })
        .fromTo(".about-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(
          ".about-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.4",
        )
        .fromTo(
          ".about-card",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.3",
        );

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: "45%",
          duration: 1.5,
          delay: 0.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 bg-gradient-to-b from-black via-gray-900/30 to-black"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Header */}
        <h2 className="about-title mb-4 text-4xl font-bold text-white md:text-5xl">
          Tentang <span className="text-sky-400">Saya</span>
        </h2>

        <p className="about-description mx-auto mb-12 max-w-2xl text-lg text-gray-300">
          Programmer React JS pemula yang sedang terus berkembang. Fokus belajar
          membangun UI modern, memahami fundamental frontend, dan berkembang
          melalui proyek nyata.
        </p>

        {/* Cards */}
        <div className="about-card grid gap-6 md:grid-cols-2">
          <DetailAbout
            title="Yang Sedang Dipelajari"
            items={[
              "React (Fundamental)",
              "JavaScript ES6+",
              "Tailwind CSS",
              "REST API (Basic)",
              "Git & Workflow Dasar",
            ]}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          />

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm">
            <h4 className="mb-4 text-lg font-semibold text-white">
              Progress Belajar
            </h4>

            <div className="mb-2 flex justify-between text-xs text-gray-400">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>

            <div className="h-2 w-full rounded-full bg-sky-900/30">
              <div
                ref={progressBarRef}
                className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                style={{ width: "0%" }}
              />
            </div>

            <p className="mt-4 text-sm text-gray-400">
              Fokus pada konsistensi belajar, praktik langsung, dan memperbaiki
              kualitas kode secara bertahap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
