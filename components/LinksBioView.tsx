'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  FileText,
  BookOpen,
  MapPin,
  CheckCircle2,
  Share2,
  Check,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// Official SVG Brand Logomarks
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.32 1.54-1.33 2.54-.05 1.05.41 2.12 1.21 2.77.9.72 2.17.9 3.24.47 1.14-.42 1.94-1.55 1.98-2.77.03-4.99.01-9.98.01-14.97z" />
    </svg>
  );
}

function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M12.186 24c-3.15 0-5.845-1.04-7.616-2.93-1.603-1.71-2.404-4.04-2.404-6.93 0-3.32 1.05-6.08 3.12-8.21C7.36 3.8 10.3 2.7 13.98 2.7c3.34 0 6.07.96 7.9 2.78 1.54 1.53 2.37 3.65 2.37 6.02 0 4.14-2.58 7.37-6.15 7.37-1.42 0-2.61-.54-3.35-1.52-.75.98-1.94 1.52-3.36 1.52-2.31 0-4.08-1.59-4.08-3.64 0-2.14 1.83-3.75 4.39-3.75 1.07 0 2.07.28 2.87.8v-.48c0-1.85-.92-2.91-2.69-2.91-1.32 0-2.31.57-2.73 1.58l-2.02-.92C7.99 7.6 9.77 6.4 12.3 6.4c3.27 0 5.12 1.95 5.12 5.34v6.08h-2.19v-1.12c-.78.84-1.88 1.3-3.04 1.3zm.78-3.56c1.37 0 2.45-.63 2.95-1.73v-2.05c-.65-.46-1.5-.71-2.44-.71-1.47 0-2.53.86-2.53 2.08 0 1.25 1.01 2.41 2.02 2.41z" />
    </svg>
  );
}

function KaggleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M18.825 23.859h-3.46l-5.632-8.212-2.222 2.052v6.16H4.352V.14h3.159v12.215l7.262-8.543h3.811l-7.07 8.012 7.311 12.035z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface BioLinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  color: string;
  isInternal?: boolean;
}

interface SectionGroup {
  title: string;
  subtitle: string;
  links: BioLinkItem[];
}

