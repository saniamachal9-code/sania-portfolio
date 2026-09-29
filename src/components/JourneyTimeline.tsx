import React from 'react';
import { TIMELINE_MILESTONES, CORE_SKILLS } from '../data/portfolioData';
import { MapPin, CheckCircle2, User } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="about" className="py-16 border-t border-slate-200 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header: Minimal */}
        <div className="space-y-1.5 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>About Sania</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Journey & Education
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
            Pundri (Haryana) se shuruwat, school education, aur real tech & digital marketing projects.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Timeline Milestones (Left - 7 cols) with minimal text */}
          <div className="lg:col-span-7 relative pl-6 border-l-2 border-blue-400 space-y-7">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform" />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-blue-700 font-semibold">
                    <span className="font-bold text-sm text-slate-900">{item.year}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">{item.organization}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-500" />
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

          {/* Core Capabilities Breakdown (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-4 shadow-xs">
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-base text-slate-900">
                  Key Skills & Focus
                </h3>
                <p className="text-xs text-slate-500">
                  Hands-on tools aur practical experience.
                </p>
              </div>

              <div className="space-y-3">
                {CORE_SKILLS.map((skillGroup, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="text-xs font-mono-code text-blue-700 uppercase tracking-wide font-bold">
                      {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-md shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Graduation ke sath-sath active client projects.</span>
              </div>
            </div>

            {/* Haryana Roots Box */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-blue-700 uppercase font-bold">Native Town</div>
                <div className="text-sm font-display font-black text-slate-900">Pundri, Haryana</div>
                <div className="text-xs text-slate-600">Available for remote & global projects</div>
              </div>
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
