import React from 'react';
import { Message } from '../types';
import { formatTimestamp } from '../utils';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      data-testid={`message-${message.id}`}
    >
      <div 
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl shadow-sm
          ${isUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white dark:bg-gray-800 rounded-bl-none border border-gray-200 dark:border-gray-700'
          }
        `}
      >
        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
          <span 
            className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}
          >
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;