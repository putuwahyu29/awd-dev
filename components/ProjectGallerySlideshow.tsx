'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectGallerySlideshowProps {
  images: string[];
  title: string;
}

export default function ProjectGallerySlideshow({ images, title }: ProjectGallerySlideshowProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-sub font-bold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          {t('Galeri & Slideshow Tangkapan Layar', 'Screenshots Gallery & Slideshow')} ({images.length})
        </span>
        {images.length > 1 && (
          <span className="text-[11px] font-mono text-muted hidden sm:inline-block">
            {t('Gunakan tombol panah ← → pada keyboard', 'Use ← → keyboard arrow keys')}
          </span>
        )}
      </div>

      {/* Main Slideshow Frame */}
      <div className="relative w-full h-64 sm:h-96 max-h-[420px] rounded-xl overflow-hidden border border-main bg-black/60 shadow-lg flex items-center justify-center group select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={`${title} - Slideshow ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/foto-profil.jpg';
          }}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 shadow-lg"
              aria-label={t('Gambar sebelumnya', 'Previous image')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 shadow-lg"
              aria-label={t('Gambar selanjutnya', 'Next image')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold z-10 shadow-md">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Navigation Bar */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {images.map((imgUrl, idx) => (
            <button
              key={imgUrl + idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-24 h-16 sm:w-28 sm:h-18 rounded-lg overflow-hidden border transition-all shrink-0 bg-black/40 ${
                currentIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-500/40 opacity-100 scale-102 shadow-md'
                  : 'border-main opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
