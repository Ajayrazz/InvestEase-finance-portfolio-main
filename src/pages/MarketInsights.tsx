import { useEffect, useState } from 'react';
import { mockMarketData } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Calendar, Search } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const MarketInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState(mockMarketData.news);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = mockMarketData.news.filter(
        item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(mockMarketData.news);
    }
  }, [searchQuery]);

  const tabs = [
    { id: 'overview', label: 'Market Overview' },
    { id: 'news', label: 'Financial News' },
    { id: 'watchlist', label: 'Watchlist', disabled: true },
    { id: 'calendar', label: 'Economic Calendar', disabled: true },
  ];

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Market Insights
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Stay updated with the latest market trends and news
        </p>
      </div>

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={tab.disabled}
            >
              {tab.label}
              {tab.disabled && (
                <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-1.5 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMarketData.indices.map((index, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{index.name}</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {index.value.toLocaleString()}
                  </p>
                  <div className={`ml-2 flex items-center text-sm ${
                    index.changePercent >= 0 
                      ? 'text-success-600 dark:text-success-500' 
                      : 'text-error-600 dark:text-error-500'
                  }`}>
                    {index.changePercent >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-0.5" />
                    )}
                    <span>{Math.abs(index.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {index.changePercent >= 0 ? '+' : ''}{index.change.toFixed(2)} today
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Gainers</h3>
              <div className="space-y-4">
                {mockMarketData.topGainers.map((stock, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                    <div>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {formatCurrency(stock.price)}
                      </p>
                      <div className="flex items-center justify-end text-sm text-success-600 dark:text-success-500">
                        <ArrowUpRight className="h-4 w-4 mr-0.5" />
                        <span>{stock.changePercent.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Losers</h3>
              <div className="space-y-4">
                {mockMarketData.topLosers.map((stock, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                    <div>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {formatCurrency(stock.price)}
                      </p>
                      <div className="flex items-center justify-end text-sm text-error-600 dark:text-error-500">
                        <ArrowDownRight className="h-4 w-4 mr-0.5" />
                        <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cryptocurrency Market</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockMarketData.cryptoMarket.map((crypto, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{crypto.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                        {formatCurrency(crypto.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className={`inline-flex items-center text-sm ${
                          crypto.changePercent >= 0 
                            ? 'text-success-600 dark:text-success-500' 
                            : 'text-error-600 dark:text-error-500'
                        }`}>
                          {crypto.changePercent >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-0.5" />
                          )}
                          <span>{Math.abs(crypto.changePercent).toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'news' && (
        <div>
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search financial news..."
                className="pl-10 pr-4 py-2 w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((article) => (
                <div key={article.id} className="card p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{article.source}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                    >
                      <span className="mr-1">Read full article</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No news articles found matching your search</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketInsights;