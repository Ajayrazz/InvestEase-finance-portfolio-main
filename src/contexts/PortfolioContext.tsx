import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockInvestments, mockPortfolioData } from '../data/mockData';

export interface Investment {
  id: string;
  type: 'stock' | 'crypto' | 'etf' | 'mutualFund' | 'bond';
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes?: string;
  color?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalGain: number;
  totalGainPercentage: number;
  allocationByType: { type: string; percentage: number; value: number }[];
  performanceData: { date: string; value: number }[];
}

interface PortfolioContextType {
  investments: Investment[];
  portfolioSummary: PortfolioSummary;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, data: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
  refreshPortfolioData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary>({
    totalValue: 0,
    totalGain: 0,
    totalGainPercentage: 0,
    allocationByType: [],
    performanceData: [],
  });

  // Load initial data
  useEffect(() => {
    // Check if we have data in localStorage
    const savedInvestments = localStorage.getItem('investmentAppInvestments');
    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments));
    } else {
      // Use mock data
      setInvestments(mockInvestments);
      localStorage.setItem('investmentAppInvestments', JSON.stringify(mockInvestments));
    }
    
    // Load portfolio summary
    setPortfolioSummary(mockPortfolioData);
  }, []);

  // Recalculate portfolio summary when investments change
  useEffect(() => {
    if (investments.length > 0) {
      calculatePortfolioSummary();
    }
  }, [investments]);

  const calculatePortfolioSummary = () => {
    // Calculate total value and gains
    let totalValue = 0;
    let totalCost = 0;
    
    investments.forEach(inv => {
      const value = inv.shares * inv.currentPrice;
      const cost = inv.shares * inv.purchasePrice;
      totalValue += value;
      totalCost += cost;
    });
    
    const totalGain = totalValue - totalCost;
    const totalGainPercentage = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
    
    // Calculate allocation by type
    const typeMap = new Map<string, { value: number; percentage: number }>();
    
    investments.forEach(inv => {
      const value = inv.shares * inv.currentPrice;
      if (typeMap.has(inv.type)) {
        const existing = typeMap.get(inv.type)!;
        typeMap.set(inv.type, {
          value: existing.value + value,
          percentage: 0, // Will calculate later
        });
      } else {
        typeMap.set(inv.type, { value, percentage: 0 });
      }
    });
    
    // Calculate percentages
    typeMap.forEach((data, type) => {
      typeMap.set(type, {
        ...data,
        percentage: totalValue > 0 ? (data.value / totalValue) * 100 : 0,
      });
    });
    
    const allocationByType = Array.from(typeMap).map(([type, data]) => ({
      type,
      value: data.value,
      percentage: data.percentage,
    }));
    
    // Use the mock performance data for now
    const updatedSummary = {
      totalValue,
      totalGain,
      totalGainPercentage,
      allocationByType,
      performanceData: mockPortfolioData.performanceData,
    };
    
    setPortfolioSummary(updatedSummary);
  };

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: Date.now().toString(),
    };
    
    const updatedInvestments = [...investments, newInvestment];
    setInvestments(updatedInvestments);
    localStorage.setItem('investmentAppInvestments', JSON.stringify(updatedInvestments));
  };

  const updateInvestment = (id: string, data: Partial<Investment>) => {
    const updatedInvestments = investments.map(inv => 
      inv.id === id ? { ...inv, ...data } : inv
    );
    
    setInvestments(updatedInvestments);
    localStorage.setItem('investmentAppInvestments', JSON.stringify(updatedInvestments));
  };

  const deleteInvestment = (id: string) => {
    const updatedInvestments = investments.filter(inv => inv.id !== id);
    setInvestments(updatedInvestments);
    localStorage.setItem('investmentAppInvestments', JSON.stringify(updatedInvestments));
  };

  const refreshPortfolioData = () => {
    // This would connect to a real API in a production app
    // For now, we'll just simulate updating the current prices
    const updatedInvestments = investments.map(inv => {
      // Apply a random price change between -3% and +3%
      const priceChange = inv.currentPrice * (0.97 + Math.random() * 0.06);
      return {
        ...inv,
        currentPrice: Number(priceChange.toFixed(2)),
      };
    });
    
    setInvestments(updatedInvestments);
    localStorage.setItem('investmentAppInvestments', JSON.stringify(updatedInvestments));
  };

  const value = {
    investments,
    portfolioSummary,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    refreshPortfolioData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}