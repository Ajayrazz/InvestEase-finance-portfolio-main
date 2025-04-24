import React from 'react';
import { ChatProvider } from '../../contexts/ChatContext';
import ChatContainer from '../ChatContainer';


function App() {
  return (
    <div className="min-h-screen justify-center  bg-gradient-to-br from-blue-50  to-indigo-50 dark:from-gray-950 dark:to-blue-950 flex flex-col">
      <div className="flex-1 container mx-auto p-4 mt-16 md:p-6 flex flex-col">
        <ChatProvider>
          <ChatContainer />
        </ChatProvider>
      </div>
      
    </div>
  );
}

export default App;