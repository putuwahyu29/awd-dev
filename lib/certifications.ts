import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeImageUrl?: string;
  skills: string[];
  level?: string;
  source?: 'manual';
}

const certificationsDirectory = path.join(process.cwd(), 'content', 'certifications');

export async function getCertifications(): Promise<Certification[]> {
  try {
    if (!fs.existsSync(certificationsDirectory)) return [];

    const fileNames = fs.readdirSync(certificationsDirectory);
    const certs: Certification[] = fileNames
      .filter((f) => f.endsWith('.md'))
      .map((fileName) => {
        const fullPath = path.join(certificationsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
          id: data.id || fileName.replace(/\.md$/, ''),
          title: data.title || '',
          issuer: data.issuer || '',
          issueDate: String(data.issueDate || ''),
          credentialId: data.credentialId || '',
          credentialUrl: data.credentialUrl || '',
          badgeImageUrl: data.badgeImageUrl || '',
          skills: data.skills || [],
          level: data.level || '',
          source: 'manual' as const,
        };
      });

    return certs.sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  } catch (error) {
    console.error('Error reading certifications:', error);
    return [];
  }
}