export default function LinksBioView() {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://awd.my.id/links');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sectionGroups: SectionGroup[] = [
    {
      title: 'Tautan Utama & Portofolio',
      subtitle: 'Portal web resmi, CV PDF, dan profil rekam jejak profesional',
      links: [
        {
          id: 'website',
          title: 'Website Portofolio Utama (awd.dev)',
          subtitle: 'Katalog Proyek, Arsitektur Systems, & Publikasi Riset',
          url: '/',
          icon: Globe,
          badge: 'Official',
          color: 'border-blue-500/40 text-blue-600 dark:text-blue-400 hover:border-blue-500',
          isInternal: true,
        },
        {
          id: 'linkedin',
          title: 'LinkedIn Professional Profile',
          subtitle: 'Pengalaman Kerja & Jaringan Profesional (@aguswahyu)',
          url: 'https://www.linkedin.com/in/aguswahyu/',
          icon: LinkedinIcon,
          badge: 'Career',
          color: 'border-sky-500/40 text-sky-500 hover:border-sky-500',
          isInternal: false,
        },
        {
          id: 'github',
          title: 'GitHub Repositories Showcase',
          subtitle: 'Source Code Open-Source & Project Repos (@putuwahyu29)',
          url: 'https://github.com/putuwahyu29',
          icon: GithubIcon,
          badge: 'Code',
          color: 'border-slate-500/40 text-slate-700 dark:text-slate-200 hover:border-slate-400',
          isInternal: false,
        },
        {
          id: 'cv',
          title: 'Unduh Curriculum Vitae (PDF)',
          subtitle: 'Naskah Resume Lengkap I Putu Agus Wahyu Dupayana',
          url: '/cv.pdf',
          icon: FileText,
          badge: 'Resume',
          color: 'border-amber-500/40 text-amber-600 dark:text-amber-400 hover:border-amber-500',
          isInternal: false,
        },
      ],
    },
    {
      title: 'Kanal Media Sosial Resmi',
      subtitle: 'Tutorial teknis, tips coding, screencast, & diskusi rekayasa web',
      links: [
        {
          id: 'instagram',
          title: 'Instagram (@aguswahyudupayana)',
          subtitle: 'Konten Edukasi Web Dev & Linux (10K+ Tech Audience)',
          url: 'https://instagram.com/aguswahyudupayana',
          icon: InstagramIcon,
          badge: '10K+',
          color: 'border-pink-500/40 text-pink-600 dark:text-pink-400 hover:border-pink-500',
        },
        {
          id: 'tiktok',
          title: 'TikTok (@aguswahyudupayana)',
          subtitle: 'Tips Coding & Screencast Tutorial Singkat (15K+ Views)',
          url: 'https://tiktok.com/@aguswahyudupayana',
          icon: TikTokIcon,
          badge: 'Shorts',
          color: 'border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:border-cyan-500',
        },
        {
          id: 'threads',
          title: 'Threads (@aguswahyudupayana)',
          subtitle: 'Opini & Diskusi Arsitektur Software Engineering',
          url: 'https://threads.net/@aguswahyudupayana',
          icon: ThreadsIcon,
          badge: 'Threads',
          color: 'border-purple-500/40 text-purple-600 dark:text-purple-400 hover:border-purple-500',
        },
        {
          id: 'youtube',
          title: 'YouTube Channel (@aguswahyudupayana)',
          subtitle: 'Screencast Tutorial Full-Stack & Homelab Cluster',
          url: 'https://youtube.com/@aguswahyudupayana',
          icon: YoutubeIcon,
          badge: 'Videos',
          color: 'border-red-500/40 text-red-600 dark:text-red-400 hover:border-red-500',
        },
        {
          id: 'facebook',
          title: 'Facebook Page (aguswahyudupayana)',
          subtitle: 'Diskusi Komunitas & Update Artikel Rekayasa Web',
          url: 'https://facebook.com/aguswahyudupayana',
          icon: FacebookIcon,
          badge: 'Page',
          color: 'border-blue-600/40 text-blue-600 dark:text-blue-400 hover:border-blue-600',
        },
      ],
    },
    {
      title: 'Artikel & Riset Penelitian',
      subtitle: 'Kumpulan jurnal ilmiah terpublikasi, Google Scholar, & blog teknis',
      links: [
        {
          id: 'scholar',
          title: 'Google Scholar Profile (I Putu Agus Wahyu Dupayana)',
          subtitle: 'Indeksasi Sitasi & Naskah Riset Ilmiah Resmi (BPS & STIS)',
          url: 'https://scholar.google.com/citations?user=NeiAOi8AAAAJ',
          icon: GraduationCap,
          badge: 'Scholar',
          color: 'border-blue-600/40 text-blue-600 dark:text-blue-400 hover:border-blue-600',
          isInternal: false,
        },
        {
          id: 'blog',
          title: 'Blog Catatan Teknis & Tutorial',
          subtitle: 'Artikel Homelab, Linux, & DevOps (blog.awd.my.id)',
          url: 'https://blog.awd.my.id',
          icon: BookOpen,
          badge: 'Blog',
          color: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500',
          isInternal: false,
        },
        {
          id: 'kaggle',
          title: 'Kaggle Data Science Profile',
          subtitle: 'Datasets, Competition Notebooks, & ML Models',
          url: 'https://kaggle.com/aguswahyudupayana',
          icon: KaggleIcon,
          badge: 'AI / ML',
          color: 'border-sky-500/40 text-sky-600 dark:text-sky-400 hover:border-sky-500',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-main text-main flex flex-col items-center justify-between p-4 sm:p-8 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Floating Header Utility Bar */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-xs font-mono font-bold text-sub hover:text-main flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-main shadow-2xs transition-all hover:scale-102"
        >
          <span>awd.dev</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="p-2.5 px-3.5 rounded-xl bg-card hover:bg-card-hover border border-main text-sub hover:text-main text-xs font-mono flex items-center gap-2 transition-all shadow-2xs"
            title="Bagikan Tautan Profil"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="hidden sm:inline font-medium">Bagikan Profil</span>
              </>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-card hover:bg-card-hover border border-main text-sub hover:text-main transition-colors shadow-2xs text-xs font-mono flex items-center justify-center"
            title="Ubah Tema (Gelap/Terang)"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-blue-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Responsive Links Body Container (max-w-2xl with flex flex-col gap-10) */}
      <main className="w-full max-w-2xl mx-auto my-auto py-6 flex flex-col gap-10">
        {/* Profile Card Header */}
        <div className="p-8 sm:p-10 rounded-2xl bg-card border border-main shadow-xl text-center space-y-5 relative">
          {/* Profile Avatar Image with Clean Solid Ring */}
          <div className="relative inline-block">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-card border-2 border-blue-600 dark:border-blue-400 shadow-2xl mx-auto overflow-hidden ring-4 ring-blue-500/10">
              <img
                src="/foto-profil.jpg"
                alt="I Putu Agus Wahyu Dupayana"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span
              className="absolute bottom-1 right-1 p-1.5 bg-blue-600 text-white rounded-full border-2 border-card shadow-md"
              title="Terverifikasi Resmi"
            >
              <CheckCircle2 className="w-4.5 h-4.5" />
            </span>
          </div>

          {/* Name & Headline Title */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight flex items-center justify-center gap-2">
              I Putu Agus Wahyu Dupayana
            </h1>
            <p className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 font-bold">
              Software Engineer & Content Creator
            </p>
          </div>




          {/* Bio Description Paragraph */}
          <p className="text-xs sm:text-sm text-sub leading-relaxed max-w-lg mx-auto font-normal">
            Pengembang perangkat lunak berfokus pada arsitektur sistem Next.js, Laravel, virtualisasi Proxmox VE, dan otomatisasi cloud GCP.
          </p>

          {/* Location & Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-main border border-main text-sub font-medium shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Surabaya, Indonesia
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Terbuka untuk Kolaborasi
            </span>
          </div>
        </div>

        {/* Links Categorized Sections Grid (Explicit flex flex-col gap-6 for spacious card separation) */}
        <div className="flex flex-col gap-10">
          {sectionGroups.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              {/* Section Header Title & Subtitle */}
              <div className="px-1 border-b border-main pb-3 mb-1">
                <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">
                  {section.title}
                </h2>
                <p className="text-xs text-sub mt-0.5 font-normal">
                  {section.subtitle}
                </p>
              </div>

              {/* Cards List with explicit flex flex-col gap-6 sm:gap-7 (Spacious 24px - 28px gaps between cards) */}
              <div className="flex flex-col gap-6 sm:gap-7">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  const linkContent = (
                    <div className={`p-5 sm:p-6 rounded-2xl bg-card hover:bg-card-hover border ${link.color} transition-all duration-200 shadow-2xs hover:shadow-xl flex items-center justify-between group cursor-pointer`}>
                      <div className="flex items-center gap-4.5 sm:gap-5 min-w-0">
                        <div className="p-3.5 rounded-2xl bg-main border border-main group-hover:scale-105 transition-transform shrink-0">
                          <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0 text-left space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {link.title}
                            </h3>
                            {link.badge && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-main text-sub font-bold border border-main shrink-0">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-sub leading-relaxed truncate font-normal">
                            {link.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="pl-3 shrink-0">
                        {link.isInternal ? (
                          <ArrowRight className="w-5 h-5 text-muted group-hover:text-main group-hover:translate-x-1.5 transition-all" />
                        ) : (
                          <ExternalLink className="w-5 h-5 text-muted group-hover:text-main group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </div>
                  );

                  return link.isInternal ? (
                    <Link key={link.id} href={link.url}>
                      {linkContent}
                    </Link>
                  ) : (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkContent}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-2xl mx-auto text-center py-6 border-t border-main text-xs font-mono text-muted space-y-1">
        <p>© {new Date().getFullYear()} awd.dev — I Putu Agus Wahyu Dupayana</p>
        <p className="text-[11px]">Surabaya, Indonesia • Software Engineer & Content Creator</p>
      </footer>
    </div>
  );
}
