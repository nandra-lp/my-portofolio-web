import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import About from "../components/About";
import Contact from "../components/Contact";

// Generate particles di luar komponen agar tidak terpengaruh render cycle
function generateParticles() {
  return [...Array(25)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 3}s`,
  }));
}

export default function Home() {
  useEffect(() => {
    document.title = "Nandra - Portofolio";
    console.log("Anda berada di Nandra - Portofolio");
  }, []);

  // useState dengan lazy initializer - hanya dipanggil sekali saat mount
  const [particles] = useState(generateParticles);

  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <main className="relative bg-gradient-to-b from-zinc-950 via-black to-zinc-950 overflow-hidden">
        {/* Global Space Particles Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_60%)]" />
          <div className="absolute bottom-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.03),transparent_50%)]" />

          {particles.map((particle) => (
            <span
              key={particle.id}
              className="absolute w-1 h-1 bg-amber-200/20 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
        </div>

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

      {/* Footer */}
      <Footer />
    </>
  );
}
