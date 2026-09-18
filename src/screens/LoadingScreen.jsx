import React, { useEffect, useState } from 'react';

const ANALYSIS_STEPS = [
  "Fetching fund manager career history…",
  "Analyzing year-by-year returns and drawdowns…",
  "Comparing against category peers…",
  "Evaluating parent AMC strength and culture…",
  "Scoring cost efficiency and exit loads…",
  "Assessing market fit and macro alignment…",
  "Building your 360° pillar report…"
];

export default function LoadingScreen({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    let step = 0;
    const intervalTime = 420;

    const timer = setInterval(() => {
      step += 1;
      if (step < ANALYSIS_STEPS.length) {
        setCurrentStepIndex(step);
        setProgressPercent(((step + 1) / ANALYSIS_STEPS.length) * 100);
      } else {
        clearInterval(timer);
        setProgressPercent(100);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <section className="screen active">
      <div className="loading-wrap">
        <div className="scanner">
          <div className="scanner-ring" />
          <div className="scanner-ring" />
          <div className="scanner-ring" />
          <div className="scanner-core" />
        </div>

        <div className="load-step">
          {ANALYSIS_STEPS[currentStepIndex]}
        </div>

        <div className="load-bar">
          <div
            className="load-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
