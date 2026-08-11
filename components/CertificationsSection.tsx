'use client';

import { Award, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { Certification } from '@/lib/certifications';
import { useLanguage } from '@/context/LanguageContext';

interface CertificationsSectionProps {
  officialCerts: Certification[];
}

export default function CertificationsSection({ officialCerts }: CertificationsSectionProps) {
  const { t } = useLanguage();

  if (!officialCerts || officialCerts.length === 0) return null;

  return (
    <section id="certifications" className="py-14 border-b border-main bg-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4" />
              {t('Sertifikasi Keahlian', 'Skill Certifications')}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-main">
              {t('Sertifikasi Teknis & Profesional', 'Technical & Professional Certifications')}
            </h3>
          </div>
          <a
            href="https://www.linkedin.com/in/aguswahyu/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-bold shrink-0"
          >
            <span>{t('Lihat di LinkedIn', 'View on LinkedIn')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {officialCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl bg-card border border-main hover:border-blue-500/50 transition-all flex gap-4 shadow-xs hover:shadow-md"
            >
              {/* Badge Image */}
              {cert.badgeImageUrl ? (
                <div className="shrink-0">
                  <img
                    src={cert.badgeImageUrl}
                    alt={cert.title}
                    className="w-14 h-14 object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="shrink-0 w-14 h-14 rounded-lg bg-main border border-main flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-w-0 space-y-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-main text-blue-600 dark:text-blue-400 border border-main font-bold">
                      {cert.issuer}
                    </span>
                    <div className="flex items-center gap-2">
                      {cert.level && (
                        <span className="text-[10px] font-mono text-muted bg-main border border-main px-1.5 py-0.5 rounded">
                          {cert.level}
                        </span>
                      )}
                      <span className="text-xs font-mono text-muted">{cert.issueDate}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-main leading-snug line-clamp-2">
                    {cert.title}
                  </h4>

                  {cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-main text-sub border border-main flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-main flex items-center justify-between text-xs font-mono text-muted">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {t('Terverifikasi', 'Verified')}
                    </span>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      {t('Lihat Kredensial', 'View Credential')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
