'use client';

import React from 'react';
import { CvData } from '@/lib/cv-types';

interface CvTemplateProps {
  data: CvData;
  lang?: 'id' | 'en';
  className?: string;
}

export default function CvTemplate({ data, lang = 'id', className = '' }: CvTemplateProps) {
  const isEn = lang === 'en';
  const { personalInfo, experiences, education, certifications, publications, skills, summary } = data;
  const location = personalInfo.location || 'Surabaya, Indonesia';
  const email = personalInfo.email || 'aguswahyu@office.awd.my.id';
  const phone = personalInfo.phone;
  const website = personalInfo.website || personalInfo.websiteDisplay || 'awd.my.id';
  const github = personalInfo.github || personalInfo.githubDisplay || 'github.com/putuwahyu29';
  const linkedin = personalInfo.linkedin || personalInfo.linkedinDisplay || 'linkedin.com/in/aguswahyu';

  return (
    <div className={`cv-print-root w-full flex justify-center ${className}`}>
      {/* Responsive Document Paper (Supports sleek Dark Mode on screen & Pure White on Print) */}
      <div
        id="cv-printable-document"
        className="cv-paper notranslate relative w-full max-w-[210mm] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-8 md:p-14 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-slate-900/5 dark:shadow-black/70 ring-1 ring-slate-900/5 dark:ring-white/10 font-sans select-text leading-normal transition-all duration-200"
        translate="no"
      >
        {/* 1. HEADER (CENTERED & MINIMALIST ATS STYLE - 2 CLEAN ROWS) */}
        <header className="cv-section text-center mb-5 sm:mb-7">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-950 dark:text-white tracking-tight uppercase">
            {personalInfo.fullName}
          </h1>

          {/* Row 1: Location • Phone • Email */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 mt-2 font-normal">
            {location && <span>{location}</span>}

            {location && (phone || email) && (
              <span className="text-slate-400 dark:text-slate-600 select-none">•</span>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="hover:underline hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {phone}
              </a>
            )}

            {phone && email && (
              <span className="text-slate-400 dark:text-slate-600 select-none">•</span>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="hover:underline hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {email}
              </a>
            )}
          </div>

          {/* Row 2: Digital Profiles: Website • GitHub • LinkedIn */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 mt-1 font-normal">
            {website && (
              <a
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {website.replace(/^https?:\/\//, '')}
              </a>
            )}

            {website && (github || linkedin) && (
              <span className="text-slate-400 dark:text-slate-600 select-none">•</span>
            )}

            {github && (
              <a
                href={
                  github.startsWith('http')
                    ? github
                    : `https://${github.startsWith('github.com') ? github : `github.com/${github.replace(/^@/, '')}`}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {github.replace(/^https?:\/\//, '')}
              </a>
            )}

            {github && linkedin && (
              <span className="text-slate-400 dark:text-slate-600 select-none">•</span>
            )}

            {linkedin && (
              <a
                href={
                  linkedin.startsWith('http')
                    ? linkedin
                    : `https://${linkedin.startsWith('linkedin.com') ? linkedin : `linkedin.com/in/${linkedin}`}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {linkedin.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </header>

        {/* Optional Summary Section */}
        {summary && summary.trim().length > 0 && (
          <section className="cv-section mb-7">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'PROFESSIONAL SUMMARY' : 'TENTANG SAYA'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3"></div>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* 2. PENGALAMAN KERJA / WORK EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="cv-section mb-7">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'WORK EXPERIENCE' : 'PENGALAMAN KERJA'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3.5"></div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="cv-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm gap-0.5">
                    <div className="font-bold text-slate-950 dark:text-slate-100">
                      <span>{exp.company}</span>
                      {exp.location && (
                        <span className="font-normal text-slate-600 dark:text-slate-400">, {exp.location}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal shrink-0">
                      {exp.period}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 mt-0.5">
                    {exp.role}
                  </div>

                  {exp.descriptions && exp.descriptions.length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1.5 text-justify">
                      {exp.descriptions.map((desc, dIdx) => (
                        <li key={dIdx}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. PENDIDIKAN / EDUCATION */}
        {education && education.length > 0 && (
          <section className="cv-section mb-7">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'EDUCATION' : 'PENDIDIKAN'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3.5"></div>

            <div className="space-y-3.5">
              {education.map((edu, idx) => (
                <div key={idx} className="cv-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm gap-0.5">
                    <div className="font-bold text-slate-950 dark:text-slate-100">
                      <span>{edu.institution}</span>
                      {edu.location && (
                        <span className="font-normal text-slate-600 dark:text-slate-400">, {edu.location}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal shrink-0">
                      {edu.period}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                    <span>{edu.degree}</span>
                    {edu.major && <span>, {edu.major}</span>}
                  </div>

                  {edu.details && (
                    <div className="text-xs sm:text-[12.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed text-justify">
                      {edu.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. PELATIHAN & SERTIFIKASI / TRAINING & CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <section className="cv-section mb-7">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'TRAINING & CERTIFICATIONS' : 'PELATIHAN & SERTIFIKASI'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3.5"></div>

            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cv-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm gap-0.5">
                    <div className="font-bold text-slate-950 dark:text-slate-100">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {cert.title}
                        </a>
                      ) : (
                        cert.title
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal shrink-0">
                      {cert.period}
                    </div>
                  </div>
                  <div className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-400 mt-0.5">
                    {cert.issuer}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. PUBLIKASI / PUBLICATIONS */}
        {publications && publications.length > 0 && (
          <section className="cv-section mb-7">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'PUBLICATIONS' : 'PUBLIKASI'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3.5"></div>

            <ul className="list-disc list-outside pl-4 space-y-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {publications.map((pub, idx) => (
                <li key={idx} className="cv-item">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="font-normal">{pub.title}</span>. {pub.publisher}, {pub.year}
                    </a>
                  ) : (
                    <span>
                      <span className="font-normal">{pub.title}</span>. {pub.publisher}, {pub.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 6. KEAHLIAN / SKILLS */}
        {skills && skills.length > 0 && (
          <section className="cv-section">
            <h2 className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
              {isEn ? 'SKILLS' : 'KEAHLIAN'}
            </h2>
            <div className="cv-divider h-[1px] bg-slate-300 dark:bg-slate-700 w-full mb-3.5"></div>

            <ul className="list-disc list-outside pl-4 space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {skills.map((skill, idx) => (
                <li key={idx} className="cv-item">
                  <strong className="font-bold text-slate-950 dark:text-white">{skill.category}:</strong>{' '}
                  <span className="text-slate-700 dark:text-slate-300">{skill.description}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
