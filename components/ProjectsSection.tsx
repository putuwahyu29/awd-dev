'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { ProjectData } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectsSectionProps {
  initialProjects: ProjectData[];
  isHomePage?: boolean;
  limit?: number;
}

export default function ProjectsSection({
  initialProjects,
  isHomePage = false,
  limit = 6,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const { t } = useLanguage();

  // Dynamically extract all unique categories across projects (flattening multi-categories)
  const categories = [
    'Semua',
    ...Array.from(new Set(initialProjects.flatMap((p) => p.categories || [p.category]))).sort(),
  ];

  // Filter by category (matching any of project's categories)
  let filteredProjects =
    selectedCategory === 'Semua'
      ? initialProjects
      : initialProjects.filter((p) =>
          (p.categories || [p.category]).includes(selectedCategory)
        );

  // Search filter if on standalone projects page or if user types search
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech_stack.some((tech) => tech.toLowerCase().includes(q))
    );
  }

  // Limit projects if on Homepage
  const displayedProjects = isHomePage ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section id="projects" className="py-16 border-b border-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-bold">
              {isHomePage ? t('Proyek Terbaru & Unggulan', 'Latest & Featured Projects') : t('Etalase Portofolio Lengkap', 'Full Portfolio Showcase')}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-main">
              {isHomePage
                ? t('Proyek Perangkat Lunak Terbaru', 'Recent Software Projects')
                : t('Daftar Seluruh Proyek & Sistem', 'All Projects & Systems List')}{' '}
              ({initialProjects.length})
            </h3>
          </div>

          {isHomePage && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-bold shrink-0"
            >
              <span>{t('Lihat Halaman Semua Proyek', 'View All Projects Page')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-4 mb-8">
          {!isHomePage && (
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('Cari proyek berdasarkan nama atau teknologi...', 'Search projects by name or technology...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-main text-xs font-mono text-main focus:outline-none focus:border-blue-600 transition-colors shadow-2xs"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-card text-sub hover:text-main border border-main'
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-card rounded-lg border border-main text-muted text-sm">
            {t('Tidak ada proyek ditemukan dalam kategori atau pencarian ini.', 'No projects found in this category or search.')}
          </div>
        )}

        {/* Homepage Bottom CTA Button */}
        {isHomePage && initialProjects.length > limit && (
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
            >
              <span>{t(`Lihat Semua ${initialProjects.length} Proyek`, `Explore All ${initialProjects.length} Projects`)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Detail Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
