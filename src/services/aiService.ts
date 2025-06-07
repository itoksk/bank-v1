import { AIAssistant, ChatMessage, ChatSession, MaterialGenerationRequest, GeneratedMaterial } from '../types/ai';
import { mockAIAssistants } from '../data/mockAIAssistants';
import { Material } from '../types/material';
import { getCurriculumStandards } from '../data/curriculumStandards';

// 学校種を自動判定する関数
const determineSchoolLevel = (grade: string): 'elementary' | 'junior-high' | 'high-school' | 'special-needs' => {
  if (grade.includes('elementary') || grade.includes('小学')) {
    return 'elementary';
  } else if (grade.includes('junior-high') || grade.includes('中学')) {
    return 'junior-high';
  } else if (grade.includes('high-school') || grade.includes('高校') || grade.includes('高等学校')) {
    return 'high-school';
  } else if (grade.includes('special') || grade.includes('特別支援')) {
    return 'special-needs';
  }
  // デフォルトは中学校
  return 'junior-high';
};

// 教科名を正規化する関数
const normalizeSubject = (subject: string): string => {
  const subjectMap: { [key: string]: string } = {
    '数学': 'math',
    '算数': 'math',
    '理科': 'science',
    '物理': 'science',
    '化学': 'science',
    '生物': 'science',
    '地学': 'science',
    '国語': 'japanese',
    '英語': 'english',
    '社会': 'social',
    '地理': 'social',
    '歴史': 'social',
    '公民': 'social',
    '道徳': 'moral',
    '情報': 'information',
    '技術': 'technology',
    '美術': 'art',
    '音楽': 'music',
    '看護': 'nursing',
    '水産': 'fishery',
    '農業': 'agriculture',
    '工業': 'industry',
    'ICT': 'ict',
    '生成AI': 'ai',
    'デジタルシティズンシップ': 'citizenship'
  };
  
  return subjectMap[subject] || subject.toLowerCase();
};

// 学習指導要領PDFのURLを取得する関数
const getCurriculumPdfUrl = (schoolLevel: 'elementary' | 'junior-high' | 'high-school' | 'special-needs'): string => {
  const pdfUrls = {
    'elementary': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_01.pdf',
    'junior-high': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_02.pdf',
    'high-school': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_03.pdf',
    'special-needs': 'https://www.mext.go.jp/a_menu/shotou/tokubetu/main/1386427.htm'
  };
  
  return pdfUrls[schoolLevel];
};

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
      const normalizedSubject = normalizeSubject(subject);
      
      let assistant = mockAIAssistants.find(a => 
        a.expertise.some(exp => normalizeSubject(exp).includes(normalizedSubject))
      );
      
      if (!assistant) {
        assistant = mockAIAssistants.find(a => a.id === 'assistant-general')!;
      }
      
      resolve(assistant);
    }, 300);
  });
};

// 学習指導要領に基づいた教育的コンテキストを生成（自動読み込み対応）
const generateEducationalContext = (material: Material, assistant: AIAssistant) => {
  const schoolLevel = determineSchoolLevel(material.grade);
  const normalizedSubject = normalizeSubject(material.subject);
  
  const curriculumStandards = getCurriculumStandards(schoolLevel, normalizedSubject);
  const curriculumPdfUrl = getCurriculumPdfUrl(schoolLevel);
  
  return {
    subject: material.subject,
    grade: material.grade,
    schoolLevel,
    normalizedSubject,
    learningGoals: assistant.educationalGuidelines.learningObjectives,
    curriculumAlignment: curriculumStandards.map(s => s.code),
    curriculumStandards,
    curriculumPdfUrl,
    materialContent: {
      title: material.title,
      description: material.description,
      duration: material.duration,
      difficulty: material.difficulty,
      lessonFlow: material.lessonFlow,
      teachingPoints: material.teachingPoints,
      evaluationMethods: material.evaluationMethods,
      preparationItems: material.preparationItems
    }
  };
};

