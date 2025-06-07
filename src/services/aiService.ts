import { AIAssistant, ChatMessage, ChatSession, MaterialGenerationRequest, GeneratedMaterial } from '../types/ai';
import { mockAIAssistants } from '../data/mockAIAssistants';
import { Material } from '../types/material';
import { getCurriculumStandards } from '../data/curriculumStandards';

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

// 学習指導要領に基づいた教育的コンテキストを生成
const generateEducationalContext = (material: Material, assistant: AIAssistant) => {
  const schoolLevel = material.grade.includes('elementary') ? 'elementary' :
                     material.grade.includes('junior-high') ? 'junior-high' :
                     material.grade.includes('high-school') ? 'high-school' : 'junior-high';
  
  const curriculumStandards = getCurriculumStandards(schoolLevel, material.subject);
  
  return {
    subject: material.subject,
    grade: material.grade,
    learningGoals: assistant.educationalGuidelines.learningObjectives,
    curriculumAlignment: curriculumStandards.map(s => s.code),
    schoolLevel,
    curriculumStandards
  };
};

// 教育的洞察を含むAI応答を生成
const generateEducationalResponse = (
  message: string, 
  material: Material, 
  assistant: AIAssistant,
  educationalContext: any
): string => {
  // 実際のAIサービスでは、ここで学習指導要領の内容も含めてプロンプトを構築
  const educationalPrompt = `
【教材情報】
タイトル: ${material.title}
教科: ${material.subject}
学年: ${material.grade}
難易度: ${material.difficulty}/5

【学習指導要領に基づく指導方針】
${assistant.systemPrompt}

【現在の学習目標】
${assistant.educationalGuidelines.learningObjectives.join('\n')}

【指導方法】
${assistant.educationalGuidelines.teachingMethods.join(', ')}

【生徒の質問】
${message}

上記の教育的コンテキストを踏まえ、学習指導要領に基づいた適切な指導を行ってください。
`;

  // Mock responses with educational insights
  const educationalResponses = [
    `この質問は素晴らしいですね！${material.subject}の学習指導要領では、「${assistant.educationalGuidelines.learningObjectives[0]}」を重視しています。

まず、この概念を理解するために、身近な例から考えてみましょう。${material.title}で学んだ内容と関連付けて説明すると...

段階的に理解を深めるために、以下の順序で考えてみてください：
1. 基本的な概念の確認
2. 具体例での理解
3. 応用問題への挑戦

何か分からないことがあれば、遠慮なく質問してくださいね。`,

    `とても良い着眼点です！学習指導要領の「思考・判断・表現」の観点から、この問題について一緒に考えてみましょう。

${material.title}の内容を振り返ると、この概念は日常生活でも活用できる重要なものです。

理解を深めるために、以下の活動を提案します：
• 図やグラフを使った視覚化
• 具体的な計算練習
• 類似問題での応用

学習指導要領では「主体的・対話的で深い学び」を重視していますので、ぜひ積極的に質問や意見を聞かせてください。`,

    `素晴らしい質問です！この内容は${material.grade}の学習指導要領で重要な位置を占めています。

${assistant.name}として、以下の教育的視点でサポートします：

【理解のポイント】
• なぜこの概念が重要なのか
• どのような場面で活用できるのか
• 次の学習にどうつながるのか

【学習方法の提案】
• ${assistant.educationalGuidelines.teachingMethods[0]}を活用
• 段階的な理解促進
• 振り返りと定着確認

一緒に理解を深めていきましょう！`,

    `この疑問は学習指導要領の「知識・技能」と「思考・判断・表現」の両方に関わる重要なポイントです。

${material.title}で扱っている内容は、${material.subject}の体系的な学習において基礎となる部分です。

理解を促進するために：
1. 既習事項との関連付け
2. 具体的な操作活動
3. 言語化による理解の深化

学習指導要領では「見方・考え方を働かせる」ことを重視していますので、なぜそうなるのかを一緒に考えてみましょう。`,

    `とても深い質問ですね！学習指導要領では「主体的に学習に取り組む態度」を大切にしており、このような疑問を持つことが学習の出発点です。

${material.title}の内容について、以下の観点から考えてみましょう：

【教育的価値】
• この学習がなぜ必要なのか
• 将来の学習にどう活かされるのか
• 社会生活での意義

【学習の進め方】
• 個別最適化された学習
• 協働的な学びの活用
• ICTを活用した理解促進

一人ひとりの理解度に合わせて、丁寧にサポートしていきます。`
  ];

  return educationalResponses[Math.floor(Math.random() * educationalResponses.length)];
};

export const sendChatMessage = async (
  sessionId: string,
  message: string,
  materialContext?: { materialId: string; material: Material }
): Promise<ChatMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!materialContext) {
        resolve({
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: 'すみません、教材の情報が取得できませんでした。',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Get appropriate assistant for the material
      const assistant = mockAIAssistants.find(a => 
        a.expertise.some(exp => exp.toLowerCase().includes(materialContext.material.subject.toLowerCase()))
      ) || mockAIAssistants.find(a => a.id === 'assistant-general')!;

      // Generate educational context
      const educationalContext = generateEducationalContext(materialContext.material, assistant);

      // Generate educational response
      const responseContent = generateEducationalResponse(
        message, 
        materialContext.material, 
        assistant,
        educationalContext
      );

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString(),
        materialContext: {
          materialId: materialContext.materialId,
          curriculumAlignment: educationalContext.curriculumAlignment
        },
        educationalInsights: {
          learningObjective: assistant.educationalGuidelines.learningObjectives[0],
          difficulty: materialContext.material.difficulty,
          suggestedActivities: assistant.educationalGuidelines.teachingMethods.slice(0, 3)
        }
      };
      
      resolve(aiMessage);
    }, 1000 + Math.random() * 2000); // Simulate AI thinking time
  });
};

export const generateMaterial = async (request: MaterialGenerationRequest): Promise<GeneratedMaterial> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get curriculum standards for the target grade and subject
      const schoolLevel = request.targetGrade.includes('elementary') ? 'elementary' :
                         request.targetGrade.includes('junior-high') ? 'junior-high' :
                         request.targetGrade.includes('high-school') ? 'high-school' : 'junior-high';
      
      const curriculumStandards = getCurriculumStandards(schoolLevel, request.targetSubject);
      
      const generatedMaterial: GeneratedMaterial = {
        id: `generated-${Date.now()}`,
        title: `${request.targetSubject}の新しい教材 - ${request.targetGrade}向け`,
        description: `元の教材をベースに、${request.targetGrade}の学習者向けに学習指導要領に基づいて最適化された教材です。`,
        content: `# ${request.targetSubject}の学習教材（${request.targetGrade}対象）

## 学習指導要領に基づく学習目標
この教材は学習指導要領に基づき、以下の資質・能力の育成を目指します：

### 知識・技能
- 基本的な概念や原理・法則の理解
- 技能の習得と活用

### 思考・判断・表現
- 課題を見つけ、解決に向けて探究する力
- 根拠を明確にして表現する力

### 学びに向かう力・人間性
- 主体的に学習に取り組む態度
- 協働的に学ぶ姿勢

## 学習内容
${request.customInstructions || '学習指導要領に基づいた体系的な学習を進めます。'}

### 導入（${Math.floor(request.duration * 0.2)}分）
- 既習事項の確認
- 学習課題の設定
- 興味・関心の喚起

### 展開（${Math.floor(request.duration * 0.6)}分）
- 基本概念の理解
- 実践的な活動
- 協働的な学び

### まとめ（${Math.floor(request.duration * 0.2)}分）
- 学習内容の振り返り
- 次時への見通し
- 自己評価

## 評価規準
学習指導要領に基づく3つの観点で評価します：

1. **知識・技能**
   - 基本的な概念を理解している
   - 技能を適切に活用できる

2. **思考・判断・表現**
   - 課題解決に向けて考察できる
   - 根拠を明確にして表現できる

3. **主体的に学習に取り組む態度**
   - 積極的に学習に参加している
   - 協働的に学習に取り組んでいる

## 指導上の留意点
- 個別最適な学びと協働的な学びの一体的な充実
- ICTを効果的に活用した学習
- 安全指導の徹底
- インクルーシブ教育の視点

## 発展学習
- 他教科との関連
- 日常生活への応用
- 探究的な学習活動`,
        baseMaterialId: request.baseMaterialId,
        generationRequest: request,
        status: 'completed',
        createdAt: new Date().toISOString(),
        educationalMetadata: {
          curriculumAlignment: curriculumStandards.map(s => s.code),
          learningObjectives: [
            '基礎的・基本的な知識・技能の習得',
            '思考力・判断力・表現力の育成',
            '学びに向かう力・人間性の涵養'
          ],
          assessmentMethods: [
            '観察による評価',
            'ワークシートによる評価',
            '発表による評価',
            '相互評価・自己評価'
          ],
          differentiationStrategies: [
            '個別最適化学習',
            '習熟度別指導',
            'ICT活用',
            '協働学習'
          ]
        }
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
        updatedAt: new Date().toISOString(),
        educationalContext: {
          subject: '',
          grade: '',
          learningGoals: [],
          curriculumAlignment: []
        }
      };
      
      resolve(session);
    }, 300);
  });
};