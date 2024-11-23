import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import PremiumFeature from '../components/PremiumFeature';
export default function Chat() {
  const [message, setMessage] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !transcriptId.trim()) return;

    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');
    
    // Simulate AI response using LeMUR
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm analyzing the transcript to provide you with a detailed response...",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel min-h-[600px] flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-mono cyber-gradient">Interactive Chat</h1>
            <div className="text-white/60 font-mono">Powered by LeMUR</div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={transcriptId}
              onChange={(e) => setTranscriptId(e.target.value)}
              placeholder="Enter transcript ID"
              className="input-primary"
            />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  msg.isUser
                    ? 'bg-cyber-purple/20 ml-auto'
                    : 'bg-white/5'
                }`}
              >
                <p className="text-white/90">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the transcript content..."
              className="input-primary pr-12"
              disabled={!transcriptId}
            />
            <button
              type="submit"
              disabled={!transcriptId}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyber-blue hover:text-cyber-purple transition-colors disabled:opacity-50"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}