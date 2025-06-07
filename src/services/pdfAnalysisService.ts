import { MaterialDetails, PreparationItem, CurriculumAlignment, AssessmentCriterion, EvaluationMethod, ICTIntegration, DigitalResource } from '../types/material';

interface PDFAnalysisContext {
  title?: string;
  subject?: string;
  grade?: string;
  duration?: number;
  difficulty?: number;
}

interface PDFAnalysisResult {
  title?: string;
  description?: string;
  duration?: number;
  materialDetails: MaterialDetails;
}

// Mock PDF analysis service - in a real app, this would use AI services like OpenAI, Claude, or specialized PDF parsing
export const analyzePDFContent = async (
  pdfFile: File,
  context: PDFAnalysisContext
): Promise<PDFAnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate AI analysis of PDF content
      const mockAnalysisResult: PDFAnalysisResult = {
        title: context.title || extractTitleFromPDF(pdfFile.name),
        description: generateDescriptionFromContext(context),
        duration: context.duration || 45,
        materialDetails: generateMaterialDetailsFromPDF(context)
      };
      
      resolve(mockAnalysisResult);
    }, 2000 + Math.random() * 3000); // Simulate analysis time
  });
};

// Extract title from PDF filename or content
const extractTitleFromPDF = (filename: string): string => {
  const baseName = filename.replace(/\.pdf$/i, '');
  return baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Generate description based on context
const generateDescriptionFromContext = (context: PDFAnalysisContext): string => {
  const subject = context.subject || '教科';
  const grade = context.grade || '学年';
  const duration = context.duration || 45;
  
  return `${subject}の${grade}向け教材です。${duration}分の授業で、基本的な概念から応用まで段階的に学習します。実践的な活動を通して、理解を深めることができます。`;
};

// Generate comprehensive material details from PDF analysis
const generateMaterialDetailsFromPDF = (context: PDFAnalysisContext): MaterialDetails => {
  const subject = context.subject || '数学';
  const grade = context.grade || '中学1年生';
  const duration = context.duration || 45;
  
  // Determine school level for curriculum alignment
  const schoolLevel = determineSchoolLevel(grade);
  
  return {
    learningObjectives: generateLearningObjectives(subject, grade),
    prerequisites: generatePrerequisites(subject, grade),
    targetStudents: `${grade}の生徒（個別の配慮を要する生徒を含む）`,
    
    preparationItems: generatePreparationItems(subject),
    requiredEquipment: generateRequiredEquipment(),
    safetyConsiderations: generateSafetyConsiderations(subject),
    
    curriculumAlignment: generateCurriculumAlignment(subject, schoolLevel),
    relatedUnits: generateRelatedUnits(subject),
    crossCurricularConnections: generateCrossCurricularConnections(subject),
    
    assessmentCriteria: generateAssessmentCriteria(),
    evaluationMethods: generateEvaluationMethods(duration),
    
    differentiationStrategies: generateDifferentiationStrategies(),
    supportForSpecialNeeds: generateSpecialNeedsSupport(),
    extensionActivities: generateExtensionActivities(subject),
    
    ictIntegration: generateICTIntegration(),
    digitalResources: generateDigitalResources(subject)
  };
};

const determineSchoolLevel = (grade: string): 'elementary' | 'junior-high' | 'high-school' => {
  if (grade.includes('小学')) return 'elementary';
  if (grade.includes('中学')) return 'junior-high';
  if (grade.includes('高校') || grade.includes('高等学校')) return 'high-school';
  return 'junior-high';
};

const generateLearningObjectives = (subject: string, grade: string): string[] => {
  const baseObjectives = [
    `${subject}の基本的な概念を理解する`,
    '学習した内容を適切に活用できる',
    '主体的に学習に取り組む態度を養う'
  ];
  
  // Subject-specific objectives
  const subjectObjectives: { [key: string]: string[] } = {
    '数学': [
      '数学的な見方・考え方を働かせることができる',
      '数量や図形などについて理解し、技能を身に付ける',
      '数学的活動を通して問題解決力を養う'
    ],
    '理科': [
      '自然の事物・現象について理解を深める',
      '観察・実験などの技能を身に付ける',
      '科学的に探究する力を養う'
    ],
    '国語': [
      '言葉による見方・考え方を働かせることができる',
      '国語で正確に理解し適切に表現する力を身に付ける',
      '言語文化に親しむ態度を養う'
    ],
    '英語': [
      '外国語によるコミュニケーション能力を身に付ける',
      '言語や文化に対する理解を深める',
      '積極的にコミュニケーションを図ろうとする態度を養う'
    ],
    '社会': [
      '社会的な見方・考え方を働かせることができる',
      '社会的事象について理解を深める',
      '社会参画への意欲と態度を養う'
    ]
  };
  
  return subjectObjectives[subject] || baseObjectives;
};

const generatePrerequisites = (subject: string, grade: string): string[] => {
  return [
    '前学年までの基礎的な知識・技能',
    '基本的な学習習慣',
    '協働学習への参加経験'
  ];
};

const generatePreparationItems = (subject: string): PreparationItem[] => {
  const baseItems: PreparationItem[] = [
    {
      category: 'material',
      name: '教科書',
      quantity: '1冊/人',
      isOptional: false
    },
    {
      category: 'handout',
      name: 'ワークシート',
      quantity: '1枚/人',
      isOptional: false
    },
    {
      category: 'equipment',
      name: 'ICT機器（タブレット等）',
      quantity: '1台/人',
      isOptional: true
    }
  ];
  
  // Subject-specific items
  const subjectItems: { [key: string]: PreparationItem[] } = {
    '数学': [
      {
        category: 'material',
        name: '関数電卓',
        quantity: '1台/人',
        isOptional: true
      },
      {
        category: 'material',
        name: 'グラフ用紙',
        quantity: '数枚/人',
        isOptional: false
      }
    ],
    '理科': [
      {
        category: 'equipment',
        name: '実験器具セット',
        quantity: '1セット/グループ',
        isOptional: false
      },
      {
        category: 'material',
        name: '実験ノート',
        quantity: '1冊/人',
        isOptional: false
      }
    ],
    '英語': [
      {
        category: 'equipment',
        name: 'CD/音響機器',
        quantity: '1台/教室',
        isOptional: false
      },
      {
        category: 'handout',
        name: '会話練習カード',
        quantity: '1セット/ペア',
        isOptional: true
      }
    ]
  };
  
  return [...baseItems, ...(subjectItems[subject] || [])];
};

const generateRequiredEquipment = (): string[] => {
  return [
    '電子黒板・プロジェクター',
    'タブレット端末',
    'インターネット環境',
    '音響設備'
  ];
};

const generateSafetyConsiderations = (subject: string): string[] => {
  const baseConsiderations = [
    'ICT機器の適切な使用方法の指導',
    '個人情報の取り扱いに関する注意',
    '健康面への配慮（画面との距離等）'
  ];
  
  const subjectConsiderations: { [key: string]: string[] } = {
    '理科': [
      '実験器具の安全な取り扱い',
      '薬品の適切な管理と使用',
      '実験時の服装・保護具の着用'
    ],
    '技術': [
      '工具の安全な使用方法',
      '作業環境の整理整頓',
      'けがの予防と応急処置'
    ]
  };
  
  return [...baseConsiderations, ...(subjectConsiderations[subject] || [])];
};

const generateCurriculumAlignment = (subject: string, schoolLevel: string): CurriculumAlignment[] => {
  // Mock curriculum alignment based on subject and school level
  const alignments: CurriculumAlignment[] = [
    {
      code: 'A-1',
      title: `${subject}の基本概念`,
      description: '基礎的・基本的な知識・技能の習得',
      competencyArea: '知識・技能'
    },
    {
      code: 'B-1',
      title: '思考力・判断力・表現力',
      description: '課題解決に向けた思考・判断・表現',
      competencyArea: '思考・判断・表現'
    },
    {
      code: 'C-1',
      title: '学びに向かう力',
      description: '主体的・協働的な学習態度',
      competencyArea: '学びに向かう力・人間性'
    }
  ];
  
  return alignments;
};

const generateRelatedUnits = (subject: string): string[] => {
  return [
    '前単元との関連',
    '後続単元への発展',
    '他学年との系統性'
  ];
};

const generateCrossCurricularConnections = (subject: string): string[] => {
  const connections: { [key: string]: string[] } = {
    '数学': ['理科（データ分析）', '社会（統計）', '技術（プログラミング）'],
    '理科': ['数学（計算・グラフ）', '技術（実験器具）', '社会（環境問題）'],
    '国語': ['社会（歴史・文化）', '道徳（価値観）', '総合（表現活動）'],
    '英語': ['社会（国際理解）', '音楽（歌・リズム）', '総合（異文化交流）'],
    '社会': ['国語（資料読解）', '数学（統計）', '道徳（公民的資質）']
  };
  
  return connections[subject] || ['他教科との関連性', '総合的な学習の時間との連携'];
};

const generateAssessmentCriteria = (): AssessmentCriterion[] => {
  return [
    {
      competencyArea: '知識・技能',
      criterion: '基本的な概念や技能を身に付けている',
      indicators: ['概念の理解', '技能の習得', '知識の活用']
    },
    {
      competencyArea: '思考・判断・表現',
      criterion: '課題解決に向けて考察し、表現できる',
      indicators: ['課題発見', '論理的思考', '適切な表現']
    },
    {
      competencyArea: '学びに向かう力・人間性',
      criterion: '主体的・協働的に学習に取り組んでいる',
      indicators: ['主体性', '協働性', '継続性']
    }
  ];
};

const generateEvaluationMethods = (duration: number): EvaluationMethod[] => {
  const methods: EvaluationMethod[] = [
    {
      method: '観察による評価',
      timing: '展開',
      target: '学習活動への取り組み',
      tools: ['観察記録表', 'チェックリスト']
    },
    {
      method: 'ワークシートによる評価',
      timing: 'まとめ',
      target: '知識・技能の習得',
      tools: ['ワークシート', '振り返りシート']
    }
  ];
  
  if (duration >= 45) {
    methods.push({
      method: '発表による評価',
      timing: '展開',
      target: '思考・判断・表現',
      tools: ['発表評価表', 'ルーブリック']
    });
  }
  
  return methods;
};

const generateDifferentiationStrategies = (): string[] => {
  return [
    '習熟度に応じた課題設定',
    '個別支援の実施',
    '多様な表現方法の提供',
    'ICTを活用した学習支援',
    'ペア・グループ学習の活用'
  ];
};

const generateSpecialNeedsSupport = (): string[] => {
  return [
    '視覚的支援の提供',
    '個別の配慮事項への対応',
    '学習環境の調整',
    '適切な評価方法の選択',
    '支援員との連携'
  ];
};

const generateExtensionActivities = (subject: string): string[] => {
  const activities: { [key: string]: string[] } = {
    '数学': [
      '発展的な問題への挑戦',
      '数学的モデリング活動',
      '他分野への応用探究'
    ],
    '理科': [
      '追加実験の実施',
      '科学的探究活動',
      '環境問題への応用'
    ],
    '国語': [
      '創作活動への発展',
      '文学作品の深い読み',
      '表現活動の多様化'
    ]
  };
  
  return activities[subject] || [
    '発展的な課題への取り組み',
    '他分野との関連学習',
    '探究的な学習活動'
  ];
};

const generateICTIntegration = (): ICTIntegration => {
  return {
    devices: ['タブレット', '電子黒板', 'プロジェクター'],
    software: ['学習支援アプリ', 'プレゼンテーションソフト', 'クラウドサービス'],
    purpose: ['情報収集', '整理・分析', '表現・発表', '協働学習'],
    studentRole: '主体的な情報活用者・協働学習者',
    teacherRole: '学習支援者・ファシリテーター'
  };
};

const generateDigitalResources = (subject: string): DigitalResource[] => {
  const baseResources: DigitalResource[] = [
    {
      type: 'video',
      name: '解説動画',
      description: '基本概念の理解を支援する動画教材',
      usage: '導入・展開時の説明補助'
    },
    {
      type: 'quiz',
      name: '理解度確認クイズ',
      description: '学習内容の定着を確認するデジタルクイズ',
      usage: 'まとめ時の理解度確認'
    }
  ];
  
  const subjectResources: { [key: string]: DigitalResource[] } = {
    '数学': [
      {
        type: 'simulation',
        name: 'グラフ作成ツール',
        description: 'インタラクティブなグラフ作成・操作ツール',
        usage: '関数学習時の視覚的理解'
      }
    ],
    '理科': [
      {
        type: 'simulation',
        name: 'バーチャル実験',
        description: 'デジタル環境での実験シミュレーション',
        usage: '実験の予習・復習'
      }
    ]
  };
  
  return [...baseResources, ...(subjectResources[subject] || [])];
};