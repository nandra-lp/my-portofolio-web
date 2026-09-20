import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Projects from "../components/Projects";

export default function Project() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Nandra - Projects";
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative pt-10 pb-20">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
