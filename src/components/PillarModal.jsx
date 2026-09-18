import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, BarChart2 } from 'lucide-react';
import { getScoreColor } from '../utils/formatters';

export default function PillarModal({ pillar, index, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!pillar) return null;

  const color = getScoreColor(pillar.v);

  return (
    <div
      className="modal-ov open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="mp-head">
          <div
            className="mp-ic"
            style={{
              background: `${color}18`,
              borderColor: `${color}44`,
            }}
          >
            <BarChart2 size={24} color={color} />
          </div>
          <div>
            <h3 id="modal-title">{pillar.k}</h3>
            <div style={{ fontSize: '12.5px', color: 'var(--text-mute)', letterSpacing: '.4px' }}>
              PILLAR {index + 1} OF 6
            </div>
          </div>
          <div
            className="mp-score"
            style={{
              background: `${color}18`,
              color,
              border: `1px solid ${color}44`,
            }}
          >
            {pillar.v}%
          </div>
        </div>

        <div className="mp-bar">
          <div
            id="mpBar"
            style={{
              width: `${pillar.v}%`,
              height: '100%',
              borderRadius: 100,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
              transition: 'width 0.8s cubic-bezier(.2,.8,.2,1)',
            }}
          />
        </div>

        <div className="mp-sec good">
          <h4>
            <CheckCircle2 size={16} color="#10b981" /> Why this is strong
          </h4>
          <ul>
            {pillar.strong.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mp-sec warn">
          <h4>
            <AlertTriangle size={16} color="#f59e0b" /> Watch out for
          </h4>
          <ul>
            {pillar.watch.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
