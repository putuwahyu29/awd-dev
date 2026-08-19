'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Grid,
  X,
  FileText,
  Sun,
  Moon,
  ExternalLink,
  Award,
  BookOpen,
  Mail,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Folder,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Video,
  Share2,
  Tv,
  Globe,
} from 'lucide-react';

import { HeroData } from '@/lib/hero';
import { AboutData } from '@/lib/about';
import { ProjectData } from '@/lib/projects';
import { Certification } from '@/lib/certifications';
import { Publication } from '@/lib/publications';
import { SocialChannel } from '@/lib/socials';
import { ContactData } from '@/lib/contact';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface PresentationDeckProps {
  heroData: HeroData;
  aboutData: AboutData;
  projects: ProjectData[];
  certifications: Certification[];
  publications: Publication[];
  socialChannels: SocialChannel[];
  contactData: ContactData;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function PresentationDeck({
  heroData,
  aboutData,
  projects,
  certifications,
  publications,
  socialChannels,
  contactData,
}: PresentationDeckProps) {
  const mounted = useIsMounted();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  // Slide navigation state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayDuration, setAutoPlayDuration] = useState(8); // in seconds
  const [progress, setProgress] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Selected image index per project slide (keyed by project slug)
  const [projectImageIndex, setProjectImageIndex] = useState<Record<string, number>>({});

  // Touch gesture coordinates
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Featured projects for the deck (top 6 featured or recent)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 5);

  // Build slides metadata
  interface SlideMeta {
    id: string;
    type: 'intro' | 'about' | 'stack' | 'project' | 'certs' | 'research' | 'contact';
    titleId: string;
    titleEn: string;
    badgeText: string;
    projectData?: ProjectData;
  }

  const slides: SlideMeta[] = [
    {
      id: 'slide-intro',
      type: 'intro',
      titleId: 'Perkenalan & Profil Profesional',
      titleEn: 'Introduction & Professional Profile',
      badgeText: '01 • INTRO',
    },
    {
      id: 'slide-about',
      type: 'about',
      titleId: 'Tentang Saya & Filosofi Rekayasa',
      titleEn: 'About Me & Engineering Pillars',
      badgeText: '02 • ABOUT',
    },
    {
      id: 'slide-stack',
      type: 'stack',
      titleId: 'Keahlian & Ekosistem Teknologi',
      titleEn: 'Core Tech Stack & Ecosystem',
      badgeText: '03 • TECH STACK',
    },
    ...displayProjects.map((proj, idx) => ({
      id: `slide-proj-${proj.slug}`,
      type: 'project' as const,
      titleId: `Studi Kasus: ${proj.title}`,
      titleEn: `Case Study: ${proj.title}`,
      badgeText: `PROYEK ${idx + 1}/${displayProjects.length}`,
      projectData: proj,
    })),
    {
      id: 'slide-certs',
      type: 'certs',
      titleId: 'Sertifikasi & Kredensial Resmi',
      titleEn: 'Certifications & Official Credentials',
      badgeText: 'SERTIFIKASI',
    },
    {
      id: 'slide-research',
      type: 'research',
      titleId: 'Publikasi Riset & Edukasi Komunitas',
      titleEn: 'Research Publications & Community Hub',
      badgeText: 'RISET & KONTEN',
    },
    {
      id: 'slide-contact',
      type: 'contact',
      titleId: 'Mari Berkolaborasi & Terhubung',
      titleEn: "Let's Connect & Collaborate",
      badgeText: 'PENUTUP & KONTAK',
    },
  ];

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    setProgress(0);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    setProgress(0);
  }, [totalSlides]);

  // Handle Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsAutoPlay((prev) => !prev);
      } else if (e.key.toLowerCase() === 'g' || e.key === 'Tab') {
        e.preventDefault();
        setIsGridOpen((prev) => !prev);
      } else if (e.key === '?' || e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isGridOpen) {
          e.preventDefault();
          setIsGridOpen(false);
        } else if (isHelpOpen) {
          e.preventDefault();
          setIsHelpOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, toggleFullscreen, totalSlides, isGridOpen, isHelpOpen]);

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlay || isGridOpen || isHelpOpen) {
      setProgress(0);
      return;
    }

    const intervalMs = 100;
    const totalSteps = (autoPlayDuration * 1000) / intervalMs;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount += 1;
      const currentPct = (stepCount / totalSteps) * 100;
      setProgress(Math.min(100, currentPct));

      if (stepCount >= totalSteps) {
        stepCount = 0;
        nextSlide();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, autoPlayDuration, isGridOpen, isHelpOpen, nextSlide]);

  // Touch gesture listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const activeSlideMeta = slides[currentSlide];

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-main text-main flex flex-col select-none overflow-hidden font-sans"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Deck Progress Line */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 shrink-0 relative z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
        {isAutoPlay && (
          <div
            className="absolute top-0 left-0 h-full bg-amber-400 opacity-90 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>

      {/* Top Deck Floating Control Bar */}
      <header className="shrink-0 h-16 border-b border-main bg-card/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-40">
        {/* Left: Brand & Exit to Portfolio */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm sm:text-base font-extrabold text-main hover:text-blue-600 transition-colors"
            title={t('Kembali ke Beranda Portfolio', 'Back to Portfolio Home')}
          >
            <span>awd<span className="text-blue-600 font-extrabold">.dev</span></span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              DECK
            </span>
          </Link>

          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">/</span>

          {/* Current Slide Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-sub">
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">
              [{String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}]
            </span>
            <span className="truncate max-w-[200px] md:max-w-xs text-main">
              {lang === 'id' ? activeSlideMeta.titleId : activeSlideMeta.titleEn}
            </span>
          </div>
        </div>

        {/* Right: Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
              isAutoPlay
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 shadow-2xs'
                : 'bg-card border-main text-sub hover:text-main hover:bg-card-hover'
            }`}
            title={isAutoPlay ? t('Jeda Slideshow (P)', 'Pause Slideshow (P)') : t('Mulai Slideshow Otomatis (P)', 'Start Auto-Play Slideshow (P)')}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isAutoPlay ? `${autoPlayDuration}s` : t('Auto-Play', 'Auto-Play')}</span>
          </button>

          {/* Grid Overview Button */}
          <button
            onClick={() => setIsGridOpen(true)}
            className="p-2 rounded-lg bg-card border border-main text-sub hover:text-main hover:bg-card-hover transition-colors"
            title={t('Tinjau Semua Slide (G)', 'Slide Overview Grid (G)')}
            aria-label="Slide Overview"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-card border border-main text-sub hover:text-main hover:bg-card-hover transition-colors"
            title={isFullscreen ? t('Keluar Layar Penuh (F)', 'Exit Fullscreen (F)') : t('Layar Penuh (F)', 'Fullscreen Mode (F)')}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-blue-500" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-extrabold bg-card border border-main text-main hover:text-blue-600 transition-colors"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            {lang.toUpperCase()}
          </button>

          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-card border border-main text-main hover:text-blue-600 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
          )}

          {/* Keyboard Help Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="hidden sm:flex p-2 rounded-lg bg-card border border-main text-sub hover:text-main hover:bg-card-hover transition-colors"
            title={t('Bantuan Pintasan Keyboard (?)', 'Keyboard Shortcuts Help (?)')}
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Exit / Close Presentation */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs ml-1"
            title={t('Tutup Presentasi & Kembali ke Web', 'Exit Presentation Deck')}
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('Keluar', 'Exit')}</span>
          </Link>
        </div>
      </header>

      {/* Main Slide Canvas */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
          {/* SLIDE 0: INTRO / TITLE */}
          {activeSlideMeta.type === 'intro' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-14 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              
              {/* Profile Avatar with Status */}
              <div className="relative shrink-0 flex flex-col items-center">
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-blue-600 shadow-2xl">
                  <Image
                    src={heroData.profileImage || '/foto-profil.jpg'}
                    alt={heroData.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 160px, 224px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t('Siap untuk Kolaborasi & Rekrutmen', 'Available for Hire & Projects')}</span>
                </div>
              </div>

              {/* Title & Value Proposition */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('Portofolio & Deck Presentasi', 'Portfolio & Presentation Deck')}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-main tracking-tight leading-tight">
                  {heroData.name}
                </h1>

                <p className="text-base sm:text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {lang === 'id' ? heroData.role : heroData.roleEn}
                </p>

                <p className="text-xs sm:text-sm md:text-base text-sub leading-relaxed max-w-2xl font-normal">
                  {lang === 'id' ? heroData.bioId : heroData.bioEn}
                </p>

                {/* Highlights Stats Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {heroData.highlights.map((h, i) => (
                    <div key={i} className="bg-main border border-main p-3 rounded-2xl text-center">
                      <div className="text-lg sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                        {h.number}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-sub mt-0.5 truncate">
                        {lang === 'id' ? h.labelId : h.labelEn}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action CTA & Keyboard Prompt */}
                <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={nextSlide}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5"
                  >
                    <span>{t('Mulai Presentasi', 'Start Presentation')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="/cv.pdf"
                    download="CV_I_Putu_Agus_Wahyu_Dupayana.pdf"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-main bg-card border border-main hover:bg-card-hover transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{t('Unduh CV Lengkap', 'Download Full CV')}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: ABOUT & PILLARS */}
          {activeSlideMeta.type === 'about' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{activeSlideMeta.badgeText}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-main">
                  {lang === 'id' ? aboutData.subtitleId : aboutData.subtitleEn}
                </h2>
                <p className="text-xs sm:text-sm text-sub mt-2 leading-relaxed">
                  {lang === 'id' ? aboutData.bioId : aboutData.bioEn}
                </p>
              </div>

              {/* Engineering Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutData.pillars && aboutData.pillars.length > 0 ? (
                  aboutData.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-main border border-main space-y-2 hover:border-blue-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-main">
                          {lang === 'id' ? pillar.titleId : pillar.titleEn}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-sub leading-relaxed font-normal">
                        {lang === 'id' ? pillar.descId : pillar.descEn}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-5 rounded-2xl bg-main border border-main space-y-2">
                      <h3 className="text-base font-bold text-main">Arsitektur Web Kinerja Tinggi</h3>
                      <p className="text-xs text-sub">Pengembangan aplikasi modern berskala besar menggunakan Next.js & Laravel.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-main border border-main space-y-2">
                      <h3 className="text-base font-bold text-main">Virtualisasi & Server On-Premise</h3>
                      <p className="text-xs text-sub">Orkestrasi server mandiri dengan Proxmox VE, Docker containers, dan reverse proxy.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted border-t border-main">
                <span>{t('Gunakan tombol panah [←] [→] untuk navigasi', 'Use arrow keys [←] [→] to navigate')}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{t('Pilar Rekayasa Sistem', 'System Engineering Pillars')}</span>
              </div>
            </div>
          )}

          {/* SLIDE 2: TECH STACK MATRIX */}
          {activeSlideMeta.type === 'stack' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  <span>{activeSlideMeta.badgeText}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-main">
                  {t('Ekosistem & Keahlian Teknologi', 'Core Technology & Ecosystem Matrix')}
                </h2>
                <p className="text-xs sm:text-sm text-sub mt-1">
                  {t('Teknologi teruji yang rutin digunakan dalam rekayasa sistem enterprise, web app berkinerja tinggi, dan infrastruktur server.', 'Battle-tested technologies utilized across enterprise web systems, high-performance apps, and server infrastructure.')}
                </p>
              </div>

              {/* Categorized Tech Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Frontend & Frameworks */}
                <div className="p-4 rounded-2xl bg-main border border-main space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-600 dark:text-blue-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Frontend & Web</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Blade Engine', 'Responsive UI'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-card border border-main text-main">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend & Systems */}
                <div className="p-4 rounded-2xl bg-main border border-main space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Backend & APIs</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Laravel 12', 'Filament PHP', 'Node.js', 'REST APIs', 'Authentication', 'Microservices'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-card border border-main text-main">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cloud, DevOps & Virtualization */}
                <div className="p-4 rounded-2xl bg-main border border-main space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Server & Cloud</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Proxmox VE', 'Docker', 'Google Cloud (GCP)', 'Linux / Ubuntu', 'Nginx', 'CI/CD Automation'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-card border border-main text-main">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases & AI Systems */}
                <div className="p-4 rounded-2xl bg-main border border-main space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-purple-600 dark:text-purple-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Data & AI</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['PostgreSQL', 'MySQL', 'LLMs Integration', 'AI Agentic Workflows', 'Redis', 'BigQuery'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-card border border-main text-main">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted border-t border-main">
                <span>{t('Keahlian terintegrasi end-to-end dari frontend, backend, hingga server.', 'End-to-end expertise spanning frontend, backend, and bare-metal server infrastructure.')}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">10+ Core Technologies</span>
              </div>
            </div>
          )}

          {/* SLIDE 3..N: FEATURED PROJECT SPOTLIGHT */}
          {activeSlideMeta.type === 'project' && activeSlideMeta.projectData && (
            (() => {
              const proj = activeSlideMeta.projectData;
              const images = proj.images && proj.images.length > 0 ? proj.images : proj.image_preview ? [proj.image_preview] : [];
              const currentImgIdx = projectImageIndex[proj.slug] || 0;
              const activeImage = images[currentImgIdx] || images[0] || '/images/default-project.png';

              return (
                <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between space-y-6">
                  {/* Top Project Badge & Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-main pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-blue-600 text-white shadow-xs">
                        {activeSlideMeta.badgeText}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-main border border-main text-sub">
                        {proj.category || (proj.categories && proj.categories[0]) || 'Project'}
                      </span>
                      {proj.date && (
                        <span className="text-xs font-mono text-muted">
                          {proj.date}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{t('Buka Studi Kasus Lengkap', 'Read Full Case Study')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Two-column Presentation Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Left 7 cols: Image Preview & Gallery Navigator */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-main bg-main shadow-md">
                        <Image
                          src={activeImage}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-top"
                        />
                      </div>

                      {/* Image Thumbnail Selector if multiple images exist */}
                      {images.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setProjectImageIndex((prev) => ({ ...prev, [proj.slug]: idx }))}
                              className={`relative w-16 h-10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                                idx === currentImgIdx
                                  ? 'border-blue-600 ring-2 ring-blue-500/40 shadow-xs'
                                  : 'border-main opacity-60 hover:opacity-100'
                              }`}
                            >
                              <Image src={img} alt={`${proj.title} ${idx + 1}`} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right 5 cols: Details & Tech Stack */}
                    <div className="lg:col-span-5 space-y-4">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-main tracking-tight">
                        {proj.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-sub leading-relaxed line-clamp-4">
                        {proj.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-mono font-bold text-muted uppercase">
                          {t('Teknologi yang Digunakan:', 'Tech Stack Used:')}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tech_stack.map((tItem) => (
                            <span
                              key={tItem}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-main border border-main text-main"
                            >
                              {tItem}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links Action Buttons */}
                      <div className="pt-3 flex flex-wrap items-center gap-2.5">
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                          >
                            <span>{t('Kunjungi Live Demo / Repositori', 'Visit Live Demo / Repo')}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-main bg-card border border-main hover:bg-card-hover transition-colors"
                        >
                          <span>{t('Detail Spesifikasi', 'Specifications')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted border-t border-main">
                    <span>{t('Studi Kasus Portofolio Terpilih', 'Selected Portfolio Case Study')}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {proj.category || 'Engineering Showcase'}
                    </span>
                  </div>
                </div>
              );
            })()
          )}

          {/* SLIDE N: CERTIFICATIONS */}
          {activeSlideMeta.type === 'certs' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>{activeSlideMeta.badgeText}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-main">
                  {t('Sertifikasi & Kredensial Resmi', 'Official Certifications & Credentials')}
                </h2>
                <p className="text-xs sm:text-sm text-sub mt-1">
                  {t('Pengakuan kompetensi resmi dari institusi teknologi global dan nasional.', 'Verified competency recognition from global and national technology institutions.')}
                </p>
              </div>

              {/* Certifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.slice(0, 6).map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl bg-main border border-main flex flex-col justify-between hover:border-blue-500/40 transition-all space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t('Terverifikasi', 'Verified')}</span>
                        </span>
                        <span className="text-[11px] font-mono text-muted">{cert.issueDate}</span>
                      </div>
                      <h3 className="text-sm font-bold text-main line-clamp-2">{cert.title}</h3>
                      <p className="text-xs text-sub font-mono font-semibold mt-1">{cert.issuer}</p>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2 border-t border-main"
                      >
                        <span>{t('Periksa Kredensial', 'Verify Credential')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted border-t border-main">
                <span>{t('Total sertifikasi terverifikasi:', 'Total verified certifications:')} {certifications.length}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{t('Standar Industri', 'Industry Standard')}</span>
              </div>
            </div>
          )}

          {/* SLIDE N+1: RESEARCH & COMMUNITY */}
          {activeSlideMeta.type === 'research' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{activeSlideMeta.badgeText}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-main">
                  {t('Publikasi Ilmiah & Edukasi Komunitas', 'Research Publications & Community Hub')}
                </h2>
                <p className="text-xs sm:text-sm text-sub mt-1">
                  {t('Kontribusi pada literatur ilmiah teknologi serta edukasi programming di media sosial.', 'Contributions to academic tech literature and public programming education.')}
                </p>
              </div>

              {/* Two Column: Publications + Social Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Scientific Papers */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{t('Karya Ilmiah & Jurnal', 'Research Papers & Journals')}</span>
                  </div>
                  <div className="space-y-2.5">
                    {publications.slice(0, 3).map((pub) => (
                      <div key={pub.id} className="p-3.5 rounded-xl bg-main border border-main space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                          <span>{pub.journal}</span>
                          <span className="font-bold text-blue-500">{pub.year}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-main line-clamp-2">{pub.title}</h4>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>{t('Baca Paper / DOI', 'Read Paper / DOI')}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Content Creator Channels */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-pink-600 dark:text-pink-400">
                    <Video className="w-4 h-4" />
                    <span>{t('Edukasi Publik & Media Sosial', 'Public Education & Channels')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {socialChannels.map((ch) => (
                      <a
                        key={ch.id}
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-main border border-main hover:border-blue-500/40 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-main truncate">{ch.name}</div>
                          <div className="text-[11px] font-mono text-sub truncate">{ch.handle}</div>
                          {ch.followers && (
                            <div className="text-[10px] font-mono text-blue-500 font-bold mt-0.5">
                              {ch.followers}
                            </div>
                          )}
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted border-t border-main">
                <span>{t('Komitmen pada edukasi dan riset teknologi berkelanjutan', 'Committed to open technology sharing and active research')}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">awd.dev</span>
              </div>
            </div>
          )}

          {/* SLIDE LAST: CONTACT & CTA */}
          {activeSlideMeta.type === 'contact' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 bg-card border border-main rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-extrabold bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                  {t('MARI BERKOLABORASI', "LET'S WORK TOGETHER")}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-main tracking-tight pt-2">
                  {t('Siap Membangun Solusi Hebat Bersama?', 'Ready to Build Great Solutions Together?')}
                </h2>
                <p className="text-xs sm:text-sm text-sub leading-relaxed font-normal">
                  {lang === 'id' ? contactData.availabilityId : contactData.availabilityEn}
                </p>
              </div>

              {/* Direct Contact Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
                {/* Email Box with 1-click copy */}
                <div
                  onClick={copyEmailToClipboard}
                  className="p-4 rounded-2xl bg-main border border-main hover:border-blue-500/40 cursor-pointer transition-colors text-left space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                  </div>
                  <div className="text-xs font-bold text-main truncate font-mono">{contactData.email}</div>
                  <div className="text-[10px] text-muted">{copiedEmail ? t('Tersalin!', 'Copied!') : t('Klik untuk salin', 'Click to copy')}</div>
                </div>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-main border border-main hover:border-blue-500/40 transition-colors text-left space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted" />
                  </div>
                  <div className="text-xs font-bold text-main">Direct Message</div>
                  <div className="text-[10px] text-muted">{t('Respon Cepat', 'Quick Response')}</div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/iputuaguswahyudupayana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-main border border-main hover:border-blue-500/40 transition-colors text-left space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted" />
                  </div>
                  <div className="text-xs font-bold text-main">Professional Profile</div>
                  <div className="text-[10px] text-muted">Connect & Network</div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/putuwahyu29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-main border border-main hover:border-blue-500/40 transition-colors text-left space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted" />
                  </div>
                  <div className="text-xs font-bold text-main">@putuwahyu29</div>
                  <div className="text-[10px] text-muted">500+ Contributions</div>
                </a>
              </div>

              {/* Big Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/cv.pdf"
                  download="CV_I_Putu_Agus_Wahyu_Dupayana.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('Unduh CV Resmi (PDF)', 'Download Official CV (PDF)')}</span>
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-main bg-card border border-main hover:bg-card-hover transition-colors"
                >
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{t('Jelajahi Website Portfolio Lengkap', 'Explore Full Portfolio Website')}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Navigation Toolbar */}
      <footer className="shrink-0 h-16 border-t border-main bg-card/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-40">
        {/* Left: Previous Button */}
        <button
          onClick={prevSlide}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-main bg-card border border-main hover:bg-card-hover transition-colors shadow-2xs"
          title={t('Slide Sebelumnya (Panah Kiri)', 'Previous Slide (Left Arrow)')}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('Sebelumnya', 'Previous')}</span>
        </button>

        {/* Center: Slide Jump Dots / Pill Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 max-w-[50vw] overflow-x-auto scrollbar-none py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`transition-all rounded-full ${
                idx === currentSlide
                  ? 'w-7 sm:w-8 h-2.5 bg-blue-600 shadow-2xs'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-blue-400'
              }`}
              title={`${idx + 1}. ${lang === 'id' ? s.titleId : s.titleEn}`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Next Button */}
        <button
          onClick={nextSlide}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
          title={t('Slide Berikutnya (Spasi / Panah Kanan)', 'Next Slide (Space / Right Arrow)')}
        >
          <span className="hidden sm:inline">{t('Selanjutnya', 'Next')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Slide Overview Grid Modal (G key) */}
      {isGridOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-base sm:text-lg">
              <Grid className="w-5 h-5 text-blue-400" />
              <span>{t('Daftar Slide Presentasi', 'Slide Deck Overview')} ({totalSlides} Slides)</span>
            </div>
            <button
              onClick={() => setIsGridOpen(false)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {slides.map((s, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    goToSlide(idx);
                    setIsGridOpen(false);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between h-36 ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-300 shadow-xl'
                      : 'bg-card text-main border-main hover:border-blue-500 hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold opacity-80">
                    <span>SLIDE {String(idx + 1).padStart(2, '0')}</span>
                    <span>{s.badgeText}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold line-clamp-2">
                    {lang === 'id' ? s.titleId : s.titleEn}
                  </h4>
                  <div className="text-[10px] font-mono opacity-70">
                    {s.type.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal (? key) */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-main rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-main pb-3">
              <h3 className="text-base font-bold text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t('Pintasan Keyboard', 'Keyboard Shortcuts')}</span>
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="p-1 rounded-lg text-sub hover:text-main hover:bg-card-hover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              {[
                { keys: ['→', 'Space', 'Enter'], desc: t('Slide Berikutnya', 'Next Slide') },
                { keys: ['←', 'Backspace'], desc: t('Slide Sebelumnya', 'Previous Slide') },
                { keys: ['F'], desc: t('Layar Penuh (Fullscreen)', 'Toggle Fullscreen') },
                { keys: ['P'], desc: t('Mulai / Jeda Slideshow Otomatis', 'Toggle Auto-Play') },
                { keys: ['G', 'Tab'], desc: t('Tinjau Semua Slide (Grid)', 'Slide Overview Grid') },
                { keys: ['Home', 'End'], desc: t('Slide Pertama / Terakhir', 'First / Last Slide') },
                { keys: ['Esc'], desc: t('Tutup Modal / Keluar', 'Close Modal / Exit') },
              ].map((sc, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-main/50">
                  <div className="flex items-center gap-1">
                    {sc.keys.map((k) => (
                      <kbd key={k} className="px-2 py-0.5 rounded bg-main border border-main font-bold shadow-2xs">
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-sub font-sans font-medium">{sc.desc}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="w-full py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {t('Tutup', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
