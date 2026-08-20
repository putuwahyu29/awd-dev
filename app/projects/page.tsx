import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';

export const metadata: Metadata = {
  title: 'Katalog Seluruh Proyek & Rekam Jejak Sistem',
  description:
    'Eksplorasi katalog 26+ sistem perangkat lunak, aplikasi web enterprise, arsitektur microservices, dan infrastruktur cloud virtualisasi karya I Putu Agus Wahyu Dupayana.',
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: 'Katalog Seluruh Proyek & Sistem | awd.dev',
    description:
      'Daftar lengkap proyek sistem informasi & aplikasi web enterprise oleh I Putu Agus Wahyu Dupayana.',
    url: `${siteUrl}/projects`,
    siteName: 'awd.dev',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Katalog Proyek — I Putu Agus Wahyu Dupayana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalog Proyek & Sistem | awd.dev',
    description:
      'Eksplorasi 26+ sistem informasi dan aplikasi web modern.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  const projectsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/projects/#collectionpage`,
        url: `${siteUrl}/projects`,
        name: 'Katalog Proyek & Sistem — I Putu Agus Wahyu Dupayana',
        description:
          'Daftar lengkap proyek sistem informasi & aplikasi web enterprise oleh I Putu Agus Wahyu Dupayana.',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Proyek',
            item: `${siteUrl}/projects`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-main text-main flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      <Navbar />

      <main className="pt-24">
        {/* Page Header Banner */}
        <div className="bg-card border-b border-main py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Back to Home Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-sub bg-main hover:bg-card-hover border border-main transition-colors w-fit shadow-2xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-main tracking-tight">
                Katalog Seluruh Proyek & Sistem
              </h1>
              <p className="text-sub text-sm sm:text-base mt-1.5 max-w-2xl">
                Eksplorasi seluruh sistem perangkat lunak, aplikasi web enterprise, arsitektur microservices, dan infrastruktur cloud virtualisasi yang telah dibangun ({projects.length} Proyek).
              </p>
            </div>
          </div>
        </div>

        {/* Full Projects Showcase with Search & Filters */}
        <ProjectsSection initialProjects={projects} isHomePage={false} />
      </main>

      <Footer />
    </div>
  );
}
