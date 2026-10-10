import React from 'react';
import { User, Sparkles, Mail, Youtube } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const youtube = SOCIAL_LINKS.find((link) => link.platform === 'YouTube');

  return (
    <section id="about" className="py-16 border-t border-slate-200 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="space-y-1.5 mb-10" data-reveal="left">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
            <User className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>About Sania</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            About Me
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-reveal-stagger>
          {PERSONAL_INFO.about.map((line, idx) => (
            <div
              key={idx}
              className="card-lift p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3"
            >
              <span className="p-2 rounded-xl brand-gradient text-white shrink-0 shadow-sm shadow-blue-500/25">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>

        {/* Creator Channel Callout */}
        {youtube && (
          <a
            href={youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-300"
            data-reveal="up"
          >
            <div className="flex items-center gap-3.5">
              <span className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 shrink-0">
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <div className="text-xs font-mono-code text-slate-500 uppercase font-bold">
                  My Creator Channel
                </div>
                <div className="font-display font-bold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  {youtube.handle}
                </div>
                <div className="text-xs text-slate-600">
                  Hindi/Urdu shayari &amp; original creative content
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-red-600 flex items-center gap-1.5 shrink-0">
              <span className="link-underline">Watch on YouTube</span>
              <Mail className="w-3.5 h-3.5 rotate-45" aria-hidden="true" />
            </span>
          </a>
        )}

      </div>
    </section>
  );
};