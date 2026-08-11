'use client';

import { ArrowUpRight, ExternalLink, GraduationCap } from 'lucide-react';
import { Publication } from '@/lib/publications';
import { useLanguage } from '@/context/LanguageContext';

interface PublicationsSectionProps {
  publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const { t } = useLanguage();

  if (!publications || publications.length === 0) return null;

  return (
    <section id="publications" className="py-16 border-b border-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-bold">
              {t('Publikasi & Riset Peneliti', 'Research & Publications')}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-main">
              {t('Karya Ilmiah & Penelitian', 'Scientific Publications & Research')}
            </h3>
          </div>

          {/* Google Scholar Link */}
          <a
            href="https://scholar.google.com/citations?user=NeiAOi8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-card hover:bg-card-hover border border-main transition-all shadow-2xs shrink-0"
          >
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('Profil Google Scholar', 'Google Scholar Profile')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-4">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="p-6 rounded-lg bg-card border border-main hover:border-sub transition-colors shadow-2xs"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted">
                    <span className="px-2 py-0.5 rounded bg-main text-main font-semibold border border-main">
                      {t(pub.type)}
                    </span>
                    <span>• {pub.year}</span>
                    <span>• {pub.journal}</span>
                  </div>

                  <h4 className="text-lg font-bold text-main leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-muted">
                    {t('Penulis:', 'Authors:')} <span className="text-sub font-medium">{pub.authors}</span>
                  </p>

                  <p className="text-sub text-xs sm:text-sm leading-relaxed pt-1">
                    {pub.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-main text-sub border border-main"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {pub.link && (
                  <div className="shrink-0 pt-1">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-sub bg-main hover:bg-card-hover border border-main transition-colors shadow-2xs"
                    >
                      <span>{t('Publikasi DOI', 'View Publication DOI')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
