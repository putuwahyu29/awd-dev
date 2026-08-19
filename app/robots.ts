import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/keystatic/', '/api/keystatic/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'meta-externalagent',
          'Bytespider',
          'Amazonbot',
          'Diffbot',
          'Googlebot',
          'Bingbot',
          'YandexBot',
          'DuckDuckBot',
          'Slurp',
          'Baiduspider',
        ],
        allow: '/',
        disallow: ['/admin/', '/keystatic/', '/api/keystatic/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

