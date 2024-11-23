import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Youtube, Quote, Code } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useAchievements } from '../hooks/useAchievements';
import TranscriptSettings from '../components/TranscriptSettings';
import CodeEditor from '../components/CodeEditor';
import LoadingAnimation from '../components/LoadingAnimation';
import type { SpeechSettings, AudioIntelligence, CodeGeneration } from '../types/transcript';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const languages: CodeGeneration['language'][] = ['typescript', 'python', 'go', 'java', 'csharp', 'ruby'];

export default function Transcript() {
  const [url, setUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [duration, setDuration] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<CodeGeneration['language']>('typescript');
  const [generatedCode, setGeneratedCode] = useState<Record<CodeGeneration['language'], string>>({
    python: '',
    typescript: '',
    go: '',
    java: '',
    csharp: '',
    ruby: ''
  });

  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
    speech_model: 'best',
    word_boost: [],
    filter_profanity: false,
    audio_start_from: 0,
    audio_end_at: 0
  });

  const [audioIntelligence, setAudioIntelligence] = useState<AudioIntelligence>({
    summarization: false,
    summary_type: 'bullets',
    summary_model: 'informative'
  });

  const updateAudioEndAt = (newDuration: number) => {
    setSpeechSettings(prevSettings => ({
      ...prevSettings,
      audio_end_at: newDuration
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { unlockAchievement } = useAchievements();
  const mediaRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (file && mediaRef.current) {
      const fileUrl = URL.createObjectURL(file);
      mediaRef.current.src = fileUrl;
      mediaRef.current.onloadedmetadata = () => {
        const durationInSeconds = mediaRef.current?.duration;
        const durationInMilliseconds = durationInSeconds ? durationInSeconds * 1000 : 0;
        setDuration(durationInMilliseconds);
        updateAudioEndAt(durationInMilliseconds);
      };
    }
  }, [file]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      setFileUrl(URL.createObjectURL(file));
      setFile(file);
      unlockAchievement('first-upload');
    } else {
      alert('Please upload only video or audio files');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTranscript('');
    setSummary('');
    setTranscriptId('sample-transcript-id');
    
    setIsLoading(true);

    const data = new FormData();
    data.append('file', file!);
    const assemblyaidata = {
      fileUrl: url,
      apiKey: apiKey,
      speechSettings: speechSettings,
      audioIntelligence: audioIntelligence
    };
    data.append('assemblyai', JSON.stringify(assemblyaidata));

    try {
      const myurl = `${baseUrl}/upload`;
      const result = await axios.post(myurl, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (result.data.status === 'error') {
        throw new Error(result.data.error);
      } else {
        console.log(result.data);
        setTranscriptId(result.data.transcript.id);
        setTranscript(result.data.transcript.text);
        unlockAchievement('first-transcript');
        // setGeneratedCode({ ...generatedCode, typescript: result.data.codesnippet });
            
        // Simulate code generation for each language
        const sampleCode = {
          typescript: result.data.codeSnippet,
          python: '# Python implementation\ndef process_transcript(text):\n    return text.upper()',
          go: '// Go implementation\nfunc processTranscript(text string) string {\n    return strings.ToUpper(text)\n}',
          java: '// Java implementation\npublic class TranscriptProcessor {\n    public String processTranscript(String text) {\n        return text.toUpperCase();\n    }\n}',
          csharp: '// C# implementation\npublic class TranscriptProcessor {\n    public string ProcessTranscript(string text) {\n        return text.ToUpper();\n    }\n}',
          ruby: '# Ruby implementation\ndef process_transcript(text)\n    text.upcase\nend'
        };
        setGeneratedCode(sampleCode);

        if (audioIntelligence.summarization) {
          setSummary(result.data.transcript.summary);
        } else {
          setSummary('');
        }
      }
    } catch (error) {
      console.error('Error', error);
      alert('Error occurred while transcribing');
    } finally {
      setIsLoading(false);
    }

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
        {/* Rest of the component remains exactly the same */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold cyber-gradient">Smart Transcript</h1>
          <div className="text-white/60 font-mono">Powered by AssemblyAI</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="glass-panel p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your audio URL here"
                    className="input-primary pl-12"
                  />
                </div>

                <div className="flex items-center space-x-4">
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
                </div>

                {file && (
                  <div className="glass-panel p-4 mt-4">
                    <h3 className="font-mono text-lg mb-2">File Details</h3>
                    <p className="text-white/70">Name: {file.name}</p>
                    <p className="text-white/70">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-white/70">Type: {file.type}</p>
                    <p className="text-white/70">Duration: {duration} milliseconds</p>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                  Generate Transcript
                </button>
                <audio ref={mediaRef} style={{ display: 'none' }} />
              </form>
            </div>

            <TranscriptSettings
              apiKey={apiKey}
              setApiKey={setApiKey}
              speechSettings={speechSettings}
              setSpeechSettings={setSpeechSettings}
              audioIntelligence={audioIntelligence}
              setAudioIntelligence={setAudioIntelligence}
              audioDuration={file ? duration : 0}
            />
          </div>

          <div className="space-y-8">
            {transcript && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-mono cyber-gradient">Generated Transcript</h2>
                    <div className="text-white/60 font-mono">ID: {transcriptId}</div>
                  </div>

                  <div className="relative p-6 bg-white/5 rounded-xl h-96 overflow-y-auto">
                    <Quote className="absolute top-4 left-4 h-6 w-6 text-cyber-blue opacity-50" />
                    <br />
                    <p>{transcript}</p>
                    <br />
                    <Quote className="bottom-4 right-4 h-6 w-6 text-cyber-purple opacity-50 transform rotate-180" />
                  </div>
                </motion.div>

                {summary && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-mono cyber-gradient">Generated Summary</h2>
                      <div className="text-white/60 font-mono">ID: {transcriptId}</div>
                    </div>

                    <div className="relative p-6 bg-white/5 rounded-xl max-h-96 overflow-y-auto">
                      <Quote className="absolute top-4 left-4 h-6 w-6 text-cyber-blue opacity-50" />
                      <TypeAnimation
                        sequence={[summary]}
                        wrapper="p"
                        speed={99}
                        className="text-white/90 leading-relaxed px-8"
                        cursor={false}
                      />
                      <Quote className="bottom-4 right-4 h-6 w-6 text-cyber-purple opacity-50 transform rotate-180" />
                    </div>
                  </motion.div>
                )}

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