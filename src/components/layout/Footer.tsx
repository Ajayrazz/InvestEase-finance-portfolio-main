import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:order-2 space-x-6">
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            Terms
          </a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            Privacy
          </a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            Help
          </a>
        </div>
        <div className="mt-4 md:mt-0 md:order-1 flex items-center justify-center">
          <p>
            Built with <Heart className="h-4 w-4 inline-block text-error-500 mx-1" /> by Ajay Razz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;