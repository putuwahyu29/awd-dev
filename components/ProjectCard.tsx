'use client';

import { ArrowRight, Eye, Layers } from 'lucide-react';
import { ProjectData } from '@/lib/projects';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectCardProps {
  project: ProjectData;
  onSelect: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t } = useLanguage();
  const categoryList = project.categories && project.categories.length > 0 ? project.categories : [project.category];

  return (
    <div
      onClick={() => onSelect(project)}
      className="group bg-card hover:bg-card-hover border border-main hover:border-blue-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-2xs hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image Preview Container */}
      <div className="relative h-52 w-full overflow-hidden bg-main border-b border-main">
        <img
          src={project.image_preview}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/foto-profil.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Pills (Renders all categories if project has multiple) */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[85%]">
          {categoryList.map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase bg-slate-900 text-white dark:bg-slate-800 dark:text-white border border-slate-700 shadow-md font-bold flex items-center gap-1.5"
            >
              <Layers className="w-3 h-3 text-blue-400 shrink-0" />
              {cat}
            </span>
          ))}
        </div>

        {/* Hover Eye Overlay Hint */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-600 text-white font-bold shadow-md flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {t('Pratinjau', 'Preview')}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base sm:text-lg font-bold text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {project.title}
            </h4>
          </div>
          <p className="text-sub text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-main text-main font-semibold border border-main"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-main text-sub font-semibold border border-main">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Action Button Footer */}
        <div className="pt-3 border-t border-main flex items-center justify-between text-xs font-mono">
          <span className="text-xs font-mono text-sub font-medium">{project.date}</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            {t('Lihat Detail Proyek', 'View Details')}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
