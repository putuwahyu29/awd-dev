import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string;
  doi?: string;
  link?: string;
  type: 'Jurnal Ilmiah' | 'Konferensi' | 'Whitepaper' | 'Prosiding';
  abstract: string;
  tags: string[];
}

const publicationsDirectory = path.join(process.cwd(), 'content', 'publications');

export async function getPublications(): Promise<Publication[]> {
  try {
    if (!fs.existsSync(publicationsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(publicationsDirectory);
    const allPubsData: Publication[] = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const fullPath = path.join(publicationsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          id: matterResult.data.id || fileName.replace(/\.md$/, ''),
          title: matterResult.data.title || '',
          journal: matterResult.data.journal || '',
          year: String(matterResult.data.year || ''),
          authors: matterResult.data.authors || '',
          doi: matterResult.data.doi || '',
          link: matterResult.data.link || '',
          type: matterResult.data.type || 'Konferensi',
          abstract: matterResult.content.trim() || matterResult.data.abstract || '',
          tags: matterResult.data.tags || [],
        };
      });

    return allPubsData.sort((a, b) => Number(b.year) - Number(a.year));
  } catch (error) {
    console.error('Error reading publications markdown files:', error);
    return [];
  }
}
