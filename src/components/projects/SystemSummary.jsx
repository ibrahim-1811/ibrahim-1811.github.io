export default function SystemSummary({ system }) {
  return (
    <div className="system-summary">
      <p className="eyebrow">{system.label}</p>
      <p className="system-title">{system.title}</p>
      <ol>
        {system.steps.map((step) => (
          <li key={step.label}>
            <span className="system-label">{step.label}</span>
            <strong>{step.value}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
      {system.note && <p className="system-note">{system.note}</p>}
    </div>
  );
}
