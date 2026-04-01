import {
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  Instagram,
  Music,
} from 'lucide-react'
import logo from '../assets/nl-nobg.png'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'projects', label: 'Proyek' },
    { id: 'contact', label: 'Kontak' },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent" />

      <div className="relative border-t border-white/5 backdrop-blur-xl bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* Left - Brand */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <img
                  src={logo}
                  alt="Logo Nandra"
                  className="w-11 h-11 object-contain opacity-90"
                />

                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    Nandra
                  </h3>
                  <p className="text-zinc-400 text-sm">Pengembang Frontend</p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm max-w-md hidden lg:block leading-relaxed">
                Membangun pengalaman antarmuka web modern dengan barisan kode
                yang rapi dan desain yang memanjakan mata.
              </p>
            </div>

            {/* Middle - Social */}
            <div className="flex flex-wrap justify-center gap-3">
              <Social href="https://github.com/nandra-lp" label="GitHub">
                <Github className="w-5 h-5" />
              </Social>

              <Social href="https://linkedin.com/in/USERNAME" label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Social>

              <Social
                href="https://instagram.com/nandraluthfii"
                label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Social>

              <Social href="https://tiktok.com/" label="TikTok">
                <Music className="w-5 h-5" />
              </Social>

              <Social href="mailto:hello@nandra.com" label="Email">
                <Mail className="w-5 h-5" />
              </Social>
            </div>

            {/* Right - Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
            >
              <span className="text-sm tracking-wide font-medium">
                Kembali ke atas
              </span>
              <div className="p-2.5 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-300">
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            <p className="text-zinc-500 text-sm">
              © {year} Nandra. Hak cipta dilindungi.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-zinc-500 hover:text-white text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
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
      className="group relative p-3 rounded-full border border-white/5 bg-white/5 text-zinc-400 
                 hover:text-white hover:bg-white/10 hover:border-white/10 
                 transition-all duration-300 hover:scale-110"
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-full" />
      <span className="relative z-10">{children}</span>
    </a>
  )
}
