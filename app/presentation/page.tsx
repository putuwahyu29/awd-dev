import { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import { getPublications } from '@/lib/publications';
import { getCertifications } from '@/lib/certifications';
import { getSocialChannels } from '@/lib/socials';
import { getHeroData } from '@/lib/hero';
import { getAboutData } from '@/lib/about';
import { getContactData } from '@/lib/contact';

import PresentationDeck from '@/components/PresentationDeck';

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
const pageUrl = `${siteUrl}/presentation`;

export const metadata: Metadata = {
  title: 'Mode Presentasi Interaktif | I Putu Agus Wahyu Dupayana',
  description:
    'Slide interaktif layar penuh (pitch deck) dan arsitektur sistem I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Mode Presentasi Interaktif | I Putu Agus Wahyu Dupayana',
    description:
      'Slide interaktif layar penuh dan showcase portofolio arsitektur perangkat lunak I Putu Agus Wahyu Dupayana.',
    url: pageUrl,
    siteName: 'awd.dev',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Presentation Mode — I Putu Agus Wahyu Dupayana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mode Presentasi | I Putu Agus Wahyu Dupayana',
    description:
      'Slide interaktif pitch deck arsitektur perangkat lunak dan portofolio.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@putuwahyu29',
  },
};


export default async function PresentationPage() {
  const [projects, publications, certifications, socialChannels, heroData, aboutData, contactData] =
    await Promise.all([
      getProjects(),
      getPublications(),
      getCertifications(),
      getSocialChannels(),
      getHeroData(),
      getAboutData(),
      getContactData(),
    ]);

  return (
    <PresentationDeck
      heroData={heroData}
      aboutData={aboutData}
      projects={projects}
      certifications={certifications}
      publications={publications}
      socialChannels={socialChannels}
      contactData={contactData}
    />
  );
}
