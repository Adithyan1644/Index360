import React, { useMemo } from 'react';
import { TrendingUp, RefreshCw, Info } from 'lucide-react';
import { calculateSipFV } from '../utils/finance';
import { formatINR, formatINRShort, getConfidenceBadge, getScoreColor } from '../utils/formatters';

const DURATION_OPTIONS = [1, 3, 5, 10];

export default function ProjectionCard({
  fund,
  amount,
  durationYears,
  onAmountChange,
  onDurationChange,
}) {
  const lowRate = fund.low ?? 11;
  const highRate = fund.high ?? 13;

  const { invested, lowVal, highVal, midVal, gain, returnPct, yearlyBreakdown } = useMemo(() => {
    const inv = amount * durationYears * 12;
    const lo = calculateSipFV(amount, durationYears, lowRate);
    const hi = calculateSipFV(amount, durationYears, highRate);
    const mid = (lo + hi) / 2;
    const g = mid - inv;
    const retPct = inv > 0 ? (g / inv) * 100 : 0;

    const rows = [];
    const totalYears = Math.ceil(durationYears);
    for (let y = 1; y <= totalYears; y++) {
      const activeDuration = Math.min(y, durationYears);
      const invTotal = amount * 12 * activeDuration;
      const loYr = calculateSipFV(amount, activeDuration, lowRate);
      const hiYr = calculateSipFV(amount, activeDuration, highRate);

      rows.push({
        year: y,
        invested: invTotal,
        lowEstimate: loYr,
        highEstimate: hiYr,
      });
    }

    return {
      invested: inv,
      lowVal: lo,
      highVal: hi,
      midVal: mid,
      gain: g,
      returnPct: retPct,
      yearlyBreakdown: rows,
    };
  }, [amount, durationYears, lowRate, highRate]);

  const confidence = getConfidenceBadge(fund.score);
  const confColor = getScoreColor(fund.score);

  const handleInputChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(rawVal, 10) || 0;
    onAmountChange(num);
  };

  return (
    <div className="proj-card">
      <div className="proj-head">
        <TrendingUp size={22} color="#fbbf24" />
        <h3>If you invest — what happens?</h3>
      </div>
      <p className="proj-sub">
        Adjust the amount and duration. Projections update live based on historical manager performance and current market conditions.
      </p>

      <div className="proj-controls">
        <div className="field">
          <label htmlFor="sip-input-amt">Monthly SIP Amount</label>
          <div className="input-money">
            <span className="rs">₹</span>
            <input
              id="sip-input-amt"
              type="text"
              className="input"
              value={amount ? amount.toLocaleString('en-IN') : ''}
              onChange={handleInputChange}
              inputMode="numeric"
              placeholder="5,000"
            />
          </div>
        </div>

        <div className="field">
          <label>Duration</label>
          <div className="chips" style={{ gap: 8 }}>
            {DURATION_OPTIONS.map((dur) => (
              <button
                key={dur}
                type="button"
                className={`chip ${durationYears === dur ? 'on' : ''}`}
                style={{ padding: '14px 8px', fontSize: '13px' }}
                onClick={() => onDurationChange(dur)}
              >
                {dur}Y
              </button>
            ))}
          </div>
        </div>

        <div className="proj-recalc-col">
          <button
            type="button"
            className="btn btn-ghost"
            style={{ height: 52 }}
            onClick={() => {
              // triggers gentle recalculation state
            }}
          >
            <RefreshCw size={15} /> Recalculate
          </button>
        </div>
      </div>

      <div className="proj-grid">
        <div className="proj-box">
          <div className="l">You Invest</div>
          <div className="v v-cyan">{formatINR(invested)}</div>
          <div className="s">over {Math.round(durationYears * 12)} months</div>
        </div>

        <div className="proj-box">
          <div className="l">Estimated Value</div>
          <div className="v v-gold">{formatINRShort(midVal)}</div>
          <div className="s">{formatINRShort(lowVal)} – {formatINRShort(highVal)}</div>
        </div>

        <div className="proj-box">
          <div className="l">Estimated Gain</div>
          <div className="v v-green">{formatINR(gain)}</div>
          <div className="s">
            {invested > 0 ? `+${returnPct.toFixed(1)}% total return` : '—'}
          </div>
        </div>

        <div className="proj-box">
          <div className="l">Confidence</div>
          <div className="v" style={{ color: confColor }}>
            {confidence.label}
          </div>
          <div className="s">based on {fund.score}/100 score</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="proj-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Invested</th>
              <th>Low Estimate ({lowRate}%)</th>
              <th>High Estimate ({highRate}%)</th>
            </tr>
          </thead>
          <tbody>
            {yearlyBreakdown.map((row) => (
              <tr key={row.year}>
                <td className="yr">Year {row.year}</td>
                <td className="inv">{formatINR(row.invested)}</td>
                <td className="lo">{formatINR(row.lowEstimate)}</td>
                <td className="hi">{formatINR(row.highEstimate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="proj-note">
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Info size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: 'var(--text-dim)' }}>How to read this: </strong>
            Based on <strong style={{ color: confColor }}>{fund.manager || fund.name}</strong>'s historical track record and current market parameters,
            a <strong>{formatINR(amount)}/month</strong> SIP for <strong>{durationYears} year{durationYears > 1 ? 's' : ''}</strong> is estimated to grow to{' '}
            <strong style={{ color: 'var(--gold)' }}>{formatINRShort(midVal)}</strong> — an estimated capital appreciation of{' '}
            <strong style={{ color: 'var(--green)' }}>{formatINR(gain)}</strong>.
            The variance ({formatINRShort(lowVal)} – {formatINRShort(highVal)}) reflects risk: a <strong>{confidence.label}</strong> confidence score generates a{' '}
            {fund.score >= 75 ? 'narrow' : fund.score >= 60 ? 'moderate' : 'wide'} distribution range.
          </div>
        </div>
      </div>
    </div>
  );
}
