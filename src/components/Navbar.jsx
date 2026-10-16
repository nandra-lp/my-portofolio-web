import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_HEIGHT, scrollToSection, waitForElement } from "../utils/scroll";
import { Icon } from "./ui/Icon";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/nl-logo.webp";

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

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

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

  // Tutup menu mobile dengan tombol Escape + kembalikan fokus ke toggle.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Saat menu dibuka, arahkan fokus ke item pertama agar navigasi
  // keyboard/screen reader langsung masuk ke menu.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    menuRef.current?.querySelector("button")?.focus();
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
      }
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
      ? "border-border bg-surface/90 shadow-sm backdrop-blur-xl"
      : "border-transparent bg-transparent";

  return (
    <>
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 z-50 w-full border-b transition-colors duration-200 ${navClass}`}
      >
        <div className="container-page">
          {/* h-18 (72px) = NAV_HEIGHT; utilitas agar tidak inline style. */}
          <div className="flex h-18 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 rounded-lg transition-transform duration-200 active:scale-[0.98]"
              aria-label="Kembali ke beranda"
            >
              <img
                src={logo}
                alt="Logo Nandra Luthfi"
                width="40"
                height="40"
                className="brand-logo h-10 w-10"
              />
              <span className="hidden flex-col text-left leading-tight sm:flex">
                <span className="text-base font-bold text-heading">
                  Nandra Luthfi
                </span>
                <span className="text-xs text-muted">Full-stack Developer</span>
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

            {/* CTA + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNavClick("contact")}
                className="btn-primary mr-1.5 hidden lg:inline-flex"
              >
                Hubungi Saya
              </button>

              <ThemeToggle />

              <button
                ref={toggleRef}
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                className="-mr-2.5 rounded-full p-2.5 text-muted transition-[color,background-color,transform] duration-200 hover:bg-surface-hover hover:text-heading active:scale-95 lg:hidden"
              >
                <Icon name={mobileMenuOpen ? "close" : "menu"} className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown — inert saat tertutup agar tak bisa di-tab */}
          <div
            id="mobile-menu"
            ref={menuRef}
            inert={!mobileMenuOpen}
            className={`grid transition-all duration-300 ease-in-out lg:hidden ${
              mobileMenuOpen
                ? "grid-rows-[1fr] pb-6 opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
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
              <button
                onClick={() => handleNavClick("contact")}
                className="btn-primary mt-2 w-full"
                tabIndex={mobileMenuOpen ? 0 : -1}
              >
                Hubungi Saya
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent layout shift */}
      <div className="h-18" aria-hidden="true" />
    </>
  );
}

/* -------------------------------------------------- */

function DesktopNavLink({ item, isActive, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      aria-current={isActive ? "page" : undefined}
      className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-[color,background-color,transform] duration-200 active:scale-[0.97] ${
        isActive
          ? "text-primary"
          : "text-muted hover:bg-surface-hover hover:text-heading"
      }`}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={`absolute inset-x-5 bottom-1.5 h-0.5 rounded-full bg-primary transition-all duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

function MobileNavLink({ item, isActive, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.99] ${
        isActive
          ? "border-primary/30 bg-primary-light text-primary"
          : "border-transparent text-muted hover:bg-surface-hover hover:text-heading"
      }`}
    >
      {item.label}
    </button>
  );
}
