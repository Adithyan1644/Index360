import React from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';

const DURATION_OPTIONS = [1, 3, 5, 10];

export default function PathBInputScreen({
  category,
  searchName,
  amount,
  duration,
  onSearchNameChange,
  onAmountChange,
  onDurationChange,
  onQuickFill,
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
        Choose another category
      </button>

      <div className="card card-narrow">
        <div className="sec-head" style={{ textAlign: 'left', marginBottom: 32 }}>
          <div className="eyebrow">{category.name}</div>
          <h2 style={{ fontSize: 27, marginBottom: 10 }}>Enter the details</h2>
          <p style={{ margin: 0, fontSize: '14.5px' }}>{category.hint}</p>
        </div>

        <div className="field">
          <label htmlFor="target-input-name">{category.label}</label>
          <input
            id="target-input-name"
            type="text"
            className="input"
            value={searchName}
            onChange={(e) => onSearchNameChange(e.target.value)}
            placeholder={category.ph}
            autoComplete="off"
          />

          {category.quickFills && category.quickFills.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              {category.quickFills.map((fill) => (
                <button
                  key={fill}
                  type="button"
                  className="tag"
                  style={{ cursor: 'pointer', background: 'var(--surface-2)', border: '1px solid var(--border-2)' }}
                  onClick={() => onQuickFill(fill)}
                >
                  <Sparkles size={11} style={{ marginRight: 4, display: 'inline' }} />
                  {fill}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="b-amt-input">Monthly investment amount</label>
          <div className="input-money">
            <span className="rs">₹</span>
            <input
              id="b-amt-input"
              type="text"
              className="input"
              value={amount ? amount.toLocaleString('en-IN') : ''}
              onChange={handleAmountInput}
              inputMode="numeric"
              placeholder="5,000"
            />
          </div>
        </div>

        <div className="field">
          <label>Investment duration</label>
          <div className="chips">
            {DURATION_OPTIONS.map((dur) => (
              <button
                key={dur}
                type="button"
                className={`chip ${duration === dur ? 'on' : ''}`}
                onClick={() => onDurationChange(dur)}
              >
                {dur} Year{dur > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-gold"
          style={{ width: '100%', marginTop: 8 }}
          onClick={onSubmit}
        >
          <Play size={16} fill="currentColor" />
          Run 360° Analysis
        </button>
      </div>
    </section>
  );
}
