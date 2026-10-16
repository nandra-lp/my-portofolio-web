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
        <section id="projects-hero" className="bg-background pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-12">
          <Container narrow className="text-center">
            <span className="badge-accent inline-flex items-center gap-1.5 mb-4 lg:mb-5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
              {projects.length} Proyek Dikembangkan
            </span>

            <h1 className="heading-1 lg:text-5xl mb-3">
              Proyek <span className="text-primary">Pilihan</span>
            </h1>

            <p className="body-lg lg:text-base mx-auto max-w-xl mb-6">
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
