import { Metadata } from 'next';
import { getCvData } from '@/lib/cv';
import CvPageView from '@/components/CvPageView';

export const metadata: Metadata = {
  title: 'Curriculum Vitae | I Putu Agus Wahyu Dupayana',
  description:
    'Naskah resmi Curriculum Vitae I Putu Agus Wahyu Dupayana — Software Engineer & Systems Engineer.',
};

export default async function CvPage() {
  const cvData = await getCvData();
  return <CvPageView cvData={cvData} />;
}
