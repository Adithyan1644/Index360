import React, { useEffect, useState } from 'react';
import { getScoreColor, getScoreClass } from '../utils/formatters';
import pillarBase from '../assets/thai_pillar.webp';
import pillarFrame from '../assets/thai_pillar_frame.webp';

export default function PillarBar({ pillar, index, onSelect }) {
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const color = getScoreColor(pillar.v);
  const fillClass = getScoreClass(pillar.v);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeight(pillar.v);
    }, 120 + index * 60);

    return () => clearTimeout(timer);
  }, [pillar.v, index]);

  return (
    <div
      className="pillar"
      onClick={() => onSelect(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(index);
        }
      }}
      aria-label={`${pillar.k}: ${pillar.v}% score`}
    >
      <div className="pillar-pct" style={{ color }}>
        {pillar.v}%
      </div>

      <div className="pillar-structure">
        {/* Full ornate pillar with golden lotus crown & center pattern */}
        <img
          src={pillarBase}
          alt=""
          className="pillar-bg-img"
          draggable={false}
        />

        {/* Dynamic center channel fill */}
        <div className="pillar-shaft-track">
          <div
            className={`pillar-fill ${fillClass}`}
            style={{
              height: `${animatedHeight}%`,
              background: `linear-gradient(180deg, ${color}, ${color}cc)`,
              boxShadow: `0 0 16px ${color}99, inset 0 0 8px rgba(255,255,255,0.4)`
            }}
          >
            <div
              className="pillar-fill-head"
              style={{
                boxShadow: `0 0 8px #ffffff, 0 0 16px ${color}`
              }}
            />
          </div>
        </div>

        {/* Ornate golden crown and side column borders */}
        <img
          src={pillarFrame}
          alt={pillar.k}
          className="pillar-frame-img"
          draggable={false}
        />

        {/* Ambient bottom glow radiating onto card floor */}
        <div
          className="pillar-ambient-glow"
          style={{
            background: color,
            boxShadow: `0 0 26px 8px ${color}77`
          }}
        />
      </div>

      <div className="pillar-label">{pillar.k}</div>
      <div
        className="pillar-dot"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}`
        }}
      />
      <div className="pillar-hint">Click to expand</div>
    </div>
  );
}
