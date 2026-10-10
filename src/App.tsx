import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { AiToolsMatrix } from './components/AiToolsMatrix';
import { JourneyTimeline } from './components/JourneyTimeline';
import { BlogsPage } from './pages/BlogsPage';
import { ContactPage } from './pages/ContactPage';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './data/portfolioData';
import { ArrowRight, BookOpen, Mail } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blogs' | 'contact'>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigatePage = (page: 'home' | 'blogs' | 'contact', anchorId?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home' && anchorId && anchorId !== 'hero') {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(anchorId);
        }
      }, 100);
    } else if (page === 'home') {
      setActiveSection('hero');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Dynamic Navigation Bar supporting multi-page routing */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        activeSection={activeSection}
      />

      {/* Page Routing */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <main className="animate-in fade-in duration-200">
            {/* 1. Hero Section */}
            <Hero
              onNavigate={(sectionId) => handleNavigatePage('home', sectionId)}
              onNavigateToContact={() => handleNavigatePage('contact')}
            />

            {/* 2. About Me / Milestones */}
            <JourneyTimeline />

            {/* 3. Skills / 30+ AI Tools */}
            <AiToolsMatrix />

            {/* 4. My Projects (Games & Websites) */}
            <ProjectsShowcase onSelectProject={(project) => setSelectedProject(project)} />

            {/* Clean Multi-Page Portal Cards */}
            <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-blue-50/60 border-t border-slate-200">
              <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Dedicated Blogs Page Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between space-y-4 group">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono-code text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-100">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Dedicated Page</span>
                    </span>
                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      Read Sania's Blogs & Case Notes
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Detailed breakdowns of 30+ AI tool pipelines, custom 2D canvas game architecture, and builder journey from Pundri, Haryana.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigatePage('blogs')}
                    className="self-start text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer pt-1"
                  >
                    <span>Open Dedicated Blogs Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Dedicated Contact Page Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-md shadow-blue-900/15 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono-code text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full font-semibold">
                      <Mail className="w-3.5 h-3.5 text-blue-200" />
                      <span>Get in Touch</span>
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">
                      Start a Project or Collaboration
                    </h3>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      Looking for high-ROI digital marketing ad setups or a responsive modern web application? Send a direct note.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigatePage('contact')}
                    className="self-start px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    Open Dedicated Contact Page →
                  </button>
                </div>

              </div>
            </section>
          </main>
        )}

        {/* Dedicated Separate Blogs Page */}
        {currentPage === 'blogs' && (
          <div className="animate-in fade-in duration-200">
            <BlogsPage
              onBackToHome={() => handleNavigatePage('home', 'hero')}
              onNavigateToContact={() => handleNavigatePage('contact')}
            />
          </div>
        )}

        {/* Dedicated Separate Contact Page */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-200">
            <ContactPage
              onBackToHome={() => handleNavigatePage('home', 'hero')}
            />
          </div>
        )}
      </div>

      {/* Clean Global Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
