import React from 'react';
import { MapPin, Award, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onNavigateToContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onNavigateToContact }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/80 via-[#f8fafc] to-white">
      {/* Subtle ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-sky-300/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT SIDE: Clean, Short Text with Stylish Modern Typography */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Location & Status Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
              <span className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full font-bold">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Pundri, Haryana</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">Born 2009</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </span>
            </div>

            {/* Main Headline & Role */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
                Hi, I'm <span className="text-blue-600">Sania</span>.
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-slate-800 tracking-tight">
                Digital Marketing & Creative Tech Builder
              </p>
            </div>

            {/* Ultra-Short Bio */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              Haryana (Pundri) se. <strong className="text-slate-900">10th me 80%</strong> aur <strong className="text-slate-900">12th me 78%</strong> marks ke baad, abhi <strong className="text-blue-700">Graduation</strong> ke sath <strong className="text-slate-900">Digital Marketing</strong>, <strong className="text-slate-900">30+ AI Tools</strong> aur real <strong className="text-slate-900">Websites & Games</strong> banati hoon.
            </p>

            {/* Quick Education Marks Strip */}
            <div className="inline-flex flex-wrap items-center gap-2.5 text-xs text-slate-700 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-blue-700 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>10th: 80%</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-700 font-bold">12th: 78% (2026)</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold">Graduation (Ongoing)</span>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onNavigateToContact || (() => onNavigate('contact'))}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                <span>Contact Sania</span>
              </button>
            </div>

            {/* 4 Minimal Stat Counter Badges */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-4 gap-2 text-center sm:text-left">
              <div>
                <div className="font-display text-2xl font-black text-blue-600">30+</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono-code font-semibold">AI Tools</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-slate-900">80%</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono-code font-semibold">10th Marks</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-blue-700">78%</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono-code font-semibold">12th Marks</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-sky-600">Real</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono-code font-semibold">Web & Games</div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Photo in High-Quality Clean Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-blue-200 shadow-xl p-2.5">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 group">
                  <img
                    src="/src/assets/images/sania_portrait_2026.jpg"
                    alt="Sania Machal - Digital Marketer & Tech Builder"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Caption Under Photo */}
              <div className="flex items-center justify-between px-2 text-xs font-mono-code">
                <span className="text-slate-900 font-bold">Sania Machal</span>
                <span className="text-blue-600 font-semibold">Pundri, Haryana</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
