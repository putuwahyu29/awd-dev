'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  FileText,
  BookOpen,
  Share2,
  Check,
  ArrowRight,
  ExternalLink,
  Sun,
  Moon,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { SocialChannel } from '@/lib/socials';

// Official SVG Brand Logomarks
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.32 1.54-1.33 2.54-.05 1.05.41 2.12 1.21 2.77.9.72 2.17.9 3.24.47 1.14-.42 1.94-1.55 1.98-2.77.03-4.99.01-9.98.01-14.97z" />
    </svg>
  );
}

function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
    </svg>
  );
}

function KaggleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M18.825 23.859h-3.46l-5.632-8.212-2.222 2.052v6.16H4.352V.14h3.159v12.215l7.262-8.543h3.811l-7.07 8.012 7.311 12.035z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface BioLinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isInternal?: boolean;
  colorStyle?: string;
  iconBadgeStyle?: string;
}

interface LinksBioViewProps {
  socials?: SocialChannel[];
}

export default function LinksBioView({ socials }: LinksBioViewProps) {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://awd.my.id/links');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (iconKey: string) => {
    switch (iconKey.toLowerCase()) {
      case 'tiktok':
        return TikTokIcon;
      case 'instagram':
        return InstagramIcon;
      case 'threads':
        return ThreadsIcon;
      case 'kaggle':
        return KaggleIcon;
      case 'youtube':
        return YoutubeIcon;
      case 'facebook':
        return FacebookIcon;
      default:
        return Globe;
    }
  };

  const getSocialBrandStyle = (id: string) => {
    switch (id.toLowerCase()) {
      case 'tiktok':
        return 'bg-slate-950 text-white border border-slate-800 hover:border-cyan-400 shadow-md shadow-cyan-500/10 hover:scale-110';
      case 'instagram':
        return 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20 hover:scale-110';
      case 'threads':
        return 'bg-slate-950 text-white border border-slate-800 hover:border-purple-500 shadow-md shadow-purple-500/10 hover:scale-110';
      case 'kaggle':
        return 'bg-sky-500/15 text-sky-500 border border-sky-500/30 hover:bg-sky-500 hover:text-white shadow-md shadow-sky-500/10 hover:scale-110';
      case 'youtube':
        return 'bg-red-500/15 text-red-600 dark:text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white shadow-md shadow-red-500/20 hover:scale-110';
      case 'facebook':
        return 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-600/30 hover:bg-blue-600 hover:text-white shadow-md shadow-blue-500/20 hover:scale-110';
      default:
        return 'bg-card text-main border border-main hover:border-blue-500 hover:scale-110';
    }
  };

  const mainLinks: BioLinkItem[] = [
    {
      id: 'website',
      title: 'Website Portofolio Utama (awd.dev)',
      subtitle: 'Katalog Proyek, Arsitektur Systems, & Publikasi Riset',
      url: '/',
      icon: Globe,
      isInternal: true,
      iconBadgeStyle: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Professional Profile',
      subtitle: 'Pengalaman Kerja & Jaringan Profesional',
      url: 'https://www.linkedin.com/in/aguswahyu/',
      icon: LinkedinIcon,
      iconBadgeStyle: 'bg-sky-600/15 text-sky-600 dark:text-sky-400 border-sky-600/30',
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      subtitle: 'Source Code Open-Source & Project Repos',
      url: 'https://github.com/putuwahyu29',
      icon: GithubIcon,
      iconBadgeStyle: 'bg-slate-800 text-white border-slate-700',
    },
    {
      id: 'cv',
      title: 'Unduh Curriculum Vitae (PDF)',
      subtitle: 'Naskah Resume Lengkap I Putu Agus Wahyu Dupayana',
      url: '/cv.pdf',
      icon: FileText,
      iconBadgeStyle: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    },
  ];

  const socialLinks: BioLinkItem[] = socials && socials.length > 0
    ? socials.map((s) => ({
        id: s.id,
        title: s.name,
        subtitle: s.handle,
        url: s.url,
        icon: getIcon(s.iconKey),
        colorStyle: getSocialBrandStyle(s.id),
      }))
    : [
        { id: 'tiktok', title: 'TikTok', subtitle: '@aguswahyudupayana', url: 'https://tiktok.com/@aguswahyudupayana', icon: TikTokIcon, colorStyle: getSocialBrandStyle('tiktok') },
        { id: 'instagram', title: 'Instagram', subtitle: '@aguswahyudupayana', url: 'https://instagram.com/aguswahyudupayana', icon: InstagramIcon, colorStyle: getSocialBrandStyle('instagram') },
        { id: 'threads', title: 'Threads', subtitle: '@aguswahyudupayana', url: 'https://threads.net/@aguswahyudupayana', icon: ThreadsIcon, colorStyle: getSocialBrandStyle('threads') },
        { id: 'youtube', title: 'YouTube', subtitle: '@aguswahyudupayana', url: 'https://youtube.com/@aguswahyudupayana', icon: YoutubeIcon, colorStyle: getSocialBrandStyle('youtube') },
        { id: 'facebook', title: 'Facebook', subtitle: 'aguswahyudupayana', url: 'https://facebook.com/aguswahyudupayana', icon: FacebookIcon, colorStyle: getSocialBrandStyle('facebook') },
      ];

  // Top circular icons exclude Kaggle (since Kaggle is rendered as full button card in research stack below)
  const topSocialLinks = socialLinks.filter((s) => s.id !== 'kaggle');

  const kaggleSocial = socials?.find((s) => s.id === 'kaggle');
  const kaggleUrl = kaggleSocial?.url || 'https://kaggle.com/iputuaguswahyud';
  const kaggleHandle = kaggleSocial?.handle || '@iputuaguswahyud';

  const researchLinks: BioLinkItem[] = [
    {
      id: 'kaggle',
      title: 'Kaggle Data & Machine Learning',
      subtitle: `${kaggleHandle} • Datasets, Notebooks, & Model ML`,
      url: kaggleUrl,
      icon: KaggleIcon,
      iconBadgeStyle: 'bg-sky-500/15 text-sky-500 border-sky-500/30',
    },
    {
      id: 'scholar',
      title: 'Google Scholar Profile',
      subtitle: 'Sitasi & Naskah Riset Ilmiah Resmi',
      url: 'https://scholar.google.com/citations?user=NeiAOi8AAAAJ',
      icon: GraduationCap,
      iconBadgeStyle: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    },
    {
      id: 'blog',
      title: 'Blog Catatan Teknis',
      subtitle: 'Artikel Homelab, Linux, & DevOps',
      url: 'https://blog.awd.my.id',
      icon: BookOpen,
      iconBadgeStyle: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-main text-main flex flex-col items-center justify-between p-4 sm:p-6 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation Utility */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between py-2">
        <Link
          href="/"
          className="text-xs font-mono font-bold text-sub hover:text-main px-3 py-1.5 rounded-lg bg-card border border-main shadow-2xs transition-colors"
        >
          awd.dev
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-card hover:bg-card-hover border border-main text-sub hover:text-main text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Bagikan Tautan Profil"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-card hover:bg-card-hover border border-main text-sub hover:text-main transition-colors text-xs font-mono flex items-center justify-center"
            title="Ubah Tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>
      </header>

      {/* Center Linktree-Style Bio Card */}
      <main className="w-full max-w-md mx-auto my-auto py-6 space-y-6">
        {/* Minimal Profile Header */}
        <div className="text-center space-y-3">
          <div className="w-24 h-24 rounded-full p-1 bg-card border-2 border-blue-600 dark:border-blue-400 shadow-lg mx-auto overflow-hidden">
            <img
              src="/foto-profil.jpg"
              alt="I Putu Agus Wahyu Dupayana"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-main tracking-tight">
              I Putu Agus Wahyu Dupayana
            </h1>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
              Software Engineer & Content Creator
            </p>
          </div>

          {/* Authentic Colorful Brand Icons Row (TikTok, Instagram, Threads, YouTube, Facebook) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {topSocialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${link.title} (${link.subtitle})`}
                  aria-label={link.title}
                  className={`p-3.5 rounded-full transition-all duration-200 flex items-center justify-center active:scale-95 ${link.colorStyle}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Vertical Stack of Linktree Buttons */}
        <div className="space-y-3">
          {/* Main Portfolio Links */}
          <div className="space-y-2.5">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const content = (
                <div className="w-full p-3.5 sm:p-4 rounded-xl bg-card hover:bg-card-hover border border-main hover:border-blue-500/50 transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2 rounded-lg border shrink-0 ${link.iconBadgeStyle || 'bg-main text-blue-600 dark:text-blue-400 border-main'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h2 className="text-sm font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {link.title}
                      </h2>
                      {link.subtitle && (
                        <p className="text-xs text-sub truncate font-normal">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  {link.isInternal ? (
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-main group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-muted group-hover:text-main group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  )}
                </div>
              );

              return link.isInternal ? (
                <Link key={link.id} href={link.url} className="block">
                  {content}
                </Link>
              ) : (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              );
            })}
          </div>

          {/* Research & Data Buttons (including Kaggle Card) */}
          <div className="space-y-2.5">
            {researchLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 sm:p-4 rounded-xl bg-card hover:bg-card-hover border border-main hover:border-blue-500/50 transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-between group block cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2 rounded-lg border shrink-0 ${link.iconBadgeStyle || 'bg-main text-blue-600 dark:text-blue-400 border-main'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h2 className="text-sm font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {link.title}
                      </h2>
                      {link.subtitle && (
                        <p className="text-xs text-sub truncate font-normal">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-main group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </a>
              );
            })}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-md mx-auto text-center py-4 border-t border-main text-xs font-mono text-muted">
        <p>awd.dev • Software Engineer & Content Creator</p>
      </footer>
    </div>
  );
}
