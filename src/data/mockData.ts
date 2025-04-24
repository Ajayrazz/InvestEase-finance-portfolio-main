import { Investment } from '../contexts/PortfolioContext';

// Mock investments data
export const mockInvestments: Investment[] = [
  {
    id: '1',
    type: 'stock',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 10,
    purchasePrice: 150.75,
    currentPrice: 178.43,
    purchaseDate: '2022-05-15',
    notes: 'Long-term investment in tech giant',
    color: '#3B82F6',
  },
  {
    id: '2',
    type: 'stock',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    shares: 5,
    purchasePrice: 290.20,
    currentPrice: 325.68,
    purchaseDate: '2022-06-22',
    color: '#6366F1',
  },
  {
    id: '3',
    type: 'crypto',
    name: 'Bitcoin',
    symbol: 'BTC',
    shares: 0.5,
    purchasePrice: 32000,
    currentPrice: 45000,
    purchaseDate: '2022-01-03',
    notes: 'High risk, high reward',
    color: '#F59E0B',
  },
  {
    id: '4',
    type: 'etf',
    name: 'Vanguard S&P 500 ETF',
    symbol: 'VOO',
    shares: 15,
    purchasePrice: 380.45,
    currentPrice: 412.86,
    purchaseDate: '2021-12-10',
    notes: 'Index fund tracking S&P 500',
    color: '#10B981',
  },
  {
    id: '5',
    type: 'mutualFund',
    name: 'Fidelity Contrafund',
    symbol: 'FCNTX',
    shares: 25,
    purchasePrice: 14.75,
    currentPrice: 15.98,
    purchaseDate: '2022-03-18',
    color: '#8B5CF6',
  },
  {
    id: '6',
    type: 'bond',
    name: 'US Treasury 10-Year',
    symbol: 'USTB10Y',
    shares: 5,
    purchasePrice: 98.25,
    currentPrice: 97.82,
    purchaseDate: '2023-01-05',
    notes: 'Fixed income - government bond',
    color: '#EC4899',
  },
];

// Mock portfolio summary data
export const mockPortfolioData = {
  totalValue: 20645.32,
  totalGain: 2134.87,
  totalGainPercentage: 11.54,
  allocationByType: [
    { type: 'stock', percentage: 45, value: 9290.39 },
    { type: 'crypto', percentage: 20, value: 4129.06 },
    { type: 'etf', percentage: 15, value: 3096.80 },
    { type: 'mutualFund', percentage: 10, value: 2064.53 },
    { type: 'bond', percentage: 10, value: 2064.53 },
  ],
  performanceData: [
    { date: '2023-01-01', value: 15000 },
    { date: '2023-02-01', value: 15300 },
    { date: '2023-03-01', value: 16100 },
    { date: '2023-04-01', value: 15800 },
    { date: '2023-05-01', value: 16500 },
    { date: '2023-06-01', value: 17200 },
    { date: '2023-07-01', value: 18100 },
    { date: '2023-08-01', value: 18800 },
    { date: '2023-09-01', value: 18400 },
    { date: '2023-10-01', value: 19200 },
    { date: '2023-11-01', value: 20100 },
    { date: '2023-12-01', value: 20645.32 },
  ],
};

// Mock market data
export const mockMarketData = {
  indices: [
    { name: 'S&P 500', value: 4532.12, change: 0.82, changePercent: 1.72 },
    { name: 'NASDAQ', value: 14265.34, change: 201.48, changePercent: 1.43 },
    { name: 'Dow Jones', value: 35061.55, change: 248.90, changePercent: 0.71 },
    { name: 'Russell 2000', value: 2236.78, change: -5.62, changePercent: -0.25 },
  ],
  topGainers: [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 745.32, changePercent: 8.4 },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 258.73, changePercent: 7.2 },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 178.92, changePercent: 5.3 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 142.18, changePercent: 4.1 },
  ],
  topLosers: [
    { symbol: 'INTC', name: 'Intel Corp', price: 32.45, changePercent: -3.7 },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 152.34, changePercent: -2.4 },
    { symbol: 'PFE', name: 'Pfizer Inc', price: 38.21, changePercent: -2.1 },
    { symbol: 'KO', name: 'Coca-Cola Co', price: 58.78, changePercent: -1.9 },
  ],
  cryptoMarket: [
    { symbol: 'BTC', name: 'Bitcoin', price: 45000, changePercent: 2.8 },
    { symbol: 'ETH', name: 'Ethereum', price: 3250, changePercent: 3.5 },
    { symbol: 'SOL', name: 'Solana', price: 125.5, changePercent: 7.2 },
    { symbol: 'ADA', name: 'Cardano', price: 0.58, changePercent: -1.2 },
  ],
  news: [
    {
      id: 1,
      title: 'Fed signals potential rate cuts in the coming months',
      source: 'Financial Times',
      date: '2023-12-15',
      summary: 'Federal Reserve officials have indicated they may begin cutting interest rates in the next few months as inflation shows signs of cooling.',
    },
    {
      id: 2,
      title: 'Tech stocks rally on strong earnings reports',
      source: 'Wall Street Journal',
      date: '2023-12-14',
      summary: 'Major technology companies exceeded analyst expectations in Q4, driving a broad market rally.',
    },
    {
      id: 3,
      title: 'New regulations proposed for cryptocurrency exchanges',
      source: 'Bloomberg',
      date: '2023-12-13',
      summary: 'Regulatory bodies are considering new oversight measures for cryptocurrency exchanges following recent market volatility.',
    },
    {
      id: 4,
      title: 'Oil prices stabilize after OPEC+ agreement',
      source: 'Reuters',
      date: '2023-12-12',
      summary: 'Crude oil prices have stabilized following an agreement among OPEC+ members to maintain current production levels.',
    },
  ],
};

// Mock chat messages for the AI assistant
export const mockChatHistory = [
  {
    id: '1',
    role: 'system',
    content: 'I am your investment portfolio assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '2',
    role: 'user',
    content: 'How is my portfolio performing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Your portfolio is up 11.54% overall, with a total value of $20,645.32. Your best performing investment is Bitcoin (BTC) with a 40.63% return.',
    timestamp: new Date(Date.now() - 1000 * 60 * 54).toISOString(),
  },
  {
    id: '4',
    role: 'user',
    content: 'Should I invest more in tech stocks?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Based on your current portfolio, you already have a significant allocation to technology stocks (approximately 45% of your portfolio). While tech has been performing well, further increasing your exposure may increase your risk. Consider maintaining a diversified portfolio based on your risk tolerance and investment goals.',
    timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
  },
];