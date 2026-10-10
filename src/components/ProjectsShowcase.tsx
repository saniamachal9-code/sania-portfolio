import React, { useState } from 'react';
import { PROJECTS_LIST, SOCIAL_LINKS, type Project } from '../data/portfolioData';
import { trackEvent, trackProjectOpen } from '../lib/analytics';
import { PlaceholderImage } from './PlaceholderImage';
import { useT } from '../lib/i18n';
import {
  ArrowUpRight,
  Layers,
  Youtube,
  Megaphone,
  Sparkles,
  ExternalLink,
  Target,
} from 'lucide-react';

type Filter = 'all' | 'games' | 'websites' | 'marketing';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const t = useT();

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('projects.all') },
    { id: 'games', label: 'Games' },
    { id: 'websites', label: 'Websites' },
    { id: 'marketing', label: 'Marketing & Content' },
  ];

  const filteredProjects =
    activeFilter === 'all' ? PROJECTS_LIST : PROJECTS_LIST.filter((p) => p.category === activeFilter);

  const youtube = SOCIAL_LINKS.find((l) => l.platform === 'YouTube');
  const marketingProjects = PROJECTS_LIST.filter((p) => p.category === 'marketing');

  return (
    <section id="projects" className="py-20 relative bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10" data-reveal="up">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('projects.eyebrow')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-ink tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-muted text-xs sm:text-sm max-w-xl leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  trackEvent('project_filter', { filter: f.id });
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'brand-gradient text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured: YouTube Channel */}
        {youtube && (
          <div className="mb-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-white to-white border border-red-500/20 card-lift" data-reveal="scale">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-500 shrink-0">
                  <Youtube className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[10px] font-mono-code text-red-600 uppercase tracking-wider font-bold mb-1">
                    {t('projects.channel')}
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">{youtube.handle}</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                    Hindi/Urdu shayari aur original creative content — organic growth ke liye
                    thumbnails, SEO titles aur community engagement par focus.
                  </p>
                </div>
              </div>
              <a
                href={youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { platform: 'YouTube' })}
                className="btn-primary self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
              >
                <span>Watch Channel</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Featured: Digital Marketing Campaigns */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-white border border-emerald-500/20" data-reveal="scale">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 shrink-0">
              <Megaphone className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono-code text-emerald-700 uppercase tracking-wider font-bold mb-1">
                {t('projects.campaigns')}
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Meta &amp; Google Ads — full funnel, AI-assisted creatives
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {marketingProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      trackProjectOpen(p.id, p.category);
                      onSelectProject(p);
                    }}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    <Target className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900">
                      {p.title}
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-emerald-600">
                      {p.metrics[0]?.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                trackProjectOpen(project.id, project.category);
                onSelectProject(project);
              }}
              className="card-scale rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Image */}
              {project.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-raised">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    className="glow-hover w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              ) : (
                <PlaceholderImage
                  label={project.subtitle}
                  className="aspect-[16/10]"
                  gradient="from-blue-500/20 to-transparent"
                />
              )}

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono-code text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                  <div className="grid grid-cols-3 gap-1 py-3 border-y border-line-soft text-center">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="font-display font-bold text-sm text-blue-600">{m.value}</div>
                        <div className="text-[9px] text-slate-400 font-mono-code truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500 min-w-0">
                    <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                    <span className="truncate">{project.tags[0]}</span>
                  </div>
                  <span className="text-blue-600 font-semibold flex items-center gap-1 shrink-0">
                    <span>{t('projects.viewInfo')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
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