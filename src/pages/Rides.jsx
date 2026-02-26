import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Calendar, MapPin, Users, Clock, ChevronRight, Check, X } from 'lucide-react';
import { rides } from '../data/rides';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function RideMap({ ride, selectedPoint, onSelectPoint }) {
  const centre = ride.route[0];
  return (
    <MapContainer
      center={centre}
      zoom={9}
      style={{ height: '420px', width: '100%', borderRadius: '0' }}
      key={ride.id}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={ride.route} color="#cc0000" weight={3} opacity={0.85} dashArray="8,4" />
      {ride.meetPoints.map((pt, i) => (
        <Marker
          key={pt.id}
          position={[pt.lat, pt.lng]}
          icon={i === 0 ? redIcon : goldIcon}
          eventHandlers={{ click: () => onSelectPoint(pt.id) }}
        >
          <Popup>
            <div style={{ fontFamily: 'Rajdhani', minWidth: '180px' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#cc0000', marginBottom: '4px' }}>
                Point {pt.id} — {pt.time}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#222' }}>{pt.label}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function JoinModal({ ride, onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bike, setBike] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--ducati-gray)', border: '1px solid rgba(204,0,0,0.4)',
        maxWidth: '560px', width: '100%', position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ background: 'var(--ducati-red)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.1em', color: 'white' }}>JOIN RIDE</div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em' }}>{ride.title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(204,0,0,0.15)', border: '2px solid var(--ducati-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Check size={28} style={{ color: 'var(--ducati-red)' }} />
              </div>
              <h3 className="font-display" style={{ fontSize: '2rem', color: 'white', marginBottom: '0.75rem' }}>YOU'RE IN!</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                You've been registered for <strong style={{ color: 'white' }}>{ride.title}</strong>.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                Meeting at: <span style={{ color: 'var(--ducati-red)' }}>{ride.meetPoints.find(p => p.id === selected)?.label || ride.meetPoints[0].label}</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Confirmation sent to {email}</p>
              <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={onClose}>Done</button>
            </div>
          ) : step === 1 ? (
            <>
              <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
                Choose your meet point
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {ride.meetPoints.map((pt, i) => (
                  <div
                    key={pt.id}
                    onClick={() => setSelected(pt.id)}
                    style={{
                      padding: '1rem', border: `1px solid ${selected === pt.id ? 'var(--ducati-red)' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer', background: selected === pt.id ? 'rgba(204,0,0,0.1)' : 'transparent',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '1rem',
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px', flexShrink: 0,
                      background: selected === pt.id ? 'var(--ducati-red)' : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Bebas Neue', fontSize: '1rem', color: 'white',
                    }}>{pt.id}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{pt.label}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                        <Clock size={12} /> {pt.time}
                        {i === 0 && <span style={{ background: 'var(--ducati-red)', color: 'white', fontSize: '0.65rem', padding: '0.1rem 0.4rem', fontFamily: 'Rajdhani', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: '0.5rem' }}>Start</span>}
                      </div>
                    </div>
                    {selected === pt.id && <Check size={16} style={{ color: 'var(--ducati-red)' }} />}
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: selected ? 1 : 0.5 }}
                disabled={!selected}
                onClick={() => selected && setStep(2)}
              >
                Continue <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>
                Your details
              </h3>
              {[
                { label: 'Full Name', value: name, set: setName, type: 'text', placeholder: 'Your name' },
                { label: 'Email Address', value: email, set: setEmail, type: 'email', placeholder: 'your@email.com' },
                { label: 'Your Ducati', value: bike, set: setBike, type: 'text', placeholder: 'e.g. Panigale V4S 2023' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    required
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'white', padding: '0.75rem 1rem', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none',
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  Confirm Registration <Check size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Rides() {
  const [selectedRide, setSelectedRide] = useState(rides[0]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [joiningRide, setJoiningRide] = useState(null);

  const difficultyColor = { 'Beginner Friendly': '#4caf50', 'Intermediate': 'var(--ducati-gold)', 'Advanced': 'var(--ducati-red)' };

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1698695359291-586a107a3328?w=1600&q=95&auto=format" alt="Ride" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Plan Your Journey</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95 }}>RIDE OUTS &<br /><span style={{ color: 'var(--ducati-red)' }}>ROUTE PLANNER</span></h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Ride List */}
          <div>
            <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '1.25rem' }}>
              {rides.length} Upcoming Rides
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {rides.map(ride => (
                <div
                  key={ride.id}
                  onClick={() => setSelectedRide(ride)}
                  className="card-dark"
                  style={{
                    padding: '1.25rem', cursor: 'pointer',
                    borderColor: selectedRide?.id === ride.id ? 'var(--ducati-red)' : 'rgba(255,255,255,0.06)',
                    background: selectedRide?.id === ride.id ? 'rgba(204,0,0,0.08)' : 'var(--ducati-gray)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 className="font-heading" style={{ fontWeight: 700, fontSize: '1.05rem', color: 'white' }}>{ride.title}</h3>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'Rajdhani', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: difficultyColor[ride.difficulty] || 'white', border: `1px solid ${difficultyColor[ride.difficulty] || 'white'}`, padding: '0.15rem 0.4rem', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                      {ride.difficulty}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
                      <Calendar size={11} style={{ color: 'var(--ducati-red)' }} />
                      {new Date(ride.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
                      <MapPin size={11} style={{ color: 'var(--ducati-red)' }} /> {ride.distance}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                      <Users size={11} style={{ color: 'var(--ducati-red)' }} />
                      {ride.joined}/{ride.capacity} riders
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setJoiningRide(ride); }}
                      className="btn-primary"
                      style={{ padding: '0.35rem 0.9rem', fontSize: '0.75rem' }}
                    >
                      Join
                    </button>
                  </div>
                  {/* Capacity bar */}
                  <div style={{ marginTop: '0.75rem', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(ride.joined / ride.capacity) * 100}%`, background: 'var(--ducati-red)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map & Detail */}
          {selectedRide && (
            <div>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                {/* Map */}
                <RideMap ride={selectedRide} selectedPoint={selectedPoint} onSelectPoint={setSelectedPoint} />

                {/* Ride Detail */}
                <div style={{ padding: '2rem', background: 'var(--ducati-gray)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 className="font-display" style={{ fontSize: '2.5rem', color: 'white', lineHeight: 1 }}>{selectedRide.title}</h2>
                      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {[
                          { icon: <Calendar size={13} />, text: `${new Date(selectedRide.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} — ${selectedRide.time}` },
                          { icon: <MapPin size={13} />, text: selectedRide.distance },
                          { icon: <Users size={13} />, text: `Led by ${selectedRide.leader} (${selectedRide.bike})` },
                        ].map((item, i) => (
                          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--ducati-red)' }}>{item.icon}</span>
                            {item.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="btn-primary" onClick={() => setJoiningRide(selectedRide)}>
                      Join This Ride <ChevronRight size={16} />
                    </button>
                  </div>

                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    {selectedRide.description}
                  </p>

                  {/* Meet points */}
                  <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '1rem' }}>
                    Meet Points — click map pins to explore
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    {selectedRide.meetPoints.map((pt, i) => (
                      <div
                        key={pt.id}
                        onClick={() => setSelectedPoint(pt.id === selectedPoint ? null : pt.id)}
                        style={{
                          padding: '1rem', border: `1px solid ${selectedPoint === pt.id ? 'var(--ducati-red)' : 'rgba(255,255,255,0.08)'}`,
                          cursor: 'pointer', transition: 'all 0.2s',
                          background: selectedPoint === pt.id ? 'rgba(204,0,0,0.08)' : 'transparent',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <div style={{ width: '24px', height: '24px', background: i === 0 ? 'var(--ducati-red)' : 'rgba(200,169,81,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: '0.9rem', color: 'white', flexShrink: 0 }}>{pt.id}</div>
                          <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{pt.time}</span>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.4 }}>{pt.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {joiningRide && <JoinModal ride={joiningRide} onClose={() => setJoiningRide(null)} />}
    </div>
  );
}