// 教育的洞察を含むAI応答を生成（教材詳細と学習指導要領を参照）
const generateEducationalResponse = (
  message: string, 
  material: Material, 
  assistant: AIAssistant,
  educationalContext: any
): string => {
  // 実際のAIサービスでは、ここで学習指導要領PDFの内容と教材詳細も含めてプロンプトを構築
  const educationalPrompt = `
【学習指導要領情報】
学校種: ${educationalContext.schoolLevel}
参照PDF: ${educationalContext.curriculumPdfUrl}

【教材詳細情報】
タイトル: ${material.title}
教科: ${material.subject} (正規化: ${educationalContext.normalizedSubject})
学年: ${material.grade}
難易度: ${material.difficulty}/5
授業時間: ${material.duration}分

【教材内容】
説明: ${material.description}

${material.lessonFlow ? `
【授業の流れ】
${material.lessonFlow.map((phase, index) => 
  `${index + 1}. ${phase.name} (${phase.duration}分): ${phase.description}`
).join('\n')}
` : ''}

${material.teachingPoints ? `
【指導ポイント】
${material.teachingPoints.map(point => `• ${point}`).join('\n')}
` : ''}

${material.evaluationMethods ? `
【評価方法】
${material.evaluationMethods.map(method => `• ${method}`).join('\n')}
` : ''}

【学習指導要領に基づく指導方針】
${assistant.systemPrompt}

【現在の学習目標】
${assistant.educationalGuidelines.learningObjectives.join('\n')}

【指導方法】
${assistant.educationalGuidelines.teachingMethods.join(', ')}

【カリキュラム基準】
${educationalContext.curriculumStandards.map(s => `${s.code}: ${s.title} - ${s.description}`).join('\n')}

【生徒の質問】
${message}

上記の教育的コンテキスト、教材の詳細内容、学習指導要領を踏まえ、適切な指導を行ってください。
教材の具体的な内容（授業の流れ、指導ポイント、評価方法）を参照しながら回答してください。
`;

  // Mock responses with educational insights based on material content
  const educationalResponses = [
    `この質問は素晴らしいですね！${material.subject}の${educationalContext.schoolLevel === 'elementary' ? '小学校' : educationalContext.schoolLevel === 'junior-high' ? '中学校' : '高等学校'}学習指導要領では、「${assistant.educationalGuidelines.learningObjectives[0]}」を重視しています。

「${material.title}」の教材内容を見ると、${material.duration}分の授業で段階的に理解を深める構成になっていますね。

${material.lessonFlow ? `
この教材の授業の流れに沿って説明すると：
${material.lessonFlow.slice(0, 2).map((phase, index) => 
  `${index + 1}. **${phase.name}** (${phase.duration}分): ${phase.description}`
).join('\n')}
` : ''}

${material.teachingPoints ? `
特に重要な指導ポイントは：
${material.teachingPoints.slice(0, 2).map(point => `• ${point}`).join('\n')}
` : ''}

学習指導要領（参照: ${educationalContext.curriculumPdfUrl}）に基づき、段階的な理解促進を心がけています。

何か分からないことがあれば、遠慮なく質問してくださいね。`,

    `とても良い着眼点です！学習指導要領の「思考・判断・表現」の観点から、この問題について一緒に考えてみましょう。

「${material.title}」では、難易度${material.difficulty}レベルで${material.duration}分かけて学習する内容ですね。

${material.description}

${material.evaluationMethods ? `
この教材では以下の評価方法を用いています：
${material.evaluationMethods.map(method => `• ${method}`).join('\n')}
` : ''}

${educationalContext.schoolLevel}の学習指導要領（${educationalContext.curriculumPdfUrl}）に基づき、「主体的・対話的で深い学び」を重視した指導を行います。

ぜひ積極的に質問や意見を聞かせてください。`,

    `素晴らしい質問です！この内容は${material.grade}の学習指導要領で重要な位置を占めています。

${assistant.name}として、「${material.title}」の教材内容を踏まえてサポートします：

【この教材の特徴】
• 授業時間: ${material.duration}分
• 難易度レベル: ${material.difficulty}/5
• 対象: ${material.grade}

${material.preparationItems ? `
【準備するもの】
${material.preparationItems.slice(0, 3).map(item => `• ${item}`).join('\n')}
` : ''}

【学習方法の提案】
• ${assistant.educationalGuidelines.teachingMethods[0]}を活用
• 段階的な理解促進
• 振り返りと定着確認

学習指導要領（${educationalContext.curriculumPdfUrl}）に基づき、一緒に理解を深めていきましょう！`,

    `この疑問は学習指導要領の「知識・技能」と「思考・判断・表現」の両方に関わる重要なポイントです。

「${material.title}」で扱っている内容は、${material.subject}の体系的な学習において基礎となる部分です。

${material.lessonFlow ? `
教材の授業構成を見ると：
${material.lessonFlow.map((phase, index) => 
  `• ${phase.name} (${phase.duration}分)`
).join('\n')}

このような段階的な構成で理解を深めていきます。
` : ''}

${educationalContext.schoolLevel}学習指導要領（参照: ${educationalContext.curriculumPdfUrl}）では「見方・考え方を働かせる」ことを重視していますので、なぜそうなるのかを一緒に考えてみましょう。

カリキュラム基準「${educationalContext.curriculumStandards[0]?.code}: ${educationalContext.curriculumStandards[0]?.title}」に基づいた指導を行います。`,

    `とても深い質問ですね！学習指導要領では「主体的に学習に取り組む態度」を大切にしており、このような疑問を持つことが学習の出発点です。

「${material.title}」の教材について、以下の観点から考えてみましょう：

【教育的価値】
• この学習がなぜ必要なのか
• 将来の学習にどう活かされるのか
• 社会生活での意義

${material.teachingPoints ? `
【指導のポイント】
${material.teachingPoints.map(point => `• ${point}`).join('\n')}
` : ''}

【学習の進め方】
• 個別最適化された学習
• 協働的な学びの活用
• ICTを活用した理解促進

${educationalContext.schoolLevel}学習指導要領（${educationalContext.curriculumPdfUrl}）に基づき、一人ひとりの理解度に合わせて、丁寧にサポートしていきます。`
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
      const normalizedSubject = normalizeSubject(materialContext.material.subject);
      const assistant = mockAIAssistants.find(a => 
        a.expertise.some(exp => normalizeSubject(exp).includes(normalizedSubject))
      ) || mockAIAssistants.find(a => a.id === 'assistant-general')!;

      // Generate educational context with auto-loaded curriculum
      const educationalContext = generateEducationalContext(materialContext.material, assistant);

      // Generate educational response with material details and curriculum
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
      // Auto-determine school level and load appropriate curriculum
      const schoolLevel = determineSchoolLevel(request.targetGrade);
      const normalizedSubject = normalizeSubject(request.targetSubject);
      const curriculumStandards = getCurriculumStandards(schoolLevel, normalizedSubject);
      const curriculumPdfUrl = getCurriculumPdfUrl(schoolLevel);
      
      const schoolLevelName = {
        'elementary': '小学校',
        'junior-high': '中学校', 
        'high-school': '高等学校',
        'special-needs': '特別支援学校'
      }[schoolLevel];
      
      const generatedMaterial: GeneratedMaterial = {
        id: `generated-${Date.now()}`,
        title: `${request.targetSubject}の新しい教材 - ${request.targetGrade}向け`,
        description: `元の教材をベースに、${request.targetGrade}の学習者向けに${schoolLevelName}学習指導要領に基づいて最適化された教材です。`,
        content: `# ${request.targetSubject}の学習教材（${request.targetGrade}対象）

## ${schoolLevelName}学習指導要領に基づく学習目標
この教材は${schoolLevelName}学習指導要領（参照: ${curriculumPdfUrl}）に基づき、以下の資質・能力の育成を目指します：

### 知識・技能
- 基本的な概念や原理・法則の理解
- 技能の習得と活用

### 思考・判断・表現
- 課題を見つけ、解決に向けて探究する力
- 根拠を明確にして表現する力

### 学びに向かう力・人間性
- 主体的に学習に取り組む態度
- 協働的に学ぶ姿勢

## カリキュラム基準との対応
${curriculumStandards.length > 0 ? 
  curriculumStandards.map(s => `**${s.code}: ${s.title}**\n${s.description}\n- 技能: ${s.skills.join('、')}\n- 知識領域: ${s.knowledgeAreas.join('、')}`).join('\n\n')
  : '該当する教科の学習指導要領に基づいた指導を行います。'
}

## 学習内容
${request.customInstructions || `${schoolLevelName}学習指導要領に基づいた体系的な学習を進めます。`}

### 導入（${Math.floor(request.duration * 0.2)}分）
- 既習事項の確認と関連付け
- 学習課題の設定
- 興味・関心の喚起
- 本時の学習目標の共有

### 展開（${Math.floor(request.duration * 0.6)}分）
- 基本概念の理解促進
- 実践的な活動・体験
- 協働的な学び
- 個別最適化された指導
- ICTを活用した学習

### まとめ（${Math.floor(request.duration * 0.2)}分）
- 学習内容の振り返り
- 理解度の確認
- 次時への見通し
- 自己評価・相互評価

## 評価規準（${schoolLevelName}学習指導要領準拠）
学習指導要領に基づく3つの観点で評価します：

1. **知識・技能**
   - 基本的な概念を理解している
   - 技能を適切に活用できる
   - 学習内容を正確に身に付けている

2. **思考・判断・表現**
   - 課題解決に向けて考察できる
   - 根拠を明確にして表現できる
   - 多面的・多角的に考えることができる

3. **主体的に学習に取り組む態度**
   - 積極的に学習に参加している
   - 協働的に学習に取り組んでいる
   - 学習を振り返り、次の学習に活かそうとしている

## 指導上の留意点
- 個別最適な学びと協働的な学びの一体的な充実
- ICTを効果的に活用した学習環境の整備
- 安全指導の徹底
- インクルーシブ教育の視点
- ${schoolLevelName}の発達段階に応じた指導

## 準備物・教材
- 学習指導要領解説書
- ICT機器（タブレット、電子黒板等）
- ワークシート
- 実物教材・教具

## 発展学習・関連学習
- 他教科との関連（教科横断的な学習）
- 日常生活への応用
- 探究的な学習活動
- キャリア教育との関連

## 参考資料
- ${schoolLevelName}学習指導要領: ${curriculumPdfUrl}
- 学習指導要領解説書
- 教科書・指導書`,
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