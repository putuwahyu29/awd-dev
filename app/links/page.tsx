import { Metadata } from 'next';
import LinksBioView from '@/components/LinksBioView';
import { getSocialChannels } from '@/lib/socials';

export const metadata: Metadata = {
  title: 'Pusat Tautan & Bio - I Putu Agus Wahyu Dupayana (awd.dev)',
  description: 'Akses cepat seluruh akun resmi media sosial, repositori GitHub, publikasi riset, blog teknis, dan portofolio I Putu Agus Wahyu Dupayana.',
  openGraph: {
    title: 'Pusat Tautan & Bio - I Putu Agus Wahyu Dupayana',
    description: 'Pusat tautan resmi I Putu Agus Wahyu Dupayana. Portofolio, LinkedIn, GitHub, Instagram, TikTok, Threads, Kaggle, & YouTube.',
    url: 'https://awd.dev/links',
    siteName: 'awd.dev Links',
    type: 'website',
  },
};

export const revalidate = 3600;

export default async function BioLinksPage() {
  const socials = await getSocialChannels();
  return <LinksBioView socials={socials} />;
}
