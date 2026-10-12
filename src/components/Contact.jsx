import { Icon, GithubIcon } from "./ui/Icon";
import { Button } from "./ui/Button";
import { Container, Section, SectionHeader } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const CONTACTS = [
  { href: "https://wa.me/6281318925381", icon: "chat", label: "WhatsApp" },
  { href: "mailto:hello@nandra.com", icon: "mail", label: "Email" },
  { href: "https://github.com/nandra-lp", icon: "github", label: "GitHub" },
  { href: "https://linkedin.com/in/USERNAME", icon: "linkedin", label: "LinkedIn" },
  { href: "https://instagram.com/nandraluthfii", icon: "instagram", label: "Instagram" },
];

export default function Contact() {
  return (
    <Section id="contact" className="bg-background">
      <Container>
        <Reveal>
          <SectionHeader
            label="Kontak"
            title="Mari Terhubung"
            description="Tertarik berdiskusi, berkolaborasi, atau sekadar bertukar ide seputar full-stack development dan teknologi?"
          />
        </Reveal>

        <Reveal>
          <div className="card mx-auto max-w-3xl p-8 text-center md:p-10">
            <p className="body-lg mb-8">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            <ul className="flex flex-wrap justify-center gap-3">
              {CONTACTS.map((contact) => (
                <li key={contact.label}>
                  <ContactButton {...contact} />
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-8">
              <Button href="mailto:hello@nandra.com" variant="primary" size="lg">
                <Icon name="mail" className="h-4 w-4" />
                Kirim Email
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="body-sm mt-12 text-center">
            Terima kasih sudah mengunjungi portfolio saya.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------- */

function ContactButton({ href, icon, label }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`Hubungi saya via ${label}`}
      className="btn-secondary"
    >
      {icon === "github" ? (
        <GithubIcon className="h-5 w-5" />
      ) : (
        <Icon name={icon} className="h-5 w-5" />
      )}
      {label}
    </a>
  );
}
