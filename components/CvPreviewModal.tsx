'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Check,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { CvData, fallbackCvData } from '@/lib/cv-types';
import CvTemplate from '@/components/CvTemplate';

interface CvPreviewModalProps {
  personName?: string;
}

export default function CvPreviewModal({
  personName = 'I Putu Agus Wahyu Dupayana',
}: CvPreviewModalProps) {
  const { isCvModalOpen, closeCvModal } = useCvModal();
  const { t } = useLanguage();

  const [cvData, setCvData] = useState<CvData>(fallbackCvData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const rawFullName = cvData.personalInfo.fullName || personName;
  const fullName = rawFullName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  const fileName = `CV_${rawFullName.replace(/\s+/g, '_')}.pdf`;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
  };

  // Fetch fresh dynamic CV data when modal opens
  useEffect(() => {
    if (!isCvModalOpen) return;
    let isCancelled = false;
    setIsLoading(true);

    fetch('/api/cv')
      .then((res) => res.json())
      .then((data: CvData) => {
        if (!isCancelled && data && data.personalInfo) {
          setCvData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching CV data:', err);
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [isCvModalOpen]);

  // Lock body scroll on modal open
  useEffect(() => {
    if (isCvModalOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isCvModalOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCvModalOpen) {
        closeCvModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen, closeCvModal]);

  if (!isCvModalOpen) return null;

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const { exportCvToPdf } = await import('@/lib/export-pdf');
      exportCvToPdf(cvData, fileName);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCvModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[94vh] sm:h-[90vh] bg-card border border-main rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Top Control Header (no-print) */}
        <div className="no-print shrink-0 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-main bg-card/95 backdrop-blur-md z-10 gap-2">
          {/* Left: Document Info with clear responsive hierarchy */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <h2
                id="cv-modal-title"
                className="text-xs sm:text-base font-bold text-main leading-tight truncate"
              >
                {t('Curriculum Vitae', 'Curriculum Vitae')}
              </h2>
              <p className="text-[10px] sm:text-xs text-sub font-mono leading-tight truncate max-w-[120px] xs:max-w-[180px] sm:max-w-xs">
                {fullName}
              </p>
            </div>
          </div>

          {/* Right Controls: Streamlined & Fully Accessible on All Viewports */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls (Desktop & Tablet) */}
            <div className="hidden md:flex items-center rounded-lg border border-main bg-card p-0.5 text-xs font-medium text-main shadow-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.65}
                title={t('Perkecil', 'Zoom Out')}
                className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title={t('Reset Ukuran (100%)', 'Reset Zoom (100%)')}
                className="px-2 py-1 font-mono text-[11px] font-semibold text-main hover:bg-card-hover rounded-md transition-colors cursor-pointer"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 1.6}
                title={t('Perbesar', 'Zoom In')}
                className="p-1.5 rounded-md hover:bg-card-hover text-sub hover:text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Open Standalone Page: Visible on Mobile & Desktop */}
            <Link
              href="/cv"
              onClick={closeCvModal}
              title={t('Buka Halaman Penuh', 'Open Full Page')}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-main text-sub hover:text-main hover:bg-card-hover text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">{t('Halaman Penuh', 'Full Page')}</span>
            </Link>

            {/* Direct Save PDF Button: Desktop/Tablet View */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              title={t('Simpan dokumen PDF langsung ke perangkat', 'Save PDF file directly to device')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-75 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-semibold">{t('Menyimpan...', 'Saving...')}</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="font-semibold">{t('Tersimpan!', 'Saved!')}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="font-semibold">{t('Simpan PDF', 'Save PDF')}</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={closeCvModal}
              className="p-1.5 sm:p-2 rounded-lg text-sub hover:text-main hover:bg-card-hover border border-transparent hover:border-main transition-colors ml-0.5 shrink-0"
              aria-label={t('Tutup Pratinjau', 'Close Preview')}
              title={t('Tutup Pratinjau', 'Close Preview')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-6 md:p-8 bg-slate-100/70 dark:bg-slate-950/80 flex flex-col items-center select-text">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center my-auto py-16 text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-main">
                  {t('Memuat naskah CV...', 'Loading CV content...')}
                </p>
                <p className="text-xs text-sub font-mono">
                  {t('Menyiapkan dokumen...', 'Preparing document...')}
                </p>
              </div>
            </div>
          ) : (
            <div
              id="cv-modal-printable-document"
              className="w-full flex justify-center animate-fade-in transition-transform duration-150 ease-out origin-top"
              style={{
                transform: `scale(${zoomLevel})`,
                marginBottom: zoomLevel > 1.0 ? `${(zoomLevel - 1.0) * 900}px` : '0px',
              }}
            >
              <CvTemplate data={cvData} />
            </div>
          )}
        </div>

        {/* Mobile Sticky Bottom Bar (no-print): Complete Mobile Toolset */}
        <div className="no-print sm:hidden shrink-0 flex items-center justify-between px-3.5 py-2.5 bg-card/95 backdrop-blur-md border-t border-main shadow-lg gap-2">
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

          {/* Direct Save PDF Button on Mobile */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
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
    </div>
  );
}
