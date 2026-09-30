/**
 * Data proyek terpusat — sebelumnya inline di `Projects.jsx`.
 * `slug` dipakai sebagai key React yang stabil (pengganti index array).
 */
export const projects = [
  {
    slug: "evermos-internship",
    title: "Project Based Internship Evermos",
    description:
      "Program magang berbasis proyek sebagai Backend Developer di Evermos. Berfokus pada pengembangan API dan layanan backend menggunakan bahasa pemrograman Golang.",
    tags: ["Golang", "Backend", "API"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/nandra-lp/project-rakamin-evermos",
    status: "completed",
  },
  {
    slug: "mykas",
    title: "MYKAS",
    description:
      "Aplikasi tabungan sederhana yang dibuat sebagai latihan Flutter dan Supabase. Fokus pada pencatatan saldo, autentikasi pengguna, dan penyimpanan data secara realtime.",
    tags: ["Flutter", "Supabase", "Dart"],
    image:
      "https://images.unsplash.com/photo-1579621970588-a3f5ce599fac?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/nandra-lp/mykas",
    status: "completed",
  },
  {
    slug: "planetkita",
    title: "PlanetKita",
    description:
      "Aplikasi Augmented Reality edukasi yang menampilkan model 3D planet tata surya secara interaktif. Dibangun menggunakan Unity dan ARCore, dengan antarmuka Flutter untuk pengalaman eksplorasi ruang angkasa yang imersif.",
    tags: ["Unity", "ARCore", "Flutter"],
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/nandra-lp/planetkita",
    status: "completed",
  },
  {
    slug: "react-portfolio",
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi untuk mendokumentasikan proses belajar React. Menggunakan desain minimal, animasi ringan, dan layout responsif.",
    tags: ["React", "Tailwind CSS", "Animation"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/nandra-lp/react-portfolio",
    status: "completed",
  },
];
