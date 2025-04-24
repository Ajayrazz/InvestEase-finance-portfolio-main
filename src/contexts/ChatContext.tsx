import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message, ChatContextType } from '../types';
import { getChatResponse } from '../services/geminiService';
import { generateId } from '../utils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Get AI response
      const responseText = await getChatResponse(content);
      
      // Add AI message
      const assistantMessage: Message = {
        id: generateId(),
        content: responseText,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = (): void => {
    setMessages([]);
    setError(null);
  };

  const value: ChatContextType = {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}