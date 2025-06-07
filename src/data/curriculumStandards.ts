// 日本の学習指導要領に基づく教育基準
export const elementaryStandards = {
  math: [
    {
      code: 'A-1',
      title: '数と計算',
      description: '整数、小数、分数の概念と四則計算',
      skills: ['計算技能', '数的推論', '問題解決'],
      knowledgeAreas: ['数の概念', '計算方法', '数量関係']
    },
    {
      code: 'B-1',
      title: '図形',
      description: '平面図形と立体図形の性質',
      skills: ['空間認識', '図形操作', '論理的思考'],
      knowledgeAreas: ['図形の性質', '測定', '作図']
    }
  ],
  japanese: [
    {
      code: 'A-1',
      title: '話すこと・聞くこと',
      description: '相手や目的に応じた話し方・聞き方',
      skills: ['表現力', '理解力', 'コミュニケーション'],
      knowledgeAreas: ['言語技能', '表現方法', '聞き取り技能']
    },
    {
      code: 'B-1',
      title: '書くこと',
      description: '目的や相手に応じた文章作成',
      skills: ['文章構成力', '表現力', '推敲力'],
      knowledgeAreas: ['文章構成', '語彙', '表記法']
    }
  ]
};

export const juniorHighStandards = {
  math: [
    {
      code: 'A-1',
      title: '数と式',
      description: '正負の数、文字式、一次方程式',
      skills: ['代数的思考', '論理的推論', '問題解決'],
      knowledgeAreas: ['数の拡張', '文字式の計算', '方程式']
    },
    {
      code: 'B-1',
      title: '図形',
      description: '平面図形、空間図形、証明',
      skills: ['空間認識', '論理的思考', '証明'],
      knowledgeAreas: ['図形の性質', '合同・相似', '三平方の定理']
    }
  ],
  science: [
    {
      code: 'A-1',
      title: '物質・エネルギー',
      description: '物質の性質、化学変化、エネルギー',
      skills: ['観察・実験', '科学的思考', '問題解決'],
      knowledgeAreas: ['物質の構成', '化学反応', 'エネルギー変換']
    }
  ]
};

export const highSchoolStandards = {
  math: [
    {
      code: 'A-1',
      title: '数学I',
      description: '数と式、図形と計量、二次関数、データの分析',
      skills: ['数学的思考', '問題解決', 'データ活用'],
      knowledgeAreas: ['数と式', '図形', '関数', '統計']
    },
    {
      code: 'A-2',
      title: '数学II',
      description: '式と証明、複素数と方程式、図形と方程式、三角関数、指数・対数関数、微分・積分',
      skills: ['論理的思考', '数学的表現', '問題解決'],
      knowledgeAreas: ['代数', '幾何', '解析']
    }
  ]
};

export const getCurriculumStandards = (schoolLevel: string, subject: string) => {
  switch (schoolLevel) {
    case 'elementary':
      return elementaryStandards[subject as keyof typeof elementaryStandards] || [];
    case 'junior-high':
      return juniorHighStandards[subject as keyof typeof juniorHighStandards] || [];
    case 'high-school':
      return highSchoolStandards[subject as keyof typeof highSchoolStandards] || [];
    default:
      return [];
  }
};