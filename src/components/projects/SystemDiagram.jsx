import { STATUS_TONES } from '../../features/projects/vocabulary';
import StatusBadge from './StatusBadge';

/**
 * Renders `project.system`: a layered platform ('stack', listed top to bottom) or a
 * numbered pipeline ('flow'). Variants: 'card' (decorative duplicate of the dialog
 * diagram, hidden from assistive technology), 'hero' and 'section'.
 */
export default function SystemDiagram({ system, variant = 'section' }) {
  if (!system?.parts?.length) return null;
  const layout = system.layout === 'stack' ? 'stack' : 'flow';
  return (
    <figure
      className={`system-diagram system-diagram--${layout} system-diagram--${variant}`}
      aria-hidden={variant === 'card' || undefined}
    >
      {system.title && <figcaption className="system-diagram__caption">{system.title}</figcaption>}
      <ol className="system-diagram__parts">
        {system.parts.map((part, index) => (
          <li
            key={part.name}
            className="system-part"
            data-tone={part.status ? STATUS_TONES[part.status] : undefined}
          >
            {layout === 'flow' && (
              <span className="system-part__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
            <span className="system-part__name">{part.name}</span>
            {part.detail && <span className="system-part__detail">{part.detail}</span>}
            {part.status && <StatusBadge status={part.status} />}
          </li>
        ))}
      </ol>
    </figure>
  );
}
