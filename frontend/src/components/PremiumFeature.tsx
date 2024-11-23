import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X } from 'lucide-react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function PremiumFeature({ isVisible, onClose }: Props) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel p-8 max-w-md w-full mx-4"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-white/70" />
              </button>
            </div>

            <div className="text-center">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold cyber-gradient mb-4">
                Premium Feature
              </h2>
              <p className="text-white/70 mb-6">
                This feature is coming soon! Get ready for an enhanced experience with our premium features.
              </p>
              <button
                onClick={onClose}
                className="btn-primary bg-gradient-to-r from-yellow-400 to-yellow-600"
              >
                Coming Soon
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}