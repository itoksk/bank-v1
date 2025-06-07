import { Material, LessonGuide, LessonPlan, LessonPhase, LessonGoal, MaterialDetails } from '../types/material';
import { getCurriculumStandards } from '../data/curriculumStandards';

// 学校種を判定する関数
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
    '公民': 'social'
  };
  
  return subjectMap[subject] || subject.toLowerCase();
};

// 学習指導要領に基づく学習目標を生成
const generateLearningGoals = (material: Material, schoolLevel: string, normalizedSubject: string): LessonGoal[] => {
  const curriculumStandards = getCurriculumStandards(schoolLevel, normalizedSubject);
  
  const baseGoals: LessonGoal[] = [
    {
      competencyArea: '知識・技能',
      goal: `${material.subject}の基本的な概念や原理・法則を理解し、技能を身に付ける`,
      indicators: ['基本概念の理解', '技能の習得', '知識の定着']
    },
    {
      competencyArea: '思考・判断・表現',
      goal: '課題を見つけ、解決に向けて考察し、根拠を明確にして表現する',
      indicators: ['課題発見力', '論理的思考力', '表現力']
    },
    {
      competencyArea: '学びに向かう力・人間性',
      goal: '主体的に学習に取り組み、協働的に学ぶ態度を養う',
      indicators: ['主体性', '協働性', '学習意欲']
    }
  ];

  // カリキュラム基準に基づいて目標を調整
  if (curriculumStandards.length > 0) {
    const standard = curriculumStandards[0];
    baseGoals[0].goal = `${standard.title}について理解し、${standard.skills.join('、')}を身に付ける`;
    baseGoals[0].indicators = standard.skills;
  }

  return baseGoals;
};

// 授業の流れを自動生成（学習指導案の構成に基づく）
const generateLessonPlan = (material: Material, materialDetails?: MaterialDetails): LessonPlan => {
  const totalDuration = material.duration;
  const introductionTime = Math.floor(totalDuration * 0.15); // 導入 15%
  const developmentTime = Math.floor(totalDuration * 0.70); // 展開 70%
  const conclusionTime = totalDuration - introductionTime - developmentTime; // まとめ 残り

  const phases: LessonPhase[] = [
    {
      name: '導入',
      duration: introductionTime,
      description: '学習への関心・意欲を高め、本時の学習課題を設定する',
      activities: [
        {
          type: 'whole-class',
          description: '前時の振り返りと本時の学習内容の確認',
          duration: Math.floor(introductionTime * 0.4),
          instructions: [
            '前時の学習内容を振り返る',
            '本時の学習目標を確認する',
            '学習の見通しを持つ'
          ]
        },
        {
          type: 'whole-class',
          description: '導入活動・課題提示',
          duration: Math.floor(introductionTime * 0.6),
          instructions: [
            '興味・関心を引く導入活動を行う',
            '学習課題を提示する',
            '課題解決の見通しを立てる'
          ]
        }
      ],
      teacherActions: [
        '前時の学習内容を確認する',
        '本時の学習目標を明確に示す',
        '学習課題を提示し、解決への意欲を喚起する'
      ],
      studentActions: [
        '前時の学習を振り返る',
        '本時の学習目標を理解する',
        '学習課題に対する関心を持つ'
      ],
      materials: ['教科書', 'ワークシート', 'ICT機器'],
      evaluationPoints: ['学習への関心・意欲', '課題理解度']
    },
    {
      name: '展開',
      duration: developmentTime,
      description: '課題解決に向けた学習活動を通して、知識・技能を習得し、思考力を育成する',
      activities: [
        {
          type: 'individual',
          description: '個別学習・課題解決',
          duration: Math.floor(developmentTime * 0.4),
          instructions: [
            '個人で課題に取り組む',
            '必要に応じて教材を参照する',
            '分からない点を明確にする'
          ]
        },
        {
          type: 'group',
          description: 'グループ活動・協働学習',
          duration: Math.floor(developmentTime * 0.4),
          instructions: [
            'グループで意見交換を行う',
            '多様な考えを共有する',
            '協働して課題解決に取り組む'
          ]
        },
        {
          type: 'whole-class',
          description: '全体共有・発表',
          duration: Math.floor(developmentTime * 0.2),
          instructions: [
            '各グループの成果を発表する',
            '他のグループの発表を聞く',
            '学習内容を整理・確認する'
          ]
        }
      ],
      teacherActions: [
        '個別指導を行う',
        'グループ活動を支援する',
        '適切な発問を行う',
        '学習内容を整理・確認する'
      ],
      studentActions: [
        '主体的に課題に取り組む',
        '協働的に学習する',
        '自分の考えを表現する',
        '他者の意見を聞く'
      ],
      materials: ['教科書', 'ワークシート', 'ICT機器', '実験器具'],
      evaluationPoints: ['知識・技能の習得', '思考・判断・表現', '協働性'],
      ictUsage: 'タブレットを活用した情報収集・整理'
    },
    {
      name: 'まとめ',
      duration: conclusionTime,
      description: '学習内容を振り返り、定着を図るとともに、次時への見通しを持つ',
      activities: [
        {
          type: 'whole-class',
          description: '学習内容の振り返り・まとめ',
          duration: Math.floor(conclusionTime * 0.7),
          instructions: [
            '本時の学習内容を振り返る',
            '重要なポイントを確認する',
            '学習目標の達成度を確認する'
          ]
        },
        {
          type: 'individual',
          description: '自己評価・次時の予告',
          duration: Math.floor(conclusionTime * 0.3),
          instructions: [
            '自己評価を行う',
            '次時の学習内容を確認する',
            '宿題・課題を確認する'
          ]
        }
      ],
      teacherActions: [
        '学習内容をまとめる',
        '重要なポイントを強調する',
        '次時の予告を行う'
      ],
      studentActions: [
        '学習内容を振り返る',
        '自己評価を行う',
        '次時への見通しを持つ'
      ],
      materials: ['ワークシート', '振り返りシート'],
      evaluationPoints: ['学習内容の理解度', '自己評価能力']
    }
  ];

  // 教材詳細がある場合は、準備物を各フェーズに反映
  if (materialDetails?.preparationItems) {
    phases.forEach(phase => {
      const additionalMaterials = materialDetails.preparationItems
        .filter(item => !item.isOptional)
        .map(item => item.name);
      phase.materials = [...new Set([...phase.materials, ...additionalMaterials])];
    });
  }

  return {
    phases,
    totalDuration,
    keyQuestions: [
      '前時の学習で何を学びましたか？',
      '今日の学習課題は何ですか？',
      'どのような方法で解決できそうですか？',
      '他のグループの発表を聞いて、どう思いましたか？',
      '今日の学習で分かったことは何ですか？'
    ],
    anticipatedResponses: {
      '前時の学習で何を学びましたか？': [
        '基本的な概念について学んだ',
        '計算方法を覚えた',
        '実験の結果が分かった'
      ],
      '今日の学習課題は何ですか？': [
        '新しい概念を理解すること',
        '応用問題を解くこと',
        '実験結果を考察すること'
      ]
    }
  };
};

