import React from 'react';
import {
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Coins,
  Layers,
  ScrollText,
  CircleDot,
  Building2,
  Landmark,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ICON_MAP = {
  TrendingUp,
  BarChart3,
  Coins,
  Layers,
  ScrollText,
  CircleDot,
  Building2,
  Landmark,
};

export default function PathBCategoriesScreen({ onSelectCategory, onBack }) {
  return (
    <section className="screen active">
      <button type="button" className="back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to home
      </button>

      <div className="sec-head">
        <div className="eyebrow">Path B · Deep Analysis</div>
        <h2>Where do you want to invest?</h2>
        <p>Pick a category. Index 360 will analyze the specific option you choose.</p>
      </div>

      <div className="cat-grid">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || BarChart3;

          return (
            <div
              key={cat.id}
              className="cat"
              onClick={() => onSelectCategory(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectCategory(cat);
              }}
            >
              <div className="cat-ic">
                <IconComponent size={24} color="#22d3ee" strokeWidth={1.8} />
              </div>
              <h5>{cat.name}</h5>
              <span>{cat.sub}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
