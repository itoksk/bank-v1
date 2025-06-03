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

export interface LessonPhase {
  name: string;
  duration: number; // in minutes
  description: string;
  pdfPages?: number[];
}

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
}