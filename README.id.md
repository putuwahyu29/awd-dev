# ⚡ Awd Dev - Portofolio Software Engineer & Keystatic CMS

<p align="center">
  <strong>Website portofolio pengembang pribadi dan Content Management System (CMS) oleh I Putu Agus Wahyu Dupayana.</strong>
</p>

<p align="center">
  <a href="https://awd.my.id"><strong>🌐 Website Utama (awd.my.id)</strong></a> •
  <a href="https://blog.awd.my.id"><strong>✍️ Blog Teknologi</strong></a> •
  <a href="README.md"><strong>🇬🇧 Read in English</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16_(App_Router)-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Keystatic-Git--Based_CMS-f97316" alt="Keystatic CMS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Mistral_AI-Chatbot-purple" alt="Mistral AI" />
</p>

---

## 🌐 Bahasa / Language
- [English](README.md)
- **Bahasa Indonesia** (Saat Ini)

---

## 📋 Daftar Isi
1. [Ringkasan](#-ringkasan)
2. [Fitur Utama](#-fitur-utama)
3. [Teknologi yang Digunakan (Tech Stack)](#-teknologi-yang-digunakan-tech-stack)
4. [Prasyarat](#-prasyarat)
5. [Panduan Pengembangan Lokal (Local Development)](#-panduan-pengembangan-lokal-local-development)
6. [Konfigurasi GitHub App (Keystatic Mode Produksi)](#-konfigurasi-github-app-keystatic-mode-produksi)
7. [Daftar Environment Variables](#-daftar-environment-variables)
8. [Struktur Direktori Konten](#-struktur-direktori-konten)
9. [Perintah yang Tersedia (Scripts)](#-perintah-yang-tersedia-scripts)
10. [Panduan Deployment](#-panduan-deployment)
11. [Lisensi & Kredit](#-lisensi--kredit)

---

## 🌟 Ringkasan

Repositori ini berisi kode sumber untuk website portofolio pengembang pribadi **I Putu Agus Wahyu Dupayana** ([awd.my.id](https://awd.my.id)).

Portofolio ini dibangun dengan teknologi modern: **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, dan **Keystatic CMS**. Sistem ini mengadopsi arsitektur **Git-based CMS**, di mana setiap perubahan konten yang dilakukan melalui dashboard admin akan langsung di-commit ke repositori GitHub—tanpa memerlukan database terpisah, menjaga data tetap aman, portabel, dan tercatat dalam riwayat commit Git.

---

## 🛠️ Fitur Utama

- **🗂️ Keystatic Git-Based CMS (`/keystatic`)**:
  - Panel admin visual untuk mengelola profil Hero, Tentang Saya, Keterampilan/Tech Stack, Proyek, Sertifikasi, Publikasi, dan Tautan Media Sosial.
  - Di mode produksi, konten langsung di-commit ke repositori GitHub via autentikasi GitHub App OAuth.
- **🌐 Dukungan Multi-Bahasa (Bilingual)**:
  - Tombol pengalih bahasa (Bahasa Indonesia & English) pada seluruh konten utama dan detail proyek.
- **🤖 Asisten AI Chatbot Terintegrasi (`/api/chat`)**:
  - Chatbot interaktif bertenaga Mistral AI yang dapat menjawab pertanyaan seputar pengalaman, proyek, dan profil keahlian.
- **📄 CV & Resume Interaktif (`/cv`)**:
  - Halaman riwayat hidup interaktif dengan fitur ekspor ke format PDF langsung dari peramban menggunakan `html2canvas` dan `jspdf`.
- **🔗 Halaman Link-in-Bio (`/links`, `/bio`)**:
  - Halaman terpusat untuk tautan media sosial dan profil digital, dioptimalkan untuk perangkat seluler.
- **📊 Integrasi Statistik GitHub & Pinned Repos**:
  - Menampilkan repositori unggulan (*pinned repos*), statistik aktivitas, bintang (*stars*), dan metrik GitHub secara dinamis melalui API GitHub.
- **📰 Sinkronisasi Otomatis Artikel Blog (RSS)**:
  - Mengambil dan menyajikan artikel terbaru dari blog pribadi ([blog.awd.my.id](https://blog.awd.my.id)) secara berkala via RSS Feed.
- **🎨 Dukungan Dark & Light Mode**:
  - Transisi tema gelap dan terang yang mulus dengan penyimpanan preferensi pengguna via `next-themes`.
- **⚡ SEO & Performa Optimal**:
  - Dilengkapi `sitemap.ts`, `robots.ts`, Open Graph / Twitter Card metadata dinamis, serta PWA Web Manifest (`manifest.ts`).

---

## 🧰 Teknologi yang Digunakan (Tech Stack)

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Bahasa Pemrograman** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Content Management** | [Keystatic CMS](https://keystatic.com/) (`@keystatic/core`, `@keystatic/next`) |
| **AI Integration** | [Mistral AI API](https://mistral.ai/) |
| **Generator PDF** | `html2canvas` & `jspdf` |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Markdown Parsing** | `gray-matter`, `remark`, `remark-html` |
| **Tema (Dark/Light)** | `next-themes` |
| **RSS Parser** | `rss-parser` |

---

## 📌 Prasyarat

Sebelum menjalankan proyek secara lokal, pastikan Anda telah menginstal:
- **Node.js**: Versi `18.x` atau lebih baru (disarankan Node `20+`).
- **Package Manager**: `npm`, `pnpm`, atau `yarn`.
- **Git**: Terpasang dan terkonfigurasi.
- *(Opsional)* **GitHub Personal Access Token**: Untuk mengambil data statistik dan pinned repositori tanpa terbentur limit rate GitHub.
- *(Opsional)* **Mistral API Key**: Untuk mencoba fitur chatbot asisten AI secara lokal.

---

## 💻 Panduan Pengembangan Lokal (Local Development)

### 1. Clone Repositori
```bash
git clone https://github.com/putuwahyu29/awd-dev.git
cd awd-dev
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di folder root proyek:

```bash
cp env .env.local
```

Atau isi file `.env.local` secara manual dengan variabel berikut:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RSS_FEED_URL=https://blog.awd.my.id/rss.xml

# GitHub Token (Opsional di Lokal, scope: read:user, public_repo)
GITHUB_TOKEN=ghp_token_github_anda

# Mistral AI Chatbot (Opsional di Lokal)
MISTRAL_API_KEY=api_key_mistral_anda
MISTRAL_MODEL=mistral-small-latest
```

> **Catatan:** Pada mode lokal (`NODE_ENV=development`), Keystatic beroperasi dalam **mode local file-system**, menyimpan setiap perubahan langsung ke file lokal di folder `content/` tanpa memerlukan kredensial GitHub App.

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```

Buka peramban dan akses alamat berikut:
- **Website Portofolio**: [http://localhost:3000](http://localhost:3000)
- **Dashboard Keystatic CMS**: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)
- **CV Interaktif**: [http://localhost:3000/cv](http://localhost:3000/cv)
- **Halaman Tautan (Links)**: [http://localhost:3000/links](http://localhost:3000/links)

---

## 🔐 Konfigurasi GitHub App (Keystatic Mode Produksi)

Saat aplikasi dideploy ke lingkungan produksi (seperti Vercel), Keystatic membutuhkan **GitHub App** untuk mengautentikasi pengguna admin dan melakukan commit langsung ke repositori `putuwahyu29/awd-dev`.

### Langkah Pembuatan GitHub App:

1. Buka [GitHub Settings -> Developer Settings -> GitHub Apps -> New GitHub App](https://github.com/settings/apps/new).
2. Isi informasi aplikasi:
   - **GitHub App name**: `Awd Dev Portfolio CMS` *(harus unik secara global di GitHub)*
   - **Homepage URL**: `https://awd.my.id` (atau URL domain produksi Anda)
   - **Callback URL**: `https://awd.my.id/api/keystatic/github/created-app`
   - **Webhook**: Hilangkan centang / matikan opsi **Active**.
3. Atur Hak Akses (**Repository Permissions**):
   - **Contents**: `Read & write`
   - **Pull requests**: `Read & write`
4. Buat dan simpan kredensial:
   - Klik **Create GitHub App**.
   - Salin **Client ID** yang dihasilkan.
   - Klik **Generate a new client secret**, lalu salin nilai Client Secret tersebut.
5. Pasang Aplikasi:
   - Buka menu **Install App** di bilah samping halaman GitHub App Anda.
   - Pasang pada akun `putuwahyu29` dan berikan izin hanya ke repositori `putuwahyu29/awd-dev`.

---

## 🔑 Daftar Environment Variables

Tabel referensi variabel lingkungan lengkap untuk pengembangan lokal maupun produksi:

| Nama Variabel | Lingkungan | Wajib | Deskripsi |
| :--- | :--- | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Lokal / Prod | **Ya** | URL domain publik website (contoh: `https://awd.my.id` atau `http://localhost:3000`) |
| `RSS_FEED_URL` | Lokal / Prod | Opsional | URL RSS feed XML blog untuk widget artikel (contoh: `https://blog.awd.my.id/rss.xml`) |
| `GITHUB_TOKEN` | Lokal / Prod | Opsional | Personal Access Token (`read:user`, `public_repo`) untuk statistik & pinned repos |
| `MISTRAL_API_KEY` | Lokal / Prod | Opsional | API Key Mistral AI untuk asisten chatbot `/api/chat` |
| `MISTRAL_MODEL` | Lokal / Prod | Opsional | Model Mistral yang digunakan (default: `mistral-small-latest`) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | Produksi | **Ya** | Repositori GitHub tujuan commit Keystatic (`putuwahyu29/awd-dev`) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Produksi | **Ya** | Slug / ID nama GitHub App yang telah dibuat |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Produksi | **Ya** | Client ID dari GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Produksi | **Ya** | Client Secret dari GitHub App |
| `KEYSTATIC_SECRET` | Produksi | **Ya** | String acak rahasia untuk enkripsi sesi login Keystatic |

---

## 📁 Struktur Direktori Konten

Seluruh data konten Keystatic tersimpan dalam format JSON dan Markdown pada direktori `content/`:

```
awd-dev/
├── content/
│   ├── about.json          # Cerita profil, fokus keahlian, dan narasi personal
│   ├── categories.json     # Daftar taksonomi kategori proyek & keahlian
│   ├── contact.json        # Email kontak, lokasi, dan status ketersediaan kerja
│   ├── cv.json             # Pengalaman kerja, riwayat pendidikan, dan kredensial untuk /cv
│   ├── hero.json           # Judul hero, metrik pencapaian, dan badge ringkasan
│   ├── socials.json        # Tautan saluran media sosial dan preferensi tampilan
│   ├── tech-stack.json     # Daftar badge teknologi yang dikelompokkan
│   ├── certifications/     # File Markdown + frontmatter untuk sertifikasi
│   ├── projects/           # File Markdown + frontmatter untuk proyek portofolio
│   └── publications/       # File Markdown + frontmatter untuk publikasi ilmiah
└── keystatic.config.ts     # Konfigurasi skema koleksi Keystatic CMS
```

---

## 📜 Perintah yang Tersedia (Scripts)

Jalankan skrip berikut menggunakan `npm run <script>`:

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan Next.js di `http://localhost:3000` |
| `npm run build` | Membuat bundel produksi aplikasi yang telah dioptimasi |
| `npm run start` | Menjalankan server aplikasi versi produksi |
| `npm run lint` | Menjalankan ESLint untuk memeriksa kualitas kode dan sintaks |

---

## 🚀 Panduan Deployment

Proyek ini telah dioptimalkan untuk di-deploy ke [Vercel](https://vercel.com/):

1. Push repositori ke GitHub (`putuwahyu29/awd-dev`).
2. Impor proyek di dashboard Vercel.
3. Masukkan seluruh environment variable produksi di menu **Settings -> Environment Variables** (lihat [Daftar Environment Variables](#-daftar-environment-variables)).
4. Klik **Deploy**. Vercel akan otomatis mem-build aplikasi Next.js dan melakukan auto-deploy setiap kali ada commit baru di Git.

---

## 📄 Lisensi & Kredit

- **Pembuat**: [I Putu Agus Wahyu Dupayana](https://awd.my.id)
- **Lisensi**: Lisensi MIT. Silakan gunakan sebagai inspirasi atau referensi untuk website portofolio Anda.
