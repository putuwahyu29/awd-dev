import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';
import { getPublications } from '@/lib/publications';
import { getCertifications } from '@/lib/certifications';
import { getSocialChannels } from '@/lib/socials';
import { getLatestBlogPosts } from '@/lib/rss';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Proyek' | 'Sertifikasi' | 'Publikasi' | 'Blog' | 'Media Sosial' | 'Presentasi' | 'Tautan';
  url: string;
  isExternal?: boolean;
}

export async function GET() {
  try {
    const [projects, publications, certs, socials, blogs] = await Promise.all([
      getProjects(),
      getPublications(),
      getCertifications(),
      getSocialChannels(),
      getLatestBlogPosts(6),
    ]);

    const items: SearchItem[] = [
      // Quick Mode Shortcuts
      {
        id: 'mode-cv',
        title: '📄 Curriculum Vitae',
        subtitle: 'Naskah resmi Curriculum Vitae I Putu Agus Wahyu Dupayana (/cv)',
        category: 'Tautan' as const,
        url: '/cv',
        isExternal: false,
      },
      {
        id: 'mode-links',
        title: '🔗 Pusat Tautan & Bio (Bio Links Hub)',
        subtitle: 'Akses cepat seluruh tautan resmi sosial media, GitHub, dan profil kontak (/links)',
        category: 'Tautan' as const,
        url: '/links',
        isExternal: false,
      },
      {
        id: 'mode-presentation',
        title: '🎬 Mode Presentasi (Presentation Deck)',
        subtitle: 'Slide interaktif layar penuh pitch deck portofolio & proyek (/presentation)',
        category: 'Presentasi' as const,
        url: '/presentation',
        isExternal: false,
      },

      // Projects
      ...projects.map((p) => ({
        id: `proj-${p.slug}`,
        title: p.title,
        subtitle: p.description || p.tech_stack.join(', '),
        category: 'Proyek' as const,
        url: `/projects/${p.slug}`,
        isExternal: false,
      })),

      // Certifications
      ...certs.map((c) => ({
        id: `cert-${c.id || c.title}`,
        title: c.title,
        subtitle: `${c.issuer} (${c.issueDate || ''})`,
        category: 'Sertifikasi' as const,
        url: c.credentialUrl || '/#certifications',
        isExternal: Boolean(c.credentialUrl),
      })),

      // Publications
      ...publications.map((pub) => ({
        id: `pub-${pub.id || pub.title}`,
        title: pub.title,
        subtitle: `${pub.journal} (${pub.year})`,
        category: 'Publikasi' as const,
        url: pub.link || '/#publications',
        isExternal: Boolean(pub.link),
      })),

      // Blogs
      ...blogs.map((b, idx) => ({
        id: `blog-${idx}`,
        title: b.title,
        subtitle: b.snippet || b.pubDate,
        category: 'Blog' as const,
        url: b.link,
        isExternal: true,
      })),

      // Socials
      ...socials.map((s) => ({
        id: `social-${s.id}`,
        title: s.name,
        subtitle: `${s.handle} - ${s.role}`,
        category: 'Media Sosial' as const,
        url: s.url,
        isExternal: true,
      })),
    ];

    return NextResponse.json(items, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
