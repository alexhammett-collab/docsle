import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rides', label: 'Ride Outs' },
  { to: '/events', label: 'Events' },
  { to: '/members', label: 'Members' },
  { to: '/partners', label: 'Partners' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10,10,10,0.97)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        borderBottom: scrolled ? '1px solid rgba(204,0,0,0.3)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'var(--ducati-red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}>
              <span style={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em' }}>D</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'white', letterSpacing: '0.15em', lineHeight: 1 }}>DOCLSE</div>
              <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Rajdhani', lineHeight: 1 }}>Ducati Owners Club London &amp; SE</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontFamily: 'Rajdhani',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: location.pathname === l.to ? 'var(--ducati-red)' : 'rgba(255,255,255,0.8)',
                  transition: 'color 0.2s',
                  borderBottom: location.pathname === l.to ? '2px solid var(--ducati-red)' : '2px solid transparent',
                  paddingBottom: '2px',
                }}
              >{l.label}</Link>
            ))}
            <Link to="/rides" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
                Join a Ride
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
            className="show-mobile"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'rgba(10,10,10,0.98)',
            borderTop: '1px solid rgba(204,0,0,0.3)',
            padding: '1.5rem 0',
          }}>
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  fontFamily: 'Rajdhani',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: location.pathname === l.to ? 'var(--ducati-red)' : 'white',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >{l.label}</Link>
            ))}
            <Link to="/rides" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                Join a Ride
              </button>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
