/**
 * Compounded Future Value of a Monthly SIP (Systematic Investment Plan)
 * Formula: P * [((1 + i)^n - 1) / i] * (1 + i)
 * where:
 * P = monthly investment
 * i = monthly rate (annualRate / 12 / 100)
 * n = total number of months (years * 12)
 */
export function calculateSipFV(monthlyAmount, years, annualRatePercent) {
  const p = Number(monthlyAmount) || 0;
  const i = (Number(annualRatePercent) || 0) / 100 / 12;
  const n = Math.round((Number(years) || 0) * 12);

  if (p <= 0 || n <= 0) return 0;
  if (i === 0) return p * n;

  return p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

/**
 * Builds ranked investment avenues based on amount, duration, and risk profile
 */
export function getRankedOptions(amount, durationYears, riskProfile) {
  const opts = [];

  opts.push({
    id: 'nifty50',
    name: "Index Fund SIP (Nifty 50)",
    desc: "Passive, low-cost exposure to India's top 50 enterprises. Zero fund manager risk.",
    ret: "11 – 13% p.a.",
    note: "Lowest cost · Highest transparency",
    score: riskProfile === 'safe' ? 88 : riskProfile === 'balanced' ? 84 : 72,
    fundKey: null
  });

  opts.push({
    id: 'ppfas',
    name: "Parag Parikh Flexi Cap Fund",
    desc: "Value-oriented flexi cap with international diversification. Managed by Rajeev Thakkar.",
    ret: "11 – 13% p.a.",
    note: "Strong manager · Low drawdown",
    score: riskProfile === 'safe' ? 76 : riskProfile === 'balanced' ? 84 : 80,
    fundKey: "rajeev thakkar"
  });

  if (riskProfile !== 'safe') {
    opts.push({
      id: 'hdfc_mid',
      name: "HDFC Mid-Cap Opportunities Fund",
      desc: "Mid-cap equity fund with an established 12-year track record under Chirag Setalvad.",
      ret: "11 – 14% p.a.",
      note: "Higher growth · Higher volatility",
      score: riskProfile === 'aggressive' ? 82 : 78,
      fundKey: "chirag setalvad"
    });

    opts.push({
      id: 'nippon_small',
      name: "Nippon India Small Cap Fund",
      desc: "High-growth small cap engine. Suitable strictly for long investment horizons.",
      ret: "12 – 16% p.a.",
      note: "Highest growth · Highest volatility",
      score: riskProfile === 'aggressive' ? 79 : 73,
      fundKey: "samir rachh"
    });
  }

  opts.push({
    id: 'icici_blue',
    name: "ICICI Prudential Bluechip Fund",
    desc: "Large cap fund with a valuation-disciplined counter-cyclical approach under Sankaran Naren.",
    ret: "10 – 12% p.a.",
    note: "Capital stability · Lower volatility",
    score: riskProfile === 'safe' ? 84 : 80,
    fundKey: "sankaran naren"
  });

  if (riskProfile === 'safe' || durationYears <= 1) {
    opts.push({
      id: 'debt_sip',
      name: "Debt Fund / Short Duration SIP",
      desc: "Stable fixed-income asset with predictable returns and minimal capital drawdown.",
      ret: "7 – 8% p.a.",
      note: "Capital preservation · Moderate yields",
      score: durationYears <= 1 ? 86 : 74,
      fundKey: null
    });
  }

  if (riskProfile === 'aggressive' && durationYears >= 3) {
    opts.push({
      id: 'btc',
      name: "Bitcoin Allocation (Selective)",
      desc: "High-volatility digital asset. Strictly tactical hedge for asymmetric upside.",
      ret: "-30% to +60%",
      note: "High volatility · Speculative",
      score: 42,
      fundKey: null
    });
  }

  // Sort descending by score
  opts.sort((a, b) => b.score - a.score);
  return opts.slice(0, 5);
}
