'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Loader2,
  AlertCircle,
  Maximize2,
} from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { useLanguage } from '@/context/LanguageContext';

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

interface CvPreviewModalProps {
  personName?: string;
}

export default function CvPreviewModal({
  personName = 'I Putu Agus Wahyu Dupayana',
}: CvPreviewModalProps) {
  const { isCvModalOpen, cvUrl, closeCvModal } = useCvModal();
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1.0);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const renderTasksRef = useRef<Map<number, any>>(new Map());
  const pdfDocRef = useRef<any>(null);

  const fileName = `CV_${personName.replace(/\s+/g, '_')}.pdf`;

  // 1. Dynamically load PDF.js script if not already present
  useEffect(() => {
    if (!isCvModalOpen) return;

    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = '/vendor/pdfjs/pdf.min.js';
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
        setScriptLoaded(true);
      }
    };
    script.onerror = () => {
      // CDN Fallback in case local script has issue
      const fallbackScript = document.createElement('script');
      fallbackScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      fallbackScript.async = true;
      fallbackScript.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          setScriptLoaded(true);
        }
      };
      fallbackScript.onerror = () => {
        setError('Gagal memuat sistem pembaca PDF');
        setIsLoading(false);
      };
      document.body.appendChild(fallbackScript);
    };
    document.body.appendChild(script);
  }, [isCvModalOpen]);

  // 2. Lock body scroll on modal open
  useEffect(() => {
    if (isCvModalOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isCvModalOpen]);

  // 3. Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCvModalOpen) {
        closeCvModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen, closeCvModal]);

  // 4. Render all PDF pages to HTML5 Canvas elements
  const renderAllPages = useCallback(async () => {
    if (!pdfDocRef.current || !containerRef.current) return;

    try {
      const pdf = pdfDocRef.current;
      const numPages = pdf.numPages;
      setTotalPages(numPages);

      const containerWidth = containerRef.current.clientWidth || window.innerWidth;
      // Determine base width fitting: mobile gets full width - 24px padding, desktop fits nicely
      const padding = window.innerWidth < 640 ? 24 : 64;
      const targetAvailableWidth = Math.max(containerWidth - padding, 280);

      // Cancel any ongoing rendering tasks
      renderTasksRef.current.forEach((task) => {
        try {
          task.cancel();
        } catch {
          // Task already completed or cancelled
        }
      });
      renderTasksRef.current.clear();

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const canvas = canvasRefs.current.get(pageNum);
        if (!canvas) continue;

        const page = await pdf.getPage(pageNum);
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        // Calculate fit scale relative to page width vs available container width
        const baseFitScale = targetAvailableWidth / unscaledViewport.width;
        // Apply zoom multiplier
        const effectiveScale = baseFitScale * zoomMultiplier;
        const viewport = page.getViewport({ scale: effectiveScale });

        // Retina / High-DPI support for crisp text rendering on mobile & 4K displays
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          const renderTask = page.render(renderContext);
          renderTasksRef.current.set(pageNum, renderTask);
          await renderTask.promise;
        }
      }
      setIsLoading(false);
      setError(null);
    } catch (err: any) {
      if (err?.name === 'RenderingCancelledException') {
        // Render was cancelled due to zoom or re-render, ignore
        return;
      }
      console.error('Error rendering PDF page:', err);
      setError(err?.message || 'Gagal merender dokumen CV');
      setIsLoading(false);
    }
  }, [zoomMultiplier]);

  // 5. Load Document when modal is open and script is ready
  useEffect(() => {
    if (!isCvModalOpen || !scriptLoaded || !window.pdfjsLib) return;

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    const loadDocument = async () => {
      try {
        const loadingTask = window.pdfjsLib.getDocument({
          url: cvUrl,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        // Trigger rendering after slight delay to ensure canvas refs are attached
        setTimeout(() => {
          if (!isCancelled) {
            renderAllPages();
          }
        }, 60);
      } catch (err: any) {
        if (isCancelled) return;
        console.error('Error loading PDF document:', err);
        setError(err?.message || 'Gagal memuat berkas CV PDF');
        setIsLoading(false);
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
    };
  }, [isCvModalOpen, cvUrl, scriptLoaded, renderAllPages]);

  // 6. Handle Window Resize to auto-adjust fit
  useEffect(() => {
    if (!isCvModalOpen) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        renderAllPages();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isCvModalOpen, renderAllPages]);

  if (!isCvModalOpen) return null;

  const handleZoomIn = () => {
    setZoomMultiplier((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomMultiplier((prev) => Math.max(prev - 0.25, 0.6));
  };

  const handleZoomReset = () => {
    setZoomMultiplier(1.0);
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
        {/* Top Control Header */}
        <div className="shrink-0 flex items-center justify-between px-3 sm:px-6 py-3 border-b border-main bg-card/95 backdrop-blur-md z-10 gap-2">
          {/* Left: Document Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <h2
                id="cv-modal-title"
                className="text-sm sm:text-base font-bold text-main truncate"
              >
                {t('Pratinjau CV', 'Preview CV')} — <span className="text-muted font-mono text-xs">{personName}</span>
              </h2>
              <p className="text-[11px] text-sub font-mono">
                {totalPages > 1
                  ? `${t('Dokumen', 'Document')} • ${totalPages} ${t('Halaman', 'Pages')}`
                  : `${t('Format PDF Resmi', 'Official PDF Format')}`}
              </p>
            </div>
          </div>

          {/* Center/Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls (Hidden on very narrow screen, visible on sm+) */}
            <div className="hidden sm:flex items-center bg-card-hover border border-main rounded-lg p-0.5">
              <button
                onClick={handleZoomOut}
                disabled={zoomMultiplier <= 0.6}
                title={t('Perkecil', 'Zoom Out')}
                className="p-1.5 rounded-md hover:bg-card text-sub hover:text-main disabled:opacity-40 transition-colors"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomReset}
                title={t('Pas Lebar', 'Fit Width')}
                className="px-2 py-1 text-[11px] font-mono font-bold text-main hover:bg-card rounded-md transition-colors"
              >
                {Math.round(zoomMultiplier * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomMultiplier >= 2.5}
                title={t('Perbesar', 'Zoom In')}
                className="p-1.5 rounded-md hover:bg-card text-sub hover:text-main disabled:opacity-40 transition-colors"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Open in new tab */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={t('Buka di Tab Baru', 'Open in New Tab')}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-main text-sub hover:text-main hover:bg-card-hover text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('Tab Baru', 'New Tab')}</span>
            </a>

            {/* Download Button (Primary CTA) */}
            <a
              href={cvUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/25"
            >
              <Download className="w-4 h-4" />
              <span className="font-semibold">{t('Unduh CV (PDF)', 'Download CV (PDF)')}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={closeCvModal}
              className="p-1.5 sm:p-2 rounded-lg text-sub hover:text-main hover:bg-card-hover border border-transparent hover:border-main transition-colors ml-1"
              aria-label={t('Tutup Pratinjau', 'Close Preview')}
              title={t('Tutup Pratinjau', 'Close Preview')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Document Canvas Viewport */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-6 md:p-8 bg-slate-100/70 dark:bg-slate-950/80 flex flex-col items-center gap-6 select-none"
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center my-auto py-16 text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-main">
                  {t('Memuat dokumen CV...', 'Loading CV document...')}
                </p>
                <p className="text-xs text-sub font-mono">
                  {t('Menyiapkan pratinjau resolusi tinggi...', 'Preparing high-definition preview...')}
                </p>
              </div>
            </div>
          )}

          {/* Error Fallback */}
          {error && !isLoading && (
            <div className="max-w-md my-auto p-6 rounded-2xl bg-card border border-red-500/30 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-main">
                  {t('Pratinjau Memerlukan Unduhan', 'Direct Download Available')}
                </h3>
                <p className="text-xs text-sub mt-1">
                  {t(
                    'Dokumen dapat langsung diunduh atau dibuka di browser Anda.',
                    'The document can be downloaded directly or opened in your browser.'
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                <a
                  href={cvUrl}
                  download={fileName}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('Unduh File CV', 'Download CV File')}</span>
                </a>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-main bg-card hover:bg-card-hover border border-main transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('Buka Tab Baru', 'Open in New Tab')}</span>
                </a>
              </div>
            </div>
          )}

          {/* PDF Pages rendered onto Canvases */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <div
              key={pageNum}
              className={`relative flex flex-col items-center transition-opacity duration-300 ${
                isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
              }`}
            >
              {/* Paper Canvas with realistic border and elevation */}
              <div className="relative p-1 bg-white rounded-sm shadow-xl dark:shadow-2xl border border-slate-300/80 dark:border-slate-800 ring-1 ring-black/5 dark:ring-white/10">
                <canvas
                  ref={(el) => {
                    if (el) {
                      canvasRefs.current.set(pageNum, el);
                    } else {
                      canvasRefs.current.delete(pageNum);
                    }
                  }}
                  className="block mx-auto rounded-xs bg-white"
                />
              </div>

              {totalPages > 1 && (
                <span className="mt-2 text-[11px] font-mono text-sub font-semibold">
                  {t('Halaman', 'Page')} {pageNum} / {totalPages}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Sticky Bottom Bar (Optimized for one-hand mobile use) */}
        <div className="sm:hidden shrink-0 flex items-center justify-between px-4 py-2.5 bg-card border-t border-main">
          {/* Zoom controls on mobile */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomMultiplier <= 0.6}
              className="p-1.5 rounded-md bg-card-hover text-sub hover:text-main border border-main text-xs"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-main px-1">
              {Math.round(zoomMultiplier * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomMultiplier >= 2.5}
              className="p-1.5 rounded-md bg-card-hover text-sub hover:text-main border border-main text-xs"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={cvUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('Unduh PDF', 'Download PDF')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
