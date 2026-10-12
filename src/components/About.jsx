import { projects } from "../data/projects";
import DetailAbout from "./DetailAbout";
import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";
import { Icon } from "./ui/Icon";
import { Container, Section, SectionHeader } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

// Angka-angka di bawah diturunkan dari repo — sesuaikan bila bertambah.
const STATS = [
  { value: `${projects.length}+`, label: "Proyek Diselesaikan" },
  { value: "6+", label: "Teknologi Dipelajari" },
  { value: "1", label: "Pengalaman Magang Backend" },
];

// Dikelompokkan dari daftar yang sudah ada di bawah — tanpa item baru.
const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["React & JavaScript ES6+", "Next.js (Dasar)", "Tailwind CSS"],
  },
  { title: "Mobile", items: ["Flutter & Dart"] },
  { title: "Backend", items: ["Golang untuk Backend", "Integrasi REST API"] },
  { title: "Workflow", items: ["Git & workflow kolaborasi"] },
];

// Disimpulkan dari konten yang tersedia (data proyek + deskripsi About).
const EXPERIENCE = [
  {
    role: "Backend Developer — Project-Based Internship",
    org: "Evermos",
    description:
      "Pengembangan API dan layanan backend menggunakan bahasa pemrograman Golang.",
  },
  {
    role: "Proyek & Pembelajaran Mandiri",
    org: "Self-directed",
    description:
      "Membangun UI responsif dengan React, aplikasi mobile Flutter, dan integrasi REST API lewat proyek nyata.",
  },
];

export default function About() {
  return (
    <Section id="about" className="bg-surface">
      <Container>
        <Reveal>
          <SectionHeader
            label="Tentang Saya"
            title="Tentang Saya"
            description="Junior Full-stack Developer yang siap belajar dan beradaptasi cepat. Fokus membangun sistem yang andal, efisien, dan terus berkembang lewat proyek nyata."
          />
        </Reveal>

        <Reveal>
          <p className="body mx-auto mb-12 max-w-2xl text-center">
            Saat ini saya mendalami frontend lewat React dan memperluas
            pengalaman backend lewat program magang di Evermos — membangun
            API dengan Golang, aplikasi mobile dengan Flutter, dan antarmuka
            web yang responsif.
          </p>
        </Reveal>

        {/* Stats — bukti ringkas, bukan sekadar klaim */}
        <Reveal>
          <dl className="mx-auto mb-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="card flex flex-col px-2 py-5 text-center"
              >
                <dt className="order-2 mt-1 text-sm font-medium text-muted">
                  {stat.label}
                </dt>
                <dd className="order-1 text-3xl font-bold text-heading">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Fokus & aktivitas */}
        <div className="grid gap-6 text-left lg:grid-cols-3">
          <Reveal className="h-full">
            <DetailAbout
              title="Fokus Pembelajaran"
              items={[
                "React & JavaScript ES6+",
                "Next.js (Dasar)",
                "Flutter & Dart",
                "Golang untuk Backend",
                "Tailwind CSS",
              ]}
              className="h-full"
            />
          </Reveal>

          <Reveal delay={100} className="h-full">
            <DetailAbout
              title="Yang Saya Kerjakan"
              items={[
                "UI responsif dengan React",
                "Integrasi REST API",
                "Aplikasi mobile Flutter",
                "API & layanan Golang",
                "Git & workflow kolaborasi",
              ]}
              className="h-full"
            />
          </Reveal>

          <Reveal delay={200} className="h-full">
            <div className="card flex h-full flex-col justify-center p-6">
              <h3 className="heading-4 mb-4">Progress Belajar</h3>
              <div className="mb-2 flex justify-between text-xs font-medium text-muted">
                <span>Fundamental</span>
                <span>Implementasi</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress belajar dari fundamental ke implementasi"
                className="h-2 w-full overflow-hidden rounded-full bg-border"
              >
                <div className="h-2 w-3/5 rounded-full bg-primary" />
              </div>
              <p className="body-sm mt-5">
                Konsisten mengasah fundamental, praktik integrasi
                antar-platform secara langsung, serta memastikan kualitas
                kode meningkat pada setiap eksekusi proyek.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Keahlian */}
        <Reveal>
          <div className="mt-16">
            <h3 className="heading-3 mb-6 text-center">Keahlian</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="card p-6">
                  <h4 className="mb-3 text-base font-semibold text-heading">
                    {group.title}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag variant="primary">{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Pengalaman */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="heading-3 mb-6 text-center">Pengalaman</h3>
            <ol className="space-y-4">
              {EXPERIENCE.map((exp) => (
                <li key={exp.role} className="card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-semibold text-heading">
                      {exp.role}
                    </h4>
                    <span className="badge-muted">{exp.org}</span>
                  </div>
                  <p className="body-sm mt-2">{exp.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button to="/project" variant="primary">
              Lihat Proyek
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
            <Button href="#contact" variant="secondary">
              <Icon name="mail" className="h-4 w-4" />
              Hubungi Saya
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
