import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  categories: string[];
  image_preview: string;
  images: string[];
  link?: string;
  featured?: boolean;
  date: string;
  contentHtml: string;
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function getProjects(): Promise<ProjectData[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);

  const allProjectsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);

        const processedContent = await remark()
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();

        const rawCategories = [
          ...(Array.isArray(data.categories) ? data.categories : []),
          ...(Array.isArray(data.custom_categories) ? data.custom_categories : []),
          ...(Array.isArray(data.category) ? data.category : []),
          ...(typeof data.category === 'string' ? [data.category] : []),
        ];

        const categories = Array.from(new Set(rawCategories.map((c) => String(c).trim()).filter(Boolean)));
        const category = categories[0] || '';

        const rawTechStack = [
          ...(Array.isArray(data.tech_stack) ? data.tech_stack : []),
          ...(Array.isArray(data.custom_tech_stack) ? data.custom_tech_stack : []),
        ];
        const tech_stack = Array.from(new Set(rawTechStack.map((t) => String(t).trim()).filter(Boolean)));

        // Auto-discover all images in public/images/projects/<slug>/
        const projectImagesDir = path.join(process.cwd(), 'public/images/projects', slug);
        let images: string[] = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
        if (images.length === 0 && fs.existsSync(projectImagesDir)) {
          const files = fs.readdirSync(projectImagesDir);
          images = files
            .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
            .sort((a, b) => {
              // preview.png first, then detail-1, detail-2...
              if (a.startsWith('preview')) return -1;
              if (b.startsWith('preview')) return 1;
              return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
            })
            .map((f) => `/images/projects/${slug}/${f}`);
        }

        if (images.length === 0 && data.image_preview) {
          images.push(data.image_preview);
        }

        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          tech_stack,
          category,
          categories,
          image_preview: data.image_preview || images[0] || '',
          images,
          link: data.link || '',
          featured: Boolean(data.featured),
          date: data.date || '',
          contentHtml,
        } as ProjectData;
      })
  );

  return allProjectsData
    .filter((p) => p.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
