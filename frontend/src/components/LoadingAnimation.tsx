import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="glass-panel p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <Wand2 className="h-12 w-12 text-cyber-purple" />
          </motion.div>
          
          <h2 className="text-2xl font-bold cyber-gradient mb-4 text-center">
            Processing Your Request ....
          </h2>
          
          <div className="w-full max-w-xs bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/70 text-center"
          >
            Please wait while we process your file...
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}