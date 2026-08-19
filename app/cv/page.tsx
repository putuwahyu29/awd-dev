'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  FileText,
  Loader2,
  AlertCircle,
  Home,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CvPage() {
  const { t } = useLanguage();
  const cvUrl = '/cv.pdf';
  const personName = 'I Putu Agus Wahyu Dupayana';
  const fileName = `CV_${personName.replace(/\s+/g, '_')}.pdf`;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1.0);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const renderTasksRef = useRef<Map<number, any>>(new Map());
  const pdfDocRef = useRef<any>(null);

  // 1. Dynamically load PDF.js script
  useEffect(() => {
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
        setError('Gagal memuat pembaca PDF');
        setIsLoading(false);
      };
      document.body.appendChild(fallbackScript);
    };
    document.body.appendChild(script);
  }, []);

  // 2. Render all PDF pages
  const renderAllPages = useCallback(async () => {
    if (!pdfDocRef.current || !containerRef.current) return;

    try {
      const pdf = pdfDocRef.current;
      const numPages = pdf.numPages;
      setTotalPages(numPages);

      const containerWidth = containerRef.current.clientWidth || window.innerWidth;
      const padding = window.innerWidth < 640 ? 24 : 64;
      const targetAvailableWidth = Math.max(containerWidth - padding, 280);

      renderTasksRef.current.forEach((task) => {
        try {
          task.cancel();
        } catch {
          // Ignore
        }
      });
      renderTasksRef.current.clear();

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const canvas = canvasRefs.current.get(pageNum);
        if (!canvas) continue;

        const page = await pdf.getPage(pageNum);
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        const baseFitScale = targetAvailableWidth / unscaledViewport.width;
        const effectiveScale = baseFitScale * zoomMultiplier;
        const viewport = page.getViewport({ scale: effectiveScale });

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
      if (err?.name === 'RenderingCancelledException') return;
      console.error('Error rendering PDF:', err);
      setError(err?.message || 'Gagal merender dokumen CV');
      setIsLoading(false);
    }
  }, [zoomMultiplier]);

  // 3. Load Document when script is ready
  useEffect(() => {
    if (!scriptLoaded || !window.pdfjsLib) return;

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
  }, [scriptLoaded, renderAllPages]);

  // 4. Handle Window Resize
  useEffect(() => {
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
  }, [renderAllPages]);

  const handleZoomIn = () => setZoomMultiplier((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomMultiplier((prev) => Math.max(prev - 0.25, 0.6));
  const handleZoomReset = () => setZoomMultiplier(1.0);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-main shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Left: Back Link & Document Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-main bg-card hover:bg-card-hover text-xs font-semibold text-main transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('Kembali ke Portofolio', 'Back to Portfolio')}</span>
              <span className="sm:hidden">{t('Kembali', 'Back')}</span>
            </Link>

            <div className="h-5 w-px bg-main hidden sm:block"></div>

            <div className="min-w-0 flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm font-bold text-main truncate">
                  Curriculum Vitae (PDF)
                </h1>
                <p className="text-[10px] text-sub font-mono hidden xs:block truncate">
                  {personName}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Controls & Download CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
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

            {/* Primary Download Button */}
            <a
              href={cvUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span>{t('Unduh CV (PDF)', 'Download CV (PDF)')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main
        ref={containerRef}
        className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center gap-6"
      >
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center my-auto py-24 text-center space-y-4">
            <div className="relative">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20"></div>
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-main">
                {t('Memuat dokumen CV...', 'Loading CV document...')}
              </p>
              <p className="text-xs text-sub font-mono">
                {t('Menyiapkan pratinjau resolusi tinggi...', 'Preparing high-definition preview...')}
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-md my-auto p-6 rounded-2xl bg-card border border-red-500/30 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-main">
                {t('Pratinjau Memerlukan Unduhan', 'Direct Download Available')}
              </h2>
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
            </div>
          </div>
        )}

        {/* Canvases */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <div
            key={pageNum}
            className={`relative flex flex-col items-center transition-opacity duration-300 ${
              isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
            }`}
          >
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
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden sticky bottom-0 z-30 flex items-center justify-between px-4 py-2.5 bg-card/95 backdrop-blur-md border-t border-main shadow-lg">
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

        <a
          href={cvUrl}
          download={fileName}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t('Unduh PDF', 'Download PDF')}</span>
        </a>
      </div>
    </div>
  );
}
