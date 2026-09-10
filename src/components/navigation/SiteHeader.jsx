import { useEffect, useRef, useState } from 'react';
import { profile } from '../../content/profile';
import Container from '../layout/Container';
import Icon from '../ui/Icon';
import ThemeToggle from './ThemeToggle';

const links = [['Work','#work'], ['Research','#research'], ['Experience','#experience'], ['About','#about'], ['Resume',profile.resume]];

function NavLinks({ onNavigate }) {
  return links.map(([label, href]) => <a key={label} href={href} onClick={() => onNavigate?.(href)}>{label}{label === 'Resume' && <Icon name="external" size={14} />}</a>);
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    const desktop = window.matchMedia?.('(min-width: 761px)');
    const onResize = () => { if (desktop?.matches) setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    desktop?.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      desktop?.removeEventListener('change', onResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = event => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen]);

  const navigate = href => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      requestAnimationFrame(() => document.getElementById(href.slice(1))?.focus({preventScroll:true}));
    } else menuRef.current?.focus();
  };

  return <header ref={headerRef} className={`site-header${compact ? ' is-compact' : ''}`}
    onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuRef.current?.focus(); }
    }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
    <Container className="header-inner">
      <a className="wordmark" href="#top" aria-label="Mohammad Memon, back to top"><span className="identity-mark" aria-hidden="true">m.</span><span>Mohammad Memon</span></a>
      <nav className="desktop-navigation" aria-label="Primary"><NavLinks /></nav>
      <div className="header-actions"><ThemeToggle />
        <button ref={menuRef} type="button" className="icon-button menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </Container>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile" hidden={!menuOpen}><NavLinks onNavigate={navigate} /></nav>
  </header>;
}
