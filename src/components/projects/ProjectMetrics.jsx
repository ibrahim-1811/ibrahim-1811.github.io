export default function ProjectMetrics({ metrics }) {
  if (!metrics?.length) return null;
  return (
    <dl className="project-metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
