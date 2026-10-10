import React from 'react';
import { Target, Telescope, Compass, ArrowUpRight, Mail } from 'lucide-react';
import { VISION_GOALS, VISION_MISSION } from '../data/portfolioData';

interface VisionSectionProps {
  /** Resolved goal metrics — values edited in Settings override the defaults. */
  visionMetrics: Record<string, string>;
  onNavigateToContact?: () => void;
}

export const VisionSection: React.FC<VisionSectionProps> = ({
  visionMetrics,
  onNavigateToContact,
}) => {
  return (
    <section id="vision" className="py-20 border-t border-slate-200 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10" data-reveal="left">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
              <Telescope className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>My Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Future Goals &amp; Mission
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Aage kahan jaana hai — numbers ke saath, taaki progress measurable rahe.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="relative p-6 sm:p-8 rounded-2xl brand-gradient text-white overflow-hidden mb-8 shadow-md shadow-blue-900/15 animate-[glow_2s_ease-in-out_infinite]" data-reveal="scale">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-purple-400/10 rounded-full pointer-events-none" aria-hidden="true" />

          <div className="relative space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code text-blue-100 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>My Mission</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
              {VISION_MISSION.headline}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {VISION_MISSION.body}
            </p>
          </div>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-reveal-stagger>
          {VISION_GOALS.map((goal, idx) => (
            <div
              key={goal.id}
              className="card-lift p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 flex flex-col space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 leading-none">
                    {visionMetrics[goal.id] ?? goal.metric}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase font-mono-code font-semibold mt-1.5">
                    {goal.metricLabel}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-mono-code text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-bold">
                  {goal.horizon}
                </span>
              </div>

              {/* H3, not H4 — the section's H2 is its direct parent and there is
                  no intervening H3 to nest under. */}
              <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                {goal.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {goal.description}
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[10px] font-mono-code text-slate-400">
                <Target className="w-3 h-3 text-blue-500" aria-hidden="true" />
                <span>Goal {String(idx + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 bg-white" data-reveal="up">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Kisi ek goal par kaam karna hai?
            </h3>
            <p className="text-xs text-slate-600">
              Marketing, AI workflows, ya web building — batayein, saath shuru karti hoon.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="btn-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Let&apos;s Talk</span>
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
};