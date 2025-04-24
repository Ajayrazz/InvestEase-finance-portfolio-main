import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useAuth } from '../contexts/AuthContext';

// Components
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import MarketSummary from '../components/dashboard/MarketSummary';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { portfolioSummary, refreshPortfolioData } = usePortfolio();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      refreshPortfolioData();
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="dot-flashing mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Here's a summary of your portfolio
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <button
              onClick={handleRefresh}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              <span>Refresh</span>
            </button>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <PortfolioSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MarketSummary />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;