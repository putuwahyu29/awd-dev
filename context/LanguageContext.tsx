'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idText: string, enText?: string) => string;
}

const DICTIONARY_EN: Record<string, string> = {
  'Beranda': 'Home',
  'Proyek': 'Projects',
  'GitHub Repos': 'GitHub Repos',
  'Publikasi': 'Publications',
  'Sertifikasi': 'Certifications',
  'Komunitas': 'Community',
  'Blog': 'Blog',
  'Kontak': 'Contact',
  'Unduh CV': 'Download CV',
  'Unduh CV (PDF)': 'Download CV (PDF)',
  'Pratinjau CV': 'Preview CV',
  'Pratinjau CV (PDF)': 'Preview CV (PDF)',
  'Lihat CV (PDF)': 'Preview CV (PDF)',
  'Lihat CV': 'Preview CV',
  'Buka di Tab Baru': 'Open in New Tab',
  'Cetak': 'Print',
  'Perbesar': 'Zoom In',
  'Perkecil': 'Zoom Out',
  'Pas Lebar': 'Fit Width',
  'Halaman': 'Page',
  'Memuat dokumen CV...': 'Loading CV document...',
  'Gagal memuat dokumen CV': 'Failed to load CV document',
  'Tutup Pratinjau': 'Close Preview',
  'Lihat Proyek': 'Explore Projects',
  'Tentang & Keahlian': 'About & Expertise',
  'Etalase Portofolio': 'Portfolio Showcase',
  'Publikasi & Riset Peneliti': 'Research & Publications',
  'Sertifikasi Keahlian': 'Skill Certifications',
  'Media Sosial & Diskusi': 'Social Media & Discussions',
  'Agregasi RSS Blog': 'RSS Blog Aggregation',
  'Kontak & Komunikasi': 'Contact & Communication',
  'Full-Stack Web Developer & Systems Engineer': 'Full-Stack Web Developer & Systems Engineer',
  'Mari Terhubung & Berkolaborasi': 'Let\'s Connect & Collaborate',
  'Daftar Proyek & Aplikasi Terpublikasi': 'Published Projects & Applications List',
  'Karya Ilmiah & Penelitian': 'Research Papers & Scientific Works',
  'Media Sosial & Edukasi Teknologi': 'Social Media & Tech Education',
  'Artikel & Catatan Teknis Terbaru': 'Latest Technical Articles & Notes',
  'Teknologi & Tools Utama': 'Core Technologies & Tools',
  'Email Utama': 'Primary Email',
  'Salin': 'Copy',
  'Tersalin': 'Copied',
  'Semua': 'All',
  'Sistem Enterprise': 'Enterprise Systems',
  'Aplikasi Web': 'Web Applications',
  'Mobile & API': 'Mobile & APIs',
  'Data & Analytics': 'Data & Analytics',
  'Full-Stack Web': 'Full-Stack Web',
  'Enterprise System': 'Enterprise System',
  'Web Analytics': 'Web Analytics',
  'Infrastruktur & Cloud': 'Infrastructure & Cloud',
  'Lihat Repositori / Demo': 'View Repository / Demo',
  'Tutup modal': 'Close modal',
  'Lihat Kredensial': 'View Credential',
  'Status: Terverifikasi': 'Status: Verified',
  'Pengembang perangkat lunak yang berfokus pada pembangunan sistem web berkinerja tinggi, arsitektur Laravel & Next.js, pengelolaan infrastruktur server virtualisasi Proxmox VE & Docker, serta otomatisasi cloud di Google Cloud Platform (GCP).':
    'Software engineer focused on building high-performance web systems, Laravel & Next.js architecture, Proxmox VE & Docker server virtualization infrastructure, and Google Cloud Platform (GCP) cloud automation.',
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (idText) => idText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('awd_lang') as Language;
      if (savedLang === 'id' || savedLang === 'en') {
        return savedLang;
      }
    }
    return 'id';
  });

  const syncGoogleTranslate = (targetLang: Language) => {
    if (typeof window === 'undefined') return;
    const domain = window.location.hostname;

    if (targetLang === 'en') {
      const cookieVal = '/id/en';
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/;`;
      }

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
    } else {
      // Returning to original Indonesian language:
      // Completely clear Google Translate cookies & reset DOM to original text
      const pastCookie = document.cookie;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
      }

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = '';
        select.dispatchEvent(new Event('change'));
      }

      // If Google Translate cookie was active, reload to ensure 100% original DOM text
      if (pastCookie.includes('googtrans=/id/en')) {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (lang === 'en') {
      // Delay slightly to ensure script elements are mounted
      const timer = setTimeout(() => {
        syncGoogleTranslate('en');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('awd_lang', newLang);
    syncGoogleTranslate(newLang);
  };

  const t = (idText: string, enText?: string): string => {
    if (lang === 'id') return idText;
    if (enText) return enText;
    return DICTIONARY_EN[idText] || idText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
