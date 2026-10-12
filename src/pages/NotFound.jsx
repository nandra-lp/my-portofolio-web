import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  useEffect(() => {
    document.title = "Nandra - Halaman Tidak Ditemukan";
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 text-center">
        <p className="label mb-4">404</p>
        <h1 className="heading-1 mb-4">Halaman tidak ditemukan</h1>
        <p className="body mb-8 max-w-md">
          Alamat yang kamu tuju tidak ada atau sudah dipindahkan.
        </p>
        <Button to="/" variant="primary">
          Kembali ke Beranda
        </Button>
      </main>
      <Footer />
    </>
  );
}
