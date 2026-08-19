import { Metadata } from 'next';
import LinksBioView from '@/components/LinksBioView';
import { getSocialChannels } from '@/lib/socials';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';

export const metadata: Metadata = {
  title: 'Pusat Tautan & Bio Resmi | I Putu Agus Wahyu Dupayana (awd.dev)',
  description:
    'Pusat tautan resmi I Putu Agus Wahyu Dupayana (awd.dev) — Akses cepat seluruh akun media sosial resmi (LinkedIn, GitHub, Instagram, TikTok, Threads, Kaggle, YouTube, Google Scholar), Curriculum Vitae, dan portofolio sistem.',
  keywords: [
    'I Putu Agus Wahyu Dupayana links',
    'Agus Wahyu Bio Link',
    'awd.dev links',
    'awd.my.id/links',
    'putuwahyu29 GitHub',
    'Agus Wahyu LinkedIn',
    'Media Sosial Resmi I Putu Agus Wahyu Dupayana',
    'Software Engineer Bio Link',
  ],
  alternates: {
    canonical: `${siteUrl}/links`,
  },
  openGraph: {
    title: 'Pusat Tautan & Bio Resmi — I Putu Agus Wahyu Dupayana',
    description:
      'Pusat tautan resmi I Putu Agus Wahyu Dupayana. Akses langsung Portofolio, CV, GitHub, LinkedIn, Instagram, TikTok, Threads, Kaggle, Google Scholar, & YouTube.',
    url: `${siteUrl}/links`,
    siteName: 'awd.dev Links',
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pusat Tautan Resmi — I Putu Agus Wahyu Dupayana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pusat Tautan & Bio | I Putu Agus Wahyu Dupayana',
    description:
      'Akses cepat seluruh tautan resmi media sosial dan profil developer.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
};

export const revalidate = 3600;

export default async function BioLinksPage() {
  const socials = await getSocialChannels();

  const linksJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/links/#profilepage`,
        url: `${siteUrl}/links`,
        name: 'Pusat Tautan & Bio — I Putu Agus Wahyu Dupayana',
        description:
          'Akses cepat seluruh akun resmi media sosial, repositori GitHub, publikasi riset, blog teknis, dan portofolio I Putu Agus Wahyu Dupayana.',
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ItemList',
        name: 'Tautan & Saluran Resmi I Putu Agus Wahyu Dupayana',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Website Portofolio Utama (awd.dev)',
            url: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Curriculum Vitae',
            url: `${siteUrl}/cv`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'LinkedIn Profile',
            url: 'https://www.linkedin.com/in/aguswahyu/',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'GitHub Repositories',
            url: 'https://github.com/putuwahyu29',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Google Scholar Profile',
            url: 'https://scholar.google.com/citations?user=NeiAOi8AAAAJ',
          },
        ],
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
            name: 'Pusat Tautan & Bio',
            item: `${siteUrl}/links`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(linksJsonLd) }}
      />
      <LinksBioView socials={socials} />
    </>
  );
}

