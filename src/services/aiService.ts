import { AIAssistant, ChatMessage, ChatSession, MaterialGenerationRequest, GeneratedMaterial } from '../types/ai';
import { mockAIAssistants } from '../data/mockAIAssistants';
import { Material } from '../types/material';

// Mock AI service - in a real app, this would connect to OpenAI, Claude, or other AI services
export const fetchAIAssistants = async (): Promise<AIAssistant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAIAssistants);
    }, 300);
  });
};

export const getAssistantBySubject = async (subject: string): Promise<AIAssistant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let assistant = mockAIAssistants.find(a => 
        a.expertise.some(exp => exp.toLowerCase().includes(subject.toLowerCase()))
      );
      
      if (!assistant) {
        assistant = mockAIAssistants.find(a => a.id === 'assistant-general')!;
      }
      
      resolve(assistant);
    }, 300);
  });
};

export const sendChatMessage = async (
  sessionId: string,
  message: string,
  materialContext?: { materialId: string; material: Material }
): Promise<ChatMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock AI response generation
      const responses = [
        'この教材の内容について、どの部分が特に理解しにくいですか？具体的に教えてください。',
        'とても良い質問ですね！この概念を理解するために、まず基本的な部分から確認してみましょう。',
        'この問題を解くためのステップを一緒に考えてみましょう。まず、何が分かっていて、何を求める必要があるかを整理してみてください。',
        'この教材で学んだことを、日常生活の例で考えてみるとどうでしょうか？',
        '素晴らしい理解力ですね！次のステップとして、この知識をどのように応用できるか考えてみましょう。'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date().toISOString(),
        materialContext: materialContext ? {
          materialId: materialContext.materialId
        } : undefined
      };
      
      resolve(aiMessage);
    }, 1000 + Math.random() * 2000); // Simulate AI thinking time
  });
};

export const generateMaterial = async (request: MaterialGenerationRequest): Promise<GeneratedMaterial> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const generatedMaterial: GeneratedMaterial = {
        id: `generated-${Date.now()}`,
        title: `${request.targetSubject}の新しい教材 - ${request.targetGrade}向け`,
        description: `元の教材をベースに、${request.targetGrade}の学習者向けに最適化された教材です。`,
        content: `# ${request.targetSubject}の学習教材

## 学習目標
この教材では、以下の内容を学習します：
- 基本概念の理解
- 実践的な応用
- 問題解決能力の向上

## 内容
${request.customInstructions || '基本的な概念から応用まで、段階的に学習していきます。'}

## 演習問題
1. 基本問題
2. 応用問題
3. 発展問題

## まとめ
この教材で学んだことを振り返り、次のステップを考えてみましょう。`,
        baseMaterialId: request.baseMaterialId,
        generationRequest: request,
        status: 'completed',
        createdAt: new Date().toISOString()
      };
      
      resolve(generatedMaterial);
    }, 3000); // Simulate generation time
  });
};

export const createChatSession = async (
  materialId: string,
  assistantId: string
): Promise<ChatSession> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const session: ChatSession = {
        id: `session-${Date.now()}`,
        materialId,
        assistantId,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      resolve(session);
    }, 300);
  });
};