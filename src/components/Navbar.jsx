import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS = ["home", "about", "projects", "contact"];
const NAV_HEIGHT = 72;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 16);

        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          if (rect.top <= NAV_HEIGHT + 24 && rect.bottom >= NAV_HEIGHT + 24) {
            setActiveSection(id);
            break;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top =
      element.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

    window.scrollTo({ top, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 cursor-pointer ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold text-white">N</span>
              </div>

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-base font-semibold text-white">
                  Nandra
                </span>
                <span className="text-xs text-gray-400">
                  Frontend Developer
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-sky-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleNavClick("contact")}
                className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/20"
              >
                Contact
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 pb-4">
              {[...navItems, { id: "contact", label: "Contact" }].map(
                (item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                      activeSection === item.id
                        ? "bg-sky-500/10 text-sky-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}
