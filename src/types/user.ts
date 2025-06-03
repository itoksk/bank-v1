export interface User {
  id: string;
  email: string;
  displayName?: string;
  profileImage?: string;
  role: 'teacher' | 'student' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Teacher extends User {
  role: 'teacher';
  school?: string;
  subject?: string;
  experience?: number; // years
  bio?: string;
  materialCount?: number;
  likeCount?: number;
  followerCount?: number;
  isFeatured?: boolean;
}

export interface Student extends User {
  role: 'student';
  grade?: string;
  interests?: string[];
  learningHistory?: LearningHistory[];
  favoriteTeachers?: string[]; // teacher IDs
  bookmarkedMaterials?: string[]; // material IDs
}

export interface LearningHistory {
  materialId: string;
  title: string;
  viewedAt: string;
  progress: number; // 0-100%
  completed: boolean;
}