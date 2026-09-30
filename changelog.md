# Changelog

> Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/).

## [Unreleased] — Refaktor Clean Navbar

### Changed (`src/components/Navbar.jsx`, `Footer.jsx`, `utils/scroll.js`)

- Util scroll bersama baru (`NAV_HEIGHT`, `scrollToSection`,
  `waitForElement`) — menghapus duplikasi ~30 baris polling rAF antara
  Navbar dan Footer, satu sumber magic number `72`.
- `handleNavClick` 3 cabang → 2 cabang (scroll-to-top lintas route
  ditangani `<ScrollToTop />`); ternary route aktif → lookup
  `ROUTE_SECTION`.
- Return dipecah menjadi subkomponen `DesktopNavLink` / `MobileNavLink`;
  class kondisional nav diekstrak ke `navClass`; komentar `// ✅` dibersihkan.
- Hover link desktop + `hover:bg-white/5`; `<nav>` ber-`aria-label`;
  spacer memakai `NAV_HEIGHT`.

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses; perilaku navigasi
  tidak berubah.

## [Unreleased] — Modernisasi Footer

### Changed (`src/components/Footer.jsx`)

- `Tooltip` + `IconButton` + `Button` MUI diganti Tailwind murni: `Social`
  kini `<a>` biasa dengan tooltip CSS (`group-hover`, `aria-hidden` karena
  `aria-label` sudah ada) — efek Tochigi: `vendor-mui` menyusut
  **169 KB → 127 KB** (gzip 58 → 44 KB).
- Tombol "Kembali ke atas" menjadi `<button>` biasa dengan `aria-label`;
  tampilan identik, tanpa `sx` override.
- `mailto:` tidak lagi membuka tab baru (`target="_blank"` hanya untuk
  `http(s)`).
- Tagline brand tampil di semua ukuran layar (sebelumnya `hidden` di mobile).
- Sisa `indigo-900/10` → glow `amber-600/[0.06]`.

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses.

## [Unreleased] — Modernisasi Navbar

### Added (`src/components/Navbar.jsx`)

- Tombol CTA "Hubungi Saya" (pil Gold, desktop) — pola standar portfolio
  modern; mengarah ke section kontak via `handleNavClick("contact")`.
- Menu mobile tertutup kini `inert` (tak bisa di-tab saat tersembunyi) +
  bisa ditutup dengan tombol Escape.

### Changed

- Listener scroll di-throttle via `requestAnimationFrame` (sebelumnya
  `setState` tiap piksel scroll).
- Sisa `text-zinc-*` → `text-slate-*`; komentar usang dihapus.

### Fixed

- Ketidakseimbangan tag JSX saat pembungkusan toggle + CTA (tertangkap
  ESLint, langsung diperbaiki).

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses.

## [Unreleased] — Penyelarasan Project & ProjectCard

### Fixed (`src/components/ProjectCard.jsx`, `Projects.jsx`, `pages/Project.jsx`)

- Link overlay kini punya ring fokus terlihat (`focus-visible` amber) dan
  kartu ikut terangkat via `focus-within` — pengguna keyboard mendapat
  umpan balik yang sama dengan hover mouse.
- Prop mati `index` dihapus dari `Projects.jsx` + `ProjectCard.jsx`.
- `main` di `Project.jsx` diberi `bg-slate-950` eksplisit (selaras Playground).

### Added

- Badge status ("Selesai"/"Berjalan"/"Rencana") dari field `status` di
  `data/projects.js` yang sebelumnya tidak pernah ditampilkan — kini tampil
  sebagai pil kaca di kiri atas gambar.

### Changed

- Wrapper kartu `<div>` → `<article>` untuk semantik yang benar.

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses.

## [Unreleased] — Penyelarasan UI MemoryGame

### Fixed (`src/pages/MemoryGame.jsx`)

- HUD disatukan lewat komponen `StatPill`: satu shell
  (`border-white/10 bg-slate-900/50`), label `slate-400`, value `white`
  (amber untuk Terbaik). Sebelumnya 4 pil memakai 3 kombinasi
  border/background berbeda.
- Pil "Terbaik" selalu dirender (tampil "–" bila belum ada) — HUD tidak
  lagi bergeser saat rekor pertama tercatat.
- Emoji 🎉🏆 diganti ikon MUI (`EmojiEvents`) agar terlihat profesional.
- `pb-20` ganda (page + grid wrapper) dibuang — overlay menang tidak lagi
  memanjang ke area kosong.

### Added

- `role="dialog" aria-modal` + label skor pada modal menang; `sr-only`
  persen progres pada HUD pasangan.

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses.

## [Unreleased] — Modernisasi Playground & Memory Game

### Added (`src/pages/MemoryGame.jsx`, `GameCard.jsx`, `Playground.jsx`)

- Badge "Playground" + judul diperbesar (`text-4xl md:text-5xl`) selaras
  dengan section lain; subjudul dinamis ("Temukan semua 8 pasangan planet").
- HUD "Pasangan X/8" dengan mini progress bar gradasi Gold + `role="status"`
  untuk screen reader — umpan balik progres yang sebelumnya tidak ada.
- Modal menang elegan: ikon trofi `EmojiEvents`, ring `amber-400/30` +
  glow Gold, ringkasan "8 pasangan dalam N langkah", badge "Rekor terbaik
  baru!" (logika `isRecord` eksplisit, aman null).
- Kartu yang cocok kini menyala: `ring-amber-400/50` + glow Gold, dan
  `aria-label` membedakan "pasangan cocok" vs "tertutup".

### Changed

- Header dirapatkan ke tengah (`pt-32→pt-28`, layout center) agar fit;
  `Playground.jsx` diberi `bg-slate-950` eksplisit.
- `TOTAL_PAIRS` diturunkan dari `cardImages.length` — tambah planet baru
  otomatis ikut ke subjudul, HUD, dan modal.

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses.

## [Unreleased] — Modernisasi Hero Intro

### Added (`src/components/Intro.jsx`)

- Badge status "Tersedia untuk kolaborasi" dengan dot pulse — pola standar
  portfolio modern, memberi sinyal ketersediaan sejak detik pertama.
- Gradasi Gold (`amber-200→500`) pada nama belakang "Luthfi" sebagai focal
  point; teks putih polos dipertahankan untuk "Nandra".
- Konstanta `TECH_STACK` agar daftar chip tidak inline di JSX.

### Changed

- Ritme vertikal dirapatkan (`mt-8→mt-7`, `mt-10→mt-9`, `mt-14→mt-12`,
  `+ py-16` konten) agar hero pas satu layar (fit) di viewport pendek.
- Sisa token non-tema dibersihkan: `text-zinc-*` → `text-slate-*`,
  hover chip `indigo-950/40` → `amber-500/10`, hover tombol outline
  `indigo/10` → `amber-500/10`, glow `indigo-900/15` → `amber-600/10`.

### Fixed

- Glow ambient yang memakai `-z-10` tenggelam di belakang background
  section sehingga tidak pernah terlihat — diperbaiki di Intro, About, dan
  Contact (hapus `-z-10`; elemen absolute otomatis di atas background).

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses; grep memastikan nol token
  `zinc/indigo/sky/blue/pink/purple` dan nol `-z-10` di `src/**/*.jsx`.

## [Unreleased] — Penyelarasan Tema Navy/Slate + Amber/Gold

### Changed

- Seluruh `zinc-*` (14 berkas) → `slate-*`; `gray-950` di `App.jsx` → `slate-950`.
  Satu-satunya pengecualian: tidak ada — grep memastikan nol token
  `zinc/gray/indigo/sky/blue/pink/purple` tersisa di `src/**/*.jsx`.
- Tema MUI (`src/main.jsx`): primary `#3b82f6` (blue) → `#f59e0b`
  (amber-500), secondary `#ec4899` (pink) → `#fbbf24` (amber-400).
- Sisa `indigo` dihilangkan: glow About `bg-indigo-900/20` →
  `bg-amber-600/10`, hover kartu About `hover:bg-indigo-950/40` →
  `hover:bg-slate-800/60`; glow Contact `bg-indigo-900/10` →
  `bg-amber-600/[0.07]`, hover kartu Contact → `hover:bg-slate-800/60`.
