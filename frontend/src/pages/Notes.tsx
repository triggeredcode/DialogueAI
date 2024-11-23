import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, Share2 } from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    // Listen for addNote events from the Summary page
    const handleAddNote = (event: CustomEvent<{ content: string }>) => {
      const newNote = {
        id: Date.now().toString(),
        content: event.detail.content,
        timestamp: new Date(),
      };
      setNotes(prev => [...prev, newNote]);
      unlockAchievement('first-note');
    };

    window.addEventListener('addNote', handleAddNote as EventListener);
    return () => window.removeEventListener('addNote', handleAddNote as EventListener);
  }, [unlockAchievement]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      content: '',
      timestamp: new Date(),
    };
    setNotes([...notes, newNote]);
    setEditingId(newNote.id);
    unlockAchievement('first-note');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content } : note
    ));
  };

  const shareNote = async (note: Note) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = note.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Note copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy note:', error);
      alert('Failed to copy note to clipboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 cyber-gradient">Smart Notes</h1>

        <div className="space-y-6">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-white/60">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(note.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit note"
                  >
                    <Edit2 className="h-4 w-4 text-cyber-blue" />
                  </button>
                  <button
                    onClick={() => shareNote(note)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Share2 className="h-4 w-4 text-cyber-purple" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              {editingId === note.id ? (
                <textarea
                  value={note.content}
                  onChange={(e) => updateNote(note.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                  className="w-full bg-transparent border-none outline-none resize-none min-h-[100px] text-white/90 placeholder-white/50"
                  placeholder="Start typing your notes..."
                />
              ) : (
                <div className="text-white/90 whitespace-pre-wrap">
                  {note.content || 'Empty note...'}
                </div>
              )}
            </motion.div>
          ))}

          <div className="flex space-x-4">
            <button
              onClick={addNote}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Note</span>
            </button>

            <button className="btn-primary flex items-center space-x-2">
              <Save className="h-5 w-5" />
              <span>Save All</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}