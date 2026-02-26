import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, ChevronDown, Star } from 'lucide-react';
import { rides } from '../data/rides';
import { events } from '../data/events';
import { rideStats } from '../data/rides';

const heroImages = [
  "https://images.unsplash.com/photo-1698695290237-5c7be2bd52a8?w=2400&q=95&fit=crop&auto=format",
];

function StatCard({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--ducati-red)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>{label}</div>
    </div>
  );
}

function RideCard({ ride }) {
  return (
    <Link to="/rides" style={{ textDecoration: 'none', display: 'block' }}>
    <div className="card-dark" style={{ overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={ride.image} alt={ride.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: 'var(--ducati-red)', color: 'white',
          fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em',
          padding: '0.25rem 0.6rem', textTransform: 'uppercase',
        }}>{ride.difficulty}</div>
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', color: 'white' }}>
          <div className="font-display" style={{ fontSize: '1.4rem', lineHeight: 1 }}>{ride.title}</div>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            <Calendar size={13} style={{ color: 'var(--ducati-red)' }} />
            {new Date(ride.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — {ride.time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            <MapPin size={13} style={{ color: 'var(--ducati-red)' }} />
            {ride.distance}
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {ride.description.substring(0, 100)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <Users size={13} style={{ color: 'var(--ducati-red)' }} />
            {ride.joined}/{ride.capacity} joined
          </div>
          <div style={{ width: `${(ride.joined / ride.capacity) * 100}%`, maxWidth: '100px', height: '3px', background: 'var(--ducati-red)', borderRadius: '2px', position: 'relative' }}>
            <div style={{ position: 'absolute', right: 0, top: '-10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}></div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

function EventCard({ event }) {
  const catColors = { 'Italy': '#c8a951', 'Track Day': '#4a9eff', 'Club Event': 'var(--ducati-red)', 'Social': '#4caf50', 'Ride Out': 'var(--ducati-red)' };
  return (
    <Link to="/events" style={{ textDecoration: 'none', display: 'block' }}>
    <div className="card-dark" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }}>
      <div style={{ textAlign: 'center', minWidth: '50px' }}>
        <div className="font-display" style={{ fontSize: '2rem', color: 'var(--ducati-red)', lineHeight: 1 }}>
          {new Date(event.date).getDate()}
        </div>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ background: catColors[event.category] || 'var(--ducati-red)', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', padding: '0.15rem 0.5rem', textTransform: 'uppercase' }}>
            {event.category}
          </span>
          {event.country === 'Italy' && <span style={{ fontSize: '0.8rem' }}>🇮🇹</span>}
        </div>
        <h4 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.3rem' }}>{event.title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          <MapPin size={11} /> {event.location}
        </div>
      </div>
    </div>
    </Link>
  );
}

export default function Home() {
  const upcomingRides = rides.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={heroImages[0]}
            alt="Ducati on road"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(204,0,0,0.15) 100%)' }} />
        </div>

        {/* Red accent line */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />

        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>London &amp; South East — Est. 2014</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.92, color: 'white', marginBottom: '1.5rem' }}>
              RIDE.<br />
              <span style={{ color: 'var(--ducati-red)' }}>CONNECT.</span><br />
              CONQUER.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px', fontWeight: 300 }}>
              The premier Ducati owners club for London and the South East. Group rides, exclusive events, and a community built on passion.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/rides" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">
                  Explore Ride Outs <ArrowRight size={16} />
                </button>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <button className="btn-outline">
                  Join DOCLSE
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>
          <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={16} style={{ animation: 'bounce 2s infinite' }} />
        </div>

        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(6px)} }`}</style>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'var(--ducati-gray)', borderTop: '3px solid var(--ducati-red)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '2rem', textAlign: 'center' }}>
          <StatCard value={rideStats.totalRides} label="Ride Outs Run" />
          <StatCard value={rideStats.totalMembers} label="Active Members" />
          <StatCard value={`${(rideStats.milesRidden / 1000).toFixed(0)}K`} label="Miles Ridden" />
          <StatCard value={rideStats.yearsRunning} label="Years Running" />
        </div>
      </section>

      {/* UPCOMING RIDES */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Plan Your Next Adventure</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', lineHeight: 1 }}>UPCOMING RIDE OUTS</h2>
            <div className="red-divider" style={{ marginTop: '0.75rem' }} />
          </div>
          <Link to="/rides" style={{ textDecoration: 'none' }}>
            <button className="btn-outline" style={{ fontSize: '0.85rem' }}>
              View All Rides <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {upcomingRides.map(r => <RideCard key={r.id} ride={r} />)}
        </div>
      </section>

      {/* FEATURE BANNER — World Ducati Week */}
      <section style={{ position: 'relative', overflow: 'hidden', margin: '0 0 0 0' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1589560552200-67fbddd531f0?w=1800&q=95&auto=format" alt="Italy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🇮🇹</span>
              <div className="section-label">July 2026 — Misano, Italy</div>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', lineHeight: 1, marginBottom: '1rem' }}>
              WORLD DUCATI<br /><span style={{ color: 'var(--ducati-red)' }}>WEEK 2026</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '450px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Join the DOCLSE convoy to Misano. Group ferry crossing, guided ride through France and Switzerland, and the world's greatest Ducati festival awaits.
            </p>
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">
                Find Out More <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', minWidth: '240px' }}>
            {[['41', 'Members Going'], ['7', 'Days', ], ['1200', 'Miles'], ['2026', 'Year']].map(([v, l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '1.25rem', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                <div className="font-display" style={{ fontSize: '2.5rem', color: 'var(--ducati-red)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>UK & Italy</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', lineHeight: 1 }}>UPCOMING EVENTS</h2>
            <div className="red-divider" style={{ marginTop: '0.75rem' }} />
          </div>
          <Link to="/events" style={{ textDecoration: 'none' }}>
            <button className="btn-outline" style={{ fontSize: '0.85rem' }}>
              Full Calendar <ArrowRight size={14} />
            </button>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {upcomingEvents.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      {/* BIKES GALLERY STRIP */}
      <section style={{ padding: '0 0 6rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 2rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>The Machines</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', lineHeight: 1, marginBottom: '0.75rem' }}>MEMBERS' RIDES</h2>
          <div className="red-divider" />
        </div>
        <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[
            { src: "https://images.unsplash.com/photo-1698695290237-5c7be2bd52a8?w=800&q=95&auto=format", label: "Panigale V4R" },
            { src: "https://images.unsplash.com/photo-1698695276280-35560ec38525?w=800&q=95&auto=format", label: "Panigale V4S" },
            { src: "https://images.unsplash.com/photo-1615812309036-e3aeba454bba?w=800&q=95&auto=format", label: "Monster SP" },
            { src: "https://images.unsplash.com/photo-1698695359291-586a107a3328?w=800&q=95&auto=format", label: "Streetfighter V2" },
            { src: "https://images.unsplash.com/photo-1660895707196-b7d45d049802?w=800&q=95&auto=format", label: "Multistrada V4" },
            { src: "https://images.unsplash.com/photo-1635094742897-3f0014ccc07b?w=800&q=95&auto=format", label: "Diavel V4" },
            { src: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=800&q=95&auto=format", label: "Scrambler Icon" },
          ].map((b, i) => (
            <div key={i} style={{ flex: '0 0 280px', height: '200px', position: 'relative', overflow: 'hidden' }}>
              <img src={b.src} alt={b.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7) brightness(0.8)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(1) brightness(1)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.7) brightness(0.8)'; e.currentTarget.style.transform = 'scale(1)'; }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white' }}>{b.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section style={{ padding: '6rem 2rem', background: 'var(--ducati-gray)', borderTop: '3px solid var(--ducati-red)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="var(--ducati-gold)" color="var(--ducati-gold)" />)}
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1, marginBottom: '1.5rem' }}>
            BECOME PART OF<br />
            <span style={{ color: 'var(--ducati-red)' }}>THE FAMILY</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Join over 300 Ducati owners across London and the South East. Free membership, exclusive ride access, and a community of passionate riders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Apply for Membership <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/members" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Meet the Members
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
