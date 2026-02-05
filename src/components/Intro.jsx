import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";

export default function Intro() {
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      moved: false,
    };

    /* =========================
       Performance Optimizations
    ========================= */
    const MAX_PARTICLES = 80;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INFLUENCE = 150;

    /* =========================
       Canvas Setup
    ========================= */
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    /* =========================
       Particle Class - Optimized
    ========================= */
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.2 + 0.1;
        this.color = `rgba(56,189,248,${this.alpha})`;
      }

      update() {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check with bounce
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -0.9;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -0.9;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Mouse interaction
        if (mouse.moved) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_INFLUENCE) {
            const force = (MOUSE_INFLUENCE - distance) / MOUSE_INFLUENCE;
            const angle = Math.atan2(dy, dx);
            const strength = force * 0.5;

            this.x -= Math.cos(angle) * strength;
            this.y -= Math.sin(angle) * strength;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* =========================
       Initialize Particles
    ========================= */
    const initParticles = () => {
      particles = [];
      const count = Math.min(
        MAX_PARTICLES,
        Math.floor((canvas.width * canvas.height) / 20000)
      );

      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          particles.push(new Particle());
        }, i * 20);
      }
    };

    /* =========================
       Connect Particles - Optimized
    ========================= */
    const connectParticles = () => {
      // Use spatial partitioning for better performance
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = dx * dx + dy * dy; // Square distance for performance

          if (distance < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const opacity =
              0.2 * (1 - Math.sqrt(distance) / CONNECTION_DISTANCE);

            ctx.strokeStyle = `rgba(56,189,248,${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    /* =========================
       Animation Loop
    ========================= */
    const animate = () => {
      // Clear with slight fade effect for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    /* =========================
       Event Handlers
    ========================= */
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
      mouse.moved = true;

      // Reset mouse moved flag after delay
      clearTimeout(mouse.movedTimer);
      mouse.movedTimer = setTimeout(() => {
        mouse.moved = false;
      }, 100);
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    };

    /* =========================
       Initialize
    ========================= */
    setCanvasSize();
    initParticles();
    animate();

    /* =========================
       Event Listeners
    ========================= */
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    /* =========================
       Cleanup
    ========================= */
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (mouse.movedTimer) clearTimeout(mouse.movedTimer);
    };
  }, []);

  // GSAP Animations for content
  useEffect(() => {
    if (!mounted || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Staggered animations
      tl.fromTo(
        ".intro-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          ".intro-divider",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".intro-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".intro-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".tech-tag",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .fromTo(
          ".intro-cta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        );
    }, contentRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: "#000" }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black via-black/80 to-black/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-sky-900/5 via-transparent to-cyan-900/5" />

      {/* Animated Orbs */}
      <div className="orb orb-1 absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-sky-500/10 to-transparent blur-3xl" />
      <div className="orb orb-2 absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-cyan-500/5 to-transparent blur-3xl" />

      {/* Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center"
      >
        {/* Main Title */}
        <div className="mb-8 sm:mb-10">
          <h1 className="intro-title text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Nandra</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-sky-400 mt-4 block">
              Frontend Developer
            </span>
          </h1>
          <div className="intro-divider mx-auto mt-6 h-1 w-24 sm:w-32 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500" />
        </div>

        {/* Description */}
        <p className="intro-description mx-auto mb-10 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
          Gabut
          <span className="text-sky-400 font-medium"> responsif</span>,
          <span className="text-cyan-400 font-medium"> aksesibel</span>, dan
          <span className="text-sky-300 font-medium"> berkinerja tinggi</span>.
        </p>

        {/* Tech Stack */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Tailwind CSS",
              "GraphQL",
              "Node.js",
              "MongoDB",
              "Firebase",
              "Figma",
              "Git",
              "Docker",
              "AWS",
            ].map((tech, index) => (
              <span
                key={tech}
                className="tech-tag rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:bg-white/10 hover:scale-105 hover:text-white sm:px-4 sm:py-2.5 sm:text-base"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Modern Web Development Ecosystem
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="#projects"
            className="intro-cta group relative flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30"
          >
            <span>Lihat Proyek</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
          </a>

          <a
            href="#contact"
            className="intro-cta group relative flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-sky-500/50 hover:bg-white/10"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hubungi Saya</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-400 animate-pulse">
              Scroll untuk menjelajahi
            </span>
            <div className="group cursor-pointer">
              <div className="h-12 w-8 rounded-full border-2 border-gray-600/50 p-2 transition-colors hover:border-sky-400/50">
                <div className="mx-auto h-3 w-1 rounded-full bg-gradient-to-b from-sky-400 to-cyan-300 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .orb-1 {
          animation: float 8s ease-in-out infinite;
        }
        
        .orb-2 {
          animation: float 10s ease-in-out infinite 1s;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .orb-1,
          .orb-2 {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
