import React from 'react';
import { getScoreColor } from '../utils/formatters';

export default function AlternativesList({ alternatives = [], onSelectFund }) {
  if (!alternatives.length) return null;

  return (
    <div className="alts">
      <h3>Consider these alternatives</h3>
      <p>Funds with high overall pillar scores to compare against.</p>

      <div className="alts-container">
        {alternatives.map((alt) => {
          const scoreColor = getScoreColor(alt.score);

          return (
            <div
              key={alt.key || alt.name}
              className="alt-row"
              onClick={() => onSelectFund(alt.key || alt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectFund(alt.key || alt);
              }}
            >
              <div className="alt-info">
                <h5>{alt.name}</h5>
                <span>{alt.manager} · {alt.category}</span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="alt-score" style={{ color: scoreColor }}>
                  {alt.score}
                  <span style={{ fontSize: 12, color: 'var(--text-mute)', fontWeight: 500 }}>
                    /100
                  </span>
                </div>
                <div className="alt-bar">
                  <i
                    style={{
                      width: `${alt.score}%`,
                      background: scoreColor,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