- Divider Intro `via-slate-500` → `via-amber-500/60` sebagai benang Gold.
- Hex manual Footer `#a1a1aa` → `#94a3b8` (slate-400); komentar usang
  (sky/zinc/indigo) diperbarui.
- Palet resmi kini: background `slate-950/900/800`, teks `white/slate-*`,
  aksen `amber-200→500`, glow `amber-600/*`, fokus `:focus-visible` `#fbbf24`
  (sudah amber sejak awal).

### Verifikasi

- `npm run lint` bersih, `npm run build` sukses (bundle tidak berubah
  signifikan — perubahan murni token warna).

## [Unreleased] — Pengayaan Section About

### Added (`src/components/About.jsx`)

- Badge "Tentang Saya" + paragraf identitas lapis kedua (menyebut magang
  backend Evermos — fakta terkuat yang sebelumnya tidak muncul di About).
- Strip 3 statistik dari data repo (`4+ Proyek` dari `data/projects`,
  `6+ Teknologi`, `1 Magang Backend`) sebagai bukti ringkas.
- Kartu ketiga "Yang Saya Kerjakan" (sebelumnya hanya 2 kartu); grid menjadi
  `lg:grid-cols-3` agar section tidak kopong.
- CTA "Lihat Proyek" (`/project`) + "Hubungi Saya" (`#contact`).
- Item "Fokus Pembelajaran" diperkaya (React & ES6+, Next.js dasar, Flutter
  & Dart, Golang, Tailwind).

### Changed

- Semua blok baru (badge, stats, CTA) masuk timeline GSAP dengan guard
  `prefers-reduced-motion` yang sama; pola `gsap.from` tetap aman tanpa JS.
- `npm run lint` bersih, `npm run build` sukses (Home chunk 15,7 KB).

> Catatan: angka statistik diturunkan dari repo — sesuaikan `STATS` di
> `About.jsx` bila jumlah proyek/teknologi bertambah.

## [0.1.0] - 2026-09-20 — Optimasi P0/P1 + Aset Terkompresi

Rilis optimasi pertama berdasarkan audit 2026-09-20. `npm run lint` **bersih
(0 error, 0 warning)** — sebelumnya 1 error + 3 warning. `npm run build` sukses.

### Hasil ukur (sebelum → sesudah)

- Gambar `dist/`: watermark `NL-wm.png` 1,5 MB → **84 KB**; `uranus.png`
  2,4 MB → **513 KB**. Total gambar ±6 MB → **±3,9 MB** (~35% turun).
- JS: satu `index-*.js` 491 KB (gzip 166 KB) → entry `index-*.js` **186 KB**
  (gzip 59 KB) + `vendor-react` 48 KB + `vendor-gsap` 70 KB +
  `vendor-mui` 169 KB + chunk route (`Home` 12,8 KB, `Project` 10 KB,
  `Playground` 7,3 KB, `NotFound` 0,9 KB). First-load route `/` tidak lagi
  menarik kode Project/Playground.

### Added

- Code-splitting semua route (`Home`, `Project`, `Playground`, `NotFound`)
  via `React.lazy` + `manualChunks` vendor di `vite.config.js` (`P0`).
- `ErrorBoundary` (`src/components/ErrorBoundary.jsx`) + halaman 404
  (`src/pages/NotFound.jsx`, rute `path="*"`) + `ScrollToTop` terpusat di
  `App.jsx` + skip-link "Lewati ke konten utama" (`P0/P1`).
- Best-score Planet Memory tersimpan di `localStorage` + badge "Terbaik"
  (`src/pages/MemoryGame.jsx`) (`P1`).
- `public/robots.txt`; meta `theme-color`, Open Graph, Twitter card,
  `preconnect` Unsplash, `lang="id"` di `index.html` (`P1`).
- `src/data/projects.js` — data proyek terpusat dengan `slug` stabil (`P1`).
- Metadata `package.json` (`version 0.1.0`, `description`, `author`,
  `engines`, script `lint:fix`); `README.md` ditulis ulang (`P2`).

