import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  useEffect(() => {
    document.title = "Nandra - Portofolio";
    console.log("Anda berada di Nandra - Portofolio");
  }, []);

  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <main className="relative">
        {/* Home / Hero */}
        <section id="home">
          <Intro />
        </section>

        {/* About */}
        <section id="about">
          <About />
        </section>

        {/* Projects */}
        <section id="projects">
          <Projects />
        </section>

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
