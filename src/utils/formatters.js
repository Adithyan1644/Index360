export function parseNumber(val) {
  if (typeof val === 'number') return val;
  const cleaned = String(val || '').replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function formatINR(val) {
  const n = Math.round(parseNumber(val));
  return '₹' + n.toLocaleString('en-IN');
}

export function formatINRShort(val) {
  const n = parseNumber(val);
  if (n >= 10000000) {
    return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  }
  if (n >= 100000) {
    return '₹' + (n / 100000).toFixed(2) + ' L';
  }
  return formatINR(n);
}

export function getScoreColor(score) {
  if (score >= 80) return '#34d399'; // Emerald / green
  if (score >= 65) return '#84cc16'; // Lime
  if (score >= 50) return '#fbbf24'; // Amber / Gold
  if (score >= 35) return '#fb923c'; // Orange
  return '#f87171';                 // Red
}

export function getScoreClass(score) {
  if (score >= 80) return 'f-great';
  if (score >= 65) return 'f-good';
  if (score >= 50) return 'f-mid';
  if (score >= 35) return 'f-weak';
  return 'f-bad';
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Average';
  if (score >= 35) return 'Weak';
  return 'Poor';
}

export function getConfidenceBadge(score) {
  if (score >= 80) return { label: 'HIGH', class: 'high' };
  if (score >= 65) return { label: 'GOOD', class: 'good' };
  if (score >= 50) return { label: 'MODERATE', class: 'mid' };
  return { label: 'LOW', class: 'low' };
}
