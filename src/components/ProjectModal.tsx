import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col">
        
        {/* Top Bar with Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="text-xs font-mono-code text-blue-600 uppercase tracking-wider font-semibold">
            {project.subtitle}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Banner */}
        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Quantified Metrics Box */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
            {project.metrics.map((metric, idx) => (
              <div key={idx}>
                <div className="font-display font-bold text-base text-blue-700">
                  {metric.value}
                </div>
                <div className="text-[10px] text-slate-600 font-mono-code mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Deliverables */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider">
              Key Features & Deliverables:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <span className="font-mono-code text-slate-400 text-[11px]">Tech Used:</span>
            {project.tags.map((t, idx) => (
              <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 text-[11px]">
                {t}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Built by <span className="text-slate-900 font-medium">Sania</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
