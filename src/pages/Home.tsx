import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LineChart, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Take control of your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                financial future
              </span>
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10">
              Track, analyze, and optimize your investments with our powerful portfolio management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn btn-accent text-lg px-8 py-3 shadow-lg hover:shadow-accent-500/20"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="btn bg-white text-primary-800 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Smart Investors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to make informed investment decisions and grow your wealth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="p-8">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-5">
                  <LineChart className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Portfolio Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your investments in real-time with comprehensive analytics and performance metrics.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="p-8">
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mb-5">
                  <BarChart3 className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Advanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gain deep insights into your investment performance with detailed charts and analysis tools.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="p-8">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mb-5">
                  <TrendingUp className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Market Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay informed with the latest market trends, news, and insights tailored to your portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                AI-Powered Investment Assistant
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Get personalized investment advice and insights from our advanced AI assistant, powered by Gemini technology.
              </p>
              <ul className="space-y-4">
                {[
                  'Analyze your portfolio and identify optimization opportunities',
                  'Answer your investment questions in real-time',
                  'Provide market insights based on your holdings',
                  'Suggest potential investments aligned with your goals',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center mt-1 mr-3">
                      <ShieldCheck className="h-4 w-4 text-success-600 dark:text-success-400" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-primary-600 text-white">
                <h3 className="font-medium">Financial Assistant</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200">How can I optimize my current portfolio?</p>
                </div>
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Based on your current portfolio, I'd recommend increasing your exposure to defensive sectors as a hedge against market volatility. Your tech allocation is currently at 45%, which is slightly higher than optimal. Consider adding some dividend-paying stocks or bonds to balance your risk profile.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200">What are the best performing assets in my portfolio?</p>
                </div>
                <div className="flex items-center space-x-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="h-1 w-1 bg-primary-600 dark:bg-primary-400 rounded-full animate-ping"></span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI is analyzing your portfolio...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to transform your investment strategy?
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto mb-8">
              Join thousands of investors already using WealthVista to reach their financial goals
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 py-3 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-r-lg transition-colors duration-200">
                  Get Started
                </button>
              </div>
              <p className="text-primary-300 text-sm mt-3">
                Free to get started. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WealthVista</h3>
              <p className="text-gray-400">
                Empowering investors with the tools to build a brighter financial future.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WealthVista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;