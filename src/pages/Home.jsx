import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ProjectGallery } from '../components/ProjectGallery';

function WaveDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg className="w-full h-24 wave-animate" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="var(--sky-light)"
          fillOpacity="0.3"
          d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
        />
        <path
          fill="var(--sky)"
          fillOpacity="0.2"
          d="M0,80 C240,48 480,112 720,80 C960,48 1200,112 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

function HeroBoat() {
  return (
    <svg className="w-48 h-36 sailing" viewBox="0 0 200 150" fill="none">
      {/* Hull - orange bottom */}
      <path
        d="M25 95
           Q30 85 50 80
           L170 80
           Q185 85 190 95
           Q175 110 100 110
           Q35 110 25 95 Z"
        fill="#e07850"
        stroke="#1a2744"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cabin - cream top */}
      <path
        d="M50 80
           L55 55
           Q60 50 75 48
           L145 55
           Q155 58 160 65
           L170 80
           Z"
        fill="#faf6f1"
        stroke="#1a2744"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Deck line */}
      <path
        d="M45 80 Q100 85 175 80"
        stroke="#1a2744"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Bridge/tower */}
      <path
        d="M95 48
           L95 30
           Q95 25 100 25
           L115 25
           Q120 25 120 30
           L120 48"
        fill="#1a2744"
        stroke="#1a2744"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Light on top */}
      <rect x="100" y="20" width="15" height="8" rx="2" fill="#e07850"/>

      {/* Windows */}
      <path
        d="M65 58 Q70 55 80 56 L80 68 Q70 68 65 65 Z"
        fill="#1a2744"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90 55 L125 58 L125 70 L90 68 Z"
        fill="#1a2744"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Home() {
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative sun-rays py-16 pb-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <HeroBoat />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--navy)] mb-4">
            Zero to One Day
          </h1>
          <p className="text-xl text-[var(--navy-light)] mb-8 max-w-2xl mx-auto">
            A one-day hackathon where everyone ships a project using Claude Code.
            Set sail and show us what you built!
          </p>
          {!user && (
            <button
              onClick={signInWithGoogle}
              className="btn-coral text-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Board the Ship
            </button>
          )}
          {user && (
            <Link to="/submit" className="btn-coral text-lg">
              Ship Your Project
            </Link>
          )}
        </div>
        <WaveDecoration />
      </section>

      {/* Gallery Section */}
      <section className="bg-[var(--cream-dark)] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-8 h-8 text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <h2 className="text-3xl font-bold text-[var(--navy)]">Projects</h2>
          </div>
          <ProjectGallery />
        </div>
      </section>
    </div>
  );
}
