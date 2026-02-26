import { useState } from 'react';
import { ExternalLink, Tag, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { partners } from '../data/partners';

const categories = ['All', 'Official Dealer', 'Independent Specialist', 'Exhaust & Performance', 'Riding Gear & Apparel', 'Track Days', 'OEM & Aftermarket Parts'];

function PartnerCard({ partner, onClick }) {
  return (
    <div
      className="card-dark"
      style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onClick={() => onClick(partner)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={partner.image}
          alt={partner.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7) brightness(0.75)', transition: 'all 0.4s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(1) brightness(0.9)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.7) brightness(0.75)'; e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
        {partner.featured && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'var(--ducati-gold)', color: '#0a0a0a', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', padding: '0.25rem 0.6rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={10} fill="#0a0a0a" /> Featured Partner
          </div>
        )}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '0.2rem 0.55rem', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>
          {partner.category}
        </div>
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{partner.logo}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.15rem', color: 'white', marginBottom: '0.3rem' }}>{partner.name}</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>{partner.tagline}</p>

        {/* Offer highlight */}
        <div style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.25)', padding: '0.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Tag size={14} style={{ color: 'var(--ducati-red)', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ducati-red)' }}>{partner.offer}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.1rem' }}>{partner.offerDetail}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            <MapPin size={11} style={{ color: 'var(--ducati-red)' }} />{partner.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            <Clock size={11} style={{ color: 'var(--ducati-red)' }} />Offer expires {partner.offerExpiry}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {partner.tags.map(tag => (
            <span key={tag} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.1em', padding: '0.2rem 0.55rem', textTransform: 'uppercase' }}>
              {tag}
            </span>
          ))}
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
          onClick={e => { e.stopPropagation(); onClick(partner); }}
        >
          View Offer <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function PartnerModal({ partner, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'var(--ducati-gray)', border: '1px solid rgba(204,0,0,0.3)', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img src={partner.image} alt={partner.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>×</button>
          {partner.featured && (
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--ducati-gold)', color: '#0a0a0a', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', padding: '0.3rem 0.7rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Star size={10} fill="#0a0a0a" /> Featured Partner
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem' }}>
            <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ducati-red)', marginBottom: '0.3rem' }}>{partner.category}</div>
            <div className="font-display" style={{ fontSize: '2rem', color: 'white', lineHeight: 1 }}>{partner.name}</div>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>{partner.description}</p>

          {/* Offer box */}
          <div style={{ background: 'rgba(204,0,0,0.08)', border: '2px solid rgba(204,0,0,0.4)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Tag size={18} style={{ color: 'var(--ducati-red)' }} />
              <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ducati-red)' }}>Exclusive DOCSLE Offer</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', color: 'white', lineHeight: 1, marginBottom: '0.6rem' }}>{partner.offer}</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{partner.offerDetail}</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <Clock size={12} style={{ color: 'var(--ducati-red)' }} />Expires {partner.offerExpiry}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <MapPin size={12} style={{ color: 'var(--ducati-red)' }} />{partner.location}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
            {partner.tags.map(tag => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.1em', padding: '0.25rem 0.65rem', textTransform: 'uppercase' }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={partner.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', flex: 1 }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Visit Website <ExternalLink size={14} />
              </button>
            </a>
            <button className="btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const filtered = partners.filter(p =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  const featured = partners.filter(p => p.featured);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1698695290237-5c7be2bd52a8?w=1800&q=95&auto=format" alt="Partners" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px' }}>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Exclusive Member Discounts</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95, marginBottom: '1.25rem' }}>
              DOCSLE<br /><span style={{ color: 'var(--ducati-red)' }}>PARTNERS</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, maxWidth: '460px' }}>
              Trusted suppliers, specialists and service providers offering exclusive deals to DOCSLE members. Show your membership card and save.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={{ background: 'var(--ducati-gray)', borderTop: '3px solid var(--ducati-red)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { step: '01', title: 'Join DOCSLE', desc: 'Become a member for just £25/year' },
            { step: '02', title: 'Find an Offer', desc: 'Browse exclusive partner deals below' },
            { step: '03', title: 'Claim Your Discount', desc: 'Show your card or use the promo code' },
            { step: '04', title: 'Enjoy the Saving', desc: 'Exclusive rates only for DOCSLE riders' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="font-display" style={{ fontSize: '2rem', color: 'var(--ducati-red)', lineHeight: 1, opacity: 0.5, minWidth: '3rem' }}>{s.step}</div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>{s.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured partners */}
      <section style={{ padding: '5rem 2rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Headline Partners</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white', marginBottom: '0.75rem' }}>FEATURED PARTNERS</h2>
        <div className="red-divider" style={{ marginBottom: '2.5rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {featured.map(p => <PartnerCard key={p.id} partner={p} onClick={setSelectedPartner} />)}
        </div>
      </section>

      {/* All partners with filter */}
      <section style={{ padding: '1rem 2rem 6rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>All Deals</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white' }}>ALL PARTNERS</h2>
            <div className="red-divider" style={{ marginTop: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['All', 'Official Dealer', 'Independent Specialist', 'Exhaust & Performance', 'Riding Gear & Apparel', 'Track Days', 'OEM & Aftermarket Parts'].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? 'var(--ducati-red)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? 'var(--ducati-red)' : 'rgba(255,255,255,0.15)'}`,
                color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
                padding: '0.4rem 0.9rem', fontFamily: 'Rajdhani', fontWeight: 600,
                fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(p => <PartnerCard key={p.id} partner={p} onClick={setSelectedPartner} />)}
        </div>
      </section>

      {/* Become a partner CTA */}
      <section style={{ padding: '5rem 2rem', background: 'var(--ducati-gray)', borderTop: '3px solid var(--ducati-red)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Grow Your Business</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', lineHeight: 1, marginBottom: '1.25rem' }}>
            BECOME A<br /><span style={{ color: 'var(--ducati-red)' }}>DOCSLE PARTNER</span>
          </h2>
          <div className="red-divider" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            Reach 300+ passionate Ducati owners across London and the South East. Partner with DOCSLE to promote your services, parts or experiences directly to dedicated riders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {['Homepage feature', 'Dedicated partner listing', 'Social media posts', 'Newsletter inclusion', 'Event presence'].map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <div style={{ width: '6px', height: '6px', background: 'var(--ducati-red)', borderRadius: '50%' }} />{b}
              </div>
            ))}
          </div>
          <a href="mailto:partners@docsle.co.uk" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Partner Enquiries <ArrowRight size={18} />
            </button>
          </a>
        </div>
      </section>

      {selectedPartner && <PartnerModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />}
    </div>
  );
}
