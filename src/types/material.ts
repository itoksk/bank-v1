import { User, Teacher } from './user';

export interface Material {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  pdfUrl: string;
  subject: string;
  grade: string;
  author: Teacher;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  forkCount: number;
  duration: number; // in minutes
  difficulty: number; // 1-5
  
  // Enhanced material details
  materialDetails?: MaterialDetails;
  lessonGuide?: LessonGuide;
  
  // Legacy fields for backward compatibility
  preparationItems?: string[];
  lessonFlow?: LessonPhase[];
  teachingPoints?: string[];
  evaluationMethods?: string[];
  forkFrom?: {
    id: string;
    title: string;
  };
  version: string;
  versionHistory?: VersionHistory[];
  contributors?: User[];
}

export interface MaterialDetails {
  // 基本情報
  learningObjectives: string[]; // 学習目標
  prerequisites: string[]; // 前提知識・技能
  targetStudents: string; // 対象生徒
  
  // 教材情報
  preparationItems: PreparationItem[]; // 準備物
  requiredEquipment: string[]; // 必要な設備・機器
  safetyConsiderations: string[]; // 安全上の注意点
  
  // カリキュラム関連
  curriculumAlignment: CurriculumAlignment[]; // 学習指導要領との対応
  relatedUnits: string[]; // 関連単元
  crossCurricularConnections: string[]; // 他教科との関連
  
  // 評価関連
  assessmentCriteria: AssessmentCriterion[]; // 評価規準
  evaluationMethods: EvaluationMethod[]; // 評価方法
  rubric?: Rubric; // ルーブリック
  
  // 個別最適化
  differentiationStrategies: string[]; // 個別最適化の方法
  supportForSpecialNeeds: string[]; // 特別な配慮を要する生徒への支援
  extensionActivities: string[]; // 発展的な学習活動
  
  // ICT活用
  ictIntegration: ICTIntegration; // ICT活用方法
  digitalResources: DigitalResource[]; // デジタル教材・リソース
}

export interface LessonGuide {
  // 学習指導案の基本構成
  unitTitle: string; // 単元名
  lessonTitle: string; // 本時の題材
  lessonNumber: string; // 第○時
  totalLessons: number; // 全○時間
  
  // 学習目標
  unitGoals: string[]; // 単元の目標
  lessonGoals: LessonGoal[]; // 本時の目標（3観点）
  
  // 指導計画
  lessonPlan: LessonPlan; // 指導過程
  boardPlan: BoardPlan; // 板書計画
  
  // 指導上の工夫
  teachingStrategies: TeachingStrategy[]; // 指導方法・工夫
  questioningTechniques: string[]; // 発問の工夫
  
  // 評価計画
  evaluationPlan: EvaluationPlan; // 評価計画
  
  // その他
  homework?: string; // 宿題・課題
  nextLessonPreview?: string; // 次時の予告
  reflectionNotes?: string; // 授業後の振り返り
}

export interface PreparationItem {
  category: 'material' | 'equipment' | 'handout' | 'digital';
  name: string;
  quantity?: string;
  notes?: string;
  isOptional?: boolean;
}

export interface CurriculumAlignment {
  code: string; // 学習指導要領の項目コード
  title: string; // 項目名
  description: string; // 内容
  competencyArea: '知識・技能' | '思考・判断・表現' | '学びに向かう力・人間性';
}

export interface AssessmentCriterion {
  competencyArea: '知識・技能' | '思考・判断・表現' | '学びに向かう力・人間性';
  criterion: string; // 評価規準
  indicators: string[]; // 評価の観点
}

export interface EvaluationMethod {
  method: string; // 評価方法
  timing: '導入' | '展開' | 'まとめ' | '事後';
  target: string; // 評価対象
  tools: string[]; // 評価ツール
}

export interface Rubric {
  criteria: RubricCriterion[];
  levels: string[]; // 評価レベル（例：A, B, C）
}

export interface RubricCriterion {
  name: string;
  descriptions: { [level: string]: string };
}

export interface ICTIntegration {
  devices: string[]; // 使用機器
  software: string[]; // 使用ソフトウェア
  purpose: string[]; // 活用目的
  studentRole: string; // 生徒の役割
  teacherRole: string; // 教師の役割
}

export interface DigitalResource {
  type: 'video' | 'simulation' | 'quiz' | 'document' | 'website';
  name: string;
  url?: string;
  description: string;
  usage: string; // 使用場面
}

export interface LessonGoal {
  competencyArea: '知識・技能' | '思考・判断・表現' | '学びに向かう力・人間性';
  goal: string;
  indicators: string[]; // 評価の観点
}

export interface LessonPlan {
  phases: LessonPhase[];
  totalDuration: number;
  keyQuestions: string[]; // 主要な発問
  anticipatedResponses: { [question: string]: string[] }; // 予想される生徒の反応
}

export interface LessonPhase {
  name: string;
  duration: number; // in minutes
  description: string;
  activities: Activity[];
  teacherActions: string[]; // 教師の働きかけ
  studentActions: string[]; // 生徒の活動
  materials: string[]; // 使用教材
  evaluationPoints?: string[]; // 評価のポイント
  ictUsage?: string; // ICT活用
  pdfPages?: number[];
}

export interface Activity {
  type: 'individual' | 'pair' | 'group' | 'whole-class';
  description: string;
  duration: number;
  materials?: string[];
  instructions: string[];
}

export interface BoardPlan {
  layout: BoardSection[];
  keyPoints: string[]; // 重要なポイント
  visualAids: string[]; // 視覚的補助
}

export interface BoardSection {
  position: 'left' | 'center' | 'right';
  content: string;
  type: 'text' | 'diagram' | 'formula' | 'table';
}

export interface TeachingStrategy {
  strategy: string;
  purpose: string;
  implementation: string;
  expectedOutcome: string;
}

export interface EvaluationPlan {
  formativeAssessment: FormativeAssessment[];
  summativeAssessment?: SummativeAssessment;
  selfAssessment?: string;
  peerAssessment?: string;
}

export interface FormativeAssessment {
  timing: string;
  method: string;
  criteria: string;
  feedback: string;
}

export interface SummativeAssessment {
  method: string;
  criteria: string[];
  rubric?: string;
}

// Legacy interfaces for backward compatibility
export interface VersionHistory {
  version: string;
  date: string;
  author: User;
  changes: string;
}

export interface MaterialComment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  isTeacher: boolean;
  rating?: number;
}

export interface MaterialSearchParams {
  category?: string;
  grade?: string;
  subject?: string;
  query?: string;
  limit?: number;
  page?: number;
  author?: string;
}