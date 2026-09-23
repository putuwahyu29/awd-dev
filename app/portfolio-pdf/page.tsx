import { Metadata } from 'next';
import { getHeroData } from '@/lib/hero';
import { getAboutData } from '@/lib/about';
import { getProjects } from '@/lib/projects';
import { getGitHubRepos } from '@/lib/github';
import { getPublications } from '@/lib/publications';
import { getCertifications } from '@/lib/certifications';
import { getContactData } from '@/lib/contact';
import { getSocialChannels } from '@/lib/socials';
import PortfolioPdfView from '@/components/PortfolioPdfView';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
const pageUrl = `${siteUrl}/portfolio-pdf`;

export const metadata: Metadata = {
  title: 'Portofolio | I Putu Agus Wahyu Dupayana',
  description:
    'Dokumen portofolio proyek, repositori GitHub, publikasi ilmiah, dan sertifikasi teknis I Putu Agus Wahyu Dupayana.',
  keywords: [
    'Portofolio I Putu Agus Wahyu Dupayana',
    'Portfolio Software Engineer',
    'Showcase Proyek Agus Wahyu',
    'Portofolio Agus Wahyu Dupayana',
    'awd.my.id/portfolio-pdf',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Portofolio | I Putu Agus Wahyu Dupayana',
    description:
      'Dokumen portofolio proyek dan pencapaian teknis I Putu Agus Wahyu Dupayana.',
    url: pageUrl,
    siteName: 'awd.dev',
    type: 'profile',
  },
};

export const revalidate = 3600;

export default async function PortfolioPdfPage() {
  const [
    hero,
    about,
    projects,
    githubRepos,
    publications,
    certifications,
    contact,
    socials,
  ] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getProjects(),
    getGitHubRepos(),
    getPublications(),
    getCertifications(),
    getContactData(),
    getSocialChannels(),
  ]);

  const portfolioData = {
    hero,
    about,
    projects,
    githubRepos,
    publications,
    certifications,
    contact,
    socials,
  };

  return <PortfolioPdfView data={portfolioData} />;
}
