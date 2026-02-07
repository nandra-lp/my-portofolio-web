import {
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  Instagram,
  Music,
} from "lucide-react";
import logo from "../assets/nl-nobg.png";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent" />

      <div className="relative border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* Left - Brand */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <img
                  src={logo}
                  alt="Nandra Logo"
                  className="w-10 h-10 object-contain opacity-90"
                />

                <div>
                  <h3 className="text-xl font-semibold text-white">Nandra</h3>
                  <p className="text-zinc-400 text-sm">Frontend Developer</p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm max-w-md hidden lg:block">
                Building modern web experiences with clean code and thoughtful
                design.
              </p>
            </div>

            {/* Middle - Social */}
            <div className="flex gap-3">
              <Social href="https://github.com/" label="GitHub">
                <Github />
              </Social>

              <Social href="https://linkedin.com/" label="LinkedIn">
                <Linkedin />
              </Social>

              <Social
                href="https://instagram.com/nandraluthfii"
                label="Instagram"
              >
                <Instagram />
              </Social>

              <Social href="https://tiktok.com/" label="TikTok">
                <Music />
              </Social>

              <Social href="mailto:hello@nandra.com" label="Email">
                <Mail />
              </Social>
            </div>

            {/* Right - Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <span className="text-sm tracking-wide">Back to top</span>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-zinc-500 text-sm">
              © {year} Nandra. All rights reserved.
            </p>

            <div className="flex gap-6">
              {["home", "about", "projects", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- */
/* Reusable Social Button */
function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-full bg-white/5 text-zinc-400 hover:text-white
                 hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      {children}
    </a>
  );
}
