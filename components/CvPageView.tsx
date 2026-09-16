'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Sun,
  Moon,
  Loader2,
  Check,
  ZoomIn,
  ZoomOut,
  Share2,
  ChevronUp,
} from 'lucide-react';
import { CvData, CvAllData, fallbackCvData } from '@/lib/cv-types';
import CvTemplate from '@/components/CvTemplate';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { exportCvToPdf } from '@/lib/export-pdf';

interface CvPageViewProps {
  cvData?: CvData;
  allCvData?: CvAllData;
  initialCvData?: CvData;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function CvPageView({ cvData, allCvData, initialCvData }: CvPageViewProps) {
  const mounted = useIsMounted();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [clientAllCvData, setClientAllCvData] = useState<CvAllData | null>(allCvData || null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    if (!allCvData && !clientAllCvData) {
      fetch('/api/cv')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id && data.en) {
            setClientAllCvData({ id: data.id, en: data.en });
          }
        })
        .catch((err) => console.error('Error fetching bilingual CV:', err));
    }
  }, [allCvData, clientAllCvData]);

  const activeAllData = allCvData || clientAllCvData;
  const activeCvData: CvData =
    (activeAllData && (activeAllData[lang] || activeAllData.id)) ||
    initialCvData ||
    cvData ||
    fallbackCvData;

  const personName = activeCvData.personalInfo.fullName || 'I Putu Agus Wahyu Dupayana';
  const fileName = `CV_${personName.replace(/\s+/g, '_')}_${lang.toUpperCase()}.pdf`;

  // Track scroll position for Floating Scroll-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Shortcuts for Zooming and Exporting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleDownloadPdf();
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
  }, [activeCvData, isExporting, fileName, lang]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleDownloadPdf = () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      exportCvToPdf(activeCvData, fileName, lang);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export PDF directly:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Subtle Ambient Background Lighting for Studio Aesthetic */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59, 130, 246, 0.25), transparent 70%),
                            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99, 102, 241, 0.15), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Header Navigation (Hidden when printing) */}
      <header className="no-print sticky top-0 z-30 bg-card/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-main shadow-xs">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
          {/* Left: Sleek Minimalist Back Arrow & Clean Title */}
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
                Curriculum Vitae
              </span>
            </div>
          </div>

          {/* Right: Actions (Zoom Controls, Share, Theme Toggle, Lang Toggle, Direct Save PDF) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
              title={t('Salin tautan CV ke clipboard', 'Copy CV link to clipboard')}
              className="p-1.5 sm:p-2 rounded-lg bg-card text-main border border-main hover:bg-card-hover active:scale-95 transition-all cursor-pointer"
              aria-label="Share CV link"
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
                className="p-1.5 sm:p-2 rounded-lg bg-card text-main border border-main hover:bg-card-hover active:scale-95 transition-all cursor-pointer"
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
              className="notranslate px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-card text-main border border-main text-xs font-mono font-bold hover:bg-card-hover active:scale-95 transition-all cursor-pointer"
              translate="no"
            >
              {lang.toUpperCase()}
            </button>

            {/* Direct Save PDF Button: Desktop & Tablet */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              title={t('Simpan dokumen PDF langsung ke perangkat (Ctrl+P)', 'Save PDF file directly to device (Ctrl+P)')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-75 transition-all shadow-md shadow-blue-500/25 cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('Menyimpan...', 'Saving...')}</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{t('Tersimpan!', 'Saved!')}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{t('Simpan PDF', 'Save PDF')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 md:p-10 pb-20 sm:pb-10 flex flex-col items-center overflow-x-auto">
        {/* Scalable Container */}
        <div
          className="w-full flex justify-center transition-transform duration-150 ease-out origin-top"
          style={{
            transform: `scale(${zoomLevel})`,
            marginBottom: zoomLevel > 1.0 ? `${(zoomLevel - 1.0) * 400}px` : '0px',
          }}
        >
          <CvTemplate data={activeCvData} lang={lang} />
        </div>
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title={t('Kembali ke Atas', 'Scroll to Top')}
          aria-label="Scroll to top"
          className="no-print fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 p-2.5 rounded-full bg-card/90 dark:bg-slate-800/90 text-main border border-main shadow-lg backdrop-blur-md hover:bg-card-hover active:scale-90 transition-all cursor-pointer animate-fade-in"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Sticky Bottom Bar (Hidden when printing) */}
      <div className="no-print sm:hidden sticky bottom-0 z-30 flex items-center justify-between px-3.5 py-2.5 bg-card/95 backdrop-blur-md border-t border-main shadow-lg gap-2">
        {/* Mobile Zoom Controls */}
        <div className="flex items-center rounded-lg border border-main bg-main p-0.5 text-xs font-medium text-main shadow-2xs">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.65}
            className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 flex items-center justify-center cursor-pointer"
            title={t('Perkecil', 'Zoom Out')}
            aria-label={t('Perkecil', 'Zoom Out')}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="px-2 py-1 font-mono text-[11px] font-semibold text-main cursor-pointer"
            title={t('Reset Ukuran (100%)', 'Reset Zoom (100%)')}
            aria-label="Reset zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.6}
            className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 flex items-center justify-center cursor-pointer"
            title={t('Perbesar', 'Zoom In')}
            aria-label={t('Perbesar', 'Zoom In')}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{t('Menyimpan...', 'Saving...')}</span>
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('Tersimpan!', 'Saved!')}</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>{t('Simpan PDF', 'Save PDF')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
