import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MemoryGame from "./MemoryGame";
import { Container } from "../components/ui/Container";
import { Badge } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";

export default function Playground() {
  useEffect(() => {
    document.title = "Nandra - Playground";
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section id="playground-hero" className="bg-background pt-10 pb-8 sm:pt-12 sm:pb-8 lg:pt-12 lg:pb-8">
          <Container narrow className="text-center">
            <Badge variant="accent" className="hero-enter mb-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              Eksperimen Interaktif
            </Badge>

            <h1 className="heading-1 lg:text-5xl mb-2 hero-enter">
              Playground
            </h1>

            <p className="body-lg lg:text-base mx-auto max-w-xl mb-5 hero-enter">
              Ruang eksperimen untuk mencoba interaksi, animasi, dan logika game
              sederhana yang dibangun dengan React.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Button
                href="#planet-memory-game"
                variant="primary"
                className="shadow-xs"
              >
                <Icon name="globe" className="h-5 w-5" aria-hidden="true" />
                Main Planet Memory
              </Button>
            </div>
          </Container>
        </section>

        <MemoryGame />
      </main>
      <Footer />
    </>
  );
}
