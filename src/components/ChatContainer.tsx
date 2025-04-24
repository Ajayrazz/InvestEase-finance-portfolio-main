import React from 'react';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ErrorMessage from './ErrorMessage';

const ChatContainer: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  return (
    <div className="flex flex-col h-[100%] max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <Header />
      
      <div className="flex-1 overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-900">
        {error && (
          <div className="px-4 pt-4">
            <ErrorMessage 
              message={error} 
              onDismiss={() => {}} // Error will be cleared on next successful message
            />
          </div>
        )}
        
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
        />
        
        <ChatInput 
          onSendMessage={sendMessage} 
          onClearChat={clearMessages}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatContainer;