import React from 'react';

interface PlaceholderImageProps {
  label: string;
  /** Tailwind gradient classes for the placeholder surface. */
  gradient?: string;
  className?: string;
  icon?: React.ReactNode;
  /** Rendered as a small "replace me" tag so empty slots are obvious. */
  showTag?: boolean;
}

/**
 * Deterministic gradient placeholder used wherever a real photo is not
 * available yet. Inline SVG keeps it dependency-free and means the layout never
 * shows a broken-image icon or a network request.
 */
export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label,
  gradient = 'from-brand/25 via-brand/10 to-transparent',
  className = '',
  icon,
  showTag = true,
}) => (
  <div
    className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    role="img"
    aria-label={`${label} — placeholder`}
  >
    {/* Subtle grid texture so the slot reads as "intentionally empty" */}
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
      {icon && <div className="text-brand/70">{icon}</div>}
      <span className="text-xs font-mono-code font-semibold text-muted/90">{label}</span>
      {showTag && (
        <span className="text-[9px] font-mono-code uppercase tracking-wider text-faint border border-line rounded-full px-2 py-0.5">
          Replace image
        </span>
      )}
    </div>
  </div>
);