import { Metadata } from 'next';
import { getCvData } from '@/lib/cv';
import CvPageView from '@/components/CvPageView';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
const pageUrl = `${siteUrl}/cv`;

export const metadata: Metadata = {
  title: 'Curriculum Vitae Resmi | I Putu Agus Wahyu Dupayana (awd.dev)',
  description:
    'Naskah resmi Curriculum Vitae (CV) ATS-Friendly I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect di BPS Provinsi Jawa Timur. Riwayat karir, pendidikan STIS, sertifikasi resmi, publikasi internasional, dan keahlian teknis.',
  keywords: [
    'Curriculum Vitae I Putu Agus Wahyu Dupayana',
    'CV ATS Software Engineer',
    'CV Agus Wahyu',
    'Resume I Putu Agus Wahyu Dupayana',
    'Pranata Komputer BPS CV',
    'Politeknik Statistika STIS CV',
    'Resume Next.js Laravel Developer',
    'awd.my.id/cv',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Curriculum Vitae Resmi | I Putu Agus Wahyu Dupayana',
    description:
      'Naskah resmi Curriculum Vitae ATS-Friendly I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect.',
    url: pageUrl,
    siteName: 'awd.dev',
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Curriculum Vitae — I Putu Agus Wahyu Dupayana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curriculum Vitae | I Putu Agus Wahyu Dupayana',
    description:
      'Software Engineer & Systems Architect — Unduh & Lihat Naskah Resmi CV ATS.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
};

export const revalidate = 3600;

export default async function CvPage() {
  const cvData = await getCvData();

  const cvJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${pageUrl}/#aboutpage`,
        url: pageUrl,
        name: 'Curriculum Vitae — I Putu Agus Wahyu Dupayana',
        description:
          'Naskah resmi Curriculum Vitae I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect.',
        mainEntity: {
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
            name: 'Curriculum Vitae',
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cvJsonLd) }}
      />
      <CvPageView cvData={cvData} />
    </>
  );
}

