import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'hi';

export interface Preferences {
  language: Language;
  /** In-app notification preferences (contact replies + project updates). */
  notifyReplies: boolean;
  notifyProjects: boolean;
  notifyTips: boolean;
  /** Privacy: gates the analytics component entirely. */
  allowAnalytics: boolean;
  /** Privacy: hides the "powered by" style attribution lines. */
  reduceMotion: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  language: 'en',
  notifyReplies: true,
  notifyProjects: true,
  notifyTips: false,
  allowAnalytics: true,
  reduceMotion: false,
};

const STORAGE_KEY = 'sania:prefs:v1';

interface PreferencesContextValue extends Preferences {
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  resetPrefs: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const isLanguage = (value: unknown): value is Language => value === 'en' || value === 'hi';

/** Keeps unknown/removed keys from leaking in via a stale localStorage payload. */
const normalize = (raw: unknown): Preferences => {
  if (!raw || typeof raw !== 'object') return DEFAULT_PREFERENCES;
  const candidate = raw as Partial<Preferences>;

  return {
    language: isLanguage(candidate.language) ? candidate.language : DEFAULT_PREFERENCES.language,
    notifyReplies:
      typeof candidate.notifyReplies === 'boolean'
        ? candidate.notifyReplies
        : DEFAULT_PREFERENCES.notifyReplies,
    notifyProjects:
      typeof candidate.notifyProjects === 'boolean'
        ? candidate.notifyProjects
        : DEFAULT_PREFERENCES.notifyProjects,
    notifyTips:
      typeof candidate.notifyTips === 'boolean'
        ? candidate.notifyTips
        : DEFAULT_PREFERENCES.notifyTips,
    allowAnalytics:
      typeof candidate.allowAnalytics === 'boolean'
        ? candidate.allowAnalytics
        : DEFAULT_PREFERENCES.allowAnalytics,
    reduceMotion:
      typeof candidate.reduceMotion === 'boolean'
        ? candidate.reduceMotion
        : DEFAULT_PREFERENCES.reduceMotion,
  };
};

const readStored = (): Preferences => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);

  // Read after mount so the very first paint is not blocked on storage.
  useEffect(() => {
    setPrefs(readStored());
  }, []);

  const setPref = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((current) => {
      const next = { ...current, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be unavailable (private mode); keep working in-memory.
      }
      return next;
    });
  }, []);

  const resetPrefs = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    setPrefs(DEFAULT_PREFERENCES);
  }, []);

  // Reflect the motion preference onto <html> so CSS can respond.
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', prefs.reduceMotion);
  }, [prefs.reduceMotion]);

  useEffect(() => {
    document.documentElement.lang = prefs.language === 'hi' ? 'hi' : 'en';
  }, [prefs.language]);

  const value = useMemo<PreferencesContextValue>(
    () => ({ ...prefs, setPref, resetPrefs }),
    [prefs, setPref, resetPrefs],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = (): PreferencesContextValue => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside <PreferencesProvider>');
  return ctx;
};