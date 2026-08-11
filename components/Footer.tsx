'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-card text-sub border-t border-main text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {currentYear} I Putu Agus Wahyu Dupayana. {t('Hak cipta dilindungi undang-undang.', 'All rights reserved.')}</p>
        </div>

        <div className="flex items-center gap-2.5 text-muted">
          <span className="font-bold text-main">awd.dev</span>
          <span>•</span>
          <span>{t('Software Engineer & Content Creator', 'Software Engineer & Content Creator')}</span>
        </div>
      </div>
    </footer>
  );
}
