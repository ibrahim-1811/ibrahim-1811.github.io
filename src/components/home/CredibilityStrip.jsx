import { profile } from '../../content/profile';
import Container from '../layout/Container';
export default function CredibilityStrip() {
  return <section className="credibility" aria-label="Professional highlights"><Container><dl>{profile.credibility.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></Container></section>;
}
