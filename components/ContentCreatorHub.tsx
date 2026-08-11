'use client';

import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SocialChannel } from '@/lib/socials';

// Official Brand SVG Icons
function InstagramLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.32 1.54-1.33 2.54-.05 1.05.41 2.12 1.21 2.77.9.72 2.17.9 3.24.47 1.14-.42 1.94-1.55 1.98-2.77.03-4.99.01-9.98.01-14.97z" />
    </svg>
  );
}

function ThreadsLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 192 192" width="20" height="20" fill="currentColor" {...props}>
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.745C72.8428 44.745 57.3473 60.672 56.4026 87.5855C56.4026 87.697 56.4026 87.8093 56.4026 87.9215C56.4026 114.72 71.979 130.648 96.3582 130.648C108.683 130.648 119.866 125.753 127.842 116.892L116.719 108.761C111.458 114.73 104.28 117.962 96.3582 117.962C80.3703 117.962 69.4586 106.945 69.0911 88.5878C78.4385 86.8159 90.7303 85.9229 105.772 87.2173C116.549 88.1444 125.041 90.8711 131.026 95.3259C136.257 99.2198 139.061 104.607 138.903 110.518C138.675 119.043 131.42 126.045 122.091 126.045C113.682 126.045 106.758 120.089 106.331 112.569H106.319C106.319 112.531 106.319 112.493 106.319 112.455C106.319 103.882 113.265 96.9357 121.838 96.9357C124.966 96.9357 127.887 97.8614 130.34 99.4608L138.169 90.419C133.805 87.2662 128.16 85.4594 121.838 85.4594C106.931 85.4594 94.8427 97.5478 94.8427 112.455C94.8427 127.362 106.931 139.45 121.838 139.45C138.563 139.45 151.272 127.026 151.696 110.174C151.936 100.59 147.243 92.0152 138.384 86.4172C130.686 81.5539 119.92 78.4311 106.721 77.2917C89.5898 75.8123 75.3129 76.993 64.9392 80.799C53.7915 84.8875 44.538 92.5113 37.8927 103.096C31.5457 113.208 28.2144 125.795 28.2144 140.505H40.2144C40.2144 127.838 42.9818 117.202 48.3308 108.647C53.5134 100.358 60.7712 94.2796 69.6053 91.0427C78.4879 87.7885 91.0772 86.728 106.012 88.0163C117.518 89.0118 126.793 91.7371 133.568 95.9926C135.253 97.051 136.786 98.2259 138.169 99.4975V88.9883H141.537Z" />
    </svg>
  );
}

function KaggleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M18.825 23.859h-3.46l-5.632-8.212-2.222 2.052v6.16H4.352V.14h3.159v12.215l7.262-8.543h3.811l-7.07 8.012 7.311 12.035z" />
    </svg>
  );
}

function YoutubeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const logoMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  instagram: InstagramLogo,
  tiktok: TikTokLogo,
  threads: ThreadsLogo,
  kaggle: KaggleLogo,
  youtube: YoutubeLogo,
  facebook: FacebookLogo,
};

interface ContentCreatorHubProps {
  channels?: SocialChannel[];
}

export default function ContentCreatorHub({ channels }: ContentCreatorHubProps) {
  const { t, lang } = useLanguage();

  const activeChannels = channels || [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@aguswahyudupayana',
      role: 'Konten Edukasi Pemrograman Web & Linux',
      roleEn: 'Web Development & Linux Educational Content',
      url: 'https://instagram.com/aguswahyudupayana',
      iconKey: 'instagram',
      accentColor: 'border-pink-500/30 hover:border-pink-500 text-pink-500',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@aguswahyudupayana',
      role: 'Tips Coding & Video Tutorial Singkat',
      roleEn: 'Coding Tips & Short Video Tutorials',
      url: 'https://tiktok.com/@aguswahyudupayana',
      iconKey: 'tiktok',
      accentColor: 'border-cyan-500/30 hover:border-cyan-500 text-cyan-400',
    },
    {
      id: 'threads',
      name: 'Threads',
      handle: '@aguswahyudupayana',
      role: 'Diskusi Seputar Teknologi & Rekayasa Perangkat Lunak',
      roleEn: 'Tech & Software Engineering Discussions',
      url: 'https://threads.net/@aguswahyudupayana',
      iconKey: 'threads',
      accentColor: 'border-purple-500/30 hover:border-purple-500 text-purple-400',
    },
    {
      id: 'kaggle',
      name: 'Kaggle',
      handle: '@aguswahyudupayana',
      role: 'Kumpulan Dataset, Catatan Riset, & Model Machine Learning',
      roleEn: 'Datasets, Research Notebooks & ML Models',
      url: 'https://kaggle.com/aguswahyudupayana',
      iconKey: 'kaggle',
      accentColor: 'border-sky-500/30 hover:border-sky-500 text-sky-400',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@aguswahyudupayana',
      role: 'Video Tutorial Pemrograman & Arsitektur Server',
      roleEn: 'Programming & Server Architecture Tutorials',
      url: 'https://youtube.com/@aguswahyudupayana',
      iconKey: 'youtube',
      accentColor: 'border-red-500/30 hover:border-red-500 text-red-500',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'aguswahyudupayana',
      role: 'Diskusi Komunitas & Update Artikel Teknologi',
      roleEn: 'Community Discussion & Tech Articles',
      url: 'https://facebook.com/aguswahyudupayana',
      iconKey: 'facebook',
      accentColor: 'border-blue-500/30 hover:border-blue-500 text-blue-500',
    },
  ];

  return (
    <section id="creator" className="py-16 border-b border-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-bold">
            {t('Media Sosial & Diskusi', 'Social Media & Discussions')}
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-main">
            {t('Media Sosial Resmi', 'Official Social Media')}
          </h3>
          <p className="text-sub text-sm mt-2 max-w-2xl">
            {t(
              'Ikuti akun media sosial saya untuk melihat tips coding, tutorial pemrograman web, dan berbagai konten edukasi teknologi terbaru.',
              'Follow my social media accounts to watch coding tips, web programming tutorials, and latest tech content.'
            )}
          </p>
        </div>

        {/* Official Social Media Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeChannels.map((platform) => {
            const Icon = logoMap[platform.iconKey] || InstagramLogo;
            const displayRole = lang === 'en' && platform.roleEn ? platform.roleEn : platform.role;

            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 rounded-xl bg-card hover:bg-card-hover border ${platform.accentColor} transition-all duration-200 flex flex-col justify-between shadow-2xs`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-main border border-main">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted group-hover:text-main transition-colors" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-muted font-bold tracking-wider block mb-1">
                      {platform.name}
                    </span>
                    <h4 className="text-base font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {platform.handle}
                    </h4>
                    <p className="text-xs text-sub mt-1.5 leading-relaxed">
                      {displayRole}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-main flex items-center justify-end text-xs font-mono text-muted">
                  <span className="text-sub font-semibold group-hover:text-main flex items-center gap-1">
                    <span>{t('Buka', 'Open')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
