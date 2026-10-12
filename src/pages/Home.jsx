import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  useEffect(() => {
    document.title = "Nandra - Portofolio";
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-background">
        {/* Home / Hero */}
        <section id="home">
          <Intro />
        </section>

        {/* About */}
        <section id="about">
          <About />
        </section>

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
