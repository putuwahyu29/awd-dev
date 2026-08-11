import fs from 'fs';
import path from 'path';

export interface HeroData {
  name: string;
  role: string;
  roleEn: string;
  bioId: string;
  bioEn: string;
  cvUrl: string;
  profileImage: string;
  highlights: {
    number: string;
    labelId: string;
    labelEn: string;
  }[];
  coreTechStack: string[];
}

const heroJsonPath = path.join(process.cwd(), 'content', 'hero.json');

export async function getHeroData(): Promise<HeroData> {
  const fallback: HeroData = {
    name: 'I Putu Agus Wahyu Dupayana',
    role: 'Software Engineer & Content Creator',
    roleEn: 'Software Engineer & Content Creator',
    bioId: 'Pengembang perangkat lunak yang berfokus pada pembangunan sistem web berkinerja tinggi, arsitektur Next.js & Laravel, integrasi LLMs & AI Systems, pengelolaan infrastruktur server Proxmox VE & Docker, serta otomatisasi cloud di Google Cloud Platform (GCP).',
    bioEn: 'Software engineer focused on building high-performance web systems, Next.js & Laravel architecture, LLMs & AI Systems integration, Proxmox VE & Docker server virtualization infrastructure, and Google Cloud Platform (GCP) cloud automation.',
    cvUrl: '/cv.pdf',
    profileImage: '/foto-profil.jpg',
    highlights: [
      { number: '21+', labelId: 'Proyek', labelEn: 'Projects' },
      { number: '4+ Tahun', labelId: 'Pengalaman Kerja', labelEn: 'Years Experience' },
      { number: '500+', labelId: 'Kontribusi GitHub', labelEn: 'GitHub Contributions' },
    ],
    coreTechStack: [
      'LLMs & AI Integration',
      'Next.js',
      'TypeScript',
      'Laravel',
      'Filament PHP',
      'Proxmox VE',
      'Docker',
      'GCP Cloud',
      'PostgreSQL',
      'Tailwind CSS',
    ],
  };

  try {
    if (!fs.existsSync(heroJsonPath)) {
      return fallback;
    }
    const fileContents = fs.readFileSync(heroJsonPath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      ...fallback,
      ...data,
    };
  } catch (error) {
    console.error('Error reading content/hero.json:', error);
    return fallback;
  }
}
