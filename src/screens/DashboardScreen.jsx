import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScoreRing from '../components/ScoreRing';
import PillarGrid from '../components/PillarGrid';
import ProjectionCard from '../components/ProjectionCard';
import AlternativesList from '../components/AlternativesList';
import { getScoreColor, getScoreLabel } from '../utils/formatters';

export default function DashboardScreen({
  fund,
  amount,
  duration,
  alternatives = [],
  onAmountChange,
  onDurationChange,
  onSelectPillar,
  onSelectAlternative,
  onCompareAnother,
  onBack,
}) {
  const score = fund.score;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  useEffect(() => {
    if (score >= 80) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#22d3ee', '#8b5cf6', '#fbbf24', '#34d399'],
        });
      } catch (err) {
        // graceful ignore if canvas not supported
      }
    }
  }, [score]);

  const scoreDescription =
    score >= 80
      ? 'This is a high-quality option. Strong manager, institutional process, and favorable market positioning. Suitable as a core holding.'
      : score >= 65
      ? 'This is a good option overall. Some pillars are strong, others need monitoring. Suitable for most investors with a 3+ year horizon.'
      : score >= 50
      ? 'This is an average option. It has merits but also visible vulnerabilities. Compare against the alternatives below before committing.'
      : 'This option exhibits notable weaknesses across multiple pillars. Not recommended without deeper due diligence.';

  const strongPillarsCount = fund.pillars ? fund.pillars.filter((p) => p.v >= 65).length : 0;

  return (
    <section className="screen active">
      <button type="button" className="back" onClick={onBack}>
        <ArrowLeft size={16} />
        Analyze another option
      </button>

      <div className="dash-top">
        <div className="dash-title">
          <h2>{fund.name}</h2>
          <div className="dash-meta">
            <span className="tag cyan">{fund.manager}</span>
            <span className="tag">{fund.category}</span>
            <span className="tag gold">Index 360 Score {score}/100</span>
          </div>
        </div>

        <button type="button" className="btn btn-ghost btn-sm" onClick={onCompareAnother}>
          Compare another <ArrowRight size={14} style={{ marginLeft: 6 }} />
        </button>
      </div>

      {/* Composite Score Card */}
      <div className="composite">
        <ScoreRing score={score} />

        <div className="composite-txt">
          <h3>Index 360 Composite Score</h3>
          <p>{scoreDescription}</p>
          <div className="verdict" style={{ color: scoreColor }}>
            {score >= 65 ? (
              <CheckCircle2 size={16} color={scoreColor} />
            ) : (
              <AlertTriangle size={16} color={scoreColor} />
            )}
            <span>
              {scoreLabel} overall · {strongPillarsCount} of 6 pillars above average
            </span>
          </div>
        </div>
      </div>

      {/* 6 Pillars Breakdown */}
      <PillarGrid
        pillars={fund.pillars || []}
        onSelectPillar={onSelectPillar}
      />

      {/* Dynamic Compounding & Projections */}
      <ProjectionCard
        fund={fund}
        amount={amount}
        durationYears={duration}
        onAmountChange={onAmountChange}
        onDurationChange={onDurationChange}
      />

      {/* Alternatives Comparison */}
      <AlternativesList
        alternatives={alternatives}
        onSelectFund={onSelectAlternative}
      />
    </section>
  );
}
