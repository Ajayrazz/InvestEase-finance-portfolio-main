import { useTheme } from '../../contexts/ThemeContext';

const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme} fixed inset-0 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mb-6">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">
        InvestEase
        </span>
      </div>
      <div className="relative mb-6">
        <div className="dot-flashing"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading your financial future...</p>
    </div>
  );
};

export default LoadingScreen;