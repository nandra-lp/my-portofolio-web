import Email from '@mui/icons-material/Email';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Fallback jika IntersectionObserver tidak tersedia
    if (typeof IntersectionObserver === 'undefined') {
      const fallback =
        sectionRef.current?.querySelectorAll('.animate-on-scroll') || []
      fallback.forEach((el) => el.classList.add('animate-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    const elements =
      sectionRef.current?.querySelectorAll('.animate-on-scroll') || []

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
              Kontak
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-5 tracking-tight">
            Mari{' '}
            <span className="font-semibold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Terhubung
            </span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Tertarik berdiskusi, berkolaborasi, atau sekadar bertukar ide
            seputar frontend development dan teknologi?
          </p>
        </div>

        {/* Card */}
        <div className="relative max-w-3xl mx-auto animate-on-scroll opacity-0 scale-95 transition-all duration-1000 delay-200 ease-out">
          <div className="relative rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 text-center hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500 group overflow-hidden">
            <p className="text-zinc-300 mb-8 text-lg relative z-10">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <ContactButton
                href="https://wa.me/6281234567890" // WhatsApp
                icon={<WhatsApp className="w-5 h-5" />}
                label="WhatsApp"
                delay={0}
              />
              <ContactButton
                href="mailto:hello@nandra.com" // Email
                icon={<Email className="w-5 h-5" />}
                label="Email"
                delay={100}
              />
              <ContactButton
                href="https://github.com/nandra-lp" // Github
                icon={<GitHub className="w-5 h-5" />}
                label="GitHub"
                delay={200}
              />
              <ContactButton
                href="https://linkedin.com/in/USERNAME" // Linkedin
                icon={<LinkedIn className="w-5 h-5" />}
                label="LinkedIn"
                delay={300}
              />
              <ContactButton
                href="https://instagram.com/nandraluthfii"
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
                delay={400}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-12 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-500">
          Terima kasih sudah mengunjungi portfolio saya.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------- */
/* Contact Button */
function ContactButton({ href, icon, label, delay = 0 }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-3
                 px-6 py-4 rounded-xl border border-white/5
                 bg-white/[0.03] text-zinc-300
                 animate-on-scroll opacity-0 translate-y-4
                 transition-all duration-500 ease-out 
                 hover:scale-[1.05] hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-white"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="relative z-10 group-hover:rotate-6 transition-transform duration-300 text-zinc-400 group-hover:text-amber-400">
        {icon}
      </span>
      <span className="relative z-10 font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
        {label}
      </span>
    </a>
  )
}
