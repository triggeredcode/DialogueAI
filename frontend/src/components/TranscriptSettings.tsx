import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Info } from 'lucide-react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { SpeechSettings, AudioIntelligence, summaryModelConfig } from '../types/transcript';

interface Props {
  apiKey: string;
  setApiKey: (key: string) => void;
  speechSettings: SpeechSettings;
  setSpeechSettings: (settings: SpeechSettings) => void;
  audioIntelligence: AudioIntelligence;
  setAudioIntelligence: (settings: AudioIntelligence) => void;
  audioDuration: number;
}

export default function TranscriptSettings({
  apiKey,
  setApiKey,
  speechSettings,
  setSpeechSettings,
  audioIntelligence,
  setAudioIntelligence,
  audioDuration
}: Props) {
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [wordBoostInput, setWordBoostInput] = React.useState('');

  const handleWordBoostAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && wordBoostInput.trim()) {
      setSpeechSettings({
        ...speechSettings,
        word_boost: [...speechSettings.word_boost, wordBoostInput.trim()]
      });
      setWordBoostInput('');
    }
  };

  const removeWordBoost = (word: string) => {
    setSpeechSettings({
      ...speechSettings,
      word_boost: speechSettings.word_boost.filter(w => w !== word)
    });
  };

  return (
    <div className="space-y-8">
      {/* API Configuration */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-mono mb-4 cyber-gradient">API Configuration</h3>
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your AssemblyAI API key"
            className="input-primary pr-12"
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showApiKey ? (
              <EyeOff className="h-5 w-5 text-white/60" />
            ) : (
              <Eye className="h-5 w-5 text-white/60" />
            )}
          </button>
        </div>
      </div>

      {/* Speech to Text Settings */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-mono mb-4 cyber-gradient">Speech to Text Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Speech Model
            </label>
            <select
              value={speechSettings.speech_model}
              onChange={(e) => setSpeechSettings({
                ...speechSettings,
                speech_model: e.target.value as SpeechSettings['speech_model']
              })}
              className="input-primary"
            >
              <option value="best">Best</option>
              <option value="nano">Nano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Word Boost
            </label>
            <input
              type="text"
              value={wordBoostInput}
              onChange={(e) => setWordBoostInput(e.target.value)}
              onKeyDown={handleWordBoostAdd}
              placeholder="Press Enter to add words"
              className="input-primary"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {speechSettings.word_boost.map((word) => (
                <span
                  key={word}
                  className="px-2 py-1 rounded-lg bg-cyber-purple/20 text-sm flex items-center"
                >
                  {word}
                  <button
                    onClick={() => removeWordBoost(word)}
                    className="ml-2 text-white/60 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Filter Profanity
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={speechSettings.filter_profanity}
                  onChange={() => setSpeechSettings({
                    ...speechSettings,
                    filter_profanity: true
                  })}
                  className="form-radio text-cyber-purple"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!speechSettings.filter_profanity}
                  onChange={() => setSpeechSettings({
                    ...speechSettings,
                    filter_profanity: false
                  })}
                  className="form-radio text-cyber-purple"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Audio Range (ms)
            </label>
            <RangeSlider
              value={[speechSettings.audio_start_from, speechSettings.audio_end_at]}
              onInput={([start, end]) => setSpeechSettings({
                ...speechSettings,
                audio_start_from: start,
                audio_end_at: end
              })}
              min={0}
              max={audioDuration}
              step={1000}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>{speechSettings.audio_start_from}ms</span>
              <span>{speechSettings.audio_end_at}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Intelligence */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-mono mb-4 cyber-gradient">Audio Intelligence</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={audioIntelligence.summarization}
                onChange={(e) => setAudioIntelligence({
                  ...audioIntelligence,
                  summarization: e.target.checked
                })}
                className="form-checkbox text-cyber-purple"
              />
              <span>Enable Summarization</span>
            </label>
          </div>

          {audioIntelligence.summarization && (
            <>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Summary Model
                </label>
                <select
                  value={audioIntelligence.summary_model}
                  onChange={(e) => setAudioIntelligence({
                    ...audioIntelligence,
                    summary_model: e.target.value as AudioIntelligence['summary_model']
                  })}
                  className="input-primary"
                >
                  <option value="informative">Informative</option>
                  <option value="conversational">Conversational</option>
                  <option value="catchy">Catchy</option>
                </select>
                <div className="mt-2 p-3 rounded-lg bg-white/5 text-sm text-white/70">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{summaryModelConfig[audioIntelligence.summary_model].when_to_use}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Summary Type
                </label>
                <select
                  value={audioIntelligence.summary_type}
                  onChange={(e) => setAudioIntelligence({
                    ...audioIntelligence,
                    summary_type: e.target.value as AudioIntelligence['summary_type']
                  })}
                  className="input-primary"
                >
                  
                  { summaryModelConfig[audioIntelligence.summary_model].supported_summary_types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}