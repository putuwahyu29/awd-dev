# ⚡ Awd Dev - Software Engineer Portfolio & Keystatic CMS

Repositori ini berisi kode sumber untuk website portofolio pribadi **I Putu Agus Wahyu Dupayana** ([awd.my.id](https://awd.my.id)) yang dibangun dengan **Next.js (App Router)**, **Tailwind CSS v4**, **TypeScript**, dan **Keystatic CMS** (*Git-Based CMS*).

---

## 📋 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Prasyarat](#-prasyarat)
3. [Panduan Pengembangan Lokal (Local Development)](#-panduan-pengembangan-lokal-local-development)
4. [Konfigurasi GitHub App (Keystatic CMS Production Mode)](#-konfigurasi-github-app-keystatic-cms-production-mode)
5. [Daftar Environment Variables](#-daftar-environment-variables)
6. [Struktur Direktori Konten](#-struktur-direktori-konten)
7. [Perintah Utama (Scripts)](#-perintah-utama-scripts)

---

## 🛠️ Fitur Utama
- **Keystatic CMS**: Pengelolaan portofolio (Proyek, Sertifikasi, Publikasi, Hero, Kontak, dan Media Sosial) melalui UI admin di `/keystatic`.
- **Git-Based Content Storage**: Perubahan konten secara otomatis di-commit ke repositori GitHub tanpa membutuhkan database terpisah.
- **Dukungan Bahasa Ganda (Bilingual)**: Konten mendukung pilihan Bahasa Indonesia (ID) dan Bahasa Inggris (EN).
- **Integrasi GitHub GraphQL / REST API**: Menampilkan repositori pilihan (*Pinned Repositories*) dan statistik aktivitas GitHub secara dinamis.
- **Integrasi Blog RSS**: Mengambil dan menampilkan artikel terbaru dari blog ([blog.awd.my.id](https://blog.awd.my.id)) secara otomatis melalui RSS feed.
- **Multi-Theme UI**: Dukungan mode gelap (*Dark Mode*) dan terang (*Light Mode*) menggunakan `next-themes`.

---

## 📌 Prasyarat
- **Node.js**: Versi `18.x` atau yang lebih baru.
- **Package Manager**: `npm`, `pnpm`, atau `yarn`.
- **Akun GitHub**: Untuk repositori dan token API GitHub.

---

## 💻 Panduan Pengembangan Lokal (Local Development)

### 1. Clone & Install
```bash
git clone https://github.com/putuwahyu29/awd-dev.git
cd awd-dev

# Install dependensi
npm install
```

### 2. Konfigurasi Environment Variables (`.env.local`)
Buat file `.env.local` di folder root proyek:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RSS_FEED_URL=https://blog.awd.my.id/rss.xml

# Token GitHub (Opsional di Lokal, rekomendasi scope read:user, public_repo)
GITHUB_TOKEN=ghp_xxx...
```

### 3. Jalankan Server Development
```bash
npm run dev
```
- Website Portofolio: [http://localhost:3000](http://localhost:3000)
- Dashboard Keystatic CMS: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

---

## 🔐 Konfigurasi GitHub App (Keystatic CMS Production Mode)

Saat aplikasi di-deploy ke produksi (misalnya di Vercel), Keystatic memerlukan **GitHub App** untuk melakukan otorisasi login admin dan mempublikasikan commit konten langsung ke repositori `putuwahyu29/awd-dev`.

### Langkah Pembuatan GitHub App untuk `awd-dev`:

1. Buka [GitHub Settings -> Developer Settings -> GitHub Apps -> New GitHub App](https://github.com/settings/apps/new).
2. Isi data aplikasi:
   - **GitHub App name**: `Awd Dev Portfolio CMS` *(Nama harus unik di GitHub)*
   - **Homepage URL**: `https://awd.my.id`
   - **Callback URL**: `https://awd.my.id/api/keystatic/github/created-app`
   - **Webhook**: Uncheck / Matikan **Active**.
3. Hak Akses (**Repository Permissions**):
   - **Contents**: `Read & write`
   - **Pull requests**: `Read & write`
4. Simpan & Buat:
   - Klik **Create GitHub App**.
   - Salin **Client ID**.
   - Klik **Generate a new client secret**, lalu salin nilai Client Secret tersebut.
5. Instalasi App:
   - Pilih menu **Install App** pada pengaturan aplikasi GitHub Anda.
   - Install pada akun `putuwahyu29` dan beri akses ke repositori `putuwahyu29/awd-dev`.

---

## 🔑 Daftar Environment Variables

Daftar lengkap variabel yang diperlukan di lingkungan produksi (Vercel / Cloud):

| Nama Variabel | Contoh Nilai | Deskripsi |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://awd.my.id` | Domain publik utama portofolio |
| `RSS_FEED_URL` | `https://blog.awd.my.id/rss.xml` | URL feed RSS artikel blog untuk widget artikel |
| `GITHUB_TOKEN` | `ghp_c7NKpDxk...` | Personal Access Token GitHub untuk statistik & pinned repo |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | `putuwahyu29/awd-dev` | Repositori target penyimpan konten Keystatic |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | `awd-dev` | Slug GitHub App Keystatic |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv23li1tTeo...` | Client ID GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `68798dd176...` | Client Secret GitHub App |
| `KEYSTATIC_SECRET` | `awd_dev_secret_key...` | String acak rahasia untuk sesi enkripsi login Keystatic |

---

## 📁 Struktur Direktori Konten

- `content/hero.json` : Profil utama, bio, metrik highlight, dan badge teknologi hero bar.
- `content/about.json` : Narasi tentang saya & pilar keahlian utama.
- `content/contact.json` : Informasi email, lokasi, dan status ketersediaan proyek.
- `content/socials.json` : Daftar saluran media sosial & link profil.
- `content/projects/` : Koleksi detail proyek portofolio (.md + metadata).
- `content/certifications/` : Koleksi sertifikasi profesional (.md + metadata).
- `content/publications/` : Koleksi publikasi ilmiah & paper (.md + metadata).
- `keystatic.config.ts` : Skema konfigurasi utama Keystatic CMS.

---

## 📜 Perintah Utama (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan Next.js di `http://localhost:3000` |
| `npm run build` | Membuat build teroptimasi untuk lingkungan produksi |
| `npm run start` | Menjalankan server produksi dari hasil build |
| `npm run lint` | Memeriksa kepatuhan sintaks dan kode dengan ESLint |

