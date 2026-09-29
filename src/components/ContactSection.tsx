import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, Sparkles, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Contact Sania</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Let’s Connect & Work Together.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Digital marketing campaign ke liye, nayi website ke liye, ya kisi bhi collaboration ke liye direct baat karein.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
          
          {/* Direct Details Card (Left - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
              
              <div className="space-y-1">
                <div className="text-xs font-mono-code text-blue-600 uppercase font-semibold">
                  Direct Inquiries
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Sania Machal
                </h3>
                <p className="text-xs text-slate-500">
                  Digital Marketing Specialist · AI Explorer · Web & Game Creator
                </p>
              </div>

              {/* Email Block with Copy */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="text-[10px] font-mono-code text-blue-800 uppercase font-semibold">
                  Email Address
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono-code text-xs text-blue-800 hover:text-blue-900 font-semibold truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-700 transition-colors cursor-pointer border border-blue-200 shadow-2xs"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {copied && (
                  <div className="text-[11px] text-emerald-600 font-mono-code">
                    Copied to clipboard!
                  </div>
                )}
              </div>

              {/* Location & Guarantee */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pundri, Haryana, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Quick response within 24 hours</span>
                </div>
              </div>

              {/* Direct Mail Button */}
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20from%20Portfolio`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all cursor-pointer shadow-sm shadow-blue-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Mail App</span>
              </a>

            </div>
          </div>

          {/* Message Form (Right - 7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Shukriya <strong className="text-slate-900">{formData.name}</strong>, Sania aapse jald hi <span className="text-blue-600 font-medium">{formData.email}</span> par sampark karengi.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Digital Marketing & Growth', message: '' });
                  }}
                  className="mt-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Send a Direct Note
                  </h3>
                  <p className="text-xs text-slate-500">
                    Apne project ya query ke baare me batayein.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Aapka Naam *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  >
                    <option value="Digital Marketing & Growth">Digital Marketing & Ad Campaigns</option>
                    <option value="Website & Web App Development">Custom Website & Web Application</option>
                    <option value="AI Workflow & Prompt Engineering">30+ AI Tools Workflow Integration</option>
                    <option value="Other Consultation">Other Project / Query</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Message / Baat *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Apna message yahan likhein..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
