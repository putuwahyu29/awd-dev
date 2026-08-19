import fs from 'fs';
import path from 'path';
import { CvData, fallbackCvData } from './cv-types';

export * from './cv-types';

const cvJsonPath = path.join(process.cwd(), 'content', 'cv.json');

export async function getCvData(): Promise<CvData> {
  try {
    if (!fs.existsSync(cvJsonPath)) {
      return fallbackCvData;
    }
    const fileContents = fs.readFileSync(cvJsonPath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      ...fallbackCvData,
      ...data,
      personalInfo: {
        ...fallbackCvData.personalInfo,
        ...(data.personalInfo || {}),
      },
      experiences: data.experiences || fallbackCvData.experiences,
      education: data.education || fallbackCvData.education,
      certifications: data.certifications || fallbackCvData.certifications,
      publications: data.publications || fallbackCvData.publications,
      skills: data.skills || fallbackCvData.skills,
    };
  } catch (error) {
    console.error('Error reading content/cv.json:', error);
    return fallbackCvData;
  }
}
