import { Icon, GithubIcon } from "./ui/Icon";
import { Button } from "./ui/Button";
import { Container, Section, SectionHeader } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const WHATSAPP_URL = "https://wa.me/6281318925381";

const CONTACT_ICON_CLASS =
  "h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5";

function ChatIcon({ className }) {
  return <Icon name="chat" className={className} />;
}

function MailIcon({ className }) {
  return <Icon name="mail" className={className} />;
}

function GithubMark({ className }) {
  return <GithubIcon className={className} />;
}

function LinkedinIcon({ className }) {
  return <Icon name="linkedin" className={className} />;
}

function InstagramIcon({ className }) {
  return <Icon name="instagram" className={className} />;
}

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
          <div className="card mx-auto max-w-3xl p-6 text-center sm:p-8 md:p-10">
            <p className="body-lg mb-6">
              Kamu bisa menghubungi saya melalui platform berikut:
            </p>

            {/* Varian eksplisit per kanal — tanpa branching maupun map. */}
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <ContactButton href={WHATSAPP_URL} label="WhatsApp">
                  <ChatIcon className={CONTACT_ICON_CLASS} />
                </ContactButton>
              </li>
              <li>
                <ContactButton href="mailto:hello@nandra.com" label="Email">
                  <MailIcon className={CONTACT_ICON_CLASS} />
                </ContactButton>
              </li>
              <li>
                <ContactButton href="https://github.com/nandra-lp" label="GitHub">
                  <GithubMark className={CONTACT_ICON_CLASS} />
                </ContactButton>
              </li>
              <li>
                <ContactButton href="https://linkedin.com/in/USERNAME" label="LinkedIn">
                  <LinkedinIcon className={CONTACT_ICON_CLASS} />
                </ContactButton>
              </li>
              <li>
                <ContactButton href="https://instagram.com/nandraluthfii" label="Instagram">
                  <InstagramIcon className={CONTACT_ICON_CLASS} />
                </ContactButton>
              </li>
            </ul>

            <div className="mt-6 border-t border-border pt-6">
              <Button href={WHATSAPP_URL} variant="primary" size="lg">
                <Icon name="chat" className="h-5 w-5" />
                Chat via WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="body-sm mt-10 text-center">
            Terima kasih sudah mengunjungi portfolio saya.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------- */

function ContactButton({ href, label, children }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`Hubungi saya via ${label}`}
      className="btn-secondary group min-h-11"
    >
      {children}
      {label}
    </a>
  );
}
