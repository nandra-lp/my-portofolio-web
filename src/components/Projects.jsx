import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "MYKAS",
    description:
      "Aplikasi tabungan sederhana yang dibuat sebagai latihan Flutter dan Supabase. Fokus pada pencatatan saldo, autentikasi pengguna, dan penyimpanan data secara realtime.",
    tags: ["Flutter", "Supabase", "Dart"],
  },
  {
    title: "GudangXC",
    description:
      "Aplikasi manajemen inventori berbasis web untuk belajar React. Mendukung pencatatan barang, scan QR Code sederhana, dan tampilan data dengan UI modern.",
    tags: ["React", "Supabase", "Tailwind CSS"],
  },
  {
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi untuk mendokumentasikan proses belajar React. Menggunakan desain minimal, animasi ringan, dan layout responsif.",
    tags: ["React", "Tailwind CSS", "Animation"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
              Proyek Saya
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-5">
            Proyek <span className="font-semibold">Latihan & Pembelajaran</span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Beberapa proyek yang saya kerjakan sebagai bagian dari proses
            belajar dan pengembangan skill di dunia frontend development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 pt-10 border-t border-white/5">
          <p className="text-zinc-500 mb-6">
            Ingin melihat proses dan kode lengkapnya?
          </p>
          <a
            href="https://github.com/USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-zinc-700 text-white transition-all duration-300 group"
          >
            <span>Kunjungi GitHub Saya</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
