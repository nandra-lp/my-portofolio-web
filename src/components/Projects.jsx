import { useEffect, useRef, useMemo } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";

const projects = [
  {
    title: "Project Based Internship Evermos",
    description:
      "Program magang berbasis proyek sebagai Backend Developer di Evermos. Berfokus pada pengembangan API dan layanan backend menggunakan bahasa pemrograman Golang.",
    tags: ["Golang", "Backend", "API"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/nandra-lp/project-rakamin-evermos",
    status: "completed",
  },
  {
    title: "MYKAS",
    description:
      "Aplikasi tabungan sederhana yang dibuat sebagai latihan Flutter dan Supabase. Fokus pada pencatatan saldo, autentikasi pengguna, dan penyimpanan data secara realtime.",
    tags: ["Flutter", "Supabase", "Dart"],
    image:
      "https://images.unsplash.com/photo-1579621970588-a3f5ce599fac?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/USERNAME/mykas",
    status: "completed",
  },
  {
    title: "PlanetKita",
    description:
      "Aplikasi Augmented Reality edukasi yang menampilkan model 3D planet tata surya secara interaktif. Dibangun menggunakan Unity dan ARCore, dengan antarmuka Flutter untuk pengalaman eksplorasi ruang angkasa yang imersif.",
    tags: ["Unity", "ARCore", "Flutter"],
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/USERNAME/planetkita",
    status: "completed",
  },
  {
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi untuk mendokumentasikan proses belajar React. Menggunakan desain minimal, animasi ringan, dan layout responsif.",
    tags: ["React", "Tailwind CSS", "Animation"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/USERNAME/react-portfolio",
    status: "completed",
  },
];

export default function Projects() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Memoize projects untuk optimasi
  const memoizedProjects = useMemo(() => projects, []);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.3",
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.45",
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.35",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2",
        );

      // Floating orbs dengan animasi lebih smooth
      gsap.to(orb1Ref.current, {
        y: -25,
        x: 15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: 20,
        x: -18,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background dengan pattern subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 mb-6 opacity-0"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <span className="text-sm font-medium text-amber-400/80 tracking-wider uppercase">
              Proyek Saya
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>

          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 opacity-0"
          >
            Proyek{" "}
            <span className="font-semibold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Latihan &amp; Pembelajaran
            </span>
          </h2>

          <p
            ref={descRef}
            className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed opacity-0"
          >
            Beberapa proyek yang saya kerjakan sebagai bagian dari proses
            belajar dan pengembangan skill di dunia development.
          </p>
        </div>

        {/* Projects Grid - 2 kolom untuk layout simetris */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {memoizedProjects.map((project, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="opacity-0 group"
            >
              <ProjectCard {...project} index={i} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="text-center mt-20 pt-12 border-t border-white/5 opacity-0"
        >
          <p className="text-zinc-500 mb-8 text-lg">
            Ingin melihat proses dan kode lengkapnya?
          </p>
          <a
            href="https://github.com/nandra-lp"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-white/5 hover:bg-amber-500/10
              border border-white/10 hover:border-amber-500/40
              text-white hover:text-amber-400 
              hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]
              transition-all duration-300
              group
            "
            aria-label="Kunjungi profil GitHub saya"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">Kunjungi GitHub Saya</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
