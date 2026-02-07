import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fallback jika IntersectionObserver tidak tersedia
    if (typeof IntersectionObserver === "undefined") {
      const fallback =
        sectionRef.current?.querySelectorAll(".animate-on-scroll") || [];
      fallback.forEach((el) => el.classList.add("animate-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const elements =
      sectionRef.current?.querySelectorAll(".animate-on-scroll") || [];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="absolute w-px h-px bg-zinc-500/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
              Kontak
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-5">
            Mari{" "}
            <span className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Terhubung
            </span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Tertarik berdiskusi, berkolaborasi, atau sekadar bertukar ide
            seputar frontend development dan teknologi?
          </p>
        </div>

        {/* Card */}
        <div className="relative max-w-2xl mx-auto animate-on-scroll opacity-0 scale-95 transition-all duration-700">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:bg-white/[0.07] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300">
            <p className="text-zinc-300 mb-8 text-lg">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ContactButton
                href="mailto:hello@nandra.com"
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                delay={0}
              />
              <ContactButton
                href="https://github.com/USERNAME"
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
                delay={100}
              />
              <ContactButton
                href="https://linkedin.com/in/USERNAME"
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
                delay={200}
              />
              <ContactButton
                href="https://instagram.com/nandraluthfii"
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
                delay={300}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-10 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300">
          Terima kasih sudah mengunjungi portfolio saya.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* Contact Button */
function ContactButton({ href, icon, label, delay = 0 }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-3
                 px-6 py-4 rounded-xl border border-white/10
                 bg-white/5 text-white
                 animate-on-scroll opacity-0 translate-y-4
                 transition-all duration-500 hover:scale-105 hover:border-white/20"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="relative z-10 font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
        {label}
      </span>
    </a>
  );
}
