export interface AIAssistant {
  id: string;
  name: string;
  description: string;
  personality: string;
  expertise: string[];
  systemPrompt: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  materialContext?: {
    materialId: string;
    pageNumber?: number;
    section?: string;
  };
}

export interface ChatSession {
  id: string;
  materialId: string;
  assistantId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface MaterialGenerationRequest {
  baseMaterialId: string;
  targetGrade: string;
  targetSubject: string;
  difficulty: number;
  duration: number;
  customInstructions?: string;
  focusAreas?: string[];
}

export interface GeneratedMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  baseMaterialId: string;
  generationRequest: MaterialGenerationRequest;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
}