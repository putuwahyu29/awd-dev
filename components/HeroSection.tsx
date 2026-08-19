'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCvModal } from '@/context/CvModalContext';
import { HeroData } from '@/lib/hero';

interface HeroSectionProps {
  data?: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { t, lang } = useLanguage();
  const { openCvModal } = useCvModal();

  const name = data?.name || 'I Putu Agus Wahyu Dupayana';
  const role = lang === 'en' && data?.roleEn ? data.roleEn : data?.role || 'Software Engineer & Content Creator';
  const bio = lang === 'en' && data?.bioEn ? data.bioEn : data?.bioId || 'Pengembang perangkat lunak...';
  const profileImage = data?.profileImage || '/foto-profil.jpg';
  const cvUrl = data?.cvUrl || '/cv.pdf';

  const techStack = data?.coreTechStack || [
    'LLMs & AI Integration',
    'Next.js',
    'TypeScript',
    'Laravel',
    'Filament PHP',
    'Proxmox VE',
    'Docker',
    'GCP Cloud',
    'PostgreSQL',
    'Tailwind CSS',
  ];

  const highlights = data?.highlights
    ? data.highlights.map((h) => ({
        number: h.number,
        label: lang === 'en' && h.labelEn ? h.labelEn : h.labelId,
      }))
    : [
        { number: '26+', label: t('Proyek', 'Projects') },
        { number: t('5+ Tahun', '5+ Years'), label: t('Pengalaman Kerja', 'Years Experience') },
        { number: '500+', label: t('Kontribusi GitHub', 'GitHub Contributions') },
      ];

  return (
    <section
      id="home"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-main overflow-hidden"
    >
      {/* Ambient background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          {/* Left Text & Value Proposition Column */}
          <div className="flex-1 space-y-6">
            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="notranslate text-4xl sm:text-5xl lg:text-6xl font-extrabold text-main tracking-tight leading-[1.1]" translate="no">
                {name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {role}
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-sub leading-relaxed font-normal pt-1 max-w-2xl">
              {bio}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => openCvModal(cvUrl)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t('Lihat CV (PDF)', 'Preview CV (PDF)')}</span>
              </button>

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-main bg-card hover:bg-card-hover border border-main transition-colors shadow-xs"
              >
                <span>{t('Lihat Portofolio', 'Explore Portfolio')}</span>
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Link>
            </div>

            {/* Metric Highlights Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-main">
              {highlights.map((h, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xl sm:text-2xl font-bold font-mono text-main">{h.number}</p>
                  <p className="text-xs text-sub font-medium leading-tight">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Circular Avatar Column */}
          <div className="shrink-0 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer Decorative Ring */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full p-1.5 bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-500 border border-main shadow-2xl overflow-hidden ring-8 ring-blue-500/10 transition-transform duration-300 group-hover:scale-102">
                <div className="w-full h-full rounded-full overflow-hidden bg-card flex items-center justify-center relative">
                  <Image
                    src={profileImage}
                    alt={name}
                    width={288}
                    height={288}
                    priority
                    className="w-full h-full object-cover object-top rounded-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card border-2 border-main shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-main whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Bar */}
        <div className="mt-12 pt-6 border-t border-main">
          <p className="text-xs font-mono uppercase tracking-wider text-muted mb-3 font-semibold">
            {t('Teknologi & Tools Utama', 'Core Technologies & Tools')}
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="notranslate px-3 py-1 rounded-md text-xs font-mono bg-card text-sub border border-main shadow-2xs hover:border-blue-500/40 transition-colors"
                translate="no"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
