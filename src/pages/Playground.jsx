import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MemoryGame from "./MemoryGame";

export default function Playground() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Nandra - Playground";
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative">
        <MemoryGame />
      </main>
      <Footer />
    </>
  );
}
