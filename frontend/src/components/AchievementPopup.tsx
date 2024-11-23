import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import type { Achievement } from '../hooks/useAchievements';

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementPopup({ achievement, onClose }: Props) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 50, x: '-50%' }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-4 left-1/2 z-50"
      >
        <div className="glass-panel p-6 flex items-center space-x-4 min-w-[300px]">
          <div className="h-16 w-16 rounded-full bg-cyber-purple/20 flex items-center justify-center animate-pulse">
            <achievement.icon className="h-8 w-8 text-cyber-purple" />
          </div>
          <div className="flex-1">
            <h3 className="font-mono text-xl font-bold cyber-gradient mb-1">
              Achievement Unlocked!
            </h3>
            <p className="text-lg text-white/90 font-semibold mb-1">{achievement.title}</p>
            <p className="text-sm text-white/70">{achievement.description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}