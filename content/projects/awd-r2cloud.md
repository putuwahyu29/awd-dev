---
title: "AWD R2Cloud — Klien Seluler Cloudflare R2 Kompatibel S3 untuk Android"
description: "Aplikasi seluler Android native untuk mengelola penyimpanan objek Cloudflare R2 (S3-compatible) dengan zero egress fees, enkripsi AES-256 sisi klien, pemantauan kuota real-time, dan sinkronisasi cadangan otomatis di latar belakang via Android WorkManager."
tech_stack: ["Android App", "Kotlin", "Jetpack Compose", "Material Design 3", "Cloudflare D1 & R2", "Room Database", "Android WorkManager"]
categories: ["Aplikasi Mobile", "Mobile & API"]
image_preview: "/images/projects/awd-r2cloud/home.jpg"
images: [
  "/images/projects/awd-r2cloud/home.jpg",
  "/images/projects/awd-r2cloud/bucket.jpg",
  "/images/projects/awd-r2cloud/list.jpg",
  "/images/projects/awd-r2cloud/detail-preview.jpg",
  "/images/projects/awd-r2cloud/backup.jpg",
  "/images/projects/awd-r2cloud/settings.jpg"
]
link: "https://github.com/putuwahyu29/awd-r2cloud-android"
featured: true
date: "2026-09-17"
---

## 📌 Tentang AWD R2Cloud Android

**AWD R2Cloud Android** adalah aplikasi seluler *open-source* modern yang dirancang khusus untuk mengelola penyimpanan objek *Cloudflare R2* secara langsung dari perangkat Android. Dengan memanfaatkan keunggulan Cloudflare R2 yang memiliki **Zero Egress Fees** (bebas biaya bandwidth pengunduhan) serta kuota gratis bulanan sebesar 10 GB, aplikasi ini menjadi solusi ideal untuk manajemen *bucket* berbasis S3, cadangan berkas otomatis, dan brankas penyimpanan pribadi yang aman.

Aplikasi dibangun secara *native* menggunakan **Kotlin** dan **Jetpack Compose (Material Design 3)** untuk menghadirkan antarmuka yang elegan, responsif, dan terintegrasi mulus dengan tema sistem operasi Android.

---

### 🌟 Fitur & Kemampuan Utama

- **Integrasi Penuh Cloudflare R2 (Kompatibel S3)**: Mengelola akun Cloudflare R2, membuat dan menghapus bucket, mengatur *lifecycle policy*, serta mengunggah dan mengunduh berkas dengan kecepatan tinggi tanpa khawatir biaya *bandwidth egress*.
- **Cadangan Otomatis Latar Belakang (Android WorkManager)**: Mendukung sinkronisasi folder HP (seperti Foto Kamera/DCIM, Dokumen kerja, atau folder Unduhan) secara otomatis ke bucket R2 pilihan di latar belakang dengan kendala cerdas (hanya berjalan saat terhubung ke Wi-Fi dan/atau saat pengisian daya).
- **Enkripsi Sisi Klien AES-256 (*Zero-Knowledge Privacy*)**: Dilengkapi fitur enkripsi lokal opsional berstandar AES-256. Berkas dienkripsi langsung di perangkat sebelum dikirim ke cloud, memastikan pihak Cloudflare sekalipun tidak dapat membaca data pengguna tanpa kunci pribadi.
- **Pemantauan Kuota & Operasi Kelas A/B Real-Time**: Dasbor analitik terintegrasi untuk melacak total kapasitas penyimpanan, jumlah objek, dan estimasi pemakaian kuota bulanan operasi API Kelas A (mutasi/tulis) serta Kelas B (baca/unduh).
- **Penjelajah Berkas Cerdas & Filter Kategori**: Pencarian berkas instan di seluruh bucket dengan pengelompokan otomatis berdasarkan kategori (Gambar, Video, Dokumen, dan Audio) serta pratinjau *thumbnail* media yang cepat.
- **Keamanan Kredensial Berstandar Hardware & Biometrik**: Kunci API dan rahasia token disimpan terenkripsi di `EncryptedSharedPreferences` (AES-256-GCM) dengan lapisan otorisasi biometrik tambahan (Sidik Jari / Face Unlock).

---

### 💡 Nilai Tambah & Dampak

Menyediakan alternatif penyimpanan awan pribadi yang jauh lebih terjangkau, bebas jebakan biaya *egress* tak terduga, dan menjaga kedaulatan data pengguna secara penuh melalui enkripsi di sisi klien.
