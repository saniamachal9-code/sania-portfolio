import React from 'react';
import { MapPin, Route, CheckCircle2 } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-16 border-t border-slate-200 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="space-y-1.5 mb-10" data-reveal="left">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
            <Route className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            The Road So Far
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
            School se graduation tak ka safar — har mod par kya seekha aur kya badla.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Timeline Milestones */}
          <div className="lg:col-span-7 relative pl-6 border-l-2 border-blue-400 space-y-7" data-reveal-stagger>
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative group">

                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform" aria-hidden="true" />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-blue-700 font-semibold">
                    <span className="font-bold text-sm text-slate-900">{item.year}</span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600">{item.organization}</span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-500" aria-hidden="true" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-bold text-blue-600 font-mono-code">
                    {item.highlight}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Roots Sidebar */}
          <div className="lg:col-span-5 space-y-4" data-reveal="right">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-base text-slate-900">
                  What This Journey Taught Me
                </h3>
                <p className="text-xs text-slate-500">
                  Small town se aane par clarity badh gayi.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {[
                  'Consistency beats talent — daily small output compounds.',
                  'Formal education aur practical skills saath chalne se zyada tez growth hota hai.',
                  'Real projects ship karne se hi confidence aata hai, sirf theory se nahi.',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Haryana Roots Box */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-blue-700 uppercase font-bold">Native Town</div>
                <div className="text-sm font-display font-black text-slate-900">Pundri, Haryana</div>
                <div className="text-xs text-slate-600">Available for remote &amp; global projects</div>
              </div>
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};