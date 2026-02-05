import { useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";

export default function Intro() {
  const canvasRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let particles = [];

    const MAX_PARTICLES = 60;
    const LINK_DISTANCE = 120;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(56,189,248,0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(56,189,248,${1 - dist / LINK_DISTANCE})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out", duration: 0.6 } })
        .from(".intro-title", { opacity: 0, y: 30 })
        .from(".intro-divider", { scaleX: 0 }, "-=0.3")
        .from(".intro-description", { opacity: 0, y: 20 }, "-=0.3")
        .from(".tech-tag", { opacity: 0, scale: 0.9, stagger: 0.04 }, "-=0.2")
        .from(".intro-cta", { opacity: 0, y: 20, stagger: 0.1 }, "-=0.2");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h1 className="intro-title text-5xl font-bold text-white">
          Nandra
          <span className="block text-sky-400 text-xl mt-3">
            Frontend Developer
          </span>
        </h1>

        <div className="intro-divider mx-auto mt-6 h-1 w-24 bg-sky-400 rounded" />

        <p className="intro-description mt-8 text-gray-300 text-lg">
          Membangun website yang <span className="text-sky-400">cepat</span>,{" "}
          <span className="text-cyan-400">responsif</span>, dan{" "}
          <span className="text-sky-300">modern</span>.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["React", "Next.js", "Tailwind", "GSAP"].map((t) => (
            <span
              key={t}
              className="tech-tag px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {/* Button ke section Projects */}
          <a
            href="#projects"
            className="intro-cta flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg transition hover:scale-105"
          >
            Lihat Proyek <ArrowRight size={16} />
          </a>

          {/* Button ke section Contact */}
          <a
            href="#contact"
            className="intro-cta flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded-lg transition hover:scale-105"
          >
            <Mail size={16} /> Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}
