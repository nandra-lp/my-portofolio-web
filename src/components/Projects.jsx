import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { Button } from "./ui/Button";
import { GithubIcon, Icon } from "./ui/Icon";
import { Container, Section } from "./ui/Container";

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  if (projects.length === 0) {
    return (
      <Section id="projects" className="bg-background">
        <Container narrow className="py-16 text-center">
          <div className="mx-auto max-w-xl">
            <Icon name="folder" className="mx-auto h-16 w-16 text-muted-light mb-6" />
            <h2 className="heading-3 mb-3">Belum Ada Proyek</h2>
            <p className="body-lg text-muted mb-8">
              Tambahkan proyek di <code className="text-primary">src/data/projects.js</code>
              untuk menampilkannya di sini.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="projects" className="bg-background">
      <Container>
        {/* Featured Projects — span 2 kolom di lg+ */}
        {featuredProjects.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} featured />
            ))}
          </div>
        )}

        {/* Regular Projects — grid 2 kolom */}
        {regularProjects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {regularProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 border-t border-border pt-12 text-center">
          <p className="body-lg mb-8">
            Ingin melihat proses dan kode lengkapnya?
          </p>
          <Button
            href="https://github.com/nandra-lp"
            variant="secondary"
            size="lg"
            className="group shadow-neu hover:shadow-neu-lg active:shadow-neu-inset"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="font-medium">Kunjungi GitHub Saya</span>
            <Icon name="arrowRight" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
