import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain } from 'lucide-react';

export default function Quiz() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 text-center"
      >
        <div className="mb-8">
          <Brain className="h-16 w-16 mx-auto text-cyber-purple mb-4" />
          <h1 className="text-4xl font-bold cyber-gradient mb-4">Coming Soon!</h1>
          <p className="text-xl text-white/70 mb-6">
            Our adaptive quiz feature is currently under development and will be available in the future upgrade.
          </p>
        </div>
        
        <div className="glass-panel p-6 max-w-2xl mx-auto">
          <Rocket className="h-8 w-8 text-cyber-blue mx-auto mb-4" />
          <h2 className="text-2xl font-mono mb-4">What to Expect</h2>
          <ul className="text-left space-y-3 text-white/80">
            <li>• AI-powered quiz generation based on content</li>
            <li>• Adaptive difficulty levels</li>
            <li>• Real-time feedback and explanations</li>
            <li>• Progress tracking and analytics</li>
            <li>• Custom quiz creation tools</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}