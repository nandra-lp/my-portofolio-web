import Email from "@mui/icons-material/Email";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import WhatsApp from "@mui/icons-material/WhatsApp";
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
      // Latar belakang diselaraskan ke slate-950
      className="relative overflow-hidden bg-slate-950 py-32"
    >
      {/* Ambient Background Glow (Amber/Navy) agar nyambung dengan bagian About */}
      <div className="absolute left-1/2 bottom-0 h-[400px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-600/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll translate-y-8 text-center opacity-0 transition-all duration-1000 ease-out">
          <div className="mb-5 inline-flex items-center gap-3">
            {/* Garis hiasan menggunakan gradien ke slate-600 agar lebih membaur */}
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <span className="text-sm font-medium tracking-wider text-slate-400 uppercase">
              Kontak
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>

          <h2 className="mb-5 text-4xl font-light tracking-tight text-white md:text-5xl">
            Mari{" "}
            <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text font-semibold text-transparent">
              Terhubung
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            Tertarik berdiskusi, berkolaborasi, atau sekadar bertukar ide
            seputar full-stack development dan teknologi?
          </p>
        </div>

        {/* Card Container */}
        <div className="relative mx-auto max-w-3xl animate-on-scroll scale-95 opacity-0 transition-all delay-200 duration-1000 ease-out">
          {/* Warna base card dan hover disesuaikan dengan komponen About (slate-900/50 dan hover efek amber/slate) */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:bg-slate-800/60 hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] md:p-10">
            <p className="relative z-10 mb-8 text-lg text-slate-300">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            <div className="relative z-10 flex flex-wrap justify-center gap-4">
              <ContactButton
                href="https://wa.me/6281234567890" // WhatsApp
                icon={<WhatsApp className="h-5 w-5" />}
                label="WhatsApp"
                delay={0}
              />
              <ContactButton
                href="mailto:hello@nandra.com" // Email
                icon={<Email className="h-5 w-5" />}
                label="Email"
                delay={100}
              />
              <ContactButton
                href="https://github.com/nandra-lp" // Github
                icon={<GitHub className="h-5 w-5" />}
                label="GitHub"
                delay={200}
              />
              <ContactButton
                href="https://linkedin.com/in/USERNAME" // Linkedin
                icon={<LinkedIn className="h-5 w-5" />}
                label="LinkedIn"
                delay={300}
              />
              <ContactButton
                href="https://instagram.com/nandraluthfii"
                icon={<Instagram className="h-5 w-5" />}
                label="Instagram"
                delay={400}
              />
            </div>
          </div>
        </div>

        <p className="animate-on-scroll mt-12 translate-y-4 text-center text-sm text-slate-500 opacity-0 transition-all delay-500 duration-700">
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
      // Memperbaiki efek hover tombol agar konsisten memancarkan aura gold/amber yang elegan
      className="group relative inline-flex animate-on-scroll items-center justify-center gap-3
                 rounded-xl border border-white/10 bg-slate-800/40 px-6 py-4
                 text-slate-300 opacity-0 translate-y-4 transition-all duration-500
                 ease-out hover:scale-105 hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-white"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="relative z-10 text-slate-400 transition-transform duration-300 group-hover:rotate-6 group-hover:text-amber-400">
        {icon}
      </span>
      <span className="relative z-10 font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
    </a>
  );
}
