import React, { useState, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundFx from './components/BackgroundFx';
import PillarModal from './components/PillarModal';

import HomeScreen from './screens/HomeScreen';
import PathAScreen from './screens/PathAScreen';
import PathAResultsScreen from './screens/PathAResultsScreen';
import PathBCategoriesScreen from './screens/PathBCategoriesScreen';
import PathBInputScreen from './screens/PathBInputScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';

import { CATEGORIES } from './data/categories';
import { FUNDS, DEFAULT_FUND } from './data/funds';
import { getRankedOptions } from './utils/finance';

export default function App() {
  // Navigation & View state
  const [activeScreen, setActiveScreen] = useState('home');

  // Path A state
  const [pathAAmount, setPathAAmount] = useState(10000);
  const [pathADuration, setPathADuration] = useState(3);
  const [pathARisk, setPathARisk] = useState('balanced');
  const [pathAOptions, setPathAOptions] = useState([]);

  // Path B state
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES[0]);
  const [searchName, setSearchName] = useState('');
  const [investAmount, setInvestAmount] = useState(5000);
  const [investDuration, setInvestDuration] = useState(3);

  // Active Fund for Deep Analysis Dashboard
  const [currentFund, setCurrentFund] = useState(FUNDS['rajeev thakkar']);

  // Modal drilldown state
  const [activePillarIndex, setActivePillarIndex] = useState(null);

  // Helper to scroll smoothly to top on screen change
  const navigateTo = useCallback((screen) => {
    setActiveScreen(screen);
    setActivePillarIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handler: Run Path A Auto Invest
  const handleRunPathA = useCallback(() => {
    const options = getRankedOptions(pathAAmount, pathADuration, pathARisk);
    setPathAOptions(options);
    navigateTo('pathAResults');
  }, [pathAAmount, pathADuration, pathARisk, navigateTo]);

  // Helper: Find or create fund instance
  const resolveFund = useCallback((query, categoryName) => {
    const q = (query || '').toLowerCase().trim();
    let matched = null;

    for (const key in FUNDS) {
      const parts = key.split(' ');
      if (q.includes(parts[0]) || parts.some((p) => q.includes(p))) {
        matched = JSON.parse(JSON.stringify(FUNDS[key]));
        break;
      }
    }

    if (!matched) {
      matched = JSON.parse(JSON.stringify(DEFAULT_FUND));
      if (query && query.trim()) {
        matched.name = query.trim();
        matched.manager = query.trim();
      }
      matched.category = categoryName || 'Analyzed Asset';
    }

    return matched;
  }, []);

  // Handler: Select category in Path B
  const handleSelectCategory = useCallback((cat) => {
    const matchedCategory = typeof cat === 'string'
      ? CATEGORIES.find((c) => c.id === cat) || CATEGORIES[0]
      : cat;

    setCurrentCategory(matchedCategory);
    setSearchName('');
    navigateTo('pathBInput');
  }, [navigateTo]);

  // Handler: Submit Path B Form
  const handleRunPathB = useCallback(() => {
    const resolved = resolveFund(searchName, currentCategory.name);
    setCurrentFund(resolved);
    navigateTo('loading');
  }, [searchName, currentCategory.name, resolveFund, navigateTo]);

  // Handler: Open fund from Path A results or Alternatives
  const handleSelectFund = useCallback((fundKeyOrObj) => {
    if (typeof fundKeyOrObj === 'string') {
      if (FUNDS[fundKeyOrObj]) {
        setCurrentFund(JSON.parse(JSON.stringify(FUNDS[fundKeyOrObj])));
      } else {
        const resolved = resolveFund(fundKeyOrObj, 'Mutual Funds');
        setCurrentFund(resolved);
      }
    } else if (fundKeyOrObj && fundKeyOrObj.fundKey) {
      if (FUNDS[fundKeyOrObj.fundKey]) {
        setCurrentFund(JSON.parse(JSON.stringify(FUNDS[fundKeyOrObj.fundKey])));
      } else {
        const resolved = resolveFund(fundKeyOrObj.name, 'Mutual Funds');
        setCurrentFund(resolved);
      }
    } else {
      const resolved = resolveFund(fundKeyOrObj?.name || 'Asset', 'Mutual Funds');
      setCurrentFund(resolved);
    }

    navigateTo('loading');
  }, [resolveFund, navigateTo]);

  // Compute alternatives for current dashboard fund
  const dashboardAlternatives = useMemo(() => {
    if (!currentFund) return [];
    return Object.keys(FUNDS)
      .map((key) => ({ key, ...FUNDS[key] }))
      .filter((item) => item.name !== currentFund.name)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [currentFund]);

  return (
    <div className="app-container">
      <BackgroundFx />

      <Navbar
        activeScreen={activeScreen}
        onNavigate={navigateTo}
      />

      <main className="wrap">
        {activeScreen === 'home' && (
          <HomeScreen onNavigate={navigateTo} />
        )}

        {activeScreen === 'pathA' && (
          <PathAScreen
            amount={pathAAmount}
            duration={pathADuration}
            risk={pathARisk}
            onAmountChange={setPathAAmount}
            onDurationChange={setPathADuration}
            onRiskChange={setPathARisk}
            onSubmit={handleRunPathA}
            onBack={() => navigateTo('home')}
          />
        )}

        {activeScreen === 'pathAResults' && (
          <PathAResultsScreen
            amount={pathAAmount}
            duration={pathADuration}
            risk={pathARisk}
            options={pathAOptions}
            onSelectOption={handleSelectFund}
            onSwitchToPathB={() => navigateTo('pathB')}
            onBack={() => navigateTo('pathA')}
          />
        )}

        {activeScreen === 'pathB' && (
          <PathBCategoriesScreen
            onSelectCategory={handleSelectCategory}
            onBack={() => navigateTo('home')}
          />
        )}

        {activeScreen === 'pathBInput' && (
          <PathBInputScreen
            category={currentCategory}
            searchName={searchName}
            amount={investAmount}
            duration={investDuration}
            onSearchNameChange={setSearchName}
            onAmountChange={setInvestAmount}
            onDurationChange={setInvestDuration}
            onQuickFill={(fill) => setSearchName(fill)}
            onSubmit={handleRunPathB}
            onBack={() => navigateTo('pathB')}
          />
        )}

        {activeScreen === 'loading' && (
          <LoadingScreen
            onComplete={() => navigateTo('dashboard')}
          />
        )}

        {activeScreen === 'dashboard' && (
          <DashboardScreen
            fund={currentFund}
            amount={investAmount}
            duration={investDuration}
            alternatives={dashboardAlternatives}
            onAmountChange={setInvestAmount}
            onDurationChange={setInvestDuration}
            onSelectPillar={(idx) => setActivePillarIndex(idx)}
            onSelectAlternative={handleSelectFund}
            onCompareAnother={() => navigateTo('pathB')}
            onBack={() => navigateTo('pathB')}
          />
        )}
      </main>

      {/* Pillar Detail Modal */}
      {activePillarIndex !== null && currentFund?.pillars?.[activePillarIndex] && (
        <PillarModal
          pillar={currentFund.pillars[activePillarIndex]}
          index={activePillarIndex}
          onClose={() => setActivePillarIndex(null)}
        />
      )}

      <Footer
        onNavigate={navigateTo}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
