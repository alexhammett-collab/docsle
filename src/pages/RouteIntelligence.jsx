import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, TrendingUp, Wind, Star, ChevronRight, RotateCcw, ExternalLink, Users, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { rides } from '../data/rides';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentMonth = MONTHS[new Date().getMonth()];

const questions = [
  {
    id: 'style',
    question: 'What kind of riding are you after today?',
    options: [
      { value: 'twisty', label: 'Technical & Twisty', icon: '🔄', desc: 'Hairpins, bends, concentration required' },
      { value: 'fast', label: 'Fast & Flowing', icon: '⚡', desc: 'Open A-roads, momentum, speed' },
      { value: 'scenic', label: 'Scenic & Relaxed', icon: '🌄', desc: 'Views, stops, no pressure' },
      { value: 'coastal', label: 'Coastal Cruise', icon: '🌊', desc: 'Sea air, harbours, fish & chips' },
    ],
  },
  {
    id: 'distance',
    question: 'How far do you want to ride?',
    options: [
      { value: 'short', label: 'Under 150 miles', icon: '☕', desc: 'Back for lunch' },
      { value: 'medium', label: '150–190 miles', icon: '🏍️', desc: 'Full morning out' },
      { value: 'long', label: '190+ miles', icon: '🗺️', desc: 'Full day adventure' },
    ],
  },
  {
    id: 'stop',
    question: 'Do you want a food or coffee stop?',
    options: [
      { value: 'yes-cafe', label: 'Yes — cafe stop', icon: '☕', desc: 'Mid-ride coffee and cake' },
      { value: 'yes-lunch', label: 'Yes — proper lunch', icon: '🍽️', desc: 'Sit-down meal en route' },
      { value: 'no', label: 'No — just ride', icon: '🏁', desc: 'Fuel only, keep moving' },
    ],
  },
  {
    id: 'experience',
    question: 'What\'s your experience level?',
    options: [
      { value: 'beginner', label: 'Building confidence', icon: '🌱', desc: 'Newer rider, prefer forgiving roads' },
      { value: 'intermediate', label: 'Comfortable rider', icon: '🎯', desc: 'Happy with most conditions' },
      { value: 'advanced', label: 'Experienced & keen', icon: '🔥', desc: 'Bring on the technical stuff' },
    ],
  },
  {
    id: 'motorways',
    question: 'Happy to use motorways to get there?',
    options: [
      { value: 'yes', label: 'Yes — get there fast', icon: '🛣️', desc: 'Use motorways for access sections' },
      { value: 'no', label: 'No — B-roads only', icon: '🌿', desc: 'Keep it interesting all the way' },
    ],
  },
];

function scoreRide(ride, answers) {
  let score = 0;
  const style = answers.style;
  const distance = answers.distance;
  const stop = answers.stop;
  const experience = answers.experience;

  if (style === 'twisty' && ride.tags.includes('twisty')) score += 30;
  if (style === 'fast' && ride.tags.includes('fast')) score += 30;
  if (style === 'scenic' && ride.tags.includes('scenic')) score += 30;
  if (style === 'coastal' && ride.tags.includes('coastal')) score += 30;
  if (style === 'twisty' && ride.bendDensity >= 60) score += 15;
  if (style === 'fast' && ride.bendDensity < 40) score += 15;
  if (style === 'scenic' && ride.tags.some(t => ['woodland', 'hills', 'coastal'].includes(t))) score += 10;

  if (distance === 'short' && ride.distanceMiles < 150) score += 20;
  if (distance === 'medium' && ride.distanceMiles >= 150 && ride.distanceMiles <= 190) score += 20;
  if (distance === 'long' && ride.distanceMiles > 190) score += 20;

  if (stop === 'yes-cafe' && ride.tags.includes('cafe-stop')) score += 15;
  if (stop === 'yes-lunch' && ride.tags.includes('lunch-stop')) score += 15;
  if (stop === 'no') score += 5;

  if (experience === 'beginner' && ride.difficulty === 'Beginner Friendly') score += 20;
  if (experience === 'intermediate' && ride.difficulty === 'Intermediate') score += 20;
  if (experience === 'advanced' && ride.difficulty === 'Advanced') score += 20;
  if (experience === 'beginner' && ride.difficulty === 'Advanced') score -= 20;
  if (experience === 'advanced' && ride.difficulty === 'Beginner Friendly') score -= 5;

  if (ride.bestMonths.includes(currentMonth)) score += 10;
  if (ride.avoidMonths.includes(currentMonth)) score -= 15;

  return Math.min(99, Math.max(10, score));
}

