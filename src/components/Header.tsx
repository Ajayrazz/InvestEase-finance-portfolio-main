import React from 'react';
import { MessagesSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
          <MessagesSquare size={20} />
        </div>
        <h1 className="ml-3 font-semibold text-xl dark:text-white">InvestEase Chat</h1>
      </div>
      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
        investEase bot
      </span>
    </header>
  );
};

export default Header;