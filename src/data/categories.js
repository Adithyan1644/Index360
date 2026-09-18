export const CATEGORIES = [
  {
    id: 'sip',
    name: 'SIP / Mutual Funds',
    sub: 'Equity · Debt · Hybrid',
    icon: 'TrendingUp',
    hint: "Enter the fund manager's name or the fund name.",
    label: 'Fund Manager or Fund Name',
    ph: 'e.g. Rajeev Thakkar, or Parag Parikh Flexi Cap',
    quickFills: ['Rajeev Thakkar', 'Chirag Setalvad', 'Sankaran Naren', 'Samir Rachh']
  },
  {
    id: 'stocks',
    name: 'Direct Stocks',
    sub: 'NSE · BSE listed',
    icon: 'BarChart3',
    hint: 'Enter the stock name or ticker.',
    label: 'Stock Name or Ticker',
    ph: 'e.g. HDFC Bank, RELIANCE',
    quickFills: ['HDFC Bank', 'Reliance Industries', 'TCS', 'L&T']
  },
  {
    id: 'crypto',
    name: 'Crypto',
    sub: 'BTC · ETH · Altcoins',
    icon: 'Coins',
    hint: 'Enter the coin name or symbol.',
    label: 'Coin Name or Symbol',
    ph: 'e.g. Bitcoin, ETH, SOL',
    quickFills: ['Bitcoin', 'Ethereum', 'Solana']
  },
  {
    id: 'etf',
    name: 'ETFs',
    sub: 'Index · Sector · Gold',
    icon: 'Layers',
    hint: 'Enter the ETF name.',
    label: 'ETF Name',
    ph: 'e.g. Nippon India Nifty 50, MON100',
    quickFills: ['Nippon Nifty 50 ETF', 'Mirae FANG+ ETF', 'SBI Gold ETF']
  },
  {
    id: 'bonds',
    name: 'Bonds',
    sub: 'Govt · Corporate',
    icon: 'ScrollText',
    hint: 'Enter the bond or issuer name.',
    label: 'Bond / Issuer',
    ph: 'e.g. SGB 2031, REC Bonds, Bharat Bond',
    quickFills: ['Sovereign Gold Bond', 'REC 54EC Bond', 'Bharat Bond ETF']
  },
  {
    id: 'gold',
    name: 'Gold',
    sub: 'SGB · Gold ETF · Physical',
    icon: 'CircleDot',
    hint: 'Enter the gold instrument.',
    label: 'Instrument',
    ph: 'e.g. Sovereign Gold Bond, Gold BeES',
    quickFills: ['SGB Tranche', 'Nippon Gold BeES']
  },
  {
    id: 'reits',
    name: 'REITs',
    sub: 'Real Estate · InvITs',
    icon: 'Building2',
    hint: 'Enter the REIT name.',
    label: 'REIT Name',
    ph: 'e.g. Embassy Office Parks, Mindspace REIT',
    quickFills: ['Embassy Office Parks', 'Mindspace Business Parks', 'Brookfield REIT']
  },
  {
    id: 'fd',
    name: 'Fixed Deposits',
    sub: 'Bank · Corporate FD',
    icon: 'Landmark',
    hint: 'Enter the bank or issuer.',
    label: 'Bank / Issuer',
    ph: 'e.g. HDFC Bank FD, Bajaj Finance FD',
    quickFills: ['HDFC Bank Regular FD', 'Bajaj Finance AAA FD', 'SBI Senior FD']
  },
];
