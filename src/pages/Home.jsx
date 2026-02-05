import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import About from "../components/About";
import Projects from "../components/Projects";

export default function Home() {
  const judul = document.title;
  console.log("Anda berada di", judul);
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

        {/* Contact (anchor target for CTA & nav) */}
        <section id="contact" className="scroll-mt-28">
          {/* Bisa berisi ContactForm / CTA */}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