// 板書計画を自動生成
const generateBoardPlan = (material: Material) => {
  return {
    layout: [
      {
        position: 'left' as const,
        content: `【本時の目標】\n${material.title}について理解し、活用できるようになる`,
        type: 'text' as const
      },
      {
        position: 'center' as const,
        content: `【学習課題】\n${material.description.substring(0, 100)}...`,
        type: 'text' as const
      },
      {
        position: 'right' as const,
        content: '【まとめ】\n（授業の進行に応じて記入）',
        type: 'text' as const
      }
    ],
    keyPoints: [
      '学習目標を明確に示す',
      '重要な概念は色チョークで強調',
      '生徒の発言を整理して記録'
    ],
    visualAids: [
      '図表・グラフの活用',
      '色分けによる整理',
      '矢印による関係性の明示'
    ]
  };
};

// 指導方法・工夫を生成
const generateTeachingStrategies = (material: Material, materialDetails?: MaterialDetails) => {
  const baseStrategies = [
    {
      strategy: '個別最適化学習',
      purpose: '一人ひとりの理解度に応じた指導',
      implementation: '習熟度に応じた課題設定、個別支援の実施',
      expectedOutcome: '全ての生徒の理解促進'
    },
    {
      strategy: '協働学習',
      purpose: '多様な考えの共有と深い学び',
      implementation: 'グループ活動、ペア学習の効果的な活用',
      expectedOutcome: 'コミュニケーション能力と思考力の向上'
    },
    {
      strategy: 'ICT活用',
      purpose: '効果的な情報収集・整理・表現',
      implementation: 'タブレット、電子黒板等の活用',
      expectedOutcome: '情報活用能力の育成'
    }
  ];

  // 教材詳細に基づいて戦略を追加
  if (materialDetails?.differentiationStrategies) {
    materialDetails.differentiationStrategies.forEach(strategy => {
      baseStrategies.push({
        strategy: strategy,
        purpose: '個別のニーズに応じた支援',
        implementation: '具体的な支援方法の実施',
        expectedOutcome: '全ての生徒の学習参加'
      });
    });
  }

  return baseStrategies;
};

// 評価計画を生成
const generateEvaluationPlan = (material: Material, materialDetails?: MaterialDetails) => {
  return {
    formativeAssessment: [
      {
        timing: '導入時',
        method: '観察・発問',
        criteria: '学習への関心・意欲',
        feedback: '積極的な参加を促す声かけ'
      },
      {
        timing: '展開時',
        method: 'ワークシート・観察',
        criteria: '知識・技能の習得状況',
        feedback: '個別指導による支援'
      },
      {
        timing: 'まとめ時',
        method: '振り返りシート',
        criteria: '学習内容の理解度',
        feedback: '次時への課題提示'
      }
    ],
    summativeAssessment: {
      method: '単元テスト・レポート',
      criteria: [
        '基本的な知識・技能の習得',
        '思考・判断・表現力',
        '学習に取り組む態度'
      ],
      rubric: '3段階評価（A：十分満足、B：おおむね満足、C：努力を要する）'
    },
    selfAssessment: '振り返りシートによる自己評価',
    peerAssessment: 'グループ活動での相互評価'
  };
};

