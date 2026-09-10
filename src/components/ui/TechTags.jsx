export default function TechTags({ items, label = 'Technologies' }) {
  return (
    <ul className="tech-tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
