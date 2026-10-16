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
    <Section id="projects" className="bg-background !pt-0 sm:!pt-0 lg:!pt-0 !pb-16 sm:!pb-20 lg:!pb-20">
      <Container>
        {/* Featured Projects — span 2 kolom di lg+ */}
        {featuredProjects.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6 mb-10 max-w-6xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} featured />
            ))}
          </div>
        )}

        {/* Regular Projects — grid 2 kolom */}
        {regularProjects.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6 max-w-6xl mx-auto">
            {regularProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 border-t border-border pt-10 text-center">
          <p className="body-lg lg:text-base mb-6">
            Ingin melihat proses dan kode lengkapnya?
          </p>
          <Button
            href="https://github.com/nandra-lp"
            variant="primary"
            size="md"
            className="group shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <GithubIcon className="h-4 w-4" />
            Kunjungi GitHub Saya
            <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