function ElevationWaveform({ elevation, color = 'var(--ducati-red)', height = 60 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const min = Math.min(...elevation);
    const max = Math.max(...elevation);
    const range = max - min || 1;
    const pad = 4;

    ctx.clearRect(0, 0, w, h);

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, color.includes('red') || color === 'var(--ducati-red)' ? 'rgba(204,0,0,0.5)' : 'rgba(200,169,81,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    elevation.forEach((val, i) => {
      const x = (i / (elevation.length - 1)) * w;
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    elevation.forEach((val, i) => {
      const x = (i / (elevation.length - 1)) * w;
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color === 'var(--ducati-red)' ? '#cc0000' : '#c8a951';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [elevation, color]);

  return <canvas ref={canvasRef} width={280} height={height} style={{ width: '100%', height: `${height}px` }} />;
}

function BendDensityBar({ density }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(density), 100);
    return () => clearTimeout(timer);
  }, [density]);

  const color = density >= 65 ? 'var(--ducati-red)' : density >= 40 ? '#c8a951' : '#4caf50';
  const label = density >= 65 ? 'Technical' : density >= 40 ? 'Mixed' : 'Open & flowing';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Bend Density</span>
        <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', color }}>{label}</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${animated}%`, background: color, borderRadius: '3px', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>Straight</span>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>Max Bends</span>
      </div>
    </div>
  );
}

function CompatibilityRing({ score, size = 80 }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const r = (size / 2) - 6;
  const circumference = 2 * Math.PI * r;
  const progress = (animated / 100) * circumference;
  const color = score >= 75 ? '#cc0000' : score >= 55 ? '#c8a951' : 'rgba(255,255,255,0.3)';

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${circumference - progress}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1), stroke 0.3s' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Bebas Neue', fontSize: size >= 80 ? '1.5rem' : '1.1rem', color: 'white', lineHeight: 1 }}>{animated}%</span>
        <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', letterSpacing: '0.1em', textTransform: 'uppercase' }}>match</span>
      </div>
    </div>
  );
}

function SeasonBadge({ ride }) {
  const isGood = ride.bestMonths.includes(currentMonth);
  const isWarning = ride.avoidMonths.includes(currentMonth);
  if (isGood && !isWarning) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4caf50', fontSize: '0.75rem', fontFamily: 'Rajdhani', fontWeight: 600 }}>
      <CheckCircle size={13} /> Best riding now ({currentMonth})
    </div>
  );
  if (isWarning) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c8a951', fontSize: '0.75rem', fontFamily: 'Rajdhani', fontWeight: 600 }}>
      <AlertTriangle size={13} /> {ride.seasonWarning || `Caution in ${currentMonth}`}
    </div>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'Rajdhani' }}>
      <CheckCircle size={13} /> Rideable now
    </div>
  );
}

function VerdictTicker({ verdicts }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % verdicts.length);
        setFade(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, [verdicts.length]);

  const v = verdicts[idx];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      padding: '0.85rem 1rem',
      opacity: fade ? 1 : 0,
      transition: 'opacity 0.3s ease',
      minHeight: '64px',
    }}>
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.3rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={10} fill={i < v.stars ? '#c8a951' : 'none'} color={i < v.stars ? '#c8a951' : 'rgba(255,255,255,0.2)'} />
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>"{v.text}"</p>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', marginTop: '0.35rem', fontFamily: 'Rajdhani' }}>
        — {v.rider} · {v.bike}
      </p>
    </div>
  );
}

