'use client';

import React, { createContext, useContext, useState } from 'react';

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

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('awd_lang', newLang);
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
