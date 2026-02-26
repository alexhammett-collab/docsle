import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rides', label: 'Ride Outs' },
  { to: '/events', label: 'Events' },
  { to: '/members', label: 'Members' },
  { to: '/partners', label: 'Partners' },
  { to: '/route-intelligence', label: 'Route Intelligence' },
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
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        borderBottom: scrolled ? '1px solid rgba(204,0,0,0.3)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Left — burger */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Centre — logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'var(--ducati-red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                flexShrink: 0,
              }}>
                <span style={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '0.95rem' }}>D</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.35rem', color: 'white', letterSpacing: '0.15em', lineHeight: 1 }}>DOCLSE</div>
                <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Rajdhani', lineHeight: 1, whiteSpace: 'nowrap' }}>Ducati Owners Club London &amp; SE</div>
              </div>
            </Link>

            {/* Right — CTA */}
            <Link to="/rides" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <button className="btn-primary" style={{ padding: '0.45rem 1.25rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                Join a Ride
              </button>
            </Link>

          </div>
        </div>
      </nav>

      {/* Slide-out drawer overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 98,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* Slide-out drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 99,
        width: '280px',
        background: 'rgba(10,10,10,0.98)',
        borderRight: '1px solid rgba(204,0,0,0.25)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        paddingTop: '72px',
      }}>
        {/* Red accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: 'var(--ducati-red)' }} />

        <div style={{ padding: '1.5rem 2rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>
            Navigation
          </div>
          {navLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.85rem 0',
                fontFamily: 'Rajdhani', fontWeight: 700,
                fontSize: '1.05rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none',
                color: location.pathname === l.to ? 'var(--ducati-red)' : 'rgba(255,255,255,0.75)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { if (location.pathname !== l.to) e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { if (location.pathname !== l.to) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
            >
              {l.label}
              {location.pathname === l.to && (
                <div style={{ width: '6px', height: '6px', background: 'var(--ducati-red)', borderRadius: '50%' }} />
              )}
            </Link>
          ))}
        </div>

        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/rides" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Join a Ride
            </button>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', fontFamily: 'Rajdhani', letterSpacing: '0.1em', textAlign: 'center', marginTop: '1rem' }}>
            DOCLSE · Est. London 2014
          </p>
        </div>
      </div>

      <style>{`
        .btn-primary { display: flex; align-items: center; }
      `}</style>
    </>
  );
}
