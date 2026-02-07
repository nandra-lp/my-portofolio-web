import { Mail, Github, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
              Kontak
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-5">
            Mari <span className="font-semibold">Terhubung</span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Tertarik berdiskusi, berkolaborasi, atau sekadar bertukar ide
            seputar frontend development dan teknologi?
          </p>
        </div>

        {/* Contact Card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
            <p className="text-zinc-300 mb-8">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ContactButton
                href="mailto:hello@nandra.com"
                icon={<Mail className="w-5 h-5" />}
                label="Email"
              />

              <ContactButton
                href="https://github.com/USERNAME"
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
              />

              <ContactButton
                href="https://linkedin.com/in/USERNAME"
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
              />

              <ContactButton
                href="https://instagram.com/nandraluthfii"
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
              />
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-500 text-sm mt-10">
          Terima kasih sudah mengunjungi portfolio saya.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* Reusable Contact Button */
function ContactButton({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                 border border-white/10 bg-white/5 text-white
                 hover:bg-white/10 hover:border-zinc-700
                 transition-all duration-300"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
