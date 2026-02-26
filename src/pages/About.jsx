import { useState } from 'react';
import { Check, Shield, Users, Map, Calendar } from 'lucide-react';

const benefits = [
  { icon: '🗺️', title: 'Group Ride Outs', desc: 'Organised rides across Surrey, Kent, Sussex and beyond.' },
  { icon: '📅', title: 'Exclusive Events', desc: 'Track days, factory tours, World Ducati Week trips.' },
  { icon: '👥', title: 'A Real Community', desc: '300+ passionate Ducatisti in London and the South East.' },
  { icon: '🛡️', title: 'Safe Riding Culture', desc: 'Trained captains, briefings, and a no-drop policy.' },
];

const faq = [
  { q: 'Do I need to own a Ducati to join?', a: 'Yes — all models welcome, from Scrambler to Panigale.' },
  { q: 'Is membership free?', a: 'Annual membership is £25: full ride access, event discounts, welcome pack.' },
  { q: "I'm a new rider — suitable?", a: 'Rides graded Beginner Friendly through Advanced. Captains brief before every departure.' },
  { q: 'How do I join a ride out?', a: 'Browse Ride Outs, pick your meet point, register. Confirmation by email.' },
  { q: 'Trips to Italy?', a: 'Annual convoy to World Ducati Week in Misano + private factory tour in Bologna.' },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', bike: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1664885765868-456486d200dd?w=1600&q=95&auto=format" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Est. London, 2014</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95, marginBottom: '1.25rem' }}>
              ABOUT<br /><span style={{ color: 'var(--ducati-red)' }}>DOCLSE</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
              The Ducati Owners Club London &amp; South East — founded by riders, for riders.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Our Story</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', lineHeight: 1, marginBottom: '1.5rem' }}>
              BUILT ON PASSION.<br /><span style={{ color: 'var(--ducati-red)' }}>DRIVEN BY COMMUNITY.</span>
            </h2>
            <div className="red-divider" style={{ marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              DOCLSE was founded in 2014 by a small group of Ducati enthusiasts who wanted to ride together and share the unique experience of owning a Ducati in London.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.8 }}>
              Over twelve years we have grown to 300+ members across Surrey, Kent, Sussex, Essex and beyond. All models and all riding abilities welcome.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1727951298405-7d2a88ce986c?w=800&q=95&auto=format" alt="Club ride" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: 'var(--ducati-red)', padding: '1.5rem 2rem', fontFamily: 'Bebas Neue', fontSize: '1.1rem', letterSpacing: '0.1em', color: 'white', lineHeight: 1.3 }}>
              300+ MEMBERS<br /><span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>LONDON &amp; SOUTH EAST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '5rem 2rem', background: 'var(--ducati-gray)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Why Join</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>MEMBERSHIP BENEFITS</h2>
            <div className="red-divider" style={{ margin: '0.75rem auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ducati-red)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem', color: 'white', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership tiers */}
      <section style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Join the Club</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>MEMBERSHIP</h2>
          <div className="red-divider" style={{ margin: '0.75rem auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'Standard', price: '£25', period: '/year', highlight: false, features: ['Full ride access', 'Event invitations', 'Digital membership card', 'Member forum access', 'DOCLSE newsletter'] },
            { name: 'Premium', price: '£60', period: '/year', highlight: true, features: ['Everything in Standard', 'Priority Italy trip booking', 'DOCLSE kit discount', 'Track day priority', 'Exclusive member evenings', 'Ducati dealer discounts'] },
          ].map((tier, i) => (
            <div key={i} style={{ border: tier.highlight ? '2px solid var(--ducati-red)' : '1px solid rgba(255,255,255,0.1)', background: tier.highlight ? 'rgba(204,0,0,0.06)' : 'var(--ducati-gray)', padding: '2.5rem 2rem', position: 'relative' }}>
              {tier.highlight && (
                <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--ducati-red)', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', padding: '0.3rem 0.75rem', textTransform: 'uppercase' }}>
                  Most Popular
                </div>
              )}
              <div className="section-label" style={{ marginBottom: '0.5rem' }}>{tier.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '2rem' }}>
                <span className="font-display" style={{ fontSize: '3rem', color: 'white', lineHeight: 1 }}>{tier.price}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '0.9rem' }}>{tier.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {tier.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                    <Check size={14} style={{ color: 'var(--ducati-red)', flexShrink: 0 }} />{f}
                  </div>
                ))}
              </div>
              <button className={tier.highlight ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Got Questions?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>FAQ</h2>
          <div className="red-divider" style={{ margin: '0.75rem auto 0' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {faq.map((item, i) => (
            <div key={i} style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'var(--ducati-gray)', overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', color: 'white', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '1rem', textAlign: 'left', gap: '1rem' }}>
                {item.q}
                <span style={{ color: 'var(--ducati-red)', fontSize: '1.25rem', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 1.5rem 1.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact / membership form */}
      <section style={{ padding: '0 2rem 6rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Get in Touch</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>CONTACT US</h2>
          <div className="red-divider" style={{ margin: '0.75rem auto 0' }} />
        </div>
        {submitted ? (
          <div style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.3)', padding: '2.5rem', textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '2rem', color: 'var(--ducati-red)', marginBottom: '0.75rem' }}>MESSAGE SENT!</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>We will be in touch shortly. Ride safe.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Full name' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
              { label: 'Your Ducati', key: 'bike', type: 'text', placeholder: 'e.g. Panigale V4S 2023' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} placeholder={f.placeholder} required
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1rem', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem' }}>Message</label>
              <textarea value={form.message} placeholder="Tell us about yourself and your bike..." rows={4} required
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1rem', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.875rem 2.5rem' }}>
              Send Message
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
