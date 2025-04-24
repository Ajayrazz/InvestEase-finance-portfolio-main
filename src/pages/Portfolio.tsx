import { useState } from 'react';
import InvestmentTable from '../components/portfolio/InvestmentTable';
import AllocationChart from '../components/portfolio/AllocationChart';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('assets');

  const tabs = [
    { id: 'assets', label: 'Assets' },
    { id: 'allocation', label: 'Allocation' },
    { id: 'performance', label: 'Performance', disabled: true },
    { id: 'history', label: 'History', disabled: true },
  ];

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Portfolio
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Manage and track your investments
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

      {activeTab === 'assets' && (
        <div>
          <InvestmentTable />
        </div>
      )}

      {activeTab === 'allocation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AllocationChart />
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Diversification Analysis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Portfolio Balance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your portfolio has a good balance across different asset classes, with a slight overweight in stocks (45%) and technology sector (35%). Consider adding more bonds or defensive assets for better diversification.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Risk Profile</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-warning-500" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Your current allocation indicates a moderately aggressive risk profile. This aligns with a growth-oriented strategy suitable for long-term investors with a high risk tolerance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Recommendations</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mr-2">1</span>
                    Consider increasing bond allocation by 5-10% to reduce portfolio volatility
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mr-2">2</span>
                    Diversify within your stock holdings across more sectors
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mr-2">3</span>
                    Add some international exposure to capture global growth opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;