import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Youtube } from 'lucide-react';

export default function VideoInput() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle video URL submission
    console.log('Submitted URL:', url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-bold text-white mb-4 font-mono">
          Enhance Your Learning Experience
        </h2>
        <p className="text-white/70 mb-6">
          Enter a audio URL to get started with AI-powered summaries and interactive tools.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your audio URL here"
              className="input-primary pl-12"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Analyze Video</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}