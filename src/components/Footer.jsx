import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Email from "@mui/icons-material/Email";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Instagram from "@mui/icons-material/Instagram";
import MusicNote from "@mui/icons-material/MusicNote";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection, waitForElement } from "../utils/scroll";
import logo from "../assets/nl-nobg.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Anchor footer bekerja dari route mana pun: navigate ke "/" dulu
  // bila perlu, lalu scroll dengan offset navbar.
  const handleFooterNav = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      waitForElement(id, () => scrollToSection(id));
    } else {
      scrollToSection(id);
    }
  };

  const navLinks = [
    { id: "home", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "projects", label: "Proyek" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background diselaraskan ke slate-950 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      {/* Radial gradien amber ringan agar tidak terlalu flat */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/[0.06] via-transparent to-transparent" />

      <div className="relative border-t border-white/5 bg-white/[0.01] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            {/* Left - Brand */}
            <div className="text-center lg:text-left">
              <div className="mb-4 flex items-center justify-center gap-4 lg:justify-start">
                <img
                  src={logo}
                  alt="Logo Nandra"
                  width="44"
                  height="44"
                  loading="lazy"
                  className="h-11 w-11 object-contain opacity-90"
                />

                <div className="text-left">
                  <h3 className="text-xl font-semibold tracking-wide text-white">
                    Nandra
                  </h3>
                  {/* Diubah agar sesuai dengan perbaikan portofolio saat ini */}
                  <p className="text-sm text-slate-400">Full-stack Developer</p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                Membangun pengalaman antarmuka web modern dengan barisan kode
                yang rapi, arsitektur yang andal, dan desain yang memanjakan
                mata.
              </p>
            </div>

            {/* Middle - Social */}
            <div className="flex flex-wrap justify-center gap-3">
              <Social href="https://github.com/nandra-lp" label="GitHub">
                <GitHub className="h-5 w-5" />
              </Social>

              <Social href="https://linkedin.com/in/USERNAME" label="LinkedIn">
                <LinkedIn className="h-5 w-5" />
              </Social>

              <Social
                href="https://instagram.com/nandraluthfii"
                label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Social>

              <Social href="https://tiktok.com/" label="TikTok">
                <MusicNote className="h-5 w-5" />
              </Social>

              <Social href="mailto:hello@nandra.com" label="Email">
                <Email className="h-5 w-5" />
              </Social>
            </div>

            {/* Right - Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas halaman"
              className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium tracking-wide text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              Kembali ke atas
              <span className="rounded-full border border-white/5 bg-slate-800/40 p-2 transition-all duration-300 group-hover:border-amber-400/50 group-hover:bg-amber-500/10 group-hover:text-amber-400">
                <KeyboardArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">
            <p className="text-sm text-slate-500">
              © {year} Nandra. Hak cipta dilindungi.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleFooterNav(item.id)}
                  className="rounded text-sm font-medium text-slate-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- */
/* Reusable Social Button — Tailwind murni + tooltip CSS (tanpa MUI) */
function Social({ href, label, children }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className="group relative flex rounded-full border border-white/5 bg-slate-800/40 p-3 text-slate-400
                 transition-all duration-300 hover:scale-110 hover:border-amber-400/50
                 hover:bg-amber-500/10 hover:text-amber-400
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-amber-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative z-10 flex">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs text-slate-300 opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </a>
  );
}
