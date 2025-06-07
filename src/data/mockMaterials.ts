import { Material } from '../types/material';
import { mockTeachers } from './mockUsers';

export const mockMaterials: Material[] = [
  {
    id: 'material-1',
    title: '二次関数の極値 - グラフ作成からの理解',
    description: `この教材では二次関数の極値について学びます。グラフの作成を通じて、二次関数の性質を視覚的に理解し、極大値・極小値の求め方をマスターします。

実際の応用例を交えながら、身近な現象を数学的に考察する力を養います。例題と演習問題を通して、理解を深めていきましょう。`,
    thumbnailUrl: 'https://images.pexels.com/photos/5905921/pexels-photo-5905921.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/quadratic-functions.mp4',
    pdfUrl: 'https://example.com/pdfs/quadratic-functions.pdf',
    subject: '数学',
    grade: '高校1年生',
    author: mockTeachers[0],
    createdAt: '2023-09-15T08:30:00Z',
    updatedAt: '2023-09-15T08:30:00Z',
    viewCount: 1245,
    likeCount: 87,
    forkCount: 12,
    duration: 45,
    difficulty: 3,
    preparationItems: [
      'グラフ用紙',
      '関数電卓',
      'ワークシート'
    ],
    lessonFlow: [
      {
        name: '導入',
        duration: 5,
        description: '身近な例を通して二次関数の応用例を紹介',
        pdfPages: [1]
      },
      {
        name: '基本概念の説明',
        duration: 15,
        description: '二次関数の性質とグラフ、極値の意味を解説',
        pdfPages: [2, 3, 4]
      },
      {
        name: '例題演習',
        duration: 15,
        description: '典型的な問題の解き方を実演',
        pdfPages: [5, 6]
      },
      {
        name: '個人ワーク',
        duration: 7,
        description: '各自で問題に取り組む時間',
        pdfPages: [7]
      },
      {
        name: 'まとめ',
        duration: 3,
        description: '本日の学習内容の振り返りと次回への予告',
        pdfPages: [8]
      }
    ],
    teachingPoints: [
      '二次関数のグラフと係数の関係を視覚的に理解させる',
      '極値の意味を実生活の例で説明する',
      '計算過程よりも概念理解を重視する'
    ],
    evaluationMethods: [
      '授業内ワークシートの完成度',
      '次回授業での小テスト'
    ],
    version: 'v1.2',
    versionHistory: [
      {
        version: 'v1.0',
        date: '2023-08-10T10:20:00Z',
        author: mockTeachers[0],
        changes: '初版作成'
      },
      {
        version: 'v1.1',
        date: '2023-08-25T14:15:00Z',
        author: mockTeachers[0],
        changes: '例題を追加、説明を改善'
      },
      {
        version: 'v1.2',
        date: '2023-09-15T08:30:00Z',
        author: mockTeachers[0],
        changes: '応用問題を追加、PDF改訂'
      }
    ]
  },
  {
    id: 'material-2',
    title: '化学反応式のバランス - 物質量の概念',
    description: '化学反応式の書き方とバランスの取り方を学ぶ授業です。物質量（モル）の概念を理解し、化学反応の量的関係を考察します。実験映像も交えて、理解を深めましょう。',
    thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/chemical-equations.mp4',
    pdfUrl: 'https://example.com/pdfs/chemical-equations.pdf',
    subject: '理科',
    grade: '高校1年生',
    author: mockTeachers[1],
    createdAt: '2023-08-22T11:15:00Z',
    updatedAt: '2023-09-10T09:45:00Z',
    viewCount: 978,
    likeCount: 65,
    forkCount: 8,
    duration: 50,
    difficulty: 4,
    version: 'v1.0'
  },
  {
    id: 'material-3',
    title: '古典文学入門 - 枕草子を読む',
    description: '平安時代の随筆文学「枕草子」を通して、古典文学の魅力と表現方法を学びます。季節の描写や感性の表現から、現代にも通じる文学の普遍性を考えます。',
    thumbnailUrl: 'https://images.pexels.com/photos/6333771/pexels-photo-6333771.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/makura-no-soshi.mp4',
    pdfUrl: 'https://example.com/pdfs/makura-no-soshi.pdf',
    subject: '国語',
    grade: '中学3年生',
    author: mockTeachers[2],
    createdAt: '2023-07-18T13:40:00Z',
    updatedAt: '2023-08-05T10:20:00Z',
    viewCount: 1560,
    likeCount: 120,
    forkCount: 15,
    duration: 45,
    difficulty: 3,
    version: 'v2.1'
  },
  {
    id: 'material-4',
    title: '英会話ベーシック - 日常会話のフレーズ',
    description: '日常生活で使える基本的な英会話フレーズを学びます。発音のコツや会話のリズム感を重視し、実践的なコミュニケーション能力を養います。',
    thumbnailUrl: 'https://images.pexels.com/photos/6457521/pexels-photo-6457521.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/basic-english-conversation.mp4',
    pdfUrl: 'https://example.com/pdfs/basic-english-conversation.pdf',
    subject: '英語',
    grade: '中学2年生',
    author: mockTeachers[3],
    createdAt: '2023-09-05T09:10:00Z',
    updatedAt: '2023-09-05T09:10:00Z',
    viewCount: 2340,
    likeCount: 198,
    forkCount: 23,
    duration: 40,
    difficulty: 2,
    version: 'v1.0'
  },
  {
    id: 'material-5',
    title: '日本の戦国時代 - 織田信長と天下統一',
    description: '戦国時代における織田信長の活躍と天下統一への道のりを学びます。当時の社会背景や文化、国際関係も含めて総合的に理解します。',
    thumbnailUrl: 'https://images.pexels.com/photos/5603660/pexels-photo-5603660.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/sengoku-nobunaga.mp4',
    pdfUrl: 'https://example.com/pdfs/sengoku-nobunaga.pdf',
    subject: '社会',
    grade: '中学2年生',
    author: mockTeachers[4],
    createdAt: '2023-06-12T14:25:00Z',
    updatedAt: '2023-07-20T11:30:00Z',
    viewCount: 1875,
    likeCount: 155,
    forkCount: 19,
    duration: 50,
    difficulty: 3,
    version: 'v1.3'
  },
  {
    id: 'material-6',
    title: '小学生のためのプログラミング入門',
    description: 'ビジュアルプログラミング言語を使って、プログラミングの基本概念を楽しく学びます。論理的思考力と問題解決能力を育みましょう。',
    thumbnailUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/kids-programming.mp4',
    pdfUrl: 'https://example.com/pdfs/kids-programming.pdf',
    subject: 'その他',
    grade: '小学5年生',
    author: mockTeachers[0],
    createdAt: '2023-08-30T10:50:00Z',
    updatedAt: '2023-08-30T10:50:00Z',
    viewCount: 1240,
    likeCount: 110,
    forkCount: 14,
    duration: 45,
    difficulty: 2,
    version: 'v1.0'
  },
  {
    id: 'material-7',
    title: '分数の足し算・引き算',
    description: '分数の足し算と引き算の方法をわかりやすく解説します。通分の意味や計算の手順を丁寧に説明し、様々な問題パターンに対応できる力を身につけます。',
    thumbnailUrl: 'https://images.pexels.com/photos/6238048/pexels-photo-6238048.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/fraction-addition.mp4',
    pdfUrl: 'https://example.com/pdfs/fraction-addition.pdf',
    subject: '数学',
    grade: '小学6年生',
    author: mockTeachers[0],
    createdAt: '2023-09-08T13:15:00Z',
    updatedAt: '2023-09-08T13:15:00Z',
    viewCount: 980,
    likeCount: 85,
    forkCount: 10,
    duration: 40,
    difficulty: 2,
    version: 'v1.0'
  },
  {
    id: 'material-8',
    title: '地球環境と生態系 - 持続可能な未来のために',
    description: '地球環境問題と生態系の関係について学びます。環境保全の重要性と持続可能な社会の実現に向けた取り組みについて考察します。',
    thumbnailUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/ecosystem-sustainability.mp4',
    pdfUrl: 'https://example.com/pdfs/ecosystem-sustainability.pdf',
    subject: '理科',
    grade: '中学3年生',
    author: mockTeachers[1],
    createdAt: '2023-07-25T09:30:00Z',
    updatedAt: '2023-08-10T14:20:00Z',
    viewCount: 1320,
    likeCount: 95,
    forkCount: 12,
    duration: 50,
    difficulty: 3,
    version: 'v1.1'
  },
  // 小学校の教材を追加
  {
    id: 'material-9',
    title: 'かけ算九九の覚え方',
    description: '楽しく九九を覚える方法を学びます。歌やリズムを使って、自然に九九を身につけましょう。',
    thumbnailUrl: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/multiplication-table.mp4',
    pdfUrl: 'https://example.com/pdfs/multiplication-table.pdf',
    subject: '数学',
    grade: '小学2年生',
    author: mockTeachers[0],
    createdAt: '2023-09-01T10:00:00Z',
    updatedAt: '2023-09-01T10:00:00Z',
    viewCount: 1500,
    likeCount: 120,
    forkCount: 8,
    duration: 30,
    difficulty: 1,
    version: 'v1.0'
  },
  {
    id: 'material-10',
    title: 'ひらがなの書き方練習',
    description: '正しいひらがなの書き順と形を学びます。美しい文字を書くコツを身につけましょう。',
    thumbnailUrl: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/hiragana-writing.mp4',
    pdfUrl: 'https://example.com/pdfs/hiragana-writing.pdf',
    subject: '国語',
    grade: '小学1年生',
    author: mockTeachers[2],
    createdAt: '2023-08-15T09:00:00Z',
    updatedAt: '2023-08-15T09:00:00Z',
    viewCount: 2100,
    likeCount: 180,
    forkCount: 15,
    duration: 25,
    difficulty: 1,
    version: 'v1.0'
  },
  // 中学校の教材を追加
  {
    id: 'material-11',
    title: '一次方程式の解き方',
    description: '一次方程式の基本的な解き方を学びます。移項の概念を理解し、様々な問題に応用できるようになりましょう。',
    thumbnailUrl: 'https://images.pexels.com/photos/5905921/pexels-photo-5905921.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://example.com/videos/linear-equations.mp4',
    pdfUrl: 'https://example.com/pdfs/linear-equations.pdf',
    subject: '数学',
    grade: '中学1年生',
    author: mockTeachers[0],
    createdAt: '2023-08-20T11:00:00Z',
    updatedAt: '2023-08-20T11:00:00Z',
    viewCount: 1800,
    likeCount: 140,
    forkCount: 20,
    duration: 45,
    difficulty: 3,
    version: 'v1.0'
  }
];