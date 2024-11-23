export interface SummaryConfig {
  summary_type: 'basic' | 'custom';
  apiKey: string;
  transcriptId?: string;
  fileUrl?: string;
  finalModel: string;
  prompt?: string;
  temperature?: number;
  context?: {
    happening: string;
    location: string;
    additional: string;
  };
  answerFormat: string;
  maxOutputSize: number;
}

export interface CodeGeneration {
  language: 'python' | 'typescript' | 'go' | 'java' | 'csharp' | 'ruby';
  code: string;
}

export const models = [
  'anthropic/claude-3-5-sonnet',
  'anthropic/claude-3-opus',
  'anthropic/claude-3-haiku',
  'anthropic/claude-3-sonnet',
  'anthropic/claude-2-1',
  'anthropic/claude-2'
];

export const defaultModel = 'anthropic/claude-3-5-sonnet';

export const promptExamples = [
  {
    title: 'Detailed Analysis',
    prompt: 'Provide a comprehensive analysis of the key concepts, arguments, and insights discussed in this transcript.'
  },
  {
    title: 'Key Takeaways',
    prompt: 'Extract and list the main takeaways and actionable insights from this discussion.'
  },
  {
    title: 'Technical Breakdown',
    prompt: 'Break down the technical concepts and methodologies mentioned in this transcript.'
  },
  {
    title: 'Learning Points',
    prompt: 'Identify and explain the core learning points and educational value from this content.'
  },
  {
    title: 'Critical Review',
    prompt: 'Provide a critical analysis of the arguments and evidence presented in this discussion.'
  }
];