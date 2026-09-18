import React from 'react';
import { HelpCircle, Crosshair, ArrowRight, DollarSign, LineChart, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  return (
    <section className="screen active">
      <div className="hero">
        <div className="badge">
          <span className="dot" /> AI-Powered Investment Intelligence · India
        </div>
        <h1>
          See every angle<br />
          <span className="grad">before you invest.</span>
        </h1>
        <p className="lead">
          You have the money. You don't know where it should go. Index 360 analyzes every investment avenue — SIPs, stocks, crypto, ETFs — and shows you exactly why one choice beats another. In plain language. With real numbers.
        </p>
      </div>

      <div className="doors">
        {/* Door 1: Path A */}
        <div
          className="door door-1"
          onClick={() => onNavigate('pathA')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavigate('pathA');
          }}
        >
          <div className="door-icon">
            <HelpCircle size={28} color="#22d3ee" strokeWidth={1.8} />
          </div>
          <h3>I don't know where to invest</h3>
          <p>
            Tell us your amount, duration, and risk appetite. Index 360 ranks every option for you — automatically.
          </p>
          <div className="door-cta">
            Let Index 360 decide <ArrowRight size={16} className="arw" />
          </div>
        </div>

        {/* Door 2: Path B */}
        <div
          className="door door-2"
          onClick={() => onNavigate('pathB')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavigate('pathB');
          }}
        >
          <div className="door-icon">
            <Crosshair size={28} color="#fbbf24" strokeWidth={1.8} />
          </div>
          <h3>I know where I want to invest</h3>
          <p>
            Already have a fund manager, stock, or coin in mind? Enter the name and get a full 360° pillar analysis.
          </p>
          <div className="door-cta">
            Analyze a specific option <ArrowRight size={16} className="arw" />
          </div>
        </div>
      </div>

      {/* Stat Strip */}
      <div className="stats">
        <div className="stat">
          <div className="v">6</div>
          <div className="l">Analysis Pillars</div>
        </div>
        <div className="stat">
          <div className="v">12+</div>
          <div className="l">Asset Classes</div>
        </div>
        <div className="stat">
          <div className="v">₹0</div>
          <div className="l">To Start</div>
        </div>
        <div className="stat">
          <div className="v">360°</div>
          <div className="l">Full Coverage</div>
        </div>
      </div>

      {/* Why Index 360 */}
      <div id="how" className="sec-head">
        <div className="eyebrow">Why Index 360</div>
        <h2>
          Not another buy button.<br />
          A decision engine.
        </h2>
        <p>Execution platforms let you buy. Index 360 tells you whether you should — and proves it with data.</p>
      </div>

      <div className="features">
        <div className="feat">
          <div className="feat-ic">
            <DollarSign size={24} color="#a78bfa" strokeWidth={1.8} />
          </div>
          <h4>Fund Manager Deep Dive</h4>
          <p>
            We pull the manager's entire career — every fund, every year, every drawdown — and score it across 6 pillars.
          </p>
        </div>

        <div className="feat">
          <div className="feat-ic">
            <LineChart size={24} color="#a78bfa" strokeWidth={1.8} />
          </div>
          <h4>Forward Projections</h4>
          <p>
            See exactly what ₹5,000/month becomes in 3 years — with a confidence band based on statistical pillar strength.
          </p>
        </div>

        <div className="feat">
          <div className="feat-ic">
            <Layers size={24} color="#a78bfa" strokeWidth={1.8} />
          </div>
          <h4>Every Asset Class</h4>
          <p>
            SIPs, stocks, crypto, ETFs, bonds, gold, REITs — all analyzed under one transparent 360° framework.
          </p>
        </div>
      </div>
    </section>
  );
}
