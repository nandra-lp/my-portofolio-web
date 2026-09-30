# React Portfolio — Nandra Luthfi

Portfolio Frontend Developer berbasis **React 19 + Vite + Tailwind CSS v4**,
dengan animasi GSAP, routing React Router, dan mini-game "Planet Memory".

## Cara menjalankan

```bash
npm install
npm run dev      # server pengembangan
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # cek ESLint
npm run lint:fix # perbaiki otomatis yang bisa diperbaiki
```

Butuh Node.js >= 18.

## Struktur folder

```
src/
  assets/        # logo, watermark, gambar planet
  components/    # Navbar, Intro, About, Projects, ProjectCard,
                 # Contact, Footer, GameCard, ErrorBoundary, DetailAbout
  data/          # data proyek terpusat (projects.js)
  hooks/         # useScrollReveal
  pages/         # Home, Project, Playground, MemoryGame, NotFound
  App.jsx        # routing (lazy) + ScrollToTop + ErrorBoundary
  main.jsx       # ThemeProvider MUI + render root
```

## Rute

| Path          | Halaman              |
|---------------|----------------------|
| `/`           | Home (Intro+About+Contact) |
| `/project`    | Daftar proyek (lazy chunk) |
| `/playground` | Planet Memory Game (lazy chunk) |
| `*`           | 404 NotFound         |

## Catatan optimasi

- Semua route di-code-split via `React.lazy`; vendor dipecah di
  `vite.config.js` (`vendor-react`, `vendor-mui`, `vendor-gsap`).
- Gambar planet & watermark terkompresi (lihat `changelog.md`).
  PR berikutnya: `bumi.png`, `venus.png`, `merkurius.png`, `nl-nobg.png`,
  dan favicon `public/nl-nobg.svg` masih >300 KB — kandidat WebP/AVIF.
- Riwayat & rencana perubahan: lihat [`changelog.md`](./changelog.md).
