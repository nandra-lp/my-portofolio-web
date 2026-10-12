# React Portfolio — Nandra Luthfi

Portfolio Frontend Developer berbasis **React 19 + Vite + Tailwind CSS v4**,
dengan design system Modern Minimalist Editorial, routing React Router,
dan mini-game "Planet Memory".

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
  assets/        # logo (WebP), gambar planet (WebP)
  components/    # Navbar, Intro, About, Projects, ProjectCard,
                  # Contact, Footer, GameCard, ErrorBoundary, DetailAbout
  components/ui/ # design system: Button, Card, Tag, Icon, Container, Reveal
  data/          # data proyek terpusat (projects.js)
  hooks/         # useScrollReveal
  pages/         # Home, Project, Playground, MemoryGame, NotFound
  App.jsx        # routing (lazy) + ScrollToTop + ErrorBoundary
  index.css      # design token (@theme) + utility komponen
  main.jsx       # render root
```

## Rute

| Path          | Halaman              |
|---------------|----------------------|
| `/`           | Home (Intro+About+Contact) |
| `/project`    | Daftar proyek (lazy chunk) |
| `/playground` | Planet Memory Game (lazy chunk) |
| `*`           | 404 NotFound         |

## Catatan optimasi

- Semua route di-code-split via `React.lazy`; vendor React dipecah di
  `vite.config.js` (`vendor-react`). MUI/Emotion/GSAP sudah di-uninstall —
  ikon memakai SVG inline (`components/ui/Icon.jsx`), animasi entrance
  memakai `Reveal` (IntersectionObserver + CSS).
- Gambar planet & logo dalam format WebP (±79 KB total, dari ±3,3 MB PNG);
  favicon diganti monogram SVG 350 byte + `apple-touch-icon.png`.
  Pipeline: `sharp` (devDependency) — lihat `changelog.md`.
- PR berikutnya: username LinkedIn (`linkedin.com/in/USERNAME` di
  Contact/Footer) dan `sitemap.xml` — menunggu info dari pemilik repo
  (belum ada domain produksi).
- Riwayat & rencana perubahan: lihat [`changelog.md`](./changelog.md).
