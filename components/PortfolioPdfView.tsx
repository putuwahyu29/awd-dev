'use client';

import React, { useState, useEffect, useSyncExternalStore, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Printer,
  Sun,
  Moon,
  Loader2,
  Check,
  ZoomIn,
  ZoomOut,
  Share2,
  Briefcase,
  GitBranch,
  BookOpen,
  Award,
  Mail,
  ExternalLink,
  Code2,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { PortfolioExportData, exportPortfolioToPdf } from '@/lib/export-portfolio-pdf';

interface PortfolioPdfViewProps {
  data: PortfolioExportData;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function PortfolioPdfView({ data }: PortfolioPdfViewProps) {
  const mounted = useIsMounted();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Document Curation / Filter States (Defaults to Curated Featured Projects)
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [includeGithub, setIncludeGithub] = useState<boolean>(true);
  const [includePublications, setIncludePublications] = useState<boolean>(true);
  const [includeCertifications, setIncludeCertifications] = useState<boolean>(true);
  const [includeExpertise, setIncludeExpertise] = useState<boolean>(true);
  const [showFilterBar, setShowFilterBar] = useState<boolean>(false);

  const { hero, about, projects: rawProjects, githubRepos, publications, certifications, contact } = data;
  const isEn = lang === 'en';

  const fullName = hero?.name || 'I Putu Agus Wahyu Dupayana';
  const role = isEn && hero?.roleEn ? hero.roleEn : hero?.role || 'Software Engineer & Content Creator';
  const bio = isEn && hero?.bioEn ? hero.bioEn : hero?.bioId || '';

  // Extract all categories
  const categories = useMemo(() => {
    const list = rawProjects?.flatMap((p) => p.categories || [p.category]) || [];
    return ['Semua', ...Array.from(new Set(list)).filter(Boolean).sort()];
  }, [rawProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let list = rawProjects || [];
    if (onlyFeatured) {
      list = list.filter((p) => p.featured);
    }
    if (selectedCategory !== 'Semua') {
      list = list.filter((p) => {
        const cats = p.categories || [p.category];
        return cats.includes(selectedCategory);
      });
    }
    return list;
  }, [rawProjects, onlyFeatured, selectedCategory]);

  const featuredCount = useMemo(() => {
    return (rawProjects || []).filter((p) => p.featured).length;
  }, [rawProjects]);

  const fileName = `Portofolio_${fullName.replace(/\s+/g, '_')}_${onlyFeatured ? 'Featured_' : ''}${lang.toUpperCase()}.pdf`;

  // Keyboard Shortcuts for Zooming, Printing, and Exporting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleBrowserPrint();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, isExporting, fileName, lang, onlyFeatured, selectedCategory, includeGithub, includePublications, includeCertifications, includeExpertise]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleBrowserPrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      await exportPortfolioToPdf(data, {
        customFileName: fileName,
        lang,
        onlyFeatured,
        selectedCategory,
        includeGithub,
        includePublications,
        includeCertifications,
        includeExpertise,
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export Portfolio PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const highlights = hero?.highlights || [
    { number: '26+', labelId: 'Proyek', labelEn: 'Projects' },
    { number: '5+ Tahun', labelId: 'Pengalaman', labelEn: 'Experience' },
    { number: '500+', labelId: 'Kontribusi GitHub', labelEn: 'GitHub Contributions' },
  ];

  return (
    <div className="portfolio-print-root relative min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Ambient background lighting */}
      <div
        className="no-print pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59, 130, 246, 0.25), transparent 70%),
                            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99, 102, 241, 0.15), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Header Navigation */}
      <header className="no-print sticky top-0 z-30 bg-card/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-main shadow-xs">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
          {/* Left: Back Arrow & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              title={t('Kembali ke Beranda', 'Back to Home')}
              aria-label={t('Kembali ke Beranda', 'Back to Home')}
              className="p-1.5 sm:p-2 rounded-lg border border-main bg-card hover:bg-card-hover text-sub hover:text-main transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-tight text-main shrink-0">
                AWD
              </span>
              <span className="text-slate-400 dark:text-slate-600 font-mono text-xs select-none shrink-0">
                ·
              </span>
              <span className="text-xs sm:text-sm font-semibold text-sub truncate">
                {t('Portofolio', 'Portfolio')}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilterBar(!showFilterBar)}
              title={t('Kustomisasi & Filter Proyek', 'Customize & Filter Projects')}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                showFilterBar || onlyFeatured || selectedCategory !== 'Semua'
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                  : 'bg-card text-sub border-main hover:bg-card-hover hover:text-main'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('Filter Proyek', 'Filter Projects')}</span>
              {(onlyFeatured || selectedCategory !== 'Semua') && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>

            {/* Zoom Controls (Desktop & Tablet) */}
            <div className="hidden md:flex items-center rounded-lg border border-main bg-card p-0.5 text-xs font-medium text-main shadow-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.65}
                title={t('Perkecil (-)', 'Zoom Out (-)')}
                className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title={t('Reset Ukuran 100% (0)', 'Reset Zoom 100% (0)')}
                className="px-2 py-1 font-mono text-[11px] font-semibold text-main hover:bg-card-hover rounded-md transition-colors cursor-pointer"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 1.6}
                title={t('Perbesar (+)', 'Zoom In (+)')}
                className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share Link Button */}
            <button
              onClick={handleShareLink}
              title={t('Salin tautan ke clipboard', 'Copy link to clipboard')}
              className="p-1.5 sm:p-2 rounded-lg bg-card text-main border border-main hover:bg-card-hover active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Share link"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-emerald-500 animate-scale-up" />
              ) : (
                <Share2 className="w-4 h-4 text-sub" />
              )}
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-1.5 sm:p-2 rounded-lg bg-card text-main border border-main hover:bg-card-hover active:scale-95 transition-all cursor-pointer shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-500" />
                )}
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="notranslate px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-card text-main border border-main text-xs font-mono font-bold hover:bg-card-hover active:scale-95 transition-all cursor-pointer shrink-0"
              translate="no"
            >
              {lang.toUpperCase()}
            </button>

            {/* Single Unified Export / Download PDF Button */}
            <button
              onClick={handleBrowserPrint}
              title={t('Simpan / Unduh dokumen sebagai PDF (Ctrl+P)', 'Save / Download document as PDF (Ctrl+P)')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/25 cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('Unduh PDF', 'Download PDF')}</span>
            </button>
          </div>
        </div>

        {/* Expandable Document Filter & Curation Toolbar */}
        {showFilterBar && (
          <div className="border-t border-main bg-card px-3 sm:px-6 py-3 max-w-5xl mx-auto transition-all animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              {/* Left: Mode Selection (All vs Featured) */}
              <div className="flex items-center gap-2">
                <span className="text-muted font-mono">{t('Mode Proyek:', 'Projects Mode:')}</span>
                <div className="inline-flex rounded-lg border border-main p-0.5 bg-slate-100 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setOnlyFeatured(false)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      !onlyFeatured
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-sub hover:text-main'
                    }`}
                  >
                    {t('Semua', 'All')} ({rawProjects?.length || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setOnlyFeatured(true)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                      onlyFeatured
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-sub hover:text-main'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{t('Unggulan Saja', 'Featured Only')} ({featuredCount})</span>
                  </button>
                </div>
              </div>

              {/* Center: Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-muted font-mono">{t('Kategori:', 'Category:')}</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2.5 py-1 rounded-md bg-card border border-main text-main text-xs font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {t(c)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Right: Section Checkboxes */}
              <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-main">
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-sub hover:text-main">
                  <input
                    type="checkbox"
                    checked={includeGithub}
                    onChange={(e) => setIncludeGithub(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>GitHub</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-sub hover:text-main">
                  <input
                    type="checkbox"
                    checked={includePublications}
                    onChange={(e) => setIncludePublications(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{t('Publikasi', 'Papers')}</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-sub hover:text-main">
                  <input
                    type="checkbox"
                    checked={includeCertifications}
                    onChange={(e) => setIncludeCertifications(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{t('Sertifikasi', 'Certificates')}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Preview Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-3 py-6 sm:p-8 md:p-10 flex flex-col items-center print:p-0 print:m-0 print:max-w-none">
        {/* Document Sheet Simulation */}
        <div
          id="portfolio-printable-document"
          className="portfolio-paper w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-transform duration-150 ease-out origin-top print:border-0 print:shadow-none print:rounded-none print:m-0 print:p-0 print:bg-white print:text-slate-900"
          style={{
            transform: `scale(${zoomLevel})`,
            marginBottom: zoomLevel > 1.0 ? `${(zoomLevel - 1.0) * 600}px` : '0px',
          }}
        >
          {/* Top Blue Accent Bar */}
          <div className="portfolio-accent-bar h-2 bg-blue-600 w-full" />

          <div className="p-6 sm:p-10 md:p-12 space-y-10 print:p-0 print:space-y-6">
            {/* 1. Header / Hero */}
            <div className="portfolio-section border-b border-slate-200 dark:border-slate-800 pb-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {t('Portofolio', 'Portfolio')}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
                  {fullName}
                </h1>
                <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                  {role}
                </p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {contact?.email} &bull; {isEn && contact?.locationEn ? contact.locationEn : contact?.locationId} &bull; awd.my.id
                </p>
              </div>

              {bio && (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {bio}
                </p>
              )}

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center"
                  >
                    <p className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white">
                      {h.number}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {isEn && h.labelEn ? h.labelEn : h.labelId}
                    </p>
                  </div>
                ))}
              </div>

              {/* Core Tech Stack */}
              {hero?.coreTechStack && hero.coreTechStack.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500 mb-2">
                    {t('Teknologi & Tools Utama', 'Core Technologies & Tools')}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {hero.coreTechStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Focus & Areas of Expertise */}
            {includeExpertise && about?.pillars && about.pillars.length > 0 && (
              <div className="portfolio-section space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                    {t('Fokus & Bidang Keahlian', 'Areas of Expertise')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {about.pillars.map((pillar, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5"
                    >
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isEn && pillar.titleEn ? pillar.titleEn : pillar.titleId}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {isEn && pillar.descEn ? pillar.descEn : pillar.descId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Featured Software Projects */}
            {filteredProjects.length > 0 && (
              <div className="portfolio-section space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                      {onlyFeatured
                        ? t('Proyek & Sistem Unggulan', 'Featured Software Projects & Systems')
                        : t('Daftar Proyek & Sistem', 'Software Projects & Systems')}{' '}
                      ({filteredProjects.length})
                    </h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredProjects.map((proj, idx) => (
                    <div
                      key={proj.slug || idx}
                      className="portfolio-item p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {idx + 1}. {proj.title}
                        </h3>
                        {proj.category && (
                          <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            {proj.category}
                          </span>
                        )}
                      </div>

                      {proj.tech_stack && proj.tech_stack.length > 0 && (
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          Tech: {proj.tech_stack.join(', ')}
                        </p>
                      )}

                      {proj.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>
                      )}

                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <span>{proj.link}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. GitHub Repositories */}
            {includeGithub && githubRepos && githubRepos.length > 0 && (
              <div className="portfolio-section space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                    {t('Repositori GitHub', 'GitHub Repositories')} ({githubRepos.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {githubRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="portfolio-item p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {repo.name}
                        </span>
                        {repo.stargazers_count > 0 && (
                          <span className="text-[11px] font-mono text-amber-500">
                            ★ {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                        <span>{repo.language || 'Code'}</span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          GitHub <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Publications */}
            {includePublications && publications && publications.length > 0 && (
              <div className="portfolio-section space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                    {t('Publikasi & Karya Ilmiah', 'Publications & Research')} ({publications.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {publications.map((pub) => (
                    <div
                      key={pub.id}
                      className="portfolio-item p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                        {pub.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {pub.journal} &bull; {pub.year} &bull; {pub.authors}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Certifications */}
            {includeCertifications && certifications && certifications.length > 0 && (
              <div className="portfolio-section space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                    {t('Sertifikasi Profesional', 'Professional Certifications')} ({certifications.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="portfolio-item p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {cert.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {cert.issueDate}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                        {cert.issuer}
                      </p>
                      {cert.skills && cert.skills.length > 0 && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {cert.skills.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Contact */}
            <div className="portfolio-section space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400">
                  {t('Kontak & Kolaborasi', 'Contact & Collaboration')}
                </h2>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEn && contact?.availabilityEn ? contact.availabilityEn : contact?.availabilityId}
              </p>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1">
                <p>Email: {contact?.email}</p>
                <p>Website: https://awd.my.id</p>
                <p>GitHub: https://github.com/putuwahyu29</p>
                <p>LinkedIn: https://linkedin.com/in/aguswahyu</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