function RouteCard({ ride, score, rank }) {
  const [expanded, setExpanded] = useState(false);
  const diffColor = { 'Beginner Friendly': '#4caf50', 'Intermediate': '#c8a951', 'Advanced': 'var(--ducati-red)' };

  return (
    <div style={{
      background: rank === 1 ? 'rgba(204,0,0,0.06)' : 'rgba(255,255,255,0.03)',
      border: rank === 1 ? '1px solid rgba(204,0,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
      marginBottom: '1.25rem',
      transition: 'border-color 0.2s',
    }}>
      {rank === 1 && (
        <div style={{ background: 'var(--ducati-red)', padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={13} fill="white" color="white" />
          <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'white' }}>Best Match For You</span>
        </div>
      )}

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <CompatibilityRing score={score} size={80} />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'white', lineHeight: 1, margin: 0 }}>{ride.title}</h3>
              <span style={{ background: diffColor[ride.difficulty], color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', padding: '0.2rem 0.6rem', textTransform: 'uppercase' }}>
                {ride.difficulty}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: 'Rajdhani' }}>
                <Navigation size={12} color="var(--ducati-red)" /> {ride.distance}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: 'Rajdhani' }}>
                <TrendingUp size={12} color="var(--ducati-red)" /> {ride.totalClimb.toLocaleString()}m climb
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: 'Rajdhani' }}>
                <MapPin size={12} color="var(--ducati-red)" /> {ride.roadType}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: 'Rajdhani' }}>
                <Users size={12} color="var(--ducati-red)" /> {ride.joined}/{ride.capacity} joined
              </div>
            </div>

            <SeasonBadge ride={ride} />
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>
              Elevation Profile
            </div>
            <ElevationWaveform elevation={ride.elevation} color={rank === 1 ? 'var(--ducati-red)' : 'rgba(200,169,81,1)'} height={55} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>Start</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>Finish</span>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <BendDensityBar density={ride.bendDensity} />
            </div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem' }}>Surface</div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>{ride.surface}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'Rajdhani', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ChevronRight size={13} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
          {expanded ? 'Hide' : 'Show'} community verdicts & waypoints
        </button>

        {expanded && (
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>Community Verdicts</div>
              <VerdictTicker verdicts={ride.communityVerdicts} />
            </div>
            <div>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>Waypoints</div>
              {ride.meetPoints.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '20px', height: '20px', background: i === 0 ? 'var(--ducati-red)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '0.7rem', color: i === 0 ? 'white' : 'rgba(255,255,255,0.5)' }}>{p.id}</span>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', margin: 0, lineHeight: 1.4 }}>{p.label}</p>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontFamily: 'Rajdhani' }}>{p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <a
            href={ride.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={13} /> Open in Google Maps
            </button>
          </a>
          <Link to="/rides" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.6rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ducati-red)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <Users size={13} /> Join this ride out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RouteIntelligence() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [results, setResults] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const resultsRef = useRef(null);

  const currentQ = questions[step];
  const progress = (step / questions.length) * 100;

  function handleAnswer(questionId, value) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      const scored = rides
        .map(r => ({ ride: r, score: scoreRide(r, newAnswers) }))
        .sort((a, b) => b.score - a.score);
      setResults(scored);
      setAnimateIn(false);
      setTimeout(() => setAnimateIn(true), 50);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div style={{ paddingTop: '72px', background: 'var(--ducati-dark)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1589560552200-67fbddd531f0?w=1600&q=95&auto=format"
          alt="Route Intelligence"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--ducati-red)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div className="section-label">New Feature</div>
              <div style={{ background: 'var(--ducati-red)', color: 'white', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', padding: '0.2rem 0.6rem', textTransform: 'uppercase' }}>
                BETA
              </div>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 0.95, marginBottom: '1rem' }}>
              ROUTE<br /><span style={{ color: 'var(--ducati-red)' }}>INTELLIGENCE</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', fontWeight: 300 }}>
              Answer 5 questions. Get your perfect DOCLSE ride — scored, profiled and mapped.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>

        {!results && (
          <>
            {/* Progress bar */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  Question {step + 1} of {questions.length}
                </span>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.1rem', color: 'var(--ducati-red)' }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--ducati-red)', borderRadius: '2px', transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.75rem' }}>
                {questions.map((q, i) => (
                  <div key={q.id} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: i < step ? 'var(--ducati-red)' : i === step ? 'rgba(204,0,0,0.5)' : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', lineHeight: 1, marginBottom: '2rem' }}>
                {currentQ.question}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {currentQ.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(currentQ.id, opt.value)}
                    style={{
                      background: answers[currentQ.id] === opt.value ? 'rgba(204,0,0,0.15)' : 'rgba(255,255,255,0.03)',
                      border: answers[currentQ.id] === opt.value ? '1px solid var(--ducati-red)' : '1px solid rgba(255,255,255,0.1)',
                      padding: '1.5rem 1.25rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(204,0,0,0.5)'; e.currentTarget.style.background = 'rgba(204,0,0,0.08)'; }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = answers[currentQ.id] === opt.value ? 'var(--ducati-red)' : 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.background = answers[currentQ.id] === opt.value ? 'rgba(204,0,0,0.15)' : 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{opt.icon}</div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'Rajdhani', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                ← Back
              </button>
            )}
          </>
        )}

        {results && (
          <div ref={resultsRef} style={{ opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>Your Results</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', lineHeight: 0.95 }}>
                  {results.length} ROUTES<br /><span style={{ color: 'var(--ducati-red)' }}>RANKED FOR YOU</span>
                </h2>
              </div>
              <button
                onClick={reset}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                  fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ducati-red)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                <RotateCcw size={13} /> Start Again
              </button>
            </div>

            {/* Answer summary chips */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {Object.entries(answers).map(([qid, val]) => {
                const q = questions.find(q => q.id === qid);
                const opt = q?.options.find(o => o.value === val);
                return opt ? (
                  <div key={qid} style={{
                    background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.25)',
                    padding: '0.25rem 0.75rem', fontFamily: 'Rajdhani', fontSize: '0.75rem',
                    letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <span>{opt.icon}</span> {opt.label}
                  </div>
                ) : null;
              })}
            </div>

            {results.map(({ ride, score }, i) => (
              <RouteCard key={ride.id} ride={ride} score={score} rank={i + 1} />
            ))}
          </div>
        )}

      </div>

      {/* CTA strip */}
      {!results && (
        <div style={{ background: 'rgba(204,0,0,0.08)', borderTop: '1px solid rgba(204,0,0,0.2)', padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            ROUTE INTELLIGENCE uses ride data, seasonal conditions and your preferences to score every DOCLSE route out of 100.
          </p>
        </div>
      )}
    </div>
  );
}
