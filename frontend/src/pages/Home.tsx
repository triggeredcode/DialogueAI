import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Wand2, Sparkles, Brain, Zap } from 'lucide-react';
import Features from '../components/Features';
import { useAchievements } from '../hooks/useAchievements';

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        d="M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f6ff" />
          <stop offset="100%" stopColor="#915eff" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#915eff" />
          <stop offset="100%" stopColor="#ff49db" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const FloatingIcons = () => {
  const iconVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        variants={iconVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4"
      >
        {/* <Wand2 className="h-8 w-8 text-cyber-blue opacity-50" /> */}
      </motion.div>
      <motion.div
        variants={iconVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-1/3 right-1/4"
      >
        {/* <Sparkles className="h-8 w-8 text-cyber-purple opacity-50" /> */}
      </motion.div>
      <motion.div
        variants={iconVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute bottom-1/3 left-1/3"
      >
        {/* <Brain className="h-8 w-8 text-cyber-pink opacity-50" /> */}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    // Unlock first visit achievement when component mounts
    unlockAchievement('first-visit');
  }, [unlockAchievement]);

  return (
    <main className="relative min-h-screen">
      <WaveBackground />
      <FloatingIcons />
      
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-6"
          >
            <Zap className="h-12 w-12 text-cyber-blue mr-4" />
            <h1 className="text-6xl font-bold cyber-gradient font-mono">
              DialogueAI
            </h1>
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-6 cyber-gradient font-mono">
            <TypeAnimation
              sequence={[
                'Transform Audio',
                2000,
                'Into Insights',
                2000,
                'Into Knowledge',
                2000,
              ]}
              repeat={Infinity}
            />
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/80 max-w-3xl mx-auto font-sans"
          >
            Harness the power of AI to transcribe, analyze, and extract meaningful insights 
            from any audio content. Experience intelligent summarization and interactive 
            exploration of your audio files.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex justify-center space-x-4"
          >
            <a
              href="/transcript"
              className="btn-primary"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="btn-primary bg-white/10 hover:bg-white/20"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        <div id="features">
          <Features />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold cyber-gradient mb-4">
            Ready to Transform Your Audio?
          </h2>
          <p className="text-white/70 mb-8">
            Join thousands of users who are already unlocking the power of their audio content.
          </p>
          <a href="/transcript" className="btn-primary">
            Start For Free
          </a>
        </motion.div>
      </div>
    </main>
  );
}