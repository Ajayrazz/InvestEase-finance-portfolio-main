import ChatInterface from '../components/chat/ChatInterface';

const ChatAssistant = () => {
  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Investment Assistant
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Get personalized investment advice and insights
        </p>
      </div>

      <div className=" h-[100%] max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatAssistant;