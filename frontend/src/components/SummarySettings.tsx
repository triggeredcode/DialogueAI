import React from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
import type { SummaryConfig } from '../types/summary';
import { models, promptExamples } from '../types/summary';

interface Props {
  config: SummaryConfig;
  onChange: (config: SummaryConfig) => void;
}

export default function SummarySettings({ config, onChange }: Props) {
  const [showApiKey, setShowApiKey] = React.useState(false);

  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-mono mb-4 cyber-gradient">Summary Configuration</h3>
      
      <div className="space-y-6">
        {/* API Key */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={config.apiKey}
              onChange={(e) => onChange({ ...config, apiKey: e.target.value })}
              placeholder="Enter your API key"
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

        {/* Summary Type */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Summary Type
          </label>
          <select
            value={config.summary_type}
            onChange={(e) => onChange({ ...config, summary_type: e.target.value as 'basic' | 'custom' })}
            className="input-primary bg-white/5"
          >
            <option value="basic">Basic</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Transcript ID */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Transcript ID
          </label>
          <input
            value={config.transcriptId || ''}
            onChange={(e) => onChange({ ...config, transcriptId: e.target.value })}
            className="input-primary bg-white/5"
            placeholder="Enter your transcript ID"
          />
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Model
          </label>
          <select
            value={config.finalModel}
            onChange={(e) => onChange({ ...config, finalModel: e.target.value })}
            className="input-primary bg-white/5"
          >
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {config.summary_type === 'basic' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Prompt
              </label>
              <textarea
                value={config.prompt || ''}
                onChange={(e) => onChange({ ...config, prompt: e.target.value })}
                placeholder="Enter your prompt"
                className="input-primary min-h-[100px]"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-white/70">Example Prompts:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {promptExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => onChange({ ...config, prompt: example.prompt })}
                      className="text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-sm font-medium text-cyber-blue">{example.title}</p>
                      <p className="text-xs text-white/60 truncate">{example.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Temperature ({config.temperature?.toFixed(1)})
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature || 0.7}
                onChange={(e) => onChange({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>Random</span>
                <span>Deterministic</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Context
              </label>
              <textarea
                value={config.context?.happening || ''}
                onChange={(e) => onChange({
                  ...config,
                  context: { ...config.context, happening: e.target.value }
                })}
                placeholder="What's happening in the transcript?"
                className="input-primary min-h-[100px] mb-2"
              />
              <textarea
                value={config.context?.location || ''}
                onChange={(e) => onChange({
                  ...config,
                  context: { ...config.context, location: e.target.value }
                })}
                placeholder="Where is it happening?"
                className="input-primary min-h-[100px] mb-2"
              />
              <textarea
                value={config.context?.additional || ''}
                onChange={(e) => onChange({
                  ...config,
                  context: { ...config.context, additional: e.target.value }
                })}
                placeholder="Additional context..."
                className="input-primary min-h-[100px]"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Max Output Size (tokens)
          </label>
          <input
            type="number"
            value={config.maxOutputSize}
            onChange={(e) => onChange({ ...config, maxOutputSize: Math.min(4000, parseInt(e.target.value)) })}
            max={4000}
            className="input-primary"
          />
          <p className="text-xs text-white/60 mt-1">Maximum: 4000 tokens</p>
        </div>
      </div>
    </div>
  );
}