import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter } from 'lucide-react';
import { events } from '../data/events';

const categories = ['All', 'Club Event', 'Ride Out', 'Track Day', 'Social', 'Italy'];
const months = ['All Months', 'March', 'April', 'May', 'June', 'July', 'August'];

const catColors = {
  'Italy': '#c8a951',
  'Track Day': '#4a9eff',
  'Club Event': '#cc0000',
  'Social': '#4caf50',
  'Ride Out': '#cc0000',
};

function EventDetailModal({ event, onClose }) {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--ducati-gray)', border: '1px solid rgba(204,0,0,0.3)',
        maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        {/* Image */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', width: '36px', height: '36px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
          }}>×</button>
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem' }}>
            <span style={{
              background: catColors[event.category] || '#cc0000',
              color: 'white', fontFamily: 'Rajdhani', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.15em', padding: '0.25rem 0.6rem',
              textTransform: 'uppercase',
            }}>{event.category}</span>
            {event.country === 'Italy' && <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>🇮🇹</span>}
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '2rem', color: 'white', lineHeight: 1, marginBottom: '1rem' }}>{event.title}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { icon: <Calendar size={14} />, text: new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
              { icon: <Clock size={14} />, text: event.time },
              { icon: <MapPin size={14} />, text: event.location },
              { icon: <Users size={14} />, text: `${event.attending} attending` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--ducati-red)', marginTop: '1px', flexShrink: 0 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            {event.description}
          </p>

          {!registered ? (
            <div>
              <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                Register Interest
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1rem', fontFamily: 'Inter', fontSize: '0.875rem', outline: 'none' }} />
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1rem', fontFamily: 'Inter', fontSize: '0.875rem', outline: 'none' }} />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => name && email && setRegistered(true)}>
                Register for this Event <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.3)', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--ducati-red)', marginBottom: '0.25rem' }}>You're registered!</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>We'll send details to {email} closer to the date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = events.filter(e =>
    activeCategory === 'All' ? true :
    activeCategory === 'Italy' ? e.country === 'Italy' :
    e.category === activeCategory
  );

  const featured = events.filter(e => e.featured);
  const upcoming = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1699592472377-ee1b86bd7e9b?w=1600&q=95&auto=format" alt="Events" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>UK &amp; Italy</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95 }}>EVENTS &<br /><span style={{ color: 'var(--ducati-red)' }}>CALENDAR</span></h1>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Not to be Missed</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white', marginBottom: '0.75rem' }}>FEATURED EVENTS</h2>
        <div className="red-divider" style={{ marginBottom: '2.5rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {featured.map(event => (
            <div
              key={event.id}
              className="card-dark"
              style={{ overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setSelectedEvent(event)}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ background: catColors[event.category] || '#cc0000', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.15em', padding: '0.2rem 0.55rem', textTransform: 'uppercase' }}>
                    {event.category}
                  </span>
                  {event.country === 'Italy' && <span style={{ fontSize: '0.9rem' }}>🇮🇹</span>}
                </div>
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
                  <div className="font-display" style={{ fontSize: '1.5rem', color: 'white', lineHeight: 1, marginBottom: '0.25rem' }}>{event.title}</div>
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                    <Calendar size={12} style={{ color: 'var(--ducati-red)' }} />
                    {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                    <MapPin size={12} style={{ color: 'var(--ducati-red)' }} />
                    {event.location.split(',')[0]}
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {event.description.substring(0, 110)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    <Users size={12} style={{ color: 'var(--ducati-red)' }} /> {event.attending} attending
                  </span>
                  <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }} onClick={e => { e.stopPropagation(); setSelectedEvent(event); }}>
                    Details <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Events with filter */}
      <section style={{ padding: '0 2rem 6rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>2026 Season</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white' }}>ALL EVENTS</h2>
            <div className="red-divider" style={{ marginTop: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={14} style={{ color: 'var(--ducati-red)' }} />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--ducati-red)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'var(--ducati-red)' : 'rgba(255,255,255,0.15)'}`,
                  color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
                  padding: '0.4rem 0.9rem',
                  fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.78rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* Timeline list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {upcoming.map(event => (
            <div
              key={event.id}
              className="card-dark"
              style={{ display: 'flex', gap: '0', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Date block */}
              <div style={{ background: 'rgba(204,0,0,0.08)', borderRight: '1px solid rgba(204,0,0,0.2)', padding: '1.5rem 1.25rem', textAlign: 'center', minWidth: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="font-display" style={{ fontSize: '2.2rem', color: 'var(--ducati-red)', lineHeight: 1 }}>
                  {new Date(event.date).getDate()}
                </div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                </div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' }}>
                  {new Date(event.date).getFullYear()}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ background: catColors[event.category] || '#cc0000', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '0.15rem 0.45rem', textTransform: 'uppercase' }}>{event.category}</span>
                    {event.country === 'Italy' && <span style={{ fontSize: '0.85rem' }}>🇮🇹</span>}
                  </div>
                  <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem', color: 'white', marginBottom: '0.3rem' }}>{event.title}</h3>
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                      <Clock size={11} style={{ color: 'var(--ducati-red)' }} />{event.time}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                      <MapPin size={11} style={{ color: 'var(--ducati-red)' }} />{event.location.split(',').slice(0, 2).join(',')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                      <Users size={11} style={{ color: 'var(--ducati-red)' }} />{event.attending} attending
                    </span>
                  </div>
                </div>
                <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', flexShrink: 0 }} onClick={e => { e.stopPropagation(); setSelectedEvent(event); }}>
                  Register <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}
