import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  MessageSquareText, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  Briefcase 
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    // { 
    //   name: 'Portfolio', 
    //   path: '/portfolio', 
    //   icon: <Briefcase className="h-5 w-5" /> 
    // },
    { 
      name: 'AI Assistant', 
      path: '/chat', 
      icon: <MessageSquareText className="h-5 w-5" /> 
    },
    { 
      name: 'Market Insights', 
      path: '/market', 
      icon: <TrendingUp className="h-5 w-5" /> 
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: <BarChart3 className="h-5 w-5" />,
      soon: true
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 ease-in-out flex flex-col pt-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-lg
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                  transition-colors duration-200
                  ${item.soon ? 'opacity-50 pointer-events-none' : ''}
                `}
              >
                <div className="flex items-center">
                  {item.icon}
                  {!isCollapsed && (
                    <span className="ml-3 transition-opacity duration-200">
                      {item.name}
                      {item.soon && (
                        <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <PieChart className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;