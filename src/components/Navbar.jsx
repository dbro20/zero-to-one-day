import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ShipLogo() {
  return (
    <svg className="w-10 h-10 sailing" viewBox="0 0 100 75" fill="none">
      {/* Hull */}
      <path
        d="M12 48 Q16 42 25 40 L85 40 Q92 42 96 48 Q88 55 50 55 Q18 55 12 48 Z"
        fill="#e07850"
        stroke="var(--cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cabin */}
      <path
        d="M25 40 L28 28 Q32 24 40 23 L72 27 Q78 29 80 33 L85 40 Z"
        fill="#faf6f1"
        stroke="var(--cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Deck line */}
      <path d="M22 40 Q50 43 88 40" stroke="var(--cream)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Bridge */}
      <path
        d="M48 23 L48 14 Q48 12 51 12 L58 12 Q61 12 61 14 L61 23"
        fill="var(--cream)"
        stroke="var(--cream)"
        strokeWidth="2"
      />
      {/* Light */}
      <rect x="50" y="9" width="8" height="4" rx="1" fill="#e07850"/>
      {/* Windows */}
      <path d="M34 28 L40 27 L40 34 L34 34 Z" fill="var(--cream)"/>
      <path d="M46 26 L64 28 L64 35 L46 34 Z" fill="var(--cream)"/>
    </svg>
  );
}

function ProfileDropdown({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-9 h-9 rounded-full border-2 border-[var(--cream)] cursor-pointer"
        />
        <span className="text-sm font-medium hidden sm:block">{user.displayName?.split(' ')[0]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-[var(--navy)] overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-[var(--navy)]">{user.displayName}</p>
            <p className="text-xs text-[var(--navy-light)] truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-[var(--navy)] hover:bg-[var(--cream)] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16,17 21,12 16,7" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="bg-[var(--navy)] text-[var(--cream)] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold hover:text-[var(--coral-light)] transition-colors">
          <ShipLogo />
          <span>Zero to One Day</span>
        </Link>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <ProfileDropdown user={user} onSignOut={signOut} />
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 bg-white text-[var(--navy)] rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[var(--cream)] transition-colors border-2 border-[var(--cream)]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
