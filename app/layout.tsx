import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CvModalProvider } from '@/context/CvModalContext';
import CvPreviewModal from '@/components/CvPreviewModal';
import GoogleTranslateScript from '@/components/GoogleTranslateScript';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'awd.dev | I Putu Agus Wahyu Dupayana - Software Engineer & Systems Architect',
    template: '%s | awd.dev',
  },
  description:
    'Portofolio resmi dan rekam jejak sistem I Putu Agus Wahyu Dupayana — Software Engineer, Systems Architect, & Pranata Komputer Ahli Pertama di BPS Jatim. Spesialisasi Next.js, Laravel, Proxmox VE, Docker, Agentic AI, dan GCP Cloud.',
  keywords: [
    'I Putu Agus Wahyu Dupayana',
    'Agus Wahyu',
    'awd.dev',
    'awd.my.id',
    'putuwahyu29',
    'Software Engineer Indonesia',
    'Systems Architect',
    'Pranata Komputer Ahli Pertama',
    'BPS Provinsi Jawa Timur',
    'Politeknik Statistika STIS',
    'Next.js Developer',
    'Laravel Developer',
    'Filament PHP',
    'Proxmox VE',
    'Docker Virtualization',
    'Google Cloud Platform GCP',
    'Agentic AI',
    'Retrieval-Augmented Generation RAG',
    'Portofolio Developer Surabaya',
  ],
  authors: [{ name: 'I Putu Agus Wahyu Dupayana', url: siteUrl }],
  creator: 'I Putu Agus Wahyu Dupayana',
  publisher: 'I Putu Agus Wahyu Dupayana',
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'awd.dev | I Putu Agus Wahyu Dupayana - Software Engineer & Systems Architect',
    description:
      'Portofolio resmi Software Engineer & Systems Architect. Arsitektur Next.js, Laravel, Proxmox VE, Docker, AI/LLMs, dan GCP Cloud.',
    url: siteUrl,
    siteName: 'awd.dev',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'awd.dev | I Putu Agus Wahyu Dupayana - Software Engineer',
    description:
      'Software Engineer & Systems Architect — Next.js, Laravel, Proxmox VE, Docker, RAG AI, GCP.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'id-ID': siteUrl,
      'en-US': siteUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'I Putu Agus Wahyu Dupayana',
      alternateName: ['Agus Wahyu', 'awd', 'awd.dev', 'putuwahyu29'],
      jobTitle: 'Software Engineer & Systems Architect',
      description:
        'Software Engineer & Systems Architect spesialisasi Next.js, Laravel, Proxmox VE, Docker, Agentic AI, dan Google Cloud Platform (GCP). Pranata Komputer Ahli Pertama di BPS Provinsi Jawa Timur.',
      url: siteUrl,
      image: `${siteUrl}/foto-profil.jpg`,
      email: 'mailto:aguswahyu@office.awd.my.id',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surabaya',
        addressRegion: 'Jawa Timur',
        addressCountry: 'ID',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Politeknik Statistika STIS',
        url: 'https://stis.ac.id',
      },
      worksFor: {
        '@type': 'GovernmentOrganization',
        name: 'Badan Pusat Statistik (BPS) Provinsi Jawa Timur',
        url: 'https://jatim.bps.go.id',
      },
      sameAs: [
        'https://github.com/putuwahyu29',
        'https://linkedin.com/in/aguswahyu',
        'https://instagram.com/aguswahyu.dev',
        'https://tiktok.com/@aguswahyu.dev',
        'https://threads.net/@aguswahyu.dev',
        'https://kaggle.com/aguswahyu',
        'https://youtube.com/@aguswahyudev',
        'https://doi.org/10.34123/icdsos.v2025i1.591',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Laravel',
        'PHP',
        'Filament PHP',
        'Proxmox VE',
        'Docker',
        'Docker Compose',
        'Google Cloud Platform (GCP)',
        'Artificial Intelligence',
        'Retrieval-Augmented Generation (RAG)',
        'Agentic AI',
        'PostgreSQL',
        'MySQL',
        'Linux Server Administration',
        'Systems Architecture',
        'Web Performance Optimization',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'awd.dev',
      alternateName: 'I Putu Agus Wahyu Dupayana Official Portfolio',
      description:
        'Portofolio resmi dan studi kasus arsitektur perangkat lunak oleh I Putu Agus Wahyu Dupayana.',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      inLanguage: ['id-ID', 'en-US'],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'I Putu Agus Wahyu Dupayana — Profile & Engineering Portfolio',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${mono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans bg-main text-main antialiased selection:bg-blue-600 selection:text-white min-h-screen"
      >
        <ThemeProvider>
          <LanguageProvider>
            <CvModalProvider>
              {children}
              <CvPreviewModal />
              <ScrollToTop />
              <GoogleTranslateScript />
            </CvModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

