import React, { useState } from 'react';
import { X, Send, Check, Mail, Loader2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { submitContactForm } from '../lib/supabaseService';
import { useT, type StringKey } from '../lib/i18n';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const t = useT();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('submitting');
    setErrorMessage('');

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      trackEvent('contact_form_submit_success');
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
      }, 3000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to submit. Please try again.');
      trackEvent('contact_form_submit_error', { error: result.error || 'Unknown error' });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overlay-fade"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-mono-code text-slate-700 uppercase tracking-wider font-bold" id="contact-modal-title">
              {t('contact.eyebrow' as StringKey)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close contact form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {status === 'success' ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">{t('contact.success' as StringKey)}</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {t('contact.successMessage' as StringKey).replace('{name}', formData.name).replace('{email}', formData.email)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-base text-slate-900">{t('contact.title' as StringKey)}</h3>
                <p className="text-xs text-slate-500">Apne project ya query ke baare me batayein.</p>
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
                  <X className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">{t('contact.name' as StringKey)} <span className="text-red-500">{t('contact.required' as StringKey)}</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  disabled={status === 'submitting'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">{t('contact.email' as StringKey)} <span className="text-red-500">{t('contact.required' as StringKey)}</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  disabled={status === 'submitting'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">{t('contact.subject' as StringKey)} <span className="text-red-500">{t('contact.required' as StringKey)}</span></label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
                >
                  <option value="">{t('contact.selectSubject' as StringKey)}</option>
                  <option value="Digital Marketing & Growth">Digital Marketing & Ad Campaigns</option>
                  <option value="Website & Web App Development">Custom Website & Web Application</option>
                  <option value="AI Workflow & Prompt Engineering">30+ AI Tools Workflow Integration</option>
                  <option value="Blog Collaboration">Blog / Content Collaboration</option>
                  <option value="Other Consultation">Other Project / Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">{t('contact.message' as StringKey)} <span className="text-red-500">{t('contact.required' as StringKey)}</span></label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Apna message yahan likhein..."
                  disabled={status === 'submitting'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('contact.sending' as StringKey)}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.send' as StringKey)}</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center">{t('contact.privacyNote' as StringKey)}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};