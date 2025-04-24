import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, Bell, Settings, Moon, Sun, LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/portfolio':
        return 'Portfolio';
      case '/chat':
        return 'AI Assistant';
      case '/market':
        return 'Market Insights';
      case '/profile':
        return 'Profile Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">
                InvestEase
                </span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {getPageTitle()}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-1.5 pl-9 pr-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-40 transition-all duration-300 focus:w-56"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            
            <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-500"></span>
            </button>

            <button 
              onClick={toggleTheme} 
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary-500">
                  <img 
                    src={currentUser?.profileImage || "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }} 
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)} 
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 pt-2 pb-3 px-2 shadow-lg animate-slide-down">
          <div className="px-3 py-2 text-lg font-semibold text-gray-800 dark:text-white">
            {getPageTitle()}
          </div>
          <div className="flex justify-between mt-3 px-3">
            <div className="relative flex-1 mr-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-9 pr-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-500"></span>
            </button>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ml-2"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-3 py-2">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-500">
                <img 
                  src={currentUser?.profileImage || "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800 dark:text-white">{currentUser?.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</div>
              </div>
            </div>
            <Link 
              to="/profile" 
              className="block px-3 py-2 mt-1 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </div>
            </Link>
            <button 
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }} 
              className="w-full text-left px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;