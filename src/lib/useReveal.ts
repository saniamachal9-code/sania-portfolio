import { useEffect } from 'react';

/**
 * Scroll-reveal for the whole page.
 *
 * One observer for every `[data-reveal]` / `[data-reveal-stagger]` element
 * rather than one hook per section: a single callback and a single observer
 * instance keep this cheap on a page with nine sections and a few hundred
 * animated nodes.
 *
 * The actual motion lives in CSS. This hook only flips `.is-visible` once an
 * element crosses into the viewport and then stops watching it, so scrolling
 * back up never replays the animation and long pages never accumulate work.
 *
 * Progressive enhancement: `.js-reveal` is added to <html> before the hidden
 * state in CSS takes effect. If the bundle never loads, the class is never
 * added and every element renders visible.
 */

const REVEAL_SELECTOR = '[data-reveal], [data-reveal-stagger]';

/** How far into the viewport an element must get before it animates. */
const ROOT_MARGIN = '0px 0px -12% 0px';

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useReveal = (): void => {
  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      // Nothing to animate — reveal everything up front.
      root.classList.remove('js-reveal');
      return;
    }

    root.classList.add('js-reveal');

    const reveal = (el: Element) => el.classList.add('is-visible');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.01 },
    );

    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    targets.forEach((el) => {
      // Already on screen at first paint (the hero): show it immediately rather
      // than waiting for a scroll event that may never come.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    // Sections mounted later (the project modal, the settings overlay) are
    // opted in by attribute, so watch for them too.
    const mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(REVEAL_SELECTOR)) {
            observer.observe(node);
          }
          node.querySelectorAll?.(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
        });
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
};
