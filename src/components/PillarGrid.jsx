import React from 'react';
import PillarBar from './PillarBar';

export default function PillarGrid({ pillars = [], onSelectPillar }) {
  return (
    <div className="pillars-card">
      <div className="pillars-head">
        <h3>The 6 Pillars</h3>
        <span>Click any pillar to see the reasoning</span>
      </div>
      <p className="pillars-sub">
        Each pillar is scored 0–100. Taller bar = stronger. Colors indicate strength level.
      </p>

      <div className="pillars">
        {pillars.map((pillar, idx) => (
          <PillarBar
            key={pillar.k}
            pillar={pillar}
            index={idx}
            onSelect={onSelectPillar}
          />
        ))}
      </div>
    </div>
  );
}
