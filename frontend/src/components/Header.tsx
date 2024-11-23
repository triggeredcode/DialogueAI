import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/transcript', label: 'Smart Transcript' },
  { path: '/summaries', label: 'Smart Summary' },
  { path: '/chat', label: 'Interactive Chat' },
  { path: '/quiz', label: 'Adaptive Quiz', comingSoon: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="relative z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-cyber-blue" />
            <span className="text-xl font-bold cyber-gradient">DialogueAI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-cyber-blue'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-cyber-blue"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="flex items-center space-x-1">
                  <span>{item.label}</span>
                  {item.comingSoon && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-cyber-purple/20 rounded-full text-cyber-purple">
                      Soon
                    </span>
                  )}
                </span>
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/70 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-black/20 backdrop-blur-lg"
      >
        <nav className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-cyber-purple/20 text-cyber-blue'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{item.label}</span>
                {item.comingSoon && (
                  <span className="text-xs px-2 py-0.5 bg-cyber-purple/20 rounded-full text-cyber-purple">
                    Coming Soon
                  </span>
                )}
              </span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}