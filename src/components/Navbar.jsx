import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/nl-nobg.png";

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
        setScrolled(window.scrollY > 16);

        let current = "home";

        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          if (rect.top <= NAV_HEIGHT + 24 && rect.bottom >= NAV_HEIGHT + 24) {
            current = id;
            break;
          }
        }

        setActiveSection((prev) => (prev !== current ? current : prev));
        ticking = false;
      });
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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
        className={`
          fixed top-0 z-50 w-full
          transition-all duration-300
          ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="Nandra Luthfi Logo"
                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
              />

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-base font-semibold text-white">
                  Nandra
                </span>
                <span className="text-xs text-zinc-400">
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
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      relative text-sm font-medium transition-colors
                      ${
                        activeSection === item.id
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-white/60" />
                    )}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="
                  rounded-lg border border-white/20
                  bg-white/5 px-6 py-2.5
                  text-sm font-semibold text-white
                  backdrop-blur-sm
                  transition-all
                  hover:bg-white/10 hover:border-white/30
                "
              >
                Contact
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`
              lg:hidden overflow-hidden
              transition-all duration-300
              ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="flex flex-col gap-1 pb-4">
              {[...navItems, { id: "contact", label: "Contact" }].map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      rounded-lg px-4 py-3 text-left text-sm
                      transition-colors
                      ${
                        activeSection === item.id
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
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
