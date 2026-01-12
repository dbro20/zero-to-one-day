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
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="bg-[var(--navy)] text-[var(--cream)] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold hover:text-[var(--coral-light)] transition-colors">
          <ShipLogo />
          <span>Zero to One Day</span>
        </Link>

        {!loading && user && (
          <div className="flex items-center gap-4">
            <ProfileDropdown user={user} onSignOut={signOut} />
          </div>
        )}
      </div>
    </nav>
  );
}
