'use client';

import { Code2, Server, Cloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Code2,
      title: t('Full-Stack Web Development', 'Full-Stack Web Development'),
      description: t(
        'Pengembangan aplikasi web berskala enterprise menggunakan Next.js (TypeScript) & Laravel. Berfokus pada arsitektur modular, clean code, dan integrasi API yang terstruktur.',
        'Enterprise-scale web application development using Next.js (TypeScript) & Laravel. Focused on modular architecture, clean code, and structured API integrations.'
      ),
    },
    {
      icon: Server,
      title: t('Virtualisasi & Server Homelab', 'Virtualization & Homelab Server'),
      description: t(
        'Pengelolaan klaster virtualisasi Proxmox VE, kontainerisasi Docker Swarm, Nginx reverse proxy, pemantauan Prometheus/Grafana, dan otomatisasi backup.',
        'Proxmox VE virtualization cluster management, Docker Swarm containerization, Nginx reverse proxy, Prometheus/Grafana monitoring, and automated backups.'
      ),
    },
    {
      icon: Cloud,
      title: t('Cloud & Database Security', 'Cloud & Database Security'),
      description: t(
        'Penggelaran aplikasi di Google Cloud Platform (GCP), optimasi query database PostgreSQL & MySQL, dan arsitektur otentikasi berbasis peran (RBAC).',
        'Application deployment on Google Cloud Platform (GCP), PostgreSQL & MySQL database query optimization, and role-based authentication architecture (RBAC).'
      ),
    },
  ];

  return (
    <section id="about" className="py-16 border-b border-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-bold">
            {t('Tentang & Keahlian', 'About & Expertise')}
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-main">
            {t('Fokus Rekayasa Perangkat Lunak & Infrastruktur', 'Software Engineering & Infrastructure Focus')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-main hover:border-sub transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-md bg-main border border-main flex items-center justify-center text-main mb-4">
                  <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-main mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sub text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
