import { ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

const RecentActivity = () => {
  // Mock recent activity data
  const activities = [
    {
      id: 1,
      type: 'purchase',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      amount: 1500.75,
      shares: 10,
      price: 150.75,
      date: new Date(2023, 11, 15),
    },
    {
      id: 2,
      type: 'dividend',
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      amount: 25.20,
      date: new Date(2023, 11, 10),
    },
    {
      id: 3,
      type: 'sale',
      name: 'Tesla, Inc.',
      symbol: 'TSLA',
      amount: 890.50,
      shares: 5,
      price: 178.10,
      date: new Date(2023, 11, 5),
    },
    {
      id: 4,
      type: 'deposit',
      amount: 2000,
      date: new Date(2023, 11, 1),
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownRight className="h-4 w-4 text-success-500" />;
      case 'sale':
        return <ArrowUpRight className="h-4 w-4 text-error-500" />;
      case 'dividend':
        return <ArrowDownRight className="h-4 w-4 text-accent-500" />;
      case 'deposit':
        return <ArrowDownRight className="h-4 w-4 text-primary-500" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityTitle = (activity: any) => {
    switch (activity.type) {
      case 'purchase':
        return `Purchased ${activity.shares} shares of ${activity.symbol}`;
      case 'sale':
        return `Sold ${activity.shares} shares of ${activity.symbol}`;
      case 'dividend':
        return `Dividend received from ${activity.symbol}`;
      case 'deposit':
        return 'Deposit to account';
      default:
        return 'Activity';
    }
  };

  const getActivityDescription = (activity: any) => {
    switch (activity.type) {
      case 'purchase':
        return `at ${formatCurrency(activity.price)} per share`;
      case 'sale':
        return `at ${formatCurrency(activity.price)} per share`;
      case 'dividend':
        return `Quarterly dividend payment`;
      case 'deposit':
        return `Funds added to your account`;
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {getActivityTitle(activity)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getActivityDescription(activity)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {formatDate(activity.date)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(activity.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;