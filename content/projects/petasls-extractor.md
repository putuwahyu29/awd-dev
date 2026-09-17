---
title: "PetaSLS Extractor — Ekstraksi Kode SLS 16 Digit & Pengorganisasian Peta Wilkerstat BPS"
description: "Aplikasi desktop berbasis AI dan Computer Vision untuk mengekstraksi kode SLS 16 digit secara otomatis dari gambar peta Wilkerstat BPS, validasi kelengkapan wilayah via GeoJSON, dan pengorganisasian hierarki folder."
tech_stack: ["Aplikasi Desktop", "Go 1.25+", "Wails v2", "React", "TypeScript", "Tailwind CSS", "ONNX Runtime", "Computer Vision OCR", "GeoJSON & GIS"]
categories: ["Aplikasi Desktop", "Data & Analytics", "Sistem Enterprise"]
image_preview: "/images/projects/petasls-extractor/preview.png"
images: [
  "/images/projects/petasls-extractor/preview.png",
  "/images/projects/petasls-extractor/halaman-utama-unggah-peta.png",
  "/images/projects/petasls-extractor/konfirmasi-metode-pemrosesan-ai.png",
  "/images/projects/petasls-extractor/hasil-ekstraksi-kode-sls.png",
  "/images/projects/petasls-extractor/cek-kelengkapan-master-sls.png",
  "/images/projects/petasls-extractor/pengaturan-mesin-ai-dan-akselerasi.png"
]
link: "https://github.com/putuwahyu29/petasls-extractor"
featured: true
date: "2026-09-07"
---

## 🗺️ Tentang PetaSLS Extractor

**PetaSLS Extractor** adalah aplikasi desktop modern berbasis kecerdasan buatan (*Artificial Intelligence* & *Computer Vision*) yang dikembangkan untuk Badan Pusat Statistik (BPS) guna mempermudah proses verifikasi, pembacaan, dan pengelolaan ribuan berkas peta Satuan Lingkungan Setempat (SLS) Wilkerstat. 

Tanpa perlu penamaan file secara manual yang memakan waktu dan rentan salah ketik (*human error*), aplikasi ini mampu mengenali kode SLS 16 digit, nomor RT/RW/Dusun, sub-SLS, serta hierarki administrasi wilayah (Provinsi, Kabupaten/Kota, Kecamatan, dan Desa/Kelurahan) secara otomatis dari berkas pindaian (*scan*) dokumen maupun foto kamera ponsel.

---

### 🌟 4 Strategi Pemrosesan Cerdas

Aplikasi menyediakan 4 mode pemrosesan yang fleksibel sesuai kebutuhan lapangan:

1. **Mode 1 — Baca Teks Peta (Mandiri via OCR)**: Membaca teks fisik gambar peta secara langsung menggunakan optical character recognition tanpa membutuhkan file spasial GeoJSON pendukung (~900ms/berkas).
2. **Mode 2 — QR & GeoJSON (Paling Cepat)**: Memindai QR Code lokasi pada peta dan mencocokkannya ke poligon batas wilayah GeoJSON spasial secara instan (~80ms/berkas, 10x lebih cepat).
3. **Mode 3 — Otomatis & Adaptif**: Memprioritaskan pemindaian cepat melalui QR Code; jika QR Code buram atau rusak, sistem secara mulus beralih ke pembacaan teks visual OCR.
4. **Mode 4 — Verifikasi Ganda (Validasi Penuh 100%)**: Membaca QR Code dan teks fisik peta secara serentak untuk melakukan uji silang keselarasan antara teks cetakan dan koordinat batas wilayah.

---

### 🚀 Fitur & Kemampuan Utama

- **Cek Kelengkapan Peta Terhadap Master Data SLS**: Menguji cakupan peta yang sudah dipindai terhadap daftar acuan resmi (GeoJSON spasial, Excel `.xlsx`, atau CSV). Dasbor secara visual menampilkan metrik jumlah *Total Acuan*, *Sudah Dipindai*, *Belum Dipindai*, serta peta *Di Luar Acuan*.
- **Pola Format Nama & Pengorganisasian Hierarki Folder**: Menamai ulang berkas secara otomatis menggunakan standar BPS `{kode_sls}_wss` atau token kustom, dengan opsi struktur folder fleksibel (*Ikuti Struktur Asal*, *Otomatis Hierarki Wilayah Kab/Kec/Desa*, atau *Simpan Rata 1 Folder*).
- **Mode Operasi Berkas yang Aman**: Pilihan operasi *Salin Berkas (Aman)* untuk menjaga berkas asli tetap utuh di tempat asalnya, atau *Ganti Nama Langsung (In-Place)* untuk efisiensi kapasitas disk.
- **Ekspor Data Hasil Pembacaan Multi-Format**: Hasil ekstraksi kode SLS 16 digit dan rincian identitas wilayah dapat diekspor langsung ke lembar kerja Excel (`.xlsx`), teks terstruktur CSV (`.csv`), maupun JSON (`.json`) untuk integrasi sistem database lanjutan.
- **Arsitektur Hybrid AI & Akselerasi Perangkat Keras**: Mendukung mesin AI offline bawaan (ONNX Runtime lokal yang ringan dan cepat ~2-4 detik/peta), server lokal Ollama (*vision model*), hingga penyedia Cloud AI (Google Gemini 2.5 Flash & OpenAI GPT-4o). Pengguna dapat memilih akselerasi CPU Multi-Core, GPU DirectML, maupun chip NPU AI Silicon.
- **Pra-Pemrosesan Citra Cerdas**: Dilengkapi fitur *Auto-Straighten* (koreksi rotasi tegak otomatis 90°, 180°, 270°), kompresi cerdas citra beresolusi tinggi (>3MB), filter kontras adaptif CLAHE, serta binarisasi adaptif untuk mempertajam cetakan peta yang pudar.

---

### 💡 Nilai Tambah & Dampak

Mengubah alur verifikasi peta SLS dari pekerjaan manual yang memakan waktu berhari-hari menjadi proses terotomatisasi berkecepatan tinggi, menjamin integritas data penamaan berkas Wilkerstat di seluruh satuan kerja BPS, serta mempermudah persiapan sensus dan survei statistik skala besar.
