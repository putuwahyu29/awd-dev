import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Code2, CheckCircle } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectGallerySlideshow from '@/components/ProjectGallerySlideshow';

interface ProjectSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan - awd.dev',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const ogImage = project.image_preview
    ? (project.image_preview.startsWith('http') ? project.image_preview : `${siteUrl}${project.image_preview}`)
    : `${siteUrl}/og-image.jpg`;

  return {
    title: `${project.title} — Studi Kasus & Detail Arsitektur`,
    description: project.description || `Detail sistem dan studi kasus proyek ${project.title} karya I Putu Agus Wahyu Dupayana.`,
    alternates: {
      canonical: pageUrl,
    },
    keywords: [
      project.title,
      ...project.categories,
      ...project.tech_stack,
      'I Putu Agus Wahyu Dupayana',
      'awd.dev',
      'Software Architecture',
    ],
    openGraph: {
      title: `${project.title} — Studi Kasus & Detail Proyek | awd.dev`,
      description: project.description,
      url: pageUrl,
      siteName: 'awd.dev',
      type: 'article',
      publishedTime: project.date ? new Date(project.date).toISOString() : undefined,
      authors: [`${siteUrl}/#person`],
      tags: [...project.categories, ...project.tech_stack],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | awd.dev`,
      description: project.description,
      images: [ogImage],
      creator: '@putuwahyu29',
    },
  };
}


export default async function ProjectDetailPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const allImages = [...(project.images || [])];
  if (allImages.length === 0 && project.image_preview) {
    allImages.push(project.image_preview);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awd.my.id';
  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const ogImage = project.image_preview
    ? (project.image_preview.startsWith('http') ? project.image_preview : `${siteUrl}${project.image_preview}`)
    : `${siteUrl}/og-image.jpg`;

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Proyek',
            item: `${siteUrl}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        url: pageUrl,
        image: ogImage,
        applicationCategory: project.categories.join(', ') || 'Software Development',
        operatingSystem: 'Web, Linux, Cloud Infrastructure',
        author: {
          '@id': `${siteUrl}/#person`,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
      },
      {
        '@type': 'TechArticle',
        headline: `${project.title} — Studi Kasus & Detail Arsitektur`,
        description: project.description,
        url: pageUrl,
        image: ogImage,
        datePublished: project.date ? new Date(project.date).toISOString() : new Date().toISOString(),
        author: {
          '@id': `${siteUrl}/#person`,
        },
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
        mainEntityOfPage: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-main text-main flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Navbar />


      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        {/* Top Header & Breadcrumb Bar */}
        <div className="bg-card border-b border-main py-6 sm:py-10">
          <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-sub bg-main hover:bg-card-hover border border-main transition-colors w-fit shadow-2xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali ke Katalog Proyek</span>
              </Link>
            </div>

            <div className="space-y-2.5">
              {/* Category Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                  >
                    {cat}
                  </span>
                ))}
                {project.date && (
                  <span className="flex items-center gap-1 text-xs font-mono text-muted border border-main px-2.5 py-0.5 rounded-md bg-main">
                    <Calendar className="w-3 h-3 text-sub" />
                    {project.date}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-main tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-sub text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                {project.description}
              </p>
            </div>

            {/* External Link Action Button */}
            {project.link && (
              <div className="pt-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                >
                  <span>Kunjungi Sistem / Demo Terpublikasi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Case Study Main Content */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
          {/* Interactive Slideshow Gallery Showcase */}
          {allImages.length > 0 && (
            <ProjectGallerySlideshow images={allImages} title={project.title} />
          )}

          {/* Tech Stack Metadata Section */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="p-5 sm:p-6 rounded-xl bg-card border border-main space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sub font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Teknologi & Infrastruktur yang Digunakan
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-main text-main border border-main shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Markdown Content */}
          {project.contentHtml && (
            <div className="p-5 sm:p-7 rounded-xl bg-card border border-main space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sub font-bold flex items-center gap-2 pb-2 border-b border-main">
                <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Detail Arsitektur & Catatan Studi Kasus
              </h3>
              <div
                className="prose max-w-none text-sub text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.contentHtml.replace(/<img[^>]*>/gi, '') }}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
