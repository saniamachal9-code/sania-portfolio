import { useCallback, useEffect, useState } from 'react';
import { PERSONAL_INFO, VISION_GOALS } from '../data/portfolioData';

/**
 * Local, device-only content overrides for the Settings panel.
 *
 * Scope is deliberately narrow: the Dashboard stat tiles and the Vision goal
 * numbers. Everything else stays in `portfolioData.ts` as the source of truth.
 *
 * SECURITY NOTE: the passcode ships inside the client bundle, so this is a
 * speed bump against casual visitors, not authentication. Anything sensitive
 * must live behind a real server check instead.
 */

const OVERRIDES_KEY = 'sania:content:v1';
const UNLOCK_KEY = 'sania:admin:unlocked';

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE as string | undefined;

export interface StatEntry {
  label: string;
  value: string;
}

export interface ContentOverrides {
  stats: StatEntry[];
  /** Vision goal id -> edited metric value. */
  visionMetrics: Record<string, string>;
}

export const BASE_STATS: StatEntry[] = PERSONAL_INFO.stats.map((s) => ({
  label: s.label,
  value: s.value,
}));

export const BASE_VISION_METRICS: Record<string, string> = Object.fromEntries(
  VISION_GOALS.map((goal) => [goal.id, goal.metric]),
);

/** True when a passcode was supplied at build time. Drives the lock's messaging. */
export const isAdminConfigured = Boolean(ADMIN_PASSCODE);

const EMPTY_OVERRIDES: ContentOverrides = { stats: [], visionMetrics: {} };

/**
 * Drops overrides that no longer match the shape of the static data, so a
 * stale localStorage payload can never blank out a live section.
 */
const normalize = (raw: unknown): ContentOverrides => {
  if (!raw || typeof raw !== 'object') return EMPTY_OVERRIDES;
  const candidate = raw as Partial<ContentOverrides>;

  const stats = Array.isArray(candidate.stats)
    ? candidate.stats
        .filter(
          (s): s is StatEntry =>
            !!s && typeof s.label === 'string' && typeof s.value === 'string',
        )
        .slice(0, BASE_STATS.length)
    : [];

  const visionMetrics: Record<string, string> = {};
  if (candidate.visionMetrics && typeof candidate.visionMetrics === 'object') {
    Object.keys(BASE_VISION_METRICS).forEach((id) => {
      const value = (candidate.visionMetrics as Record<string, unknown>)[id];
      if (typeof value === 'string' && value.trim()) visionMetrics[id] = value;
    });
  }

  return { stats, visionMetrics };
};

const readOverrides = (): ContentOverrides => {
  try {
    const raw = window.localStorage.getItem(OVERRIDES_KEY);
    return raw ? normalize(JSON.parse(raw)) : EMPTY_OVERRIDES;
  } catch {
    // Private browsing / disabled storage / malformed JSON — fall back to defaults.
    return EMPTY_OVERRIDES;
  }
};

const writeOverrides = (next: ContentOverrides) => {
  try {
    window.localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
  } catch {
    // A failed write must not break editing in the current session.
  }
};

export const verifyPasscode = (input: string): boolean => {
  if (!ADMIN_PASSCODE) return false;
  return input === ADMIN_PASSCODE;
};

export const useAdminUnlocked = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(UNLOCK_KEY) === 'true');
    } catch {
      setUnlocked(false);
    }
  }, []);

  const unlock = useCallback(() => {
    try {
      window.sessionStorage.setItem(UNLOCK_KEY, 'true');
    } catch {
      // Session persistence is a convenience only.
    }
    setUnlocked(true);
  }, []);

  const lock = useCallback(() => {
    try {
      window.sessionStorage.removeItem(UNLOCK_KEY);
    } catch {
      // Ignore — in-memory state is still cleared below.
    }
    setUnlocked(false);
  }, []);

  return { unlocked, unlock, lock };
};

/**
 * Merges stored overrides on top of the static portfolio data. Consumers read
 * the resolved arrays, so they never need to know whether an override exists.
 */
export const useContentOverrides = () => {
  const [overrides, setOverrides] = useState<ContentOverrides>(EMPTY_OVERRIDES);

  useEffect(() => {
    setOverrides(readOverrides());
  }, []);

  const updateStat = useCallback((index: number, patch: Partial<StatEntry>) => {
    setOverrides((current) => {
      // Build from BASE_STATS, not from the stored array — on a first visit the
      // stored array is empty and mapping over it would drop the edit entirely.
      const next: ContentOverrides = {
        stats: BASE_STATS.map((base, i) => ({
          ...base,
          ...(current.stats[i] ?? {}),
          ...(i === index ? patch : {}),
        })),
        visionMetrics: current.visionMetrics,
      };
      writeOverrides(next);
      return next;
    });
  }, []);

  const updateVisionMetric = useCallback((goalId: string, metric: string) => {
    setOverrides((current) => {
      const next = {
        stats: current.stats,
        visionMetrics: { ...current.visionMetrics, [goalId]: metric },
      };
      writeOverrides(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    try {
      window.localStorage.removeItem(OVERRIDES_KEY);
    } catch {
      // Ignore.
    }
    setOverrides(EMPTY_OVERRIDES);
  }, []);

  const stats: StatEntry[] = BASE_STATS.map((base, i) => ({
    ...base,
    ...(overrides.stats[i] ?? {}),
  }));

  const visionMetrics: Record<string, string> = { ...BASE_VISION_METRICS };
  Object.keys(BASE_VISION_METRICS).forEach((id) => {
    const override = overrides.visionMetrics[id];
    if (override) visionMetrics[id] = override;
  });

  const hasOverrides = overrides.stats.length > 0 || Object.keys(overrides.visionMetrics).length > 0;

  return { stats, visionMetrics, updateStat, updateVisionMetric, resetAll, hasOverrides };
};