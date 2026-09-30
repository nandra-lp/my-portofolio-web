import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Projects from "../components/Projects";

export default function Project() {
  useEffect(() => {
    // Scroll ke atas ditangani terpusat oleh <ScrollToTop /> di App.
    document.title = "Nandra - Projects";
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative bg-slate-950 pt-10 pb-20">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