// 教材詳細から授業ガイドを自動生成
export const generateLessonGuideFromMaterial = async (
  material: Material,
  materialDetails?: MaterialDetails
): Promise<LessonGuide> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const schoolLevel = determineSchoolLevel(material.grade);
      const normalizedSubject = normalizeSubject(material.subject);
      
      const lessonGuide: LessonGuide = {
        unitTitle: `${material.subject} - ${material.title}の単元`,
        lessonTitle: material.title,
        lessonNumber: '第1時',
        totalLessons: Math.ceil(material.duration / 45), // 45分授業を基準
        
        unitGoals: [
          `${material.subject}の基本的な概念を理解する`,
          '学習した内容を日常生活に活用できる',
          '主体的・協働的に学習に取り組む態度を養う'
        ],
        
        lessonGoals: generateLearningGoals(material, schoolLevel, normalizedSubject),
        
        lessonPlan: generateLessonPlan(material, materialDetails),
        
        boardPlan: generateBoardPlan(material),
        
        teachingStrategies: generateTeachingStrategies(material, materialDetails),
        
        questioningTechniques: [
          '開かれた質問で多様な考えを引き出す',
          '段階的な発問で思考を深める',
          '生徒の発言を受けて発展的な質問をする',
          '具体例から抽象概念へ導く質問をする'
        ],
        
        evaluationPlan: generateEvaluationPlan(material, materialDetails),
        
        homework: `本時の学習内容を復習し、${material.subject}の基本概念を確認する`,
        nextLessonPreview: '次時は応用問題に取り組み、理解を深めます',
        reflectionNotes: '（授業後に記入）'
      };
      
      resolve(lessonGuide);
    }, 1500); // 生成時間をシミュレート
  });
};

// 教材詳細のテンプレートを生成
export const generateMaterialDetailsTemplate = (material: Material): MaterialDetails => {
  const schoolLevel = determineSchoolLevel(material.grade);
  const normalizedSubject = normalizeSubject(material.subject);
  const curriculumStandards = getCurriculumStandards(schoolLevel, normalizedSubject);
  
  return {
    learningObjectives: [
      `${material.subject}の基本的な概念を理解する`,
      '学習した内容を適切に活用できる',
      '主体的に学習に取り組む態度を養う'
    ],
    
    prerequisites: [
      '前学年までの基礎的な知識',
      '基本的な学習技能',
      '協働学習への参加経験'
    ],
    
    targetStudents: `${material.grade}の生徒（個別の配慮を要する生徒を含む）`,
    
    preparationItems: [
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
    ],
    
    requiredEquipment: [
      '電子黒板・プロジェクター',
      'タブレット端末',
      'インターネット環境'
    ],
    
    safetyConsiderations: [
      'ICT機器の適切な使用方法の指導',
      '個人情報の取り扱いに関する注意',
      '健康面への配慮（画面との距離等）'
    ],
    
    curriculumAlignment: curriculumStandards.map(standard => ({
      code: standard.code,
      title: standard.title,
      description: standard.description,
      competencyArea: '知識・技能' as const
    })),
    
    relatedUnits: [
      '前単元との関連',
      '後続単元への発展',
      '他学年との系統性'
    ],
    
    crossCurricularConnections: [
      '他教科との関連性',
      '総合的な学習の時間との連携',
      '特別活動との関連'
    ],
    
    assessmentCriteria: [
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
    ],
    
    evaluationMethods: [
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
    ],
    
    differentiationStrategies: [
      '習熟度に応じた課題設定',
      '個別支援の実施',
      '多様な表現方法の提供',
      'ICTを活用した学習支援'
    ],
    
    supportForSpecialNeeds: [
      '視覚的支援の提供',
      '個別の配慮事項への対応',
      '学習環境の調整',
      '適切な評価方法の選択'
    ],
    
    extensionActivities: [
      '発展的な課題への取り組み',
      '他分野との関連学習',
      '探究的な学習活動',
      '成果の発表・共有'
    ],
    
    ictIntegration: {
      devices: ['タブレット', '電子黒板', 'プロジェクター'],
      software: ['学習支援アプリ', 'プレゼンテーションソフト'],
      purpose: ['情報収集', '整理・分析', '表現・発表'],
      studentRole: '主体的な情報活用者',
      teacherRole: '学習支援者・ファシリテーター'
    },
    
    digitalResources: [
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
    ]
  };
};