import fs from 'fs';
import path from 'path';
import { CvData, CvAllData, fallbackCvData, fallbackCvDataEn } from './cv-types';

export * from './cv-types';

const cvJsonPathId = path.join(process.cwd(), 'content', 'cv.json');
const cvJsonPathEn = path.join(process.cwd(), 'content', 'cv.en.json');

export async function getCvData(lang: 'id' | 'en' = 'id'): Promise<CvData> {
  const filePath = lang === 'en' ? cvJsonPathEn : cvJsonPathId;
  const fallback = lang === 'en' ? fallbackCvDataEn : fallbackCvData;

  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      ...fallback,
      ...data,
      personalInfo: {
        ...fallback.personalInfo,
        ...(data.personalInfo || {}),
      },
      experiences: data.experiences || fallback.experiences,
      education: data.education || fallback.education,
      certifications: data.certifications || fallback.certifications,
      publications: data.publications || fallback.publications,
      skills: data.skills || fallback.skills,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return fallback;
  }
}

export async function getAllCvData(): Promise<CvAllData> {
  const [id, en] = await Promise.all([getCvData('id'), getCvData('en')]);
  return { id, en };
}
