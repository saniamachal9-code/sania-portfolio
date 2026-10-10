import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Languages } from 'lucide-react';
import { usePreferences } from '../lib/preferences';
import { useT, type StringKey } from '../lib/i18n';

interface NavItem {
  id: string;
  anchor: string;
  labelKey: StringKey;
}

/** Mirrors the page order defined in App.tsx. */
const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', anchor: 'dashboard', labelKey: 'nav.dashboard' },
  { id: 'projects', anchor: 'projects', labelKey: 'nav.projects' },
  { id: 'hero', anchor: 'hero', labelKey: 'nav.hero' },
  { id: 'about', anchor: 'about', labelKey: 'nav.about' },
  { id: 'journey', anchor: 'journey', labelKey: 'nav.journey' },
  { id: 'capabilities', anchor: 'capabilities', labelKey: 'nav.capabilities' },
  { id: 'vision', anchor: 'vision', labelKey: 'nav.vision' },
  { id: 'blogs', anchor: 'blogs', labelKey: 'nav.blogs' },
  { id: 'settings', anchor: 'settings', labelKey: 'nav.settings' },
];

interface NavbarProps {
  activeSection?: string;
  onNavigateSection: (anchorId: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setPref } = usePreferences();
  const t = useT();

  const isItemActive = (item: NavItem) => activeSection === item.anchor;

  const handleItemClick = (anchor: string) => {
    onNavigateSection(anchor);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 brand-gradient shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between gap-4">

        {/* Brand */}
        <button
          onClick={() => handleItemClick('dashboard')}
          className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center text-white font-extrabold text-sm group-hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <div className="font-display text-base font-black tracking-tight text-white leading-none">
              SANIA MACHAL
            </div>
            <div className="text-[9px] font-mono-code text-white/70 uppercase font-semibold tracking-wider mt-0.5">
              Pundri, Kaithal
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <nav className="hidden xl:flex items-center gap-0.5 p-1 bg-black/15 rounded-xl border border-white/10">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.anchor)}
                className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-white text-brand shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language toggle */}
          <button
            onClick={() => setPref('language', language === 'en' ? 'hi' : 'en')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold text-white/90 hover:text-white rounded-lg bg-black/15 border border-white/15 hover:bg-black/25 transition-colors cursor-pointer"
            title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="font-mono-code">{language === 'en' ? 'HI' : 'EN'}</span>
          </button>

          {/* CTA */}
          <button
            onClick={() => handleItemClick('contact')}
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg btn-primary cursor-pointer whitespace-nowrap ${
              activeSection === 'contact'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-brand hover:bg-white/90 shadow-sm'
            }`}
          >
            <span>{t('nav.talk')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white rounded-lg border border-white/20 bg-black/15 hover:bg-black/25 transition-colors cursor-pointer"
            aria-label={t('nav.menu')}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-white/10 px-6 py-4 space-y-1.5 max-h-[75vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.anchor)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  active ? 'brand-gradient text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
          <div className="flex gap-2 pt-3 sm:hidden">
            <button
              onClick={() => setPref('language', language === 'en' ? 'hi' : 'en')}
              className="flex-1 px-3 py-2.5 text-xs font-bold text-white/90 rounded-lg bg-black/20 border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
          <button
            onClick={() => handleItemClick('contact')}
            className="w-full mt-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand bg-white rounded-lg cursor-pointer"
          >
            {t('nav.talk')}
          </button>
        </div>
      )}
    </header>
  );
};