import {
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  Instagram,
  Music,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Nandra</h3>
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
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 transition-all duration-300 hover:scale-105"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 transition-all duration-300 hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/nandraluthfii/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-pink-500/20 transition-all duration-300 hover:scale-105"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-black/30 transition-all duration-300 hover:scale-105"
              aria-label="TikTok"
            >
              <Music className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@nandra.com"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 transition-all duration-300 hover:scale-105"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Right - Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <span className="text-sm">Back to top</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-sky-500/20 transition-colors">
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Bottom Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-sm">
            © {year} Nandra. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
