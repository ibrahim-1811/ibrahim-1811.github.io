export default function TechTags({ items }) {
  return <ul className="tech-tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
