import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { mockMarketData } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

const MarketSummary = () => {
  const { indices, topGainers, topLosers } = mockMarketData;

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Summary</h2>
        <a 
          href="/market" 
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
        >
          <span className="mr-1">More</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {indices.map((index, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{index.name}</p>
            <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
              {index.value.toLocaleString()}
            </p>
            <div className={`flex items-center text-xs mt-1 ${
              index.changePercent >= 0 
                ? 'text-success-600 dark:text-success-500' 
                : 'text-error-600 dark:text-error-500'
            }`}>
              {index.changePercent >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              <span>{Math.abs(index.changePercent).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Gainers</h3>
          <div className="space-y-2">
            {topGainers.map((stock, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(stock.price)}
                  </p>
                  <div className="flex items-center justify-end text-xs text-success-600 dark:text-success-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    <span>{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Losers</h3>
          <div className="space-y-2">
            {topLosers.map((stock, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(stock.price)}
                  </p>
                  <div className="flex items-center justify-end text-xs text-error-600 dark:text-error-500">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;