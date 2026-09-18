import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatINR, getScoreColor } from '../utils/formatters';

export default function PathAResultsScreen({
  amount,
  duration,
  risk,
  options = [],
  onSelectOption,
  onSwitchToPathB,
  onBack,
}) {
  const durationText = duration < 1 ? '6 Months' : `${duration} Year${duration > 1 ? 's' : ''}`;
  const riskText = risk.charAt(0).toUpperCase() + risk.slice(1);

  return (
    <section className="screen active">
      <button type="button" className="back" onClick={onBack}>
        <ArrowLeft size={16} />
        Change inputs
      </button>

      <div className="dash-top">
        <div className="dash-title">
          <h2>Ranked for your profile</h2>
          <div className="dash-meta">
            <span className="tag cyan">{formatINR(amount)}</span>
            <span className="tag">{durationText}</span>
            <span className="tag">{riskText} Risk</span>
          </div>
        </div>
      </div>

      <div className="pathA-list">
        {options.map((opt, i) => {
          const scoreColor = getScoreColor(opt.score);

          return (
            <div
              key={opt.id || opt.name}
              className="alt-row"
              onClick={() => onSelectOption(opt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectOption(opt);
              }}
              style={{ marginBottom: 14 }}
            >
              <div className="alt-info" style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text-mute)',
                      width: 26,
                    }}
                  >
                    #{i + 1}
                  </span>
                  <h5 style={{ margin: 0 }}>{opt.name}</h5>
                </div>
                <span>{opt.desc}</span>
                <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)' }}>
                  Expected: <strong style={{ color: 'var(--gold)' }}>{opt.ret}</strong> &nbsp;·&nbsp; {opt.note}
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="alt-score" style={{ color: scoreColor }}>
                  {opt.score}
                  <span style={{ fontSize: 13, color: 'var(--text-mute)', fontWeight: 500 }}>
                    /100
                  </span>
                </div>
                <div className="alt-bar">
                  <i style={{ width: `${opt.score}%`, background: scoreColor }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 8, letterSpacing: '.5px' }}>
                  INDEX 360 SCORE
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card mt-40" style={{ textAlign: 'center' }}>
        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, marginBottom: 10 }}>
          Want to analyze a specific fund instead?
        </h4>
        <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 22 }}>
          Enter a fund manager or asset name and get the full 6-pillar breakdown.
        </p>
        <button type="button" className="btn btn-ghost" onClick={onSwitchToPathB}>
          Go to Path B <ArrowRight size={15} style={{ marginLeft: 6 }} />
        </button>
      </div>
    </section>
  );
}
