import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import { Container } from "../components/ui/Container";
import { Tag } from "../components/ui/Tag";
import { projects } from "../data/projects";

export default function Project() {
  useEffect(() => {
    document.title = "Nandra - Projects";
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section id="projects-hero" className="bg-background pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
          <Container narrow className="text-center">
            <span className="badge-accent inline-flex items-center gap-1.5 mb-6">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
              {projects.length} Proyek Dikembangkan
            </span>

            <h1 className="heading-1 mb-4">
              Proyek <span className="text-primary">Pilihan</span>
            </h1>

            <p className="body-lg mx-auto max-w-2xl mb-8">
              Kumpulan proyek yang saya bangun selama perjalanan belajar —
              dari eksperimen kecil hingga aplikasi full-stack pratinjau.
            </p>

            <div className="flex flex-wrap justify-center gap-2" aria-label="Kategori proyek">
              <Tag variant="primary">Backend</Tag>
              <Tag variant="accent">Mobile</Tag>
              <Tag variant="muted">Web</Tag>
              <Tag variant="muted">AR/VR</Tag>
            </div>
          </Container>
        </section>

        <Projects />
      </main>
      <Footer />
    </>
  );
}