### Changed

- Aset terkompresi oleh pemilik repo: `NL-wm.png` → 82 KB, `uranus.png` →
  501 KB; di-repo dinormalisasi ke nama kanonis lowercase (`nl-wm.png`,
  `uranus.png`) agar impor konsisten lintas OS (sebelumnya `NL-wm.png`
  kapital hanya lolos di Windows).
- Navigasi pasca-`navigate` tanpa `setTimeout(100)` rapuh — diganti polling
  `requestAnimationFrame` (±30 frame) di `Navbar.jsx` dan `Footer.jsx` (`P0`).
- Footer memakai `navigate` + scroll ber-offset (sebelumnya `href="#..."` yang
  rusak di `/project`/`/playground`) (`P0`).
- Animasi GSAP memakai `gsap.from` + guard `prefers-reduced-motion` (konten
  tetap terlihat tanpa JS/GSAP) di `Intro.jsx`, `About.jsx`, `Projects.jsx` (`P1`).
- `useScrollReveal` menerima `threshold` primitif + init malas tanpa
  `setState` sinkron di effect (menyelesaikan error/warning ESLint) (`P1`).
- `GameCard` menjadi `<button>` keyboard-accessible (`aria-label`,
  `aria-pressed`, `disabled`, `focus-visible`) + `loading="lazy"` dan
  dimensi gambar (`P1`).

### Fixed

- `DetailAbout` mengabaikan prop `className` — kini diterima dan digabung
  dengan class default (`P0`).
- Shuffle bias `.sort(() => Math.random() - 0.5)` → Fisher-Yates; fallback
  bila `crypto.randomUUID` tak tersedia (`P0`).
- Kebocoran timer win-condition + auto-reshuffle 2 detik yang mengejutkan —
  overlay menang kini menetap sampai "Main Lagi" (`P0`).
- Key React tak stabil (`key={i}`/`key={index}`) → `slug`/`tag`/string item
  di `Projects.jsx`, `ProjectCard.jsx`, `DetailAbout.jsx` (`P1`).
- State redundan `ProjectCard` (`isHovered`, `mounted` + `setTimeout 40ms`)
  dan `useMemo(() => projects, [])` dihapus (`P1`).
- `console.log` produksi di `Home.jsx` dihapus; partikel via `useMemo` +
  `aria-hidden` (`P1`).
- Logo memakai `alt` deskriptif + `width`/`height` (cegah CLS);
  `aria-expanded`/`aria-controls`/`aria-current` di Navbar; `:focus-visible`
  global sebagai pengganti `focus:outline-none` (`P1`).
- `ProjectCard` fallback bila gambar Unsplash gagal (`onError`) (`P1`).
- Dead code `src/App.css` dihapus; `@tailwind utilities;` ganda di
  `index.css` dibuang (`P1`).
- Link placeholder `github.com/USERNAME` → `github.com/nandra-lp` (`P1`).

### Sisa pekerjaan (belum dikerjakan)

- Kompresi lanjutan: `bumi.png` 570 KB, `venus.png` 560 KB,
  `merkurius.png` 421 KB, `nl-nobg.png` 310 KB, favicon
  `public/nl-nobg.svg` 939 KB → kandidat WebP/AVIF + `vite-plugin-compression`.
- Ganti `@mui/material`/`@emotion` (hanya untuk Button/Tooltip) dengan
  Tailwind murni untuk memangkas `vendor-mui` 169 KB.
- Upgrade `vite 7.2.4` → 7.3+/8.x; tambah `sitemap.xml` setelah domain
  produksi fix; data kontak placeholder (no. WhatsApp, `linkedin.com/in/USERNAME`).

---

## Arsip Audit 2026-09-20 (baseline sebelum optimasi)

## Hasil Audit Singkat (baseline saat ini)

