import { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/nl-nobg.png";

const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/" },
  { id: "projects", label: "Projects", path: "/project" },
  { id: "playground", label: "Playground", path: "/playground" },
  { id: "contact", label: "Contact", path: "/" },
];

const NAV_HEIGHT = 72;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rootActiveSection, setRootActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const routeActiveSection =
    location.pathname === "/project"
      ? "projects"
      : location.pathname === "/playground"
        ? "playground"
        : null;

  const activeSection = routeActiveSection ?? rootActiveSection;

  // ✅ Scroll effect (lebih responsif)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Active section dengan IntersectionObserver
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

  // ✅ Smooth scroll & Navigation (Dioptimalkan agar tidak berulang)
  const handleNavClick = (id) => {
    const item = NAV_ITEMS.find((i) => i.id === id);
    if (!item) return;

    const executeScroll = () => {
      if (item.path === "/") {
        const element = document.getElementById(item.id);
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (item.path !== location.pathname) {
      navigate(item.path);
      setTimeout(executeScroll, 100); // Tunggu render halaman baru
    } else {
      executeScroll();
    }

    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 z-50 w-full transition-all duration-500 ease-in-out
          ${
            scrolled || mobileMenuOpen
              ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo Section */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-base font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent transition-all duration-300 group-hover:to-white">
                  Nandra
                </span>
                <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
                  Backend Developer
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full
                      ${isActive ? "text-amber-400" : "text-zinc-400 hover:text-white"}
                    `}
                  >
                    {item.label}
                    {/* Animated Underline */}
                    <span
                      className={`
                        absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-amber-400 transition-all duration-300 ease-out rounded-full
                        ${isActive ? "w-[calc(100%-2rem)] opacity-100 shadow-[0_0_12px_rgba(251,191,36,0.6)]" : "w-0 opacity-0"}
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon style={{ fontSize: 24 }} /> : <MenuIcon style={{ fontSize: 24 }} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`
              lg:hidden grid transition-all duration-300 ease-in-out
              ${mobileMenuOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}
            `}
          >
            <div className="overflow-hidden flex flex-col gap-2 pt-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      relative px-5 py-3.5 text-left text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden
                      ${
                        isActive
                          ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                          : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent layout shift */}
      <div className="h-[72px]" />
    </>
  );
}
