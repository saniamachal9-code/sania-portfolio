import React, { useState } from 'react';
import { PROJECTS_LIST, Project } from '../data/portfolioData';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'games' | 'websites' | 'marketing'>('all');

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'games', label: 'Games' },
    { id: 'websites', label: 'Websites' },
    { id: 'marketing', label: 'Digital Marketing' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-t border-slate-200 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header: Short & Minimal */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Real Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              My Games & Websites
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Real projects built with code, responsive design, and growth strategy.
            </p>
          </div>

          {/* Clean Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id as typeof activeFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeFilter === opt.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid in White & Blue */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 text-[11px] font-mono-code text-blue-800 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-full border border-blue-200 font-semibold shadow-xs">
                  {project.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-slate-100 text-center bg-slate-50/70 rounded-lg">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="font-display font-bold text-sm text-blue-600">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono-code truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech tags & View info */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>{project.tags[0]}</span>
                    <span>·</span>
                    <span>{project.tags[1]}</span>
                  </div>

                  <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Info</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
