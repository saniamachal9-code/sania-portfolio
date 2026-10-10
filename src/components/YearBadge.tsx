import React from 'react';
import { getCurrentYear } from '../utils/yearUtils';

/** Year badge that shows the current year — injected at build time. */
export const YearBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const year = getCurrentYear();

  return (
    <span className={`year-badge ${className}`} aria-label={`Portfolio updated ${year}`}>
      {year}
    </span>
  );
};

/** Current year as a plain number for inline use. */
export const CurrentYear: React.FC<{ className?: string }> = ({ className = '' }) => {
  const year = getCurrentYear();
  return <span className={className}>{year}</span>;
};