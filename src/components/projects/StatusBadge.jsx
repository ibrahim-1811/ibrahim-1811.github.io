import { STATUS_LABELS, STATUS_TONES } from '../../features/projects/vocabulary';

/** A status key (e.g. 'in-development') renders its label; `children` allows free text. */
export default function StatusBadge({ status, tone, children }) {
  const label = children ?? STATUS_LABELS[status];
  if (!label) return null;
  return (
    <span className={`status-badge status-badge--${tone ?? STATUS_TONES[status] ?? 'neutral'}`}>
      <span className="status-badge__mark" aria-hidden="true" />
      {label}
    </span>
  );
}
