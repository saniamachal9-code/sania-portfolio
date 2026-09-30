import { track as vercelTrack } from '@vercel/analytics';

/**
 * Fires a privacy-friendly custom event.
 *
 * Vercel Analytics only reports a page view on real URL changes. This app
 * routes via React state, so in-app navigation and interactions are invisible
 * to it — these events make them measurable. No PII is ever sent.
 */
export const trackEvent = (
  name: string,
  props?: Record<string, string | number | boolean>,
) => {
  try {
    vercelTrack(name, props);
  } catch {
    // Analytics must never break the UI (e.g. blocked by an extension).
  }
};

export const trackProjectOpen = (projectId: string, category: string) =>
  trackEvent('project_open', { project: projectId, category });

export const trackCtaClick = (label: string) => trackEvent('cta_click', { label });

export const trackSocialClick = (platform: string) =>
  trackEvent('social_click', { platform });

export const trackPageView = (page: string) => trackEvent('page_view', { page });
