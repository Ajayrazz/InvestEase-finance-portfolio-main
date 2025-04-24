import { useState, useMemo } from 'react';
import { usePortfolio, Investment } from '../../contexts/PortfolioContext';
import { ArrowUpRight, ArrowDownRight, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import InvestmentForm from './InvestmentForm';

const InvestmentTable = () => {
  const { investments, deleteInvestment, refreshPortfolioData } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Investment | 'profit' | 'profitPercentage';
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isAddingInvestment, setIsAddingInvestment] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  
  // Filter and sort investments
  const filteredInvestments = useMemo(() => {
    let result = [...investments];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        inv => 
          inv.name.toLowerCase().includes(query) || 
          inv.symbol.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filterType) {
      result = result.filter(inv => inv.type === filterType);
    }
    
    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;
        
        if (sortConfig.key === 'profit') {
          aValue = (a.currentPrice - a.purchasePrice) * a.shares;
          bValue = (b.currentPrice - b.purchasePrice) * b.shares;
        } else if (sortConfig.key === 'profitPercentage') {
          aValue = ((a.currentPrice - a.purchasePrice) / a.purchasePrice) * 100;
          bValue = ((b.currentPrice - b.purchasePrice) / b.purchasePrice) * 100;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [investments, searchQuery, filterType, sortConfig]);
  
  const handleSort = (key: keyof Investment | 'profit' | 'profitPercentage') => {
    setSortConfig(prev => {
      if (prev && prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return {
        key,
        direction: 'asc'
      };
    });
  };
  
  const getSortIndicator = (key: keyof Investment | 'profit' | 'profitPercentage') => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const investmentTypes = ['stock', 'crypto', 'etf', 'mutualFund', 'bond'];
  
  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment);
  };
  
  const handleFormClose = () => {
    setIsAddingInvestment(false);
    setEditingInvestment(null);
  };
  
  const calculateProfit = (investment: Investment) => {
    return (investment.currentPrice - investment.purchasePrice) * investment.shares;
  };
  
  const calculateProfitPercentage = (investment: Investment) => {
    return ((investment.currentPrice - investment.purchasePrice) / investment.purchasePrice) * 100;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
            Your Investments
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => refreshPortfolioData()}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span>Refresh Prices</span>
            </button>
            <button
              onClick={() => setIsAddingInvestment(true)}
              className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Add Investment</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search investments..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              value={filterType || ''}
              onChange={(e) => setFilterType(e.target.value || null)}
              className="pl-10 pr-8 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 appearance-none"
            >
              <option value="">All Types</option>
              {investmentTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {getSortIndicator('name')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('type')}
              >
                Type {getSortIndicator('type')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('shares')}
              >
                Shares {getSortIndicator('shares')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('purchasePrice')}
              >
                Buy Price {getSortIndicator('purchasePrice')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('currentPrice')}
              >
                Current Price {getSortIndicator('currentPrice')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('profit')}
              >
                Profit/Loss {getSortIndicator('profit')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('profitPercentage')}
              >
                % Change {getSortIndicator('profitPercentage')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredInvestments.map((investment) => {
              const profit = calculateProfit(investment);
              const profitPercentage = calculateProfitPercentage(investment);
              const isProfitable = profit >= 0;
              
              return (
                <tr key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: investment.color || '#3B82F6' }}></div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{investment.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{investment.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white capitalize">{investment.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(new Date(investment.purchaseDate))}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {investment.shares.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(investment.purchasePrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(investment.currentPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      isProfitable 
                        ? 'text-success-600 dark:text-success-500' 
                        : 'text-error-600 dark:text-error-500'
                    }`}>
                      {formatCurrency(profit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium flex items-center ${
                      isProfitable 
                        ? 'text-success-600 dark:text-success-500' 
                        : 'text-error-600 dark:text-error-500'
                    }`}>
                      {isProfitable ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(profitPercentage).toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditInvestment(investment)}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteInvestment(investment.id)}
                        className="text-error-600 hover:text-error-800 dark:text-error-400 dark:hover:text-error-300 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredInvestments.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  No investments found. Try adjusting your search or add a new investment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Investment Modal */}
      {(isAddingInvestment || editingInvestment) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 m-4 animate-scale-in">
            <InvestmentForm 
              investment={editingInvestment}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentTable;