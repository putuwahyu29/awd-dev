'use client';

import { Star, ExternalLink, Code2, ArrowRight } from 'lucide-react';
import { GitHubRepo } from '@/lib/github';
import { useLanguage } from '@/context/LanguageContext';

interface GitHubReposSectionProps {
  repos: GitHubRepo[];
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function GitHubReposSection({ repos }: GitHubReposSectionProps) {
  const { t } = useLanguage();

  if (!repos || repos.length === 0) return null;

  // Display only top 3 items
  const top3Repos = repos.slice(0, 3);

  return (
    <section id="github" className="py-14 border-b border-main bg-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5 font-bold">
              <GithubIcon className="w-4 h-4" />
              Live GitHub Activity
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-main">
              {t('Repositori Terpopuler di GitHub', 'Top Repositories on GitHub')}
            </h3>
          </div>

          <a
            href="https://github.com/putuwahyu29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline shrink-0 font-medium"
          >
            <span>{t('Lihat Profil GitHub (@putuwahyu29)', 'View GitHub Profile (@putuwahyu29)')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Top 3 Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3Repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-lg bg-card hover:bg-card-hover border border-main hover:border-sub transition-colors flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold font-mono text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {repo.name}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-main transition-colors shrink-0" />
                </div>

                <p className="text-sub text-xs line-clamp-2 leading-relaxed font-normal">
                  {repo.description || t('Repositori terbuka di GitHub @putuwahyu29', 'Public repository on GitHub @putuwahyu29')}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-main flex items-center justify-between text-xs font-mono text-muted">
                <span className="flex items-center gap-1 text-sub">
                  <Code2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {repo.language || 'Code'}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA to view all on GitHub */}
        <div className="mt-6 text-center">
          <a
            href="https://github.com/putuwahyu29?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-medium text-main bg-card hover:bg-card-hover border border-main transition-colors shadow-2xs"
          >
            <span>{t('Lihat Semua Repositori di GitHub', 'Explore All Repositories on GitHub')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </a>
        </div>
      </div>
    </section>
  );
}
