import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MemoryGame from "./MemoryGame";
import { Container } from "../components/ui/Container";
import { Badge } from "../components/ui/Tag";
import { Icon } from "../components/ui/Icon";

export default function Playground() {
  useEffect(() => {
    document.title = "Nandra - Playground";
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section id="playground-hero" className="bg-background pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
          <Container narrow className="text-center">
            <Badge variant="accent" className="inline-flex items-center gap-1.5 mb-6">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
              Eksperimen Interaktif
            </Badge>

            <h1 className="heading-1 mb-4">
              Playground
            </h1>

            <p className="body-lg mx-auto max-w-2xl mb-8">
              Ruang eksperimen untuk mencoba interaksi, animasi, dan logika game
              sederhana yang dibangun dengan React.
            </p>

            <div className="flex flex-wrap justify-center gap-2" aria-label="Game tersedia">
              <Badge variant="primary" className="cursor-pointer">
                <Icon name="globe" className="h-3 w-3" />
                Planet Memory
              </Badge>
            </div>
          </Container>
        </section>

        <MemoryGame />
      </main>
      <Footer />
    </>
  );
}
