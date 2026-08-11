'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  Layers,
  Image as ImageIcon,
  Terminal,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ProjectData } from '@/lib/projects';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';

      // Combine project.images auto-discovered + any <img> tags from contentHtml
      const allImgs: string[] = [...(project.images || [])];

      if (allImgs.length === 0 && project.image_preview) {
        allImgs.push(project.image_preview);
      }

      // Also extract any embedded images from Markdown HTML if not already included
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      let match;
      while ((match = imgRegex.exec(project.contentHtml)) !== null) {
        if (!allImgs.includes(match[1])) {
          allImgs.push(match[1]);
        }
      }

      setImages(allImgs);
      setCurrentIndex(0);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard controls: Escape to close, Left Arrow & Right Arrow to slide images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, handleNext, handlePrev]);

  if (!project) return null;

  const categoryList =
    project.categories && project.categories.length > 0
      ? project.categories
      : [project.category];

  // Strip <img> tags from contentHtml to prevent image duplication in text body
  const cleanContentHtml = project.contentHtml.replace(/<img[^>]*>/gi, '');
  const activeImage = images[currentIndex] || project.image_preview || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-card border border-main rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-main bg-main/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-main truncate">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-sub hover:text-main bg-card hover:bg-card-hover border border-main rounded-xl transition-all shrink-0 hover:scale-105 active:scale-95"
            aria-label={t('Tutup modal', 'Close modal')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-7">
          {/* Main Title & Short Description Header Card */}
          <div className="bg-main border border-main rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              {categoryList.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 font-bold flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {cat}
                </span>
              ))}

              <span className="px-2.5 py-1 rounded-md text-xs font-mono text-sub bg-card border border-main font-medium flex items-center gap-1.5 ml-auto">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {project.date}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight leading-tight">
              {project.title}
            </h2>

            <p className="text-sub text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Interactive Image Carousel Viewer */}
          {activeImage && (
            <div className="space-y-3">
              <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-main bg-black/50 shadow-inner flex items-center justify-center group select-none">
                <img
                  src={activeImage}
                  alt={`${project.title} - ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain transition-all duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/foto-profil.jpg';
                  }}
                />

                {/* Left Arrow Button */}
                {images.length > 1 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 shadow-lg"
                    aria-label={t('Gambar sebelumnya', 'Previous image')}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {images.length > 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 shadow-lg"
                    aria-label={t('Gambar selanjutnya', 'Next image')}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Image Counter Badge */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold z-10">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails Carousel Bar */}
              {images.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-sub font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      {t('Tangkapan Layar & Galeri Sistem', 'Screenshots & System Gallery')} ({images.length})
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {t('Gunakan panah / tombol Keyboard ← →', 'Use arrows or ← → Keyboard keys')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={imgUrl + idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative w-24 h-16 rounded-lg overflow-hidden border transition-all shrink-0 ${
                          currentIndex === idx
                            ? 'border-blue-600 ring-2 ring-blue-500/40 opacity-100 scale-105'
                            : 'border-main opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Pills List */}
          <div className="bg-main border border-main rounded-xl p-5 space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-sub font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              {t('Teknologi & Stack Digunakan', 'Technologies & Stack Used')}
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md text-xs font-mono bg-card text-main font-semibold border border-main shadow-2xs hover:border-blue-500/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Markdown Case Study Content Body */}
          <div className="bg-main border border-main rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider pb-2 border-b border-main">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('Rincian Studi Kasus & Arsitektur', 'Case Study Details & Architecture')}</span>
            </div>

            <div
              className="prose dark:prose-invert max-w-none text-sub text-sm sm:text-base leading-relaxed
                prose-headings:text-main prose-headings:font-bold 
                prose-h2:text-lg sm:prose-h2:text-xl prose-h2:font-extrabold prose-h2:tracking-tight prose-h2:mt-6 prose-h2:mb-3 prose-h2:pt-3 prose-h2:border-t prose-h2:border-main prose-h2:text-blue-600 dark:prose-h2:text-blue-400
                prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-bold prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-main
                prose-p:text-sub prose-p:leading-relaxed prose-p:my-2.5
                prose-strong:text-main prose-strong:font-bold
                prose-ul:space-y-2 prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                prose-li:text-sub prose-li:leading-relaxed prose-li:marker:text-blue-500
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:underline hover:prose-a:text-blue-500"
              dangerouslySetInnerHTML={{ __html: cleanContentHtml }}
            />
          </div>
        </div>

        {/* Sticky Footer Bar with Repository Link Button */}
        {project.link && (
          <div className="px-6 py-4 border-t border-main bg-main/95 backdrop-blur-md sticky bottom-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-sub font-medium hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{t('Arsip Kode & Repositori Resmi', 'Official Code Repository')}</span>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 w-full sm:w-auto"
            >
              <span>{t('Buka Repositori / Demo Sistem', 'Open Repository / System Demo')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
