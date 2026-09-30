import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  useEffect(() => {
    document.title = "Nandra - Halaman Tidak Ditemukan";
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mb-8 max-w-md text-slate-400">
          Alamat yang kamu tuju tidak ada atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black transition-all hover:bg-amber-400"
        >
          Kembali ke Beranda
        </Link>
      </main>
      <Footer />
    </>
  );
}
