---
title: "SSO BPS NTB - Single Sign-On Portal"
description: "Portal Otentikasi Terpusat (Single Sign-On) & Gateway Aplikasi Internal BPS Provinsi Nusa Tenggara Barat."
tech_stack: ["Keycloak", "OAuth2", "SSO Integration", "PHP", "Laravel", "Tailwind CSS"]
categories: ["Sistem Enterprise", "Mobile & API"]
image_preview: "/images/projects/sso-bps-ntb/preview.png"
link: "https://github.com/putuwahyu29/sso-bps-ntb"
featured: true
date: "2023-10-23"
---

## Gambaran Umum & Keamanan Akses

**SSO BPS NTB** merupakan portal otentikasi tunggal (*Single Sign-On*) dan peluncur aplikasi (*App Launcher Gateway*) yang mengamankan serta menyelaraskan izin akses pegawai BPS Provinsi NTB ke seluruh aplikasi ekosistem internal dalam satu kali autentikasi.

### Fitur Utama & Protokol Keamanan

- **Identity Provider (IdP) Terpusat**: Otentikasi terstandarisasi mengadopsi protokol OAuth2 dan OpenID Connect.
- **Launcher Aplikasi Berbasis Peran**: Tampilan katalog aplikasi disesuaikan dengan wewenang jabatan dan unit kerja pegawai.
- **Session Management & Single Logout**: Sesi login aman yang otomatis kedaluwarsa saat tidak ada aktivitas serta fitur sekali logout untuk semua layanan.

### Dampak Keamanan & Efisiensi

Mengeliminasi penggunaan banyak password berulang oleh pegawai serta memperketat perimeter keamanan akses sistem internal.
