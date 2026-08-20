'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-card text-sub border-t border-main py-6 sm:py-7 font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Navigation Quick Links Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Link
              href="/#home"
              className="notranslate font-extrabold text-main hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              translate="no"
            >
              awd<span className="text-blue-600 dark:text-blue-400 font-extrabold">.dev</span>
            </Link>
            <span className="text-muted">•</span>
            <span className="text-muted text-[11px] sm:text-xs">
              {t('Software Engineer & Content Creator', 'Software Engineer & Content Creator')}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs text-sub">
            <Link
              href="/cv"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('Curriculum Vitae', 'Curriculum Vitae')}
            </Link>
            <span className="text-muted">•</span>
            <Link
              href="/links"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t('Pusat Tautan & Bio', 'Bio Links')}
            </Link>
            <span className="text-muted">•</span>
            <Link
              href="/presentation"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('Slide Deck', 'Interactive Deck')}
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-3 border-t border-main/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-muted">
          <p>© {currentYear} I Putu Agus Wahyu Dupayana. {t('Hak cipta dilindungi.', 'All rights reserved.')}</p>
          <p>{t('Surabaya, Jawa Timur, Indonesia', 'Surabaya, East Java, Indonesia')}</p>
        </div>
      </div>
    </footer>
  );
}

