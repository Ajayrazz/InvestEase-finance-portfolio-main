import { useState, useEffect } from 'react';
import { usePortfolio, Investment } from '../../contexts/PortfolioContext';
import { X } from 'lucide-react';

interface InvestmentFormProps {
  investment: Investment | null;
  onClose: () => void;
}

const InvestmentForm = ({ investment, onClose }: InvestmentFormProps) => {
  const { addInvestment, updateInvestment } = usePortfolio();
  const [formState, setFormState] = useState<Omit<Investment, 'id'>>({
    name: '',
    symbol: '',
    type: 'stock',
    shares: 0,
    purchasePrice: 0,
    currentPrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    notes: '',
    color: '#3B82F6',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Investment, 'id'>, string>>>({});

  useEffect(() => {
    if (investment) {
      setFormState({
        name: investment.name,
        symbol: investment.symbol,
        type: investment.type,
        shares: investment.shares,
        purchasePrice: investment.purchasePrice,
        currentPrice: investment.currentPrice,
        purchaseDate: investment.purchaseDate.split('T')[0],
        notes: investment.notes || '',
        color: investment.color || '#3B82F6',
      });
    }
  }, [investment]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Omit<Investment, 'id'>, string>> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    }
    
    if (formState.shares <= 0) {
      newErrors.shares = 'Shares must be greater than 0';
    }
    
    if (formState.purchasePrice <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }
    
    if (formState.currentPrice <= 0) {
      newErrors.currentPrice = 'Current price must be greater than 0';
    }
    
    if (!formState.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (investment) {
      updateInvestment(investment.id, formState);
    } else {
      addInvestment(formState);
    }
    
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const investmentTypes = [
    { value: 'stock', label: 'Stock' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'etf', label: 'ETF' },
    { value: 'mutualFund', label: 'Mutual Fund' },
    { value: 'bond', label: 'Bond' },
  ];
  
  const colorOptions = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#EF4444', // red
    '#6366F1', // indigo
    '#14B8A6', // teal
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {investment ? 'Edit Investment' : 'Add Investment'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Investment Type
            </label>
            <select
              name="type"
              value={formState.type}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {investmentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Apple Inc."
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Symbol
              </label>
              <input
                type="text"
                name="symbol"
                value={formState.symbol}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="AAPL"
              />
              {errors.symbol && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.symbol}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Shares/Units
              </label>
              <input
                type="number"
                name="shares"
                value={formState.shares}
                onChange={handleChange}
                step="any"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.shares && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.shares}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formState.purchaseDate}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.purchaseDate && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.purchaseDate}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purchase Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formState.purchasePrice}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full pl-8 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              {errors.purchasePrice && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.purchasePrice}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  name="currentPrice"
                  value={formState.currentPrice}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full pl-8 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              {errors.currentPrice && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">{errors.currentPrice}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform ${
                    formState.color === color ? 'transform scale-110 ring-2 ring-offset-2 ring-gray-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formState.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Optional notes about this investment"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {investment ? 'Update' : 'Add'} Investment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;