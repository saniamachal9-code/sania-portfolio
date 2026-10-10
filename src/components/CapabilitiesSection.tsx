import React from 'react';
import { CheckCircle2, Layers } from 'lucide-react';
import { CORE_SKILLS } from '../data/portfolioData';
import { AiToolsMatrix } from './AiToolsMatrix';

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-16 border-t border-slate-200 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="space-y-1.5 mb-9" data-reveal="left">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>My Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Skills &amp; Expertise
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
            Marketing, content, AI workflows aur engineering — chaar skill tracks jo daily client work me use hoti hain.
          </p>
        </div>

        {/* Core Skill Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10" data-reveal-stagger>
          {CORE_SKILLS.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="card-lift p-5 rounded-2xl bg-white border border-slate-200 flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-mono-code text-blue-700 uppercase tracking-wide font-bold">
                  {skillGroup.category}
                </h3>
                <span className="text-[10px] font-mono-code text-slate-400 shrink-0">
                  {skillGroup.items.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:text-blue-700 px-2.5 py-0.5 rounded-md transition-colors hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600" data-reveal="up">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 animate-[bounce_3s_ease-in-out_infinite]" aria-hidden="true" />
          <span>Graduation ke sath-sath active client projects aur live campaigns.</span>
        </div>

      </div>

      {/* AI Tools Explorer lives inside the same Capabilities section */}
      <AiToolsMatrix />
    </section>
  );
};