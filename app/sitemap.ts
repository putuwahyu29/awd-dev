import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
  const projects = await getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proyek`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/link`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => {
    let lastModified = new Date();
    if (p.date) {
      const parsed = new Date(p.date);
      if (!isNaN(parsed.getTime())) {
        lastModified = parsed;
      }
    }
    return {
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
