import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import ChatAssistant from './pages/ChatAssistant';
import MarketInsights from './pages/MarketInsights';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const { theme } = useTheme();
  const { currentUser, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsInitialized(true);
    }, 1500);
  }, []);
  
  if (loading || !isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <div className={`${theme} min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Router>
        {currentUser && <Navbar />}
        <div className="flex">
          {currentUser && <Sidebar />}
          <main className="flex-1 transition-all duration-300 ease-in-out">
            <Routes>
              <Route path="/" element={currentUser ? <Dashboard /> : <Home />} />
              <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/portfolio" element={currentUser ? <Portfolio /> : <Navigate to="/login" />} />
              <Route path="/chat" element={currentUser ? <ChatAssistant /> : <Navigate to="/login" />} />
              <Route path="/market" element={currentUser ? <MarketInsights /> : <Navigate to="/login" />} />
              <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
        {currentUser && <Footer />}
      </Router>
    </div>
  );
}

export default App;