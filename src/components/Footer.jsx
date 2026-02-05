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
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left Section - Logo */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <img
                src={logo}
                alt="Nandra Logo"
                className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-105"
              />

              <div>
                <h3 className="text-xl font-semibold text-white">Nandra</h3>
                <p className="text-gray-400 text-sm">Frontend Developer</p>
              </div>
            </div>

            <p className="text-gray-500 text-sm max-w-md hidden lg:block">
              Building modern web experiences with clean code and optimal
              performance.
            </p>
          </div>

          {/* Middle - Social Links */}
          <div className="flex gap-3">
            <Social href="https://github.com/" label="GitHub">
              <Github />
            </Social>

            <Social href="https://linkedin.com/" label="LinkedIn">
              <Linkedin />
            </Social>

            <Social
              href="https://www.instagram.com/nandraluthfii/"
              label="Instagram"
              hover="hover:bg-pink-500/20"
            >
              <Instagram />
            </Social>

            <Social
              href="https://tiktok.com/"
              label="TikTok"
              hover="hover:bg-black/30"
            >
              <Music />
            </Social>

            <Social href="mailto:hello@nandra.com" label="Email">
              <Mail />
            </Social>
          </div>

          {/* Right - Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-sky-400 transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-sky-500/20 transition-colors">
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-sm">
            © {year} Nandra. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["home", "about", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- */
/* Reusable Social Button (lebih clean & pemula-friendly) */
function Social({ href, label, children, hover }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`p-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 ${
        hover ?? "hover:bg-sky-500/20"
      }`}
    >
      {children}
    </a>
  );
}
