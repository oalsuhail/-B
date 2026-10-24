export const portfolioKPIs = {
  totalAUM: 4.82,         // $B
  ytdReturn: 14.7,        // %
  sharpeRatio: 1.84,
  alpha: 3.2,             // %
  beta: 0.91,
  volatility: 11.4,       // %
  maxDrawdown: -8.3,      // %
  activeSectors: 7,
};

export const sectorAllocation = [
  { sector: 'Technology',       weight: 28.4, ytdReturn: 22.1, outlook: 'Overweight',  color: '#6366f1' },
  { sector: 'Healthcare',       weight: 18.2, ytdReturn: 11.4, outlook: 'Overweight',  color: '#22d3ee' },
  { sector: 'Energy Transition',weight: 15.6, ytdReturn: 18.9, outlook: 'Overweight',  color: '#10b981' },
  { sector: 'Financials',       weight: 13.1, ytdReturn:  7.2, outlook: 'Neutral',     color: '#f59e0b' },
  { sector: 'Real Estate',      weight: 10.5, ytdReturn:  4.8, outlook: 'Underweight', color: '#ef4444' },
  { sector: 'Industrials',      weight:  8.7, ytdReturn:  9.6, outlook: 'Neutral',     color: '#8b5cf6' },
  { sector: 'Consumer Disc.',   weight:  5.5, ytdReturn: 13.3, outlook: 'Overweight',  color: '#f97316' },
];

export const performanceHistory = [
  { month: 'Jul 25',  portfolio: 100.0, benchmark: 100.0 },
  { month: 'Aug 25',  portfolio: 101.8, benchmark: 101.1 },
  { month: 'Sep 25',  portfolio: 100.4, benchmark:  99.8 },
  { month: 'Oct 25',  portfolio: 103.2, benchmark: 102.0 },
  { month: 'Nov 25',  portfolio: 106.1, benchmark: 103.4 },
  { month: 'Dec 25',  portfolio: 108.7, benchmark: 104.9 },
  { month: 'Jan 26',  portfolio: 107.3, benchmark: 104.1 },
  { month: 'Feb 26',  portfolio: 110.5, benchmark: 105.8 },
  { month: 'Mar 26',  portfolio: 113.4, benchmark: 107.2 },
  { month: 'Apr 26',  portfolio: 111.9, benchmark: 106.0 },
  { month: 'May 26',  portfolio: 114.7, benchmark: 108.3 },
  { month: 'Jun 26',  portfolio: 114.7, benchmark: 108.3 },
];

export const topOpportunities = [
  {
    id: 1,
    name: 'AI Infrastructure Buildout',
    sector: 'Technology',
    region: 'North America',
    expectedReturn: 28,
    riskRating: 'Medium-High',
    timeHorizon: '12–18 mo',
    conviction: 'High',
    rationale: 'Hyperscaler capex acceleration; power & cooling subsystems undervalued.',
  },
  {
    id: 2,
    name: 'GLP-1 Obesity Therapeutics',
    sector: 'Healthcare',
    region: 'Global',
    expectedReturn: 22,
    riskRating: 'Medium',
    timeHorizon: '18–24 mo',
    conviction: 'High',
    rationale: 'TAM expansion to cardiometabolic indications; supply chain normalization.',
  },
  {
    id: 3,
    name: 'Grid Modernisation & Storage',
    sector: 'Energy Transition',
    region: 'US / EU',
    expectedReturn: 19,
    riskRating: 'Medium',
    timeHorizon: '24–36 mo',
    conviction: 'High',
    rationale: 'IRA tailwinds; BESS project pipeline tripling through 2028.',
  },
  {
    id: 4,
    name: 'Defense Electronics',
    sector: 'Industrials',
    region: 'NATO',
    expectedReturn: 16,
    riskRating: 'Low-Medium',
    timeHorizon: '12–24 mo',
    conviction: 'Medium',
    rationale: 'NATO members commit 2 %+ GDP; long-cycle contracts provide revenue visibility.',
  },
  {
    id: 5,
    name: 'India Consumer Financials',
    sector: 'Financials',
    region: 'Asia',
    expectedReturn: 21,
    riskRating: 'Medium-High',
    timeHorizon: '24–36 mo',
    conviction: 'Medium',
    rationale: 'Credit penetration at 15 % vs. China 50 %; structural formalization tailwind.',
  },
  {
    id: 6,
    name: 'Luxury & Premium Experiences',
    sector: 'Consumer Disc.',
    region: 'Europe / Asia',
    expectedReturn: 14,
    riskRating: 'Medium',
    timeHorizon: '12–18 mo',
    conviction: 'Medium',
    rationale: 'Post-correction valuations; aspirational spending resilient in EM wealth pools.',
  },
];

export const riskMatrix = [
  { name: 'Macro / Rates',       probability: 35, impact: 70, category: 'macro' },
  { name: 'Geopolitical',        probability: 45, impact: 65, category: 'geopolitical' },
  { name: 'AI Regulatory',       probability: 30, impact: 55, category: 'regulatory' },
  { name: 'China Slowdown',      probability: 40, impact: 60, category: 'macro' },
  { name: 'Energy Price Spike',  probability: 25, impact: 50, category: 'commodity' },
  { name: 'Credit Tightening',   probability: 30, impact: 45, category: 'macro' },
  { name: 'EM Currency Risk',    probability: 50, impact: 40, category: 'fx' },
];

export const regionBreakdown = [
  { region: 'North America', weight: 48.2, color: '#6366f1' },
  { region: 'Europe',        weight: 21.4, color: '#22d3ee' },
  { region: 'Asia Pacific',  weight: 18.7, color: '#10b981' },
  { region: 'Emerging Mkts', weight:  8.3, color: '#f59e0b' },
  { region: 'Other',         weight:  3.4, color: '#94a3b8' },
];
