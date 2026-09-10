export default function ProjectMetrics({ metrics, className = '' }) {
  if (!metrics?.length) return null;
  return (
    <dl className={`project-metrics ${className}`.trim()}>
      {metrics.map((metric) => (
        <div key={`${metric.value}-${metric.label}`}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
