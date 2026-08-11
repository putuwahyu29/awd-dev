'use client';

import { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ContactData } from '@/lib/contact';

interface ContactSectionProps {
  data?: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const email = data?.email || 'iputuaguswahyu@gmail.com';
  const { t, lang } = useLanguage();

  const availability = lang === 'en' && data?.availabilityEn ? data.availabilityEn : data?.availabilityId || t(
    'Saya selalu terbuka untuk diskusi proyek rekayasa web, konsultasi infrastruktur server Proxmox VE & Docker, atau kolaborasi riset & teknologi.',
    'I am always open to web engineering project discussions, Proxmox VE & Docker server infrastructure consultations, or research & tech collaborations.'
  );

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 border-b border-main bg-main">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-xl mx-auto space-y-3 mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center gap-1.5">
            <Mail className="w-4 h-4" />
            {t('Kontak', 'Contact')}
          </h2>

          <h3 className="text-2xl sm:text-3xl font-bold text-main tracking-tight">
            {t('Mari Terhubung & Berkolaborasi', "Let's Connect & Collaborate")}
          </h3>

          <p className="text-sub text-xs sm:text-sm leading-relaxed">
            {availability}
          </p>
        </div>

        {/* Minimal Card */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-card border border-main shadow-sm space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-mono text-muted">
              {t('Alamat Email Resmi:', 'Official Email Address:')}
            </p>
            <p className="text-lg sm:text-xl font-mono font-bold text-main break-all tracking-tight selection:bg-blue-600 selection:text-white">
              {email}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
            <a
              href={`mailto:${email}?subject=Kolaborasi%20Proyek%20-%20awd.dev`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('Kirim Email', 'Send Email')}</span>
            </a>

            <button
              onClick={copyEmail}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-main bg-main hover:bg-card-hover border border-main transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">{t('Tersalin!', 'Copied!')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sub" />
                  <span>{t('Salin Email', 'Copy Email')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
