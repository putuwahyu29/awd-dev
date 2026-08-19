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

export const metadata: Metadata = {
  title: 'Presentation Mode | I Putu Agus Wahyu Dupayana',
  description: 'Interactive presentation deck and pitch showcase of I Putu Agus Wahyu Dupayana - Software Engineer & Systems Architect.',
  openGraph: {
    title: 'Presentation Mode | I Putu Agus Wahyu Dupayana',
    description: 'Interactive pitch deck for client presentations, interviews, and portfolio showcase.',
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
