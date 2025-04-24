import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onClearChat: () => void;
  isLoading: boolean;
}

const MAX_CHARS = 500;

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onClearChat,
  isLoading 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const charCount = message.length;
  const isOverLimit = charCount > MAX_CHARS;
  
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`w-full border ${isOverLimit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
              rounded-lg py-3 px-4 pr-12 resize-none focus:outline-none focus:ring-2 
              focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
            rows={1}
            disabled={isLoading}
            aria-label="Message input"
          />
          <button
            type="submit"
            className={`absolute right-2 bottom-2 p-2 rounded-full 
              ${message.trim() && !isLoading
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
              } 
              transition-colors duration-200`}
            disabled={!message.trim() || isLoading}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        
        <div className="flex justify-between items-center px-1">
          <button
            type="button"
            onClick={onClearChat}
            className="text-gray-500 hover:text-red-500 flex items-center text-sm transition-colors duration-200"
            aria-label="Clear chat"
          >
            <Trash2 size={16} className="mr-1" />
            <span>Clear chat</span>
          </button>
          
          <div className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{MAX_CHARS}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;