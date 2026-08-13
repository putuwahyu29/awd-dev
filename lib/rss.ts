import Parser from 'rss-parser';

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  categories?: string[];
  readTime?: string;
}

const parser = new Parser({
  customFields: {
    item: ['category', 'content:encoded', 'description'],
  },
});

export async function getLatestBlogPosts(limit = 6): Promise<BlogPost[]> {
  const feedUrl = process.env.RSS_FEED_URL || 'https://blog.awd.my.id/rss.xml';

  try {
    const res = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'AWD-Portfolio-Web',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const xmlText = await res.text();
    const feed = await parser.parseString(xmlText);
    if (!feed.items || feed.items.length === 0) {
      return [];
    }

    const posts: BlogPost[] = feed.items.slice(0, limit).map((item) => {
      let pubDate = '';
      if (item.pubDate) {
        try {
          pubDate = new Date(item.pubDate).toISOString().split('T')[0];
        } catch {
          pubDate = item.pubDate;
        }
      }

      interface RSSItemExtended {
        'content:encoded'?: string;
        description?: string;
        content?: string;
        contentSnippet?: string;
        category?: string;
      }

      const itemExtended = item as unknown as RSSItemExtended;
      const rawContent = itemExtended['content:encoded'] || itemExtended.description || itemExtended.content || itemExtended.contentSnippet || '';
      const cleanSnippet = typeof rawContent === 'string'
        ? rawContent.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()
        : '';

      const snippet = cleanSnippet ? cleanSnippet.slice(0, 160) + '...' : '';

      const categories = Array.isArray(item.categories)
        ? item.categories
        : itemExtended.category
        ? [itemExtended.category]
        : [];

      return {
        title: item.title || '',
        link: item.link || feedUrl,
        pubDate,
        snippet,
        categories,
        readTime: '4 min read',
      };
    });

    return posts.filter((p) => p.title);
  } catch (error) {
    console.warn('Gagal memuat RSS feed:', error);
    return [];
  }
}
