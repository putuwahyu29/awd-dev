'use client';

import { ExternalLink, Calendar, Rss } from 'lucide-react';
import { BlogPost } from '@/lib/rss';
import { useLanguage } from '@/context/LanguageContext';

interface BlogFeedProps {
  posts: BlogPost[];
}

export default function BlogFeed({ posts }: BlogFeedProps) {
  const { t } = useLanguage();

  // Display top 3 blog posts
  const top3Posts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-14 border-b border-main bg-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5 font-bold">
              <Rss className="w-3.5 h-3.5" />
              {t('Agregasi RSS Blog', 'RSS Blog Aggregation')}
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-main">
              {t('Artikel & Catatan Teknis Terbaru', 'Latest Technical Articles & Notes')}
            </h3>
          </div>

          <a
            href="https://blog.awd.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-medium shrink-0"
          >
            <span>blog.awd.my.id</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </a>
        </div>

        {top3Posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {top3Posts.map((post, idx) => (
              <a
                key={post.link + idx}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-lg bg-card hover:bg-card-hover border border-main hover:border-sub transition-colors flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      {post.pubDate}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-sub text-xs line-clamp-3 leading-relaxed">
                    {post.snippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-main flex items-center justify-between text-xs font-mono text-muted">
                  <span className="text-sub group-hover:text-main flex items-center gap-1 font-medium">
                    {t('Baca Selengkapnya', 'Read Full Article')}
                    <ExternalLink className="w-3 h-3 text-muted" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-card rounded-lg border border-main text-muted text-sm">
            {t('Artikel tidak dapat dimuat langsung. Silakan kunjungi blog.awd.my.id.', 'Articles could not be loaded. Please visit blog.awd.my.id.')}
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="mt-6 text-center">
          <a
            href="https://blog.awd.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-medium text-main bg-card hover:bg-card-hover border border-main transition-colors shadow-2xs"
          >
            <span>{t('Lihat Semua Artikel di Blog', 'Explore All Articles on Blog')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </a>
        </div>
      </div>
    </section>
  );
}