- `npm run lint`: **1 error + 3 warning** (`react-hooks/set-state-in-effect` di `src/hooks/useScrollReveal.js:13`, `exhaustive-deps` di `About.jsx:54`, `Projects.jsx:127`, `useScrollReveal.js:29`).
- `npm run build` (vite v7.3.2): **berhasil dalam 3.15 dtk**, tetapi output berat:
  - `assets/index-*.js` **491 KB (gzip 166 KB)** — indikasi MUI + Emotion + GSAP ikut penuh ke bundle utama.
  - Gambar planet + watermark total **±6 MB di `dist/`**: `uranus-*.png` **2,4 MB**, `NL-wm-*.png` **1,5 MB**, `bumi` 584 KB, `venus` 573 KB, dll.
  - `public/nl-nobg.svg` **961 KB** dipakai sebagai favicon — terlalu besar untuk favicon.
  - `src/assets/nl-nobg.png` 310 KB diduplikasi fungsinya dengan SVG di atas.
- `changelog.md` sebelumnya kosong; `package.json` versi `0.0.0` tanpa metadata; `README.md` masih template Vite bawaan.
- `src/App.css` (127 baris) **tidak diimpor di mana pun** (dead code) dan aturan `#root { max-width: 1280px }`-nya bertentangan dengan layout full-width portfolio.

---

## [Unreleased] — Rekomendasi Pembaruan

### P0 — Performa (dampak terbesar, kerjakan dulu)

- **Kompres & konversi gambar planet + watermark ke WebP/AVIF.** Target: `uranus.png` 2,4 MB → <200 KB, `NL-wm.png` 1,5 MB → <150 KB (atau ganti watermark PNG dengan CSS/SVG). Tambahkan `width`/`height` + `loading="lazy"` + `decoding="async"` di `GameCard.jsx:24` untuk cegah CLS. Estimasi: total `dist/` turun ~80%.
- **Kecilkan favicon.** Optimasi `public/nl-nobg.svg` 961 KB (SVGO) atau ganti favicon `.svg`/`.ico` <50 KB; hapus duplikasi `src/assets/nl-nobg.png` vs `public/nl-nobg.svg`, pilih satu sumber logo.
- **Pangkas bundle JS 491 KB.** Opsi (pilih salah satu): (a) ganti `@mui/material` + `@emotion` (dipakai hanya untuk `Button`, `IconButton`, `Tooltip`) dengan komponen Tailwind murni + `lucide-react`/ikon SVG inline; atau (b) pertahankan MUI tapi pastikan tree-shaking per-modul dan pindahkan `ThemeProvider` agar tidak membebani first-load. Tambahkan `manualChunks` (`vendor-mui`, `vendor-gsap`, `vendor-router`) + `vite-plugin-compression` (gzip/brotli) di `vite.config.js`.
- **Lazy-load semua route.** `App.jsx:3` — `Home` masih diimpor eager; jadikan `React.lazy` seperti `Project`/`Playground`, tambahkan `MemoryGame` sebagai chunk terpisah. Tambahkan `ErrorBoundary` + fallback 404 (`path="*"`) agar chunk gagal tidak blank-page.

### P0 — Bug / Correctness

- **Perbaiki `DetailAbout` yang mengabaikan prop `className`.** `About.jsx:100` mengirim `className` dengan styling amber, tetapi `DetailAbout.jsx:3` hanya menerima `{ title, items }` dan memakai class hardcoded biru (`sky-500`) — hasilnya styling tidak pernah teraplikasi. Tambahkan `className` ke props dan gabungkan dengan default.
- **Perbaiki shuffle bias di `MemoryGame.jsx:8`.** `.sort(() => Math.random() - 0.5)` tidak uniform — ganti Fisher-Yates shuffle.
- **Perbaiki kebocoran timer win-condition di `MemoryGame.jsx:87-102`.** Cleanup hanya `clearTimeout(timer)` pertama, `shuffleTimer` di dalamnya bocor saat unmount. Simpan kedua timer di `timersRef` dan bersihkan keduanya; pertimbangkan ulang auto-reshuffle 2 detik setelah menang (UX mengejutkan — lebih baik tunggu klik "Main Lagi").
- **Tambahkan fallback `crypto.randomUUID()`.** `MemoryGame.jsx:11` crash di browser lama/non-secure context — sediakan fallback (`Math.random().toString(36)` atau paket `nanoid`).
- **Perbaiki navigasi Footer di route non-`/`**. `Footer.jsx:121-128` memakai `href="#about"` yang rusak saat di `/project`/`/playground` (elemen tidak ada). Samakan perilakunya dengan `Navbar.jsx:70-97` (navigate + scroll dengan offset `NAV_HEIGHT`).
- **Hilangkan `setTimeout(..., 100)` rapuh pasca-navigate.** `Navbar.jsx:91` — ganti dengan menunggu route selesai render (mis. `requestAnimationFrame` ganda / effect di halaman tujuan / `scrollTo` dengan `useEffect` + `location.state`), agar tidak gagal di perangkat lambat.

