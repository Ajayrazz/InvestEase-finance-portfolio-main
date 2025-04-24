export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (message: string) => Promise<void>;
    clearMessages: () => void;
  }