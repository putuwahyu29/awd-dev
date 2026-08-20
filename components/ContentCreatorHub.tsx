'use client';

import { ArrowUpRight } from 'lucide-react';
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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
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

function LinkedinLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
  );
}

const logoMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  instagram: InstagramLogo,
  tiktok: TikTokLogo,
  threads: ThreadsLogo,
  youtube: YoutubeLogo,
  facebook: FacebookLogo,
  linkedin: LinkedinLogo,
};

interface ContentCreatorHubProps {
  channels?: SocialChannel[];
}

// Exactly the 6 official social media platforms requested
const allowedSocialKeys = ['tiktok', 'instagram', 'threads', 'youtube', 'facebook', 'linkedin'];

export default function ContentCreatorHub({ channels }: ContentCreatorHubProps) {
  const { t, lang } = useLanguage();

  const defaultChannels: SocialChannel[] = [
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
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'in/aguswahyu',
      role: 'Jaringan Profesional & Pembaruan Karir Rekayasa Perangkat Lunak',
      roleEn: 'Professional Network & Software Engineering Career Updates',
      url: 'https://www.linkedin.com/in/aguswahyu/',
      iconKey: 'linkedin',
      accentColor: 'border-sky-500/30 hover:border-sky-500 text-sky-400',
    },
  ];

  const sourceList = channels && channels.length > 0 ? channels : defaultChannels;

  // Filter to keep ONLY the 6 official social media platforms
  const activeChannels = allowedSocialKeys
    .map((key) => {
      const match = sourceList.find((c) => c.id.toLowerCase() === key || c.iconKey?.toLowerCase() === key);
      return match || defaultChannels.find((d) => d.id === key);
    })
    .filter((item): item is SocialChannel => Boolean(item));

  return (
    <section id="creator" className="py-12 sm:py-16 border-b border-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-bold">
            {t('Media Sosial & Diskusi', 'Social Media & Discussions')}
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-main">
            {t('Media Sosial Resmi', 'Official Social Media')}
          </h3>
          <p className="text-sub text-sm mt-1.5 max-w-2xl">
            {t(
              'Ikuti akun media sosial resmi saya untuk melihat tips coding, tutorial pemrograman web, dan diskusi rekayasa perangkat lunak.',
              'Follow my official social media accounts for coding tips, web tutorials, and software engineering discussions.'
            )}
          </p>
        </div>

        {/* Official Social Media Platform Cards Grid (Sleek Compact Tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {activeChannels.map((platform) => {
            const Icon = logoMap[platform.iconKey || platform.id] || InstagramLogo;
            const displayRole = lang === 'en' && platform.roleEn ? platform.roleEn : platform.role;

            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-3.5 sm:p-4 rounded-xl bg-card hover:bg-card-hover border ${platform.accentColor || 'border-main'} transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-between gap-3 cursor-pointer`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-lg bg-main border border-main shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-muted font-bold tracking-wider block truncate">
                      {platform.name}
                    </span>
                    <h4 className="text-sm font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {platform.handle}
                    </h4>
                    <p className="text-xs text-sub truncate mt-0.5">
                      {displayRole}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-main group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


