export interface AIAssistant {
  id: string;
  name: string;
  description: string;
  personality: string;
  expertise: string[];
  systemPrompt: string;
  educationalGuidelines: EducationalGuidelines;
  avatar?: string;
}

export interface EducationalGuidelines {
  schoolLevel: 'elementary' | 'junior-high' | 'high-school' | 'special-needs';
  subject: string;
  gradeLevel: string;
  learningObjectives: string[];
  teachingMethods: string[];
  assessmentCriteria: string[];
  curriculumStandards: CurriculumStandard[];
}

export interface CurriculumStandard {
  code: string;
  title: string;
  description: string;
  skills: string[];
  knowledgeAreas: string[];
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
    curriculumAlignment?: string[];
  };
  educationalInsights?: {
    learningObjective: string;
    difficulty: number;
    suggestedActivities: string[];
  };
}

export interface ChatSession {
  id: string;
  materialId: string;
  assistantId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  educationalContext: {
    subject: string;
    grade: string;
    learningGoals: string[];
    curriculumAlignment: string[];
  };
}

export interface MaterialGenerationRequest {
  baseMaterialId: string;
  targetGrade: string;
  targetSubject: string;
  difficulty: number;
  duration: number;
  customInstructions?: string;
  focusAreas?: string[];
  curriculumAlignment?: string[];
  learningObjectives?: string[];
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
  educationalMetadata: {
    curriculumAlignment: string[];
    learningObjectives: string[];
    assessmentMethods: string[];
    differentiationStrategies: string[];
  };
}