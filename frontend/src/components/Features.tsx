import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Brain, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Quote,
    title: 'Smart Transcript',
    description: 'Get accurate transcriptions powered by AssemblyAI.',
    path: '/transcript'
  },
  {
    icon: FileText,
    title: 'Smart Summary',
    description: 'Generate insightful summaries with LeMUR.',
    path: '/summaries'
  },
  {
    icon: MessageSquare,
    title: 'Interactive Chat',
    description: 'Engage with content using LeMUR-powered chat.',
    path: '/chat'
  },
  {
    icon: Brain,
    title: 'Adaptive Quiz',
    description: 'Test your knowledge with AI-generated quizzes.',
    path: '/quiz',
    comingSoon: true
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="feature-card relative"
        >
          <Link to={feature.path} className="block h-full">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-cyber-purple/20">
              <feature.icon className="h-6 w-6 text-cyber-blue" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 font-mono">
              {feature.title}
            </h3>
            <p className="text-white/60">
              {feature.description}
            </p>
            {feature.comingSoon && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-cyber-purple/20 rounded-full text-xs text-cyber-purple">
                Coming Soon
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}