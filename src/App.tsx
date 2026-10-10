import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DashboardSection } from './components/DashboardSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { BlogsSection } from './components/BlogsSection';
import { VisionSection } from './components/VisionSection';
import { ContactSection } from './components/ContactSection';
import { SettingsPanel } from './components/SettingsPanel';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BlogPage } from './components/BlogPage';
import { ContactModal } from './components/ContactModal';
import { Project } from './data/portfolioData';
import { trackPageView, trackEvent } from './lib/analytics';
import { useContentOverrides } from './lib/contentStore';
import { useReveal } from './lib/useReveal';

/** Scroll order of the single-page portfolio. */
const SECTION_IDS = [
  'hero',
  'dashboard',
  'projects',
  'about',
  'journey',
  'capabilities',
  'blogs',
  'vision',
  'contact',
] as const;

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { stats, visionMetrics, updateStat, updateVisionMetric, resetAll } = useContentOverrides();
  const frameRef = useRef<number | null>(null);

  useReveal();

  useEffect(() => {
    trackPageView('home');
  }, []);

  useEffect(() => {
    if (selectedProject) {
      trackPageView(`project:${selectedProject.id}`);
    }
  }, [selectedProject]);

  // Scroll spy: highlight whichever section owns the upper part of the viewport.
  useEffect(() => {
    const compute = () => {
      frameRef.current = null;
      const offset = 140;
      let current: string = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }

      // Bottom of the page belongs to the final section, not the previous one.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    trackEvent('section_view', { section: activeSection });
  }, [activeSection]);

  const handleNavigateSection = useCallback((anchorId: string) => {
    const element = document.getElementById(anchorId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(anchorId);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setSettingsOpen(true);
    trackEvent('settings_open');
  }, []);

  const handleOpenContact = useCallback(() => {
    setContactOpen(true);
    trackEvent('contact_modal_open');
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-ink font-sans flex flex-col justify-between">
        <Navbar
          activeSection={activeSection}
          onNavigateSection={handleNavigateSection}
          onOpenContact={handleOpenContact}
        />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  {/* Hero */}
                  <Hero
                    onNavigate={handleNavigateSection}
                    onNavigateToContact={handleOpenContact}
                  />

                  {/* Dashboard — Overview & Stats */}
                  <DashboardSection onNavigateSection={handleNavigateSection} />

                  {/* Projects */}
                  <ProjectsShowcase onSelectProject={(project) => setSelectedProject(project)} />

                  {/* About Me */}
                  <AboutSection />

                  {/* My Journey */}
                  <JourneySection />

                  {/* My Capabilities */}
                  <CapabilitiesSection />

                  {/* Blogs & Articles */}
                  <BlogsSection />

                  {/* My Vision */}
                  <VisionSection
                    visionMetrics={visionMetrics}
                    onNavigateToContact={handleOpenContact}
                  />

                  {/* Contact */}
                  <ContactSection />
                </main>
              }
            />
            <Route
              path="/blog/:slug"
              element={<BlogPage onNavigateBack={() => handleNavigateSection('blogs')} />}
            />
          </Routes>
        </div>

        <Footer onNavigateSection={handleNavigateSection} onOpenSettings={handleOpenSettings} />

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

        {contactOpen && (
          <ContactModal onClose={() => setContactOpen(false)} />
        )}

        <SettingsPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          stats={stats}
          visionMetrics={visionMetrics}
          onUpdateStat={updateStat}
          onUpdateVisionMetric={updateVisionMetric}
          onResetAll={resetAll}
        />

        {/* Privacy-friendly page view analytics (no cookies, no PII) */}
        <Analytics />
      </div>
    </BrowserRouter>
  );
}