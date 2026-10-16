/**
 * Data proyek terpusat — sebelumnya inline di `Projects.jsx`.
 * `slug` dipakai sebagai key React yang stabil (pengganti index array).
 * `featured: true` → kartu unggulan (span 2 kolom, gambar lebih besar)
 * `year` & `role` → metadata ditampilkan di kartu
 * `imageFit: "contain"` → untuk logo/aset square agar tampil utuh (tidak ter-crop)
 */
import mykasLogo from "../assets/mkas-comp.png";
import moonindieCover from "../assets/cgy.jpeg";

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
    featured: true,
    year: "2026",
    role: "Backend Developer",
  },
  {
    slug: "mykas",
    title: "MYKAS",
    description:
      "Aplikasi tabungan sederhana yang dibuat sebagai latihan Flutter dan Supabase. Fokus pada pencatatan saldo, autentikasi pengguna, dan penyimpanan data secara realtime.",
    tags: ["Flutter", "Supabase", "Dart"],
    image: mykasLogo,
    imageFit: "contain",
    imageBg: "#0e2235",
    link: "https://github.com/nandra-lp/mykas",
    status: "completed",
    featured: false,
    year: "2025",
    role: "Mobile Developer",
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
    featured: true,
    year: "2025",
    role: "AR/Unity Developer",
  },
  {
    slug: "moonindie-store",
    title: "MoonIndie Store",
    description:
      "Web pemesanan printing custom — katalog produk, kustomisasi desain, dan pemesanan online yang terhubung langsung ke toko.",
    tags: ["Next.js", "Tailwind CSS", "Netlify"],
    image: moonindieCover,
    imageFit: "contain",
    imageBg: "#0b0b0c",
    imagePadding: "p-0",
    link: "https://github.com/nandra-lp/react-portfolio",
    demo: "https://moonindiestore.netlify.app/",
    status: "completed",
    featured: false,
    year: "2026",
    role: "Frontend Developer",
  },
];
