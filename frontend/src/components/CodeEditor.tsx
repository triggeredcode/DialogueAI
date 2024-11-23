import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeGeneration } from '../types/transcript';

interface Props {
  code: string;
  language: CodeGeneration['language'];
  onChange: (code: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ code, language, onChange, readOnly = false }: Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageAlias = (lang: CodeGeneration['language']) => {
    switch (lang) {
      case 'typescript': return 'typescript';
      case 'python': return 'python';
      case 'go': return 'go';
      case 'java': return 'java';
      case 'csharp': return 'csharp';
      case 'ruby': return 'ruby';
      default: return 'typescript';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-white/70" />
        )}
      </button>
      <SyntaxHighlighter
        language={getLanguageAlias(language)}
        style={atomOneDark}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        }}
        className="font-mono"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}