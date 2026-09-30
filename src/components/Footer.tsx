import React from 'react';
import { ArrowUp, Mail, Heart, Youtube, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { trackSocialClick } from '../lib/analytics';
import type { SocialLink } from '../data/portfolioData';

const SOCIAL_ICONS: Record<SocialLink['iconName'], React.ElementType> = {
  Youtube,
  Linkedin,
  Instagram,
  Mail,
};

interface FooterProps {
  onNavigatePage: (page: 'home' | 'blogs' | 'contact', anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 bg-white text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Origin */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-display font-extrabold text-base text-blue-700 tracking-wider">
              SANIA MACHAL
            </span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="text-slate-600 font-medium">Pundri, Kaithal, Haryana</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span>College Student</span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-600 font-medium">
            <button
              onClick={() => onNavigatePage('home', 'hero')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigatePage('home', 'about')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About Me
            </button>
            <button
              onClick={() => onNavigatePage('home', 'skills')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => onNavigatePage('home', 'projects')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              My Projects
            </button>
            <button
              onClick={() => onNavigatePage('blogs')}
              className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600 font-semibold"
            >
              Blogs Page
            </button>
            <button
              onClick={() => onNavigatePage('contact')}
              className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600 font-semibold"
            >
              Contact Page
            </button>
          </div>

          {/* Contact, Social & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-blue-700 transition-colors flex items-center gap-1 font-mono-code text-blue-600 font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            {SOCIAL_LINKS.filter((l) => l.platform !== 'Email').map((link) => {
              const Icon = SOCIAL_ICONS[link.iconName];
              return (
                <a
                  key={link.platform}
                  onClick={() => trackSocialClick(link.platform)}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  title={`${link.platform} — ${link.handle}`}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 transition-all hover:scale-110 hover:shadow-md hover:shadow-blue-500/20"
                  style={{ color: link.brandColor }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer border border-slate-200"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>Digital Marketer · Content Creator · Shayari Poet — Pundri, Kaithal, Haryana.</span>
          <span>© 2026 Sania Machal. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
};
