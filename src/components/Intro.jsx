import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowForward from '@mui/icons-material/ArrowForward';
import Email from '@mui/icons-material/Email';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Button from "@mui/material/Button";
import gsap from "gsap";
import wm from "../assets/nl-wm.png";

export default function Intro() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const paraRef = useRef(null);
  const tagsRef = useRef([]);
  const ctaRef = useRef(null);
  const wmRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entrance timeline (staggered, sama pola About & Projects) ── */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9 },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.55",
        )
        /* divider: expand dari tengah → kiri-kanan */
        .fromTo(
          dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.75, ease: "power2.inOut" },
          "-=0.35",
        )
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.5",
        )
        /* tech chips — stagger per item */
        .fromTo(
          tagsRef.current,
          { opacity: 0, y: 12, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.5 },
          "-=0.35",
        )
        /* CTA buttons */
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.25",
        )
        /* scroll indicator fade in */
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.15",
        );

      /* ── Watermark — smooth float (lebih halus dari CSS keyframe) ── */
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >

      {/* ── Watermark ── */}
      <div
        ref={wmRef}
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${wm})` }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl md:text-6xl font-bold text-white tracking-tight opacity-0"
        >
          Nandra Luthfi
        </h1>

        {/* Role subtitle */}
        <span
          ref={subtitleRef}
          className="block text-zinc-400 text-lg md:text-xl mt-3 font-medium tracking-wide opacity-0"
        >
          Frontend Developer
        </span>

        {/* Animated divider — scaleX dari origin-center */}
        <div className="flex justify-center mt-6">
          <div
            ref={dividerRef}
            className="h-px w-28 bg-linear-to-r from-transparent via-zinc-500 to-transparent origin-center scale-x-0"
          />
        </div>

        {/* Tagline */}
        <p
          ref={paraRef}
          className="mt-8 text-zinc-400 text-lg leading-relaxed opacity-0"
        >
          Membangun website yang{" "}
          <span className="text-white font-medium">cepat</span>,{" "}
          <span className="text-zinc-200 font-medium">responsif</span>, dan{" "}
          <span className="text-zinc-300 font-medium">modern</span>.
        </p>

        {/* Tech Stack chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["React", "Next.js", "Flutter", "Golang"].map((t, i) => (
            <span
              key={t}
              ref={(el) => (tagsRef.current[i] = el)}
              className="
                px-4 py-2
                bg-white/5 border border-white/10
                rounded-lg text-sm text-zinc-300
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1 hover:bg-white/10 hover:text-white
                opacity-0 cursor-default select-none
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-12 flex justify-center gap-4 flex-wrap opacity-0"
        >
          <Button
            component={Link}
            to="/project"
            variant="contained"
            color="primary"
            endIcon={<ArrowForward style={{ fontSize: 16 }} />}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 500,
              padding: '10px 24px',
              backgroundColor: '#f59e0b', // amber-500
              color: 'black',
              boxShadow: '0 0 15px rgba(245,158,11,0.4)',
              '&:hover': {
                backgroundColor: '#fbbf24', // amber-400
                boxShadow: '0 0 25px rgba(245,158,11,0.6)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s'
            }}
          >
            Lihat Proyek
          </Button>

          <Button
            href="#contact"
            variant="outlined"
            color="inherit"
            startIcon={<Email style={{ fontSize: 16 }} />}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              padding: '10px 24px',
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.25)'
              },
              transition: 'all 0.3s'
            }}
          >
            Hubungi Saya
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0"
      >
        <span className="text-[11px] text-zinc-600 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <KeyboardArrowDown style={{ fontSize: 14 }} className="text-zinc-600" />
      </div>
    </section>
  );
}
