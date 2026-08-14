import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
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

const siteUrl = 'https://awd.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'awd.dev | I Putu Agus Wahyu Dupayana - Software Engineer',
  description:
    'Portofolio resmi I Putu Agus Wahyu Dupayana — Software Engineer & Content Creator. Spesialisasi Next.js, Laravel, Proxmox VE, Docker, dan GCP Cloud Infrastructure.',
  keywords: [
    'I Putu Agus Wahyu Dupayana',
    'awd.dev',
    'awd.my.id',
    'Software Engineer',
    'Content Creator',
    'Next.js Developer',
    'Laravel Developer',
    'Proxmox VE',
    'Docker',
    'GCP Cloud',
    'Software Engineer Indonesia',
    'Portofolio Developer Surabaya',
  ],
  authors: [{ name: 'I Putu Agus Wahyu Dupayana', url: siteUrl }],
  creator: 'I Putu Agus Wahyu Dupayana',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'awd.dev | I Putu Agus Wahyu Dupayana - Software Engineer & Content Creator',
    description:
      'Portofolio profesional Software Engineer & Content Creator. Next.js, Laravel, Proxmox VE, GCP.',
    url: siteUrl,
    siteName: 'awd.dev',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'I Putu Agus Wahyu Dupayana — Software Engineer & Content Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'awd.dev | I Putu Agus Wahyu Dupayana',
    description:
      'Software Engineer & Content Creator — Next.js, Laravel, Proxmox VE, GCP.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
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
      <body
        suppressHydrationWarning
        className="font-sans bg-main text-main antialiased selection:bg-blue-600 selection:text-white min-h-screen"
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <ScrollToTop />
            <GoogleTranslateScript />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
