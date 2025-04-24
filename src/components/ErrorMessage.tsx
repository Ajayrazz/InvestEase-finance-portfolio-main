import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 dark:bg-red-900/20 dark:border-red-700">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700 dark:text-red-400">{message}</p>
        </div>
        <button 
          onClick={onDismiss}
          className="ml-auto -mr-1 -mt-1 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <span className="text-xl">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;