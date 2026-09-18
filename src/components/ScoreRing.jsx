import React, { useEffect, useState } from 'react';
import { getScoreColor } from '../utils/formatters';

export default function ScoreRing({ score = 0, size = 118, strokeWidth = 8 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;
    const startVal = 0;
    const endVal = score;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(startVal + (endVal - startVal) * easeOutCubic));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;
  const scoreColor = getScoreColor(score);

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,.07)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(.2,.8,.2,1)',
          }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2={size} y2={size}>
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor={scoreColor} />
          </linearGradient>
        </defs>
      </svg>
      <div className="val">
        <span>{displayScore}</span>
        <small>/100</small>
      </div>
    </div>
  );
}
