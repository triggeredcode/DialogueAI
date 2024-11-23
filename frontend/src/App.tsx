import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Transcript from './pages/Transcript';
import Summaries from './pages/Summaries';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import AchievementPopup from './components/AchievementPopup';
import { useAchievements } from './hooks/useAchievements';

function App() {
  const { latestAchievement, setLatestAchievement } = useAchievements();

  return (
    <ThemeProvider>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
          <AchievementPopup 
            achievement={latestAchievement} 
            onClose={() => setLatestAchievement(null)} 
          />
        </motion.div>
      </Router>
    </ThemeProvider>
  );
}

export default App;