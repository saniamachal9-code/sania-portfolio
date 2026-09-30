import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, Sparkles, ArrowLeft, MessageSquare, Clock, ShieldCheck, HelpCircle, Youtube, Linkedin, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import type { SocialLink } from '../data/portfolioData';

const SOCIAL_ICONS: Record<SocialLink['iconName'], React.ElementType> = {
  Youtube,
  Linkedin,
  Instagram,
  Mail,
};

interface ContactPageProps {
  onBackToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Digital Marketing & Growth',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
      });
    }, 600);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-blue-50/70 via-[#f8fafc] to-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50/50 border border-blue-200 px-3.5 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Dedicated Page Header */}
        <div className="space-y-3 mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full font-semibold">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Channel</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Let’s Build Something Great.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Naye project ke liye, digital marketing ad campaigns, 30+ AI tool workflows, ya collaboration ke liye message karein.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Direct Details Card (Left - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
              
              <div className="space-y-1">
                <div className="text-xs font-mono-code text-blue-600 uppercase font-semibold">
                  Personal Details
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Sania Machal
                </h3>
                <p className="text-xs text-slate-500">
                  Digital Marketer · Content Creator · Shayari Poet
                </p>
              </div>

              {/* Email Block with Copy */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="text-[10px] font-mono-code text-blue-800 uppercase font-semibold">
                  Official Email
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono-code text-xs sm:text-sm text-blue-800 hover:text-blue-900 font-semibold truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-700 transition-colors cursor-pointer border border-blue-200 shadow-2xs shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {copied && (
                  <div className="text-[11px] text-emerald-600 font-mono-code">
                    Email copied to clipboard!
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase font-semibold">
                  Find Me Online
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = SOCIAL_ICONS[link.iconName];
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all"
                        title={link.platform}
                      >
                        <span
                          className="p-1.5 rounded-lg text-white shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: link.brandColor }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-mono-code text-slate-400 uppercase leading-none">
                            {link.platform}
                          </span>
                          <span className="block text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                            {link.handle}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Location & Commitments */}
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pundri, Kaithal, Haryana, India (IST / UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Quick response guaranteed within 24 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Verified independent creator and student builder</span>
                </div>
              </div>

              {/* Mail Application Trigger */}
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all cursor-pointer shadow-sm shadow-blue-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Mail App</span>
              </a>

            </div>

            {/* Quick Roots Highlight */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1 shadow-2xs">
              <span className="font-semibold text-slate-800">Native Town:</span>
              <p>Pundri, Haryana se originate hokar nationwide aur global businesses ke sath campaigns execute karti hoon.</p>
            </div>
          </div>

          {/* Message Form (Right - 7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3.5">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Sania aapke message ko padhkar jald hi <span className="text-blue-600 font-semibold">{formData.email}</span> par reply dengi.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Digital Marketing & Growth', message: '' });
                  }}
                  className="mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Send a Direct Note
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tell me about your business goals, project scope, or ideas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Aapka Naam *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  >
                    <option value="Digital Marketing & Growth">Digital Marketing & Performance Campaigns</option>
                    <option value="Website & Web App Development">Custom Website & Web Application</option>
                    <option value="AI Workflow & Prompt Engineering">30+ AI Tools Workflow Setup</option>
                    <option value="Web Game Development">Interactive 2D Web Game</option>
                    <option value="Other Consultation">Other Collaboration / Freelance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Message / Scope *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Apne project ke baare me thoda batayein (timeline, goals, etc.)..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quick FAQ Strip on Contact Page */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900">What services does Sania deliver?</strong>
              <p>Full-funnel Google & Meta ad campaigns, 30+ AI tools automation, and responsive web development.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900">Can we work together remotely?</strong>
              <p>Yes, I collaborate seamlessly with clients across India and internationally via email and WhatsApp.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