### P1 — Kualitas Kode & Maintainability

- **Selesaikan temuan ESLint (1 error, 3 warning).** Perbaiki `useScrollReveal.js:13` (jangan `setState` sinkron di effect — inisialisasi via `useState(() => ...)`), stabilkan `options` (terima `threshold` primitif, bukan objek, agar effect tidak re-subscribe tiap render — `useScrollReveal.js:29`), dan masukkan/abaikan `sectionRef` di `About.jsx:54` / `Projects.jsx:127` secara eksplisit.
- **Hapus state yang redundan.** `ProjectCard.jsx:6-12` (`isHovered` + `mounted` + `setTimeout 40ms`) duplikat dari `group-hover` CSS — hapus keduanya, andalkan CSS saja (menghemat 1 render ekstra per kartu). `Projects.jsx:60` (`useMemo(() => projects, [])`) tidak berguna untuk konstanta modul — hapus atau pindahkan data ke berkas `src/data/projects.js`.
- **Ganti `key={i}` / `key={index}` dengan key stabil.** Terdapat di `Projects.jsx:195`, `ProjectCard.jsx:88`, `DetailAbout.jsx:10` — pakai `tag`, `slug`, atau `id` agar reorder/filter tidak merusak state.
- **Hapus dead code & duplikasi CSS.** Hapus `src/App.css` (tidak diimpor) atau impor dan rapikan; hapus `@tailwind utilities;` ganda di `index.css:2` (Tailwind v4 cukup `@import "tailwindcss"`); satukan blok `prefers-reduced-motion` dan `scroll-behavior` yang kini terduplikasi di `index.css` dan `App.css`.
- **Bersihkan kode produksi.** Hapus `console.log` di `Home.jsx:22`; ekstrak `NAV_ITEMS`, `projects`, `cardImages` ke modul data; standarkan bahasa komentar (campuran ID/EN) dan hapus komentar template bawaan.
- **Stabilkan `generateParticles()`.** `Home.jsx:9-17` memakai `Math.random()` saat init — bungkus dengan `useMemo` dan tambahkan `aria-hidden="true"` pada kontainer partikel dekoratif.

### P1 — Aksesibilitas (a11y)

- **Jadikan kartu memori keyboard-accessible.** `GameCard.jsx:11` memakai `<div onClick>` — ganti `<button>` dengan `aria-label="Kartu {name}"` + `aria-pressed`/`disabled` saat `matched`/`disabled`.
- **Jangan sembunyikan konten tanpa JS.** `Intro.jsx` / `Projects.jsx` / `About.jsx` me-render dengan `opacity-0` lalu dianimasikan GSAP — jika GSAP gagal, teks tak terlihat. Tambahkan fallback no-JS/`prefers-reduced-motion` (render terlihat dulu, animasi sebagai enhancement) dan hormati `prefers-reduced-motion` dengan menonaktifkan float/bounce GSAP.
- **Perbaiki fokus & semantik.** Jangan `focus:outline-none` tanpa pengganti terlihat (`Navbar.jsx:116,163`); tambahkan `aria-expanded` + `aria-controls` pada toggle menu mobile, `aria-current` pada nav aktif, `alt` deskriptif + dimensi eksplisit pada logo (`Navbar.jsx:118-121`, `Footer.jsx:38-42`), dan `skip-to-content link` + landmark `<main>` yang konsisten.
- **Validasi kontras.** Pastikan teks `zinc-500/600` di atas hitam memenuhi WCAG AA (terutama `Intro.jsx:228-231`, `Contact.jsx:113`).

