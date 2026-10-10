import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'blogs' | 'contact';
  onNavigatePage: (page: 'home' | 'blogs' | 'contact', anchorId?: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigatePage, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', page: 'home', anchor: 'hero' },
    { id: 'about', label: 'About Me', page: 'home', anchor: 'about' },
    { id: 'skills', label: 'Skills', page: 'home', anchor: 'skills' },
    { id: 'projects', label: 'My Projects', page: 'home', anchor: 'projects' },
    { id: 'blogs', label: 'Blogs', page: 'blogs' },
    { id: 'contact', label: 'Contact', page: 'contact' },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    onNavigatePage(item.page as 'home' | 'blogs' | 'contact', item.anchor);
    setMobileMenuOpen(false);
  };

  const isItemActive = (item: typeof navItems[0]) => {
    if (currentPage === 'blogs') return item.id === 'blogs';
    if (currentPage === 'contact') return item.id === 'contact';
    if (currentPage === 'home') {
      if (item.page === 'home' && activeSection === item.anchor) return true;
      if (item.id === 'home' && (!activeSection || activeSection === 'hero')) return true;
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b-2 border-blue-100 shadow-md shadow-blue-500/5 py-3.5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigatePage('home', 'hero')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <div className="font-display text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              SANIA MACHAL
            </div>
            <div className="text-[10px] font-mono-code bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent uppercase font-semibold tracking-wider">
              Pundri, Kaithal
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigatePage('contact')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'contact'
                ? 'bg-slate-900 text-white'
                : 'text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 shadow-md shadow-blue-500/25'
            }`}
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              onNavigatePage('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <span>Let's Talk (Contact Page)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
