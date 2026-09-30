import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MemoryGame from "./MemoryGame";

export default function Playground() {
  useEffect(() => {
    // Scroll ke atas ditangani terpusat oleh <ScrollToTop /> di App.
    document.title = "Nandra - Playground";
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative bg-slate-950">
        <MemoryGame />
      </main>
      <Footer />
    </>
  );
}
