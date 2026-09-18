import React from 'react';
import { ArrowLeft, Search, Shield, Scale, Rocket } from 'lucide-react';

const DURATION_OPTIONS = [
  { label: '6 Months', value: 0.5 },
  { label: '1 Year', value: 1 },
  { label: '3 Years', value: 3 },
  { label: '5+ Years', value: 5 },
];

const RISK_OPTIONS = [
  { id: 'safe', label: 'Safe', sub: 'Capital protection', icon: Shield, em: '🛡️' },
  { id: 'balanced', label: 'Balanced', sub: 'Steady growth', icon: Scale, em: '⚖️' },
  { id: 'aggressive', label: 'Aggressive', sub: 'Max returns', icon: Rocket, em: '🚀' },
];

export default function PathAScreen({
  amount,
  duration,
  risk,
  onAmountChange,
  onDurationChange,
  onRiskChange,
  onSubmit,
  onBack,
}) {
  const handleAmountInput = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(rawVal, 10) || 0;
    onAmountChange(num);
  };

  return (
    <section className="screen active">
      <button type="button" className="back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to home
      </button>

      <div className="card card-narrow">
        <div className="sec-head" style={{ textAlign: 'left', marginBottom: 34 }}>
          <div className="eyebrow">Path A · Auto Analysis</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Let Index 360 decide for you</h2>
          <p style={{ margin: 0, fontSize: '14.5px' }}>Three quick questions. We handle the rest.</p>
        </div>

        <div className="field">
          <label htmlFor="pathA-amt">How much do you want to invest?</label>
          <div className="input-money">
            <span className="rs">₹</span>
            <input
              id="pathA-amt"
              type="text"
              className="input"
              value={amount ? amount.toLocaleString('en-IN') : ''}
              onChange={handleAmountInput}
              inputMode="numeric"
              placeholder="10,000"
            />
          </div>
        </div>

        <div className="field">
          <label>For how long?</label>
          <div className="chips">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`chip ${duration === opt.value ? 'on' : ''}`}
                onClick={() => onDurationChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>How much risk can you take?</label>
          <div className="chips">
            {RISK_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`chip ${risk === opt.id ? 'on' : ''}`}
                onClick={() => onRiskChange(opt.id)}
              >
                <span className="em">{opt.em}</span>
                {opt.label}
                <span className="sub">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={onSubmit}
        >
          <Search size={18} />
          Analyze My Options
        </button>
      </div>
    </section>
  );
}
