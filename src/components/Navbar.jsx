import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_HEIGHT, scrollToSection, waitForElement } from "../utils/scroll";
import logo from "../assets/nl-nobg.png";

const NAV_ITEMS = [
  { id: "home", label: "Beranda", path: "/" },
  { id: "about", label: "Tentang", path: "/" },
  { id: "projects", label: "Proyek", path: "/project" },
  { id: "playground", label: "Playground", path: "/playground" },
  { id: "contact", label: "Kontak", path: "/" },
];

const ROUTE_SECTION = {
  "/project": "projects",
  "/playground": "playground",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rootActiveSection, setRootActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = ROUTE_SECTION[location.pathname] ?? rootActiveSection;

  // Scroll state — di-throttle via rAF agar tidak re-render per piksel.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile dengan tombol Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Tandai section aktif di route "/" via IntersectionObserver.
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRootActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${NAV_HEIGHT}px 0px -50% 0px`,
        threshold: 0.1,
      },
    );

    NAV_ITEMS.forEach((item) => {
      if (item.path === "/") {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (id) => {
    const item = NAV_ITEMS.find((i) => i.id === id);
    if (!item) return;

    if (item.path !== location.pathname) {
      navigate(item.path);
      // Scroll ke atas ditangani <ScrollToTop />; khusus section di "/",
      // tunggu halaman selesai render baru scroll.
      if (item.path === "/") {
        waitForElement(item.id, () => scrollToSection(item.id));
      }
    } else {
      scrollToSection(item.id);
    }

    setMobileMenuOpen(false);
  };

  const navClass =
    scrolled || mobileMenuOpen
      ? "border-b border-white/5 bg-slate-950/85 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
      : "border-b border-transparent bg-transparent";

  return (
    <>
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${navClass}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="flex items-center justify-between"
            style={{ height: NAV_HEIGHT }}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              aria-label="Kembali ke beranda"
            >
              <img
                src={logo}
                alt="Logo Nandra Luthfi"
                width="40"
                height="40"
                className="h-10 w-10 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
              />
              <span className="hidden flex-col text-left leading-tight sm:flex">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-base font-bold text-transparent transition-all duration-300 group-hover:to-white">
                  Nandra Luthfi
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Full-stack Developer
                </span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => (
                <DesktopNavLink
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onNavigate={handleNavClick}
                />
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick("contact")}
                className="hidden rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 lg:inline-flex"
              >
                Hubungi Saya
              </button>

              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                className="-mr-2 rounded-lg p-2 text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 lg:hidden"
              >
                {mobileMenuOpen ? (
                  <CloseIcon style={{ fontSize: 24 }} />
                ) : (
                  <MenuIcon style={{ fontSize: 24 }} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown — inert saat tertutup agar tak bisa di-tab */}
          <div
            id="mobile-menu"
            inert={!mobileMenuOpen}
            className={`
              grid transition-all duration-300 ease-in-out lg:hidden
              ${mobileMenuOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}
            `}
          >
            <div className="flex flex-col gap-2 overflow-hidden pt-2">
              {NAV_ITEMS.map((item) => (
                <MobileNavLink
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onNavigate={handleNavClick}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent layout shift */}
      <div style={{ height: NAV_HEIGHT }} aria-hidden="true" />
    </>
  );
}

/* -------------------------------------------------- */

function DesktopNavLink({ item, isActive, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400
        ${isActive ? "text-amber-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={`
          absolute bottom-1.5 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full bg-amber-400 transition-all duration-300 ease-out
          ${isActive ? "w-[calc(100%-2.5rem)] opacity-100 shadow-[0_0_10px_rgba(251,191,36,0.8)]" : "w-0 opacity-0"}
        `}
      />
    </button>
  );
}

function MobileNavLink({ item, isActive, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-all duration-300
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400
        ${
          isActive
            ? "border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
            : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white"
        }
      `}
    >
      {item.label}
    </button>
  );
}
