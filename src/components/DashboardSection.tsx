import React from 'react';
import {
  LayoutDashboard,
  Youtube,
  FolderGit2,
  Layers,
  Sparkles,
  ArrowRight,
  Telescope,
  Mail,
  Activity,
  Info,
} from 'lucide-react';
import { DASHBOARD_STATS, QUICK_LINKS, PERSONAL_INFO } from '../data/portfolioData';
import { useT, type StringKey } from '../lib/i18n';

const STAT_ICONS: Record<string, React.ElementType> = {
  Youtube,
  FolderGit2,
  Layers,
  Sparkles,
};

const QUICK_ICONS: Record<string, React.ElementType> = {
  FolderGit2,
  Sparkles,
  Telescope,
  Mail,
};

interface DashboardSectionProps {
  onNavigateSection: (anchorId: string) => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ onNavigateSection }) => {
  const t = useT();

  return (
    <section
      id="dashboard"
      className="pt-28 pb-16 md:pt-32 md:pb-20 relative overflow-hidden bg-bg"
    >
      {/* Ambient glow */}
      <div className="ambient-blob absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-brand/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="space-y-3 mb-10" data-reveal="up">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-brand bg-brand-soft border border-brand/25 px-3 py-1 rounded-full font-bold">
            <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('dash.eyebrow')}</span>
          </div>
          {/* H2 — the hero owns the single H1, every other section is an H2. */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-ink leading-tight">
            {t('dash.title')}
          </h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">{t('dash.subtitle')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10" data-reveal-stagger>
          {DASHBOARD_STATS.map((stat) => {
            const Icon = STAT_ICONS[stat.icon] ?? Sparkles;
            return (
              <div
                key={stat.id}
                className="card-lift relative p-5 rounded-2xl bg-surface border border-line overflow-hidden group"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 brand-gradient opacity-[0.07] rounded-full group-hover:opacity-[0.14] transition-opacity" />
                <div className="relative">
                  <span className="w-9 h-9 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center text-brand mb-3">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="font-display text-3xl font-black text-ink leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-muted uppercase font-mono-code font-semibold mt-2 leading-tight">
                    {t(stat.labelKey as StringKey)}
                  </div>
                  {stat.placeholder && (
                    <div
                      className="mt-2.5 flex items-start gap-1 text-[10px] text-amber-400/90 leading-tight"
                      title={stat.hint}
                    >
                      <Info className="w-3 h-3 shrink-0 mt-px" />
                      <span>{t('dash.placeholder')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-4 flex-wrap" data-reveal="up">
            <h3 className="text-xl font-display font-bold text-ink">{t('dash.quickLinks')}</h3>
            <p className="text-xs text-muted">{t('dash.quickSub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal-stagger>
            {QUICK_LINKS.map((link) => {
              const Icon = QUICK_ICONS[link.icon] ?? ArrowRight;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigateSection(link.anchor)}
                  className="card-lift group relative p-5 rounded-2xl bg-gradient-to-br border border-line text-left cursor-pointer overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative space-y-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-brand group-hover:bg-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="font-display font-bold text-sm text-ink">{link.title}</div>
                    <p className="text-[11px] text-muted leading-relaxed">{link.description}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand group-hover:gap-2 transition-all">
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity Strip */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-line" data-reveal="up">
          <div className="flex items-center gap-2.5 text-xs text-muted">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-ink">{t('dash.activity')}:</span>
            <span>{PERSONAL_INFO.roleLine}</span>
          </div>
          <span className="text-[10px] font-mono-code text-faint uppercase tracking-wider shrink-0">
            {PERSONAL_INFO.location}
          </span>
        </div>
      </div>
    </section>
  );
};