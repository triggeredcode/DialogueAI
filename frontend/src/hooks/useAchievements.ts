import { useState, useEffect, useCallback } from 'react';
import { Award, Rocket, Brain, Coffee, Upload, MessageSquare, PenTool, Trophy } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-visit',
    title: 'Welcome Explorer!',
    description: 'Started your learning journey',
    icon: Rocket,
    unlocked: false
  },
  {
    id: 'first-upload',
    title: 'Content Creator',
    description: 'Uploaded your first video or audio file',
    icon: Upload,
    unlocked: false
  },
  {
    id: 'first-summary',
    title: 'Knowledge Seeker',
    description: 'Generated your first video summary',
    icon: Brain,
    unlocked: false
  },
  {
    id: 'first-chat',
    title: 'Conversation Starter',
    description: 'Started your first interactive chat',
    icon: MessageSquare,
    unlocked: false
  },
  {
    id: 'first-note',
    title: 'Note Taker',
    description: 'Created your first note',
    icon: PenTool,
    unlocked: false
  },
  {
    id: 'quiz-complete',
    title: 'Quiz Master',
    description: 'Completed your first quiz',
    icon: Trophy,
    unlocked: false
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Visited during launch week',
    icon: Coffee,
    unlocked: false
  }
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });
  
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        const newAchievements = prev.map(a => 
          a.id === id ? { ...a, unlocked: true } : a
        );
        setLatestAchievement({ ...achievement, unlocked: true });
        return newAchievements;
      }
      return prev;
    });
  }, []);

  // Check for early bird achievement
  useEffect(() => {
    const launchEndDate = new Date('2024-03-31');
    if (new Date() <= launchEndDate) {
      setTimeout(() => unlockAchievement('early-bird'), 2000);
    }
  }, [unlockAchievement]);

  return {
    achievements,
    latestAchievement,
    unlockAchievement,
    setLatestAchievement
  };
}