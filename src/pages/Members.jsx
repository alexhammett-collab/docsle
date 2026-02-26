import { useState } from 'react';
import { Instagram, MapPin, Trophy, Route } from 'lucide-react';
import { members } from '../data/members';

function MemberCard({ member, onClick }) {
  return (
    <div className="card-dark" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => onClick(member)}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={member.bikeImage} alt={member.bike}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7)', transition: 'all 0.4s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(1)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{member.bike}</div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{member.year}</div>
        </div>
      </div>
      <div style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <img src={member.image} alt={member.name}
          style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--ducati-red)', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.05rem', color: 'white', marginBottom: '0.2rem' }}>{member.name}</div>
          <div style={{ background: 'rgba(204,0,0,0.15)', border: '1px solid rgba(204,0,0,0.3)', color: 'var(--ducati-red)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '0.1rem 0.5rem', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.3rem' }}>
            {member.role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            <MapPin size={11} style={{ color: 'var(--ducati-red)' }} /> {member.location}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-around' }}>
        {[
          { icon: <Trophy size={12} />, val: member.rides, lbl: 'rides' },
          { icon: <Route size={12} />, val: `${(member.miles / 1000).toFixed(1)}k`, lbl: 'miles' },
          { icon: '📅', val: member.joined, lbl: 'joined' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--ducati-red)', justifyContent: 'center', fontSize: typeof s.icon === 'string' ? '0.85rem' : undefined }}>{s.icon}</div>
            <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{s.val}</div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberModal({ member, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'var(--ducati-gray)', border: '1px solid rgba(204,0,0,0.3)', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <img src={member.bikeImage} alt={member.bike} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>×</button>
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem' }}>
            <div className="font-display" style={{ fontSize: '1.5rem', color: 'white', lineHeight: 1 }}>{member.bike}</div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{member.year} · {member.colour}</div>
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <img src={member.image} alt={member.name} style={{ width: '72px', height: '72px', objectFit: 'cover', border: '2px solid var(--ducati-red)', flexShrink: 0 }} />
            <div>
              <h2 className="font-display" style={{ fontSize: '2rem', color: 'white', lineHeight: 1, marginBottom: '0.25rem' }}>{member.name}</h2>
              <div style={{ background: 'var(--ducati-red)', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', padding: '0.2rem 0.6rem', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.4rem' }}>{member.role}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                <MapPin size={12} style={{ color: 'var(--ducati-red)' }} /> {member.location}
              </div>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2rem' }}>{member.bio}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { val: member.rides, lbl: 'Rides' },
              { val: `${member.miles.toLocaleString()}`, lbl: 'Miles' },
              { val: `Since ${member.joined}`, lbl: 'Member' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem', textAlign: 'center' }}>
                <div className="font-heading" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--ducati-red)' }}>{s.val}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '0.2rem' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
          {member.social?.instagram && (
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'Rajdhani', fontSize: '0.85rem' }}>
              <Instagram size={15} style={{ color: 'var(--ducati-red)' }} />{member.social.instagram}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Members() {
  const [selected, setSelected] = useState(null);
  const committee = members.filter(m => m.role !== 'Member');
  const regular = members.filter(m => m.role === 'Member');

  return (
    <div style={{ paddingTop: '72px' }}>
      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1668365211826-7d7eb4d4a0f2?w=1600&q=95&auto=format" alt="Members" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>The Community</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95 }}>OUR<br /><span style={{ color: 'var(--ducati-red)' }}>MEMBERS</span></h1>
          </div>
        </div>
      </div>

      <section style={{ padding: '5rem 2rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>The Team</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white', marginBottom: '0.75rem' }}>COMMITTEE</h2>
        <div className="red-divider" style={{ marginBottom: '3rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {committee.map(m => <MemberCard key={m.id} member={m} onClick={setSelected} />)}
        </div>
      </section>

      <section style={{ padding: '1rem 2rem 6rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>All Riders</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white', marginBottom: '0.75rem' }}>MEMBERS</h2>
        <div className="red-divider" style={{ marginBottom: '3rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {regular.map(m => <MemberCard key={m.id} member={m} onClick={setSelected} />)}
        </div>
      </section>

      {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
