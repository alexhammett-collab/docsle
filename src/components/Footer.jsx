import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(204,0,0,0.2)', padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'var(--ducati-red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}>
                <span style={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '1rem' }}>D</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: 'white', letterSpacing: '0.15em' }}>DOCLSE</div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Rajdhani' }}>London &amp; South East</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              The premier Ducati owners club for London and the South East. Passion, community, and the finest roads in England.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <Instagram size={18} />, href: '#' },
                { icon: <Facebook size={18} />, href: '#' },
                { icon: <Youtube size={18} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: '38px', height: '38px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ducati-red)'; e.currentTarget.style.color = 'var(--ducati-red)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '1.25rem' }}>Navigation</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/rides', label: 'Ride Outs' },
              { to: '/events', label: 'Events & Calendar' },
              { to: '/members', label: 'Members' },
              { to: '/partners', label: 'DOCLSE Partners' },
              { to: '/route-intelligence', label: 'Route Intelligence' },
              { to: '/about', label: 'About DOCLSE' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                fontFamily: 'Rajdhani', fontSize: '0.9rem', marginBottom: '0.6rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '1.25rem' }}>Contact</h4>
            {[
              { icon: <MapPin size={15} />, text: 'London & South East, UK' },
              { icon: <Mail size={15} />, text: 'hello@doclse.co.uk' },
              { icon: <Phone size={15} />, text: '+44 (0)20 0000 0000' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--ducati-red)', marginTop: '1px', flexShrink: 0 }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '1.25rem' }}>Stay in the Loop</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Get ride announcements and event news straight to your inbox.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  padding: '0.65rem 1rem',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            © 2026 DOCLSE — Ducati Owners Club London &amp; South East. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            Not affiliated with Ducati Motor Holding S.p.A.
          </p>
        </div>
      </div>
    </footer>
  );
}
