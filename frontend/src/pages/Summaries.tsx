import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Youtube, Code } from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';
import SummarySettings from '../components/SummarySettings';
import CodeEditor from '../components/CodeEditor';
import type { SummaryConfig, CodeGeneration } from '../types/summary';
import { defaultModel } from '../types/summary';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

import LoadingAnimation from '../components/LoadingAnimation';

const languages: CodeGeneration['language'][] = ['python', 'typescript', 'go', 'java', 'csharp', 'ruby'];

export default function Summaries() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<CodeGeneration['language']>('typescript');
  const [generatedCode, setGeneratedCode] = useState<Record<CodeGeneration['language'], string>>({
    python: '',
    typescript: '',
    go: '',
    java: '',
    csharp: '',
    ruby: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const [config, setConfig] = useState<SummaryConfig>({
    summary_type: 'basic',
    apiKey: '',
    finalModel: defaultModel,
    maxOutputSize: 4000,
    answerFormat: 'text',
    transcriptId: '',
    prompt: '',
    temperature: 0.7,
    context: {
      happening: '',
      location: '',
      additional: ''
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { unlockAchievement } = useAchievements();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      setFile(file);
      unlockAchievement('first-upload');
    } else {
      alert('Please upload only video or audio files');
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // Simulate summary generation

    setSummary('');
    try {
      const myurl = `${baseUrl}/summary`;
      const result = await axios.post(myurl, {
        config : config
      });

      if (result.data.status === 'error') {
        throw new Error(result.data.error);
      }
      else{
        console.log(result.data);
        setSummary(result.data.summary);

         // Simulate code generation for each language
      const sampleCode = {
        python: '# Python implementation\ndef process_summary(text):\n    return text.upper()',
        typescript: result.data.codeSnippet,
        go: '// Go implementation\nfunc processSummary(text string) string {\n    return strings.ToUpper(text)\n}',
        java: '// Java implementation\npublic class SummaryProcessor {\n    public String processSummary(String text) {\n        return text.toUpperCase();\n    }\n}',
        csharp: '// C# implementation\npublic class SummaryProcessor {\n    public string ProcessSummary(string text) {\n        return text.ToUpper();\n    }\n}',
        ruby: '# Ruby implementation\ndef process_summary(text)\n    text.upcase\nend'
      };
      
      setGeneratedCode(sampleCode);
    }
    } catch (error:any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

    // setSummary('This is a sample summary generated using the specified configuration...');
    unlockAchievement('first-summary');

   
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold cyber-gradient">Smart Summary</h1>
          <div className="text-white/60 font-mono">Powered by LeMUR</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="glass-panel p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* <div className="relative">
                  <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your audio URL here"
                    className="input-primary pl-12"
                  />
                </div> */}

                {/* <div className="flex items-center space-x-4">
                  <span className="text-white/70">OR</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div> */}

                {file && (
                  <div className="glass-panel p-4 mt-4">
                    <h3 className="font-mono text-lg mb-2">File Details</h3>
                    <p className="text-white/70">Name: {file.name}</p>
                    <p className="text-white/70">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-white/70">Type: {file.type}</p>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  Generate Summary
                </button>
              </form>
            </div>

            <SummarySettings config={config} onChange={setConfig} />
          </div>

          <div className="space-y-8">
            {summary && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8"
                >
                  <h2 className="text-2xl font-mono cyber-gradient mb-6">Generated Summary</h2>
                  <div className="bg-white/5 p-6 rounded-xl">
                    <p className="text-white/90 whitespace-pre-wrap">{summary}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-mono cyber-gradient">Generated Code</h2>
                    <Code className="h-6 w-6 text-cyber-blue" />
                  </div>

                  <div className="mb-4 flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedLanguage === lang
                            ? 'bg-cyber-purple/20 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>

                  <CodeEditor
                    code={generatedCode[selectedLanguage]}
                    language={selectedLanguage}
                    onChange={(code) => setGeneratedCode({
                      ...generatedCode,
                      [selectedLanguage]: code
                    })}
                  />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}