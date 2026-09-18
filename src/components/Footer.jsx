import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate, onSelectCategory }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
              <div className="logo-mark">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#22d3ee" strokeWidth="1.5" opacity=".5" />
                  <circle cx="12" cy="12" r="5.5" stroke="#8b5cf6" strokeWidth="1.5" opacity=".75" />
                  <path d="M12 12 L12 3.5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 12 L19 16" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="1.8" fill="#fbbf24" />
                </svg>
              </div>
              <div>
                <div className="logo-text">Index <span>360</span></div>
                <div className="logo-sub">Full Circle Analysis</div>
              </div>
            </div>
            <p>
              The decision engine for Indian investors. See every angle before you deploy capital.
            </p>
          </div>

          <div className="foot-col">
            <h6>Product</h6>
            <button type="button" className="foot-link" onClick={() => onNavigate('pathA')}>Auto Analysis</button>
            <button type="button" className="foot-link" onClick={() => onNavigate('pathB')}>Deep Analysis</button>
            <a href="#how" className="foot-link" onClick={() => onNavigate('home')}>How it Works</a>
          </div>

          <div className="foot-col">
            <h6>Asset Classes</h6>
            <button type="button" className="foot-link" onClick={() => onSelectCategory('sip')}>SIP & Mutual Funds</button>
            <button type="button" className="foot-link" onClick={() => onSelectCategory('stocks')}>Direct Stocks</button>
            <button type="button" className="foot-link" onClick={() => onSelectCategory('crypto')}>Crypto Assets</button>
            <button type="button" className="foot-link" onClick={() => onSelectCategory('etf')}>Index ETFs</button>
          </div>

          <div className="foot-col">
            <h6>Methodology</h6>
            <span className="foot-static">Manager Track Record</span>
            <span className="foot-static">Process Quality</span>
            <span className="foot-static">Cost Efficiency</span>
            <span className="foot-static">Parent AMC Health</span>
          </div>
        </div>

        <div className="disclaimer">
          <strong style={{ color: 'var(--text-dim)' }}>
            <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Regulatory Disclaimer:
          </strong>{' '}
          Index 360 is an analytical and educational intelligence tool. It does not constitute personalized investment advice under SEBI (Investment Advisers) Regulations. All forward projections are statistical simulations based on historical manager alpha and market parameters, and do not guarantee future returns. Investments are subject to market risks. Please read all scheme information documents carefully before investing.
        </div>

        <div className="foot-bot">
          <p>© {new Date().getFullYear()} Index 360. All rights reserved.</p>
          <p>Engineered in India 🇮🇳 · Designed for Clarity</p>
        </div>
      </div>
    </footer>
  );
}
