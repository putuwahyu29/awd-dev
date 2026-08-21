'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={t('Kembali ke atas', 'Scroll to top')}
      title={t('Kembali ke atas', 'Scroll to top')}
      className="fixed bottom-22 right-6 z-40 p-2.5 rounded-full bg-card hover:bg-card-hover text-main border border-main shadow-lg hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
