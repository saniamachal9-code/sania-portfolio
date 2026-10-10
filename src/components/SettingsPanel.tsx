import React, { useEffect, useRef, useState } from 'react';
import {
  Settings,
  X,
  Lock,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  BASE_STATS,
  isAdminConfigured,
  verifyPasscode,
  useAdminUnlocked,
  type StatEntry,
} from '../lib/contentStore';
import { VISION_GOALS } from '../data/portfolioData';
import { trackEvent } from '../lib/analytics';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  stats: StatEntry[];
  visionMetrics: Record<string, string>;
  onUpdateStat: (index: number, patch: Partial<StatEntry>) => void;
  onUpdateVisionMetric: (goalId: string, metric: string) => void;
  onResetAll: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  open,
  onClose,
  stats,
  visionMetrics,
  onUpdateStat,
  onUpdateVisionMetric,
  onResetAll,
}) => {
  const { unlocked, unlock, lock } = useAdminUnlocked();
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTrackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(
    () => () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (saveTrackTimerRef.current) clearTimeout(saveTrackTimerRef.current);
    },
    [],
  );

  if (!open) return null;

  // The localStorage write already happened synchronously in the store, so the
  // flash is cosmetic and the analytics event is debounced to avoid firing on
  // every keystroke.
  const flashSaved = () => {
    setSavedFlash(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setSavedFlash(false), 1600);

    if (saveTrackTimerRef.current) clearTimeout(saveTrackTimerRef.current);
    saveTrackTimerRef.current = setTimeout(() => trackEvent('settings_save'), 1200);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passcode)) {
      setError('');
      setPasscode('');
      unlock();
      trackEvent('settings_unlock');
    } else {
      setError('Incorrect passcode. Please try again.');
      trackEvent('settings_unlock_failed');
    }
  };

  const handleReset = () => {
    onResetAll();
    setSavedFlash(false);
    trackEvent('settings_reset');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overlay-fade"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-3.5 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-mono-code text-slate-700 uppercase tracking-wider font-bold">
              Settings
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* Locked State */}
          {!unlocked && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-900">Owner access only</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dashboard stats aur Vision numbers update karne ke liye passcode daalein.
                  </p>
                </div>
              </div>

              {!isAdminConfigured ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-900">Passcode not configured</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <code className="font-mono-code text-[11px] bg-white px-1 py-0.5 rounded border border-amber-200">
                        VITE_ADMIN_PASSCODE
                      </code>{' '}
                      set karein (local <code className="font-mono-code text-[11px]">.env</code> me), phir dev
                      server restart karein. Jab tak set nahi hoga, Settings locked rahega.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUnlock} className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Admin Passcode</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPasscode ? 'text' : 'password'}
                        value={passcode}
                        onChange={(e) => {
                          setPasscode(e.target.value);
                          setError('');
                        }}
                        placeholder="Enter passcode"
                        autoFocus
                        className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                      >
                        {showPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-xs text-red-600 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Settings</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Unlocked Editor */}
          {unlocked && (
            <div className="space-y-5">

              {/* Device Scope Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Changes sirf is browser me save hote hain (localStorage). Ye
                  website ke code ko permanently edit nahi karte — doosre devices
                  par original values hi dikhenge.
                </p>
              </div>

              {/* Dashboard Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono-code text-slate-700 uppercase tracking-wider font-bold">
                    Dashboard Stats
                  </h3>
                  {savedFlash && (
                    <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {BASE_STATS.map((base, idx) => (
                    <div
                      key={`${base.label}-${idx}`}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="text-[11px] font-mono-code text-slate-500">
                        Tile {idx + 1} · default &ldquo;{base.label}: {base.value}&rdquo;
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={stats[idx]?.label ?? ''}
                          onChange={(e) => {
                            onUpdateStat(idx, { label: e.target.value });
                            flashSaved();
                          }}
                          placeholder="Label"
                          aria-label={`Stat ${idx + 1} label`}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                        />
                        <input
                          type="text"
                          value={stats[idx]?.value ?? ''}
                          onChange={(e) => {
                            onUpdateStat(idx, { value: e.target.value });
                            flashSaved();
                          }}
                          placeholder="Value"
                          aria-label={`Stat ${idx + 1} value`}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Metrics */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono-code text-slate-700 uppercase tracking-wider font-bold">
                  Vision Goal Numbers
                </h3>

                <div className="space-y-2.5">
                  {VISION_GOALS.map((goal) => (
                    <div
                      key={goal.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-900 leading-tight">
                            {goal.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono-code mt-0.5">
                            {goal.metricLabel} · default &ldquo;{goal.metric}&rdquo;
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-mono-code text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-bold">
                          {goal.horizon}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={visionMetrics[goal.id] ?? ''}
                        onChange={(e) => {
                          onUpdateVisionMetric(goal.id, e.target.value);
                          flashSaved();
                        }}
                        placeholder={goal.metric}
                        aria-label={`${goal.title} metric`}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    lock();
                    setPasscode('');
                    setError('');
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer self-start"
                >
                  Lock again
                </button>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to defaults</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Session me unlocked — page reload ke baad dobara lock ho jayega.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};