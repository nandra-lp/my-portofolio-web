import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Email from '@mui/icons-material/Email';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Instagram from '@mui/icons-material/Instagram';
import MusicNote from '@mui/icons-material/MusicNote';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
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
                <GitHub className="w-5 h-5" />
              </Social>

              <Social href="https://linkedin.com/in/USERNAME" label="LinkedIn">
                <LinkedIn className="w-5 h-5" />
              </Social>

              <Social
                href="https://instagram.com/nandraluthfii"
                label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Social>

              <Social href="https://tiktok.com/" label="TikTok">
                <MusicNote className="w-5 h-5" />
              </Social>

              <Social href="mailto:hello@nandra.com" label="Email">
                <Email className="w-5 h-5" />
              </Social>
            </div>

            {/* Right - Back to Top */}
            <Button
              onClick={scrollToTop}
              className="group"
              disableRipple
              endIcon={
                <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:text-amber-400 transition-all duration-300">
                  <KeyboardArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              }
              sx={{
                color: '#a1a1aa', // zinc-400
                textTransform: 'none',
                letterSpacing: '0.025em',
                fontWeight: 500,
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'transparent'
                },
                padding: '8px 12px'
              }}
            >
              Kembali ke atas
            </Button>
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
    <Tooltip title={label} placement="top" arrow>
      <IconButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group relative border border-white/5 bg-white/5 text-zinc-400 
                   hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 
                   transition-all duration-300 hover:scale-110"
        sx={{
          padding: '12px',
          color: 'inherit', // Let tailwind text-zinc-400 / hover handle color
        }}
      >
        <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-full" />
        <span className="relative z-10 flex">{children}</span>
      </IconButton>
    </Tooltip>
  )
}
