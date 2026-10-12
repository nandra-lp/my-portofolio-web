import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";
import { Icon } from "./ui/Icon";
import { Container } from "./ui/Container";

const TECH_STACK = ["ReactJS", "Next.js", "Flutter", "Golang"];

export default function Intro() {
  return (
    <section className="bg-background">
      <Container narrow className="py-16 text-center sm:py-20 lg:py-24">
        {/* Status ketersediaan */}
        <div className="hero-enter mb-6 flex justify-center">
          <span className="badge-success">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-green-500"
            />
            Tersedia untuk kolaborasi
          </span>
        </div>

        {/* Headline */}
        <h1 className="heading-1 hero-enter" style={{ animationDelay: "60ms" }}>
          Nandra <span className="text-primary">Luthfi</span>
        </h1>

        <p
          className="hero-enter mt-4 text-xl font-medium text-heading sm:text-2xl"
          style={{ animationDelay: "100ms" }}
        >
          Full-stack Developer
        </p>

        <div
          aria-hidden="true"
          className="hero-enter mx-auto mt-6 h-px w-24 bg-border"
          style={{ animationDelay: "120ms" }}
        />

        {/* Deskripsi singkat */}
        <p
          className="body-lg hero-enter mx-auto mt-6 max-w-xl"
          style={{ animationDelay: "160ms" }}
        >
          Membangun arsitektur sistem yang andal, efisien, dan modern —
          dari antarmuka web yang responsif hingga API backend yang solid.
        </p>

        {/* Tech Stack */}
        <ul
          aria-label="Teknologi utama"
          className="hero-enter mt-8 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: "200ms" }}
        >
          {TECH_STACK.map((t) => (
            <li key={t}>
              <Tag variant="muted">{t}</Tag>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          className="hero-enter mt-10 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button to="/project" variant="primary" size="lg">
            Lihat Proyek
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
          <Button href="#contact" variant="secondary" size="lg">
            <Icon name="mail" className="h-4 w-4" />
            Hubungi Saya
          </Button>
        </div>
      </Container>
    </section>
  );
}
