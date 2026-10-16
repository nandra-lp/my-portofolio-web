import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection, waitForElement } from "../utils/scroll";
import { Icon, GithubIcon } from "./ui/Icon";
import logo from "../assets/nl-logo.webp";

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
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
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-8">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <div className="mb-2 flex items-center justify-center gap-2.5 lg:justify-start">
              <img
                src={logo}
                alt="Logo Nandra"
                width="32"
                height="32"
                loading="lazy"
                className="brand-logo h-8 w-8 object-contain"
              />
              <div className="text-left">
                <p className="text-base font-bold text-heading">Nandra</p>
                <p className="text-sm text-muted">Full-stack Developer</p>
              </div>
            </div>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted sm:max-w-md lg:mx-0">
              Membangun pengalaman antarmuka web modern dengan barisan kode
              yang rapi dan arsitektur yang andal.
            </p>
          </div>

          {/* Social */}
          <div className="flex flex-wrap justify-center gap-2">
            <Social href="https://github.com/nandra-lp" label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </Social>
            <Social href="https://linkedin.com/in/USERNAME" label="LinkedIn">
              <Icon name="linkedin" />
            </Social>
            <Social
              href="https://instagram.com/nandraluthfii"
              label="Instagram"
            >
              <Icon name="instagram" />
            </Social>
            <Social href="https://tiktok.com/" label="TikTok">
              <Icon name="music" />
            </Social>
            <Social href="mailto:hello@nandra.com" label="Email">
              <Icon name="mail" />
            </Social>
          </div>

          {/* Back to Top — icon-only di mobile agar ramping */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas halaman"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:text-heading sm:px-3"
          >
            <span className="hidden sm:inline">Kembali ke atas</span>
            <span className="rounded-full border border-border bg-surface p-2 transition-colors group-hover:border-primary/40 group-hover:bg-primary-light group-hover:text-primary">
              <Icon name="arrowUp" className="h-4 w-4" />
            </span>
          </button>
        </div>

        <div className="divider my-6 lg:my-8" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-sm text-muted">
            © {year} Nandra. Hak cipta dilindungi.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFooterNav(item.id)}
                className="rounded px-1 py-2 text-sm font-medium text-muted transition-colors hover:text-heading"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- */

function Social({ href, label, children }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      title={label}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-surface p-2.5 text-muted transition-colors duration-200 hover:border-primary/40 hover:bg-primary-light hover:text-primary"
    >
      {children}
    </a>
  );
}