### P1 — SEO, Meta & UX

- **Lengkapi `index.html`.** Tambah `theme-color`, `og:title/description/image`, `twitter:card`, favicon berukuran wajar + `apple-touch-icon`, `preconnect` ke `images.unsplash.com`, dan `lang="id"` (konten berbahasa Indonesia, saat ini `en`).
- **Ganti manajemen judul manual.** `Home.jsx` / `Project.jsx` / `Playground.jsx` memakai `document.title` di effect — pertimbangkan `react-helmet-async` + kanonis rally; tambahkan halaman 404, `robots.txt` + `sitemap.xml`.
- **Perkuat gambar Unsplash.** `Projects.jsx:12-45` memakai URL eksternal tanpa `onError` fallback, tanpa `sizes`/`srcset`, dan dua link masih placeholder `USERNAME` (`MYKAS`, `PlanetKita`) — perbaiki URL atau tandai draft; self-host bila ingin stabilitas offline.
- **Tambahkan persistensi game.** Simpan best-score/jumlah langkah `MemoryGame` (`turns`) ke `localStorage` alih-alih me-reset diam-diam.

### P2 — Build, Tooling & Upgrade Dependensi

- **Perketat `vite.config.js`.** Tambah `build: { sourcemap: false, chunkSizeWarningLimit, assetsInlineLimit, cssCodeSplit }`, `preview.port`, dan (opsional) `vite-plugin-image-optimizer` + `rollup-plugin-visualizer`/`vite-bundle-visualizer` untuk audit bundle rutin.
- **Lengkapi `package.json`.** Isi `version` (mis. `1.0.0`), `description`, `author`, `license`, `engines`; tambah script `preview`, `lint:fix`, `format` (Prettier) + `analyze`.
- **Upgrade & rapikan dependensi.** `vite 7.2.4` → 7.3+/8.x (atau minimal patch terbaru 7.x); evaluasi `gsap 3.14.2` (impor named `gsap` saja, hindari plugin tak terpakai); evaluasi ulang `@tailwindcss/postcss 4.1.18` + `postcss` ganda; sinkronkan `@types/*` dengan versi React 19. Jalankan `npm outdated` + `npm audit` tiap rilis minor.
- **Perbarui dokumentasi.** Tulis ulang `README.md` (cara jalan, script, struktur folder, pedoman kontribusi) dan aktifkan kembali berkas ini tiap ada perubahan (lihat "Cara memakai changelog ini" di bawah).

---

## Prioritas Eksekusi yang Disarankan

| Urutan | Item | Dampak | Usaha |
|---|---|---|---|
| 1 | Kompres gambar (WebP/AVIF) + favicon kecil | Sangat tinggi (6 MB → <1 MB) | Kecil |
| 2 | Pangkas/pisah bundle MUI + lazy semua route + 404 | Tinggi (FCP/LCP) | Sedang |
| 3 | Fix `DetailAbout className`, shuffle, timer leak, `randomUUID` fallback | Tinggi (correctness) | Kecil |
| 4 | Bereskan ESLint + hapus state redundan + `key` stabil + hapus `App.css` mati | Sedang | Kecil |
| 5 | Aksesibilitas kartu `<button>` + fallback no-JS + fokus terlihat | Sedang | Sedang |
| 6 | Meta/SEO + perbaiki link placeholder + persistensi skor | Rendah–Sedang | Kecil |
| 7 | Tooling (`manualChunks`, compression, analyzer) + upgrade Vite + README | Rendah (DX) | Sedang |

## Cara Memakai Changelog Ini

1. Saat mulai mengerjakan item di atas, pindahkan barisnya ke seksi `## [X.Y.Z] - YYYY-MM-DD` dengan kategori `Added / Changed / Fixed / Performance / Security`.
2. Hapus baris "Status: belum ada kode yang diubah" setelah perubahan pertama di-merge.
3. Sertakan hasil ukur sebelum/sesudah (mis. `dist/` total, lighthouse LCP, `npm run lint` bersih) di tiap rilis.
