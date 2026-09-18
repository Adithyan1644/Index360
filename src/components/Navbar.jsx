import React from 'react';
import { Compass, Sparkles, SlidersHorizontal, Search } from 'lucide-react';

export default function Navbar({ activeScreen, onNavigate }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
          <div className="logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="url(#navLg1)" strokeWidth="1.5" opacity=".5" />
              <circle cx="12" cy="12" r="5.5" stroke="url(#navLg1)" strokeWidth="1.5" opacity=".75" />
              <path d="M12 12 L12 3.5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 12 L19 16" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.8" fill="#fbbf24" />
              <defs>
                <linearGradient id="navLg1" x1="0" y1="0" x2="24" y2="24">
                  <stop stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <div className="logo-text">Index <span>360</span></div>
            <div className="logo-sub">Full Circle Analysis</div>
          </div>
        </div>

        <div className="nav-links">
          <button
            type="button"
            className={`nav-link-btn ${activeScreen === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeScreen === 'pathA' || activeScreen === 'pathAResults' ? 'active' : ''}`}
            onClick={() => onNavigate('pathA')}
          >
            <Sparkles size={14} className="icon-mr" /> Auto Invest
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeScreen === 'pathB' || activeScreen === 'pathBInput' ? 'active' : ''}`}
            onClick={() => onNavigate('pathB')}
          >
            <Search size={14} className="icon-mr" /> Analyze
          </button>
          <a href="#how" className="nav-link-btn" onClick={(e) => {
            if (activeScreen !== 'home') {
              onNavigate('home');
            }
          }}>
            How it Works
          </a>
        </div>

        <button className="nav-cta" onClick={() => onNavigate('pathA')}>
          Start Free Analysis
        </button>
      </div>
    </nav>
  );
}
