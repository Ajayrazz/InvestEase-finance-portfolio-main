import { ArrowUpRight, ArrowDownRight, TrendingUp, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatCurrency } from '../../utils/formatters';

const PortfolioSummary = () => {
  const { portfolioSummary, refreshPortfolioData } = usePortfolio();

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Summary</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => refreshPortfolioData()}
            className="p-1.5 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <TrendingUp className="h-5 w-5" />
          </button>
          <Link 
            to="/portfolio"
            className="p-1.5 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <PieChart className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Value</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
              {formatCurrency(portfolioSummary.totalValue)}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Gain/Loss</p>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold mr-2 ${
              portfolioSummary.totalGain >= 0 
                ? 'text-success-600 dark:text-success-500' 
                : 'text-error-600 dark:text-error-500'
            }`}>
              {formatCurrency(portfolioSummary.totalGain)}
            </span>
            <span className={`text-sm flex items-center ${
              portfolioSummary.totalGainPercentage >= 0 
                ? 'text-success-600 dark:text-success-500' 
                : 'text-error-600 dark:text-error-500'
            }`}>
              {portfolioSummary.totalGainPercentage >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-0.5" />
              )}
              {Math.abs(portfolioSummary.totalGainPercentage).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Allocation</p>
        <div className="space-y-2">
          {portfolioSummary.allocationByType.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-baseline min-w-[120px]">
                <span className="text-xs text-gray-600 dark:text-gray-300 capitalize">{item.type}</span>
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;