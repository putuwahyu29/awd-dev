import fs from 'fs';
import path from 'path';

export interface AboutData {
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  bioId: string;
  bioEn: string;
  pillars: {
    titleId: string;
    titleEn: string;
    descId: string;
    descEn: string;
  }[];
}

const aboutJsonPath = path.join(process.cwd(), 'content', 'about.json');

export async function getAboutData(): Promise<AboutData> {
  const fallback: AboutData = {
    titleId: 'Tentang Saya',
    titleEn: 'About Me',
    subtitleId: 'Rekayasa Sistem, Arsitektur Web, & Inovasi Teknologi',
    subtitleEn: 'System Engineering, Web Architecture, & Tech Innovation',
    bioId: 'Saya adalah seorang Software Engineer berdedikasi dengan fokus pada pengembangan sistem perangkat lunak yang andal, scalable, dan modern.',
    bioEn: 'I am a dedicated Software Engineer focused on developing reliable, scalable, and modern software systems.',
    pillars: [],
  };

  try {
    if (!fs.existsSync(aboutJsonPath)) {
      return fallback;
    }
    const fileContents = fs.readFileSync(aboutJsonPath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      ...fallback,
      ...data,
    };
  } catch (error) {
    console.error('Error reading content/about.json:', error);
    return fallback;
  }
}
