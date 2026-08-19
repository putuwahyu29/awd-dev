---
title: "AWD Disposable Mail — Platform Email Sementara & Alias Serverless"
description: "Platform email sekali pakai (disposable mail) dan alias email pribadi berbasis serverless edge computing untuk menjaga privasi pengguna dari spam."
tech_stack: ["Cloudflare Workers", "Cloudflare D1 & R2", "Hono", "React", "TypeScript", "Vite"]
categories: ["Aplikasi Web"]
image_preview: "/images/projects/awd-disposable-mail/preview.png"
link: "https://github.com/putuwahyu29/awd-disposable-mail"
featured: true
date: "2026-05-12"
---

## 📌 Tentang AWD Disposable Mail

**AWD Disposable Mail** adalah platform email sekali pakai (*temporary mail*) dan sistem alias email pribadi yang dibangun di atas arsitektur *serverless edge computing*. Platform ini dirancang untuk melindungi kotak masuk asli pengguna dari kebocoran data, surel promosi tak diinginkan, serta potensi spam saat mendaftar ke berbagai layanan publik di internet.

---

### 🌟 Fitur & Kemampuan Utama

- **Penerimaan Email Instan (Serverless Edge)**: Berjalan 100% di atas jaringan Cloudflare Workers dengan latensi ultra-rendah dan responsif secara global.
- **Penyimpanan Pesan & Lampiran Terisolasi**: Menggunakan database Cloudflare D1 untuk pencatatan transaksi email masuk serta Cloudflare R2 untuk penyimpanan berkas lampiran secara aman.
- **Antarmuka Cepat & Responsif**: Dibangun dengan framework Hono dan React modern untuk pengalaman navigasi yang intuitif di perangkat seluler maupun desktop.
- **Perlindungan Privasi Menyeluruh**: Menghindari pelacakan surel pihak ketiga dan mengizinkan pembuatan alamat email anonim hanya dengan satu klik.

---

### 💡 Nilai Tambah & Dampak

Memberikan rasa aman dan kenyamanan bagi pengguna internet dalam menjelajahi berbagai platform tanpa khawatir kotak surat pribadi mereka dibanjiri email spam.
