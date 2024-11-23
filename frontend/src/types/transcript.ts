export interface TranscriptConfig {
  apiKey: string;
  fileUrl: string;
}

export interface SpeechSettings {
  speech_model: 'best' | 'nano';
  word_boost: string[];
  filter_profanity: boolean;
  audio_start_from: number;
  audio_end_at: number;
}

export interface AudioIntelligence {
  summarization: boolean;
  summary_type: 'bullets' | 'bullets_verbose' | 'gist' | 'headline' | 'paragraph';
  summary_model: 'informative' | 'conversational' | 'catchy';
}

export interface CodeGeneration {
  language: 'python' | 'typescript' | 'go' | 'java' | 'csharp' | 'ruby';
  code: string;
}

export const summaryModelConfig = {
  informative: {
    default: true,
    when_to_use: "Best for files with a single speaker, such as presentations or lectures.",
    supported_summary_types: ["bullets", "bullets_verbose", "headline", "paragraph"],
    required_parameters: {
      punctuate: true,
      format_text: true
    }
  },
  conversational: {
    default: false,
    when_to_use: "Best for any 2-person conversation, such as customer/agent or interview/interviewee calls.",
    supported_summary_types: ["bullets", "bullets_verbose", "headline", "paragraph"],
    required_parameters: {
      punctuate: true,
      format_text: true,
      speaker_labels: true,
      dual_channel: true
    }
  },
  catchy: {
    default: false,
    when_to_use: "Best for creating video, podcast, or media titles.",
    supported_summary_types: ["headline", "gist"],
    required_parameters: {
      punctuate: true,
      format_text: true
    }
  }
};