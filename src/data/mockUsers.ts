import { Teacher, Student } from '../types/user';

// Changed from const to let to allow modification
let mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    email: 'tanaka@example.com',
    displayName: '田中 真理',
    role: 'teacher',
    school: '東京第一中学校',
    subject: '数学',
    experience: 12,
    bio: '中学校で数学を12年間教えています。生徒が楽しく学べる授業づくりを心がけています。',
    materialCount: 15,
    likeCount: 342,
    followerCount: 85,
    isFeatured: true,
    createdAt: '2022-04-15T09:24:00Z',
    updatedAt: '2023-09-22T14:30:00Z'
  },
  {
    id: 'teacher-2',
    email: 'yamada@example.com',
    displayName: '山田 健太',
    role: 'teacher',
    school: '大阪市立高等学校',
    subject: '理科',
    experience: 8,
    bio: '高校で物理と化学を教えています。実験を通じて科学の面白さを伝えたいと思っています。',
    materialCount: 23,
    likeCount: 287,
    followerCount: 62,
    isFeatured: true,
    createdAt: '2022-06-10T10:15:00Z',
    updatedAt: '2023-10-05T08:45:00Z'
  },
  {
    id: 'teacher-3',
    email: 'suzuki@example.com',
    displayName: '鈴木 花子',
    role: 'teacher',
    school: '仙台第三小学校',
    subject: '国語',
    experience: 15,
    bio: '小学校で国語を担当しています。読書の楽しさを伝える授業を心がけています。',
    materialCount: 31,
    likeCount: 456,
    followerCount: 104,
    isFeatured: true,
    createdAt: '2021-09-20T08:30:00Z',
    updatedAt: '2023-08-12T11:20:00Z'
  },
  {
    id: 'teacher-4',
    email: 'sato@example.com',
    displayName: '佐藤 洋平',
    role: 'teacher',
    school: '福岡県立高等学校',
    subject: '英語',
    experience: 10,
    bio: '高校で英語を教えています。コミュニケーション能力を高める授業を大切にしています。',
    materialCount: 19,
    likeCount: 312,
    followerCount: 78,
    isFeatured: true,
    createdAt: '2022-02-15T11:45:00Z',
    updatedAt: '2023-07-30T15:10:00Z'
  },
  {
    id: 'teacher-5',
    email: 'kobayashi@example.com',
    displayName: '小林 直子',
    role: 'teacher',
    school: '名古屋市立中学校',
    subject: '社会',
    experience: 7,
    bio: '中学校で社会科を担当しています。歴史や地理を身近に感じてもらえるよう工夫しています。',
    materialCount: 12,
    likeCount: 187,
    followerCount: 45,
    isFeatured: false,
    createdAt: '2022-05-05T13:20:00Z',
    updatedAt: '2023-09-01T09:30:00Z'
  }
];

// Changed from const to let to allow modification
let mockStudents: Student[] = [
  {
    id: 'student-1',
    email: 'nakata@example.com',
    displayName: '中田 大輔',
    role: 'student',
    grade: 'high-school-2',
    interests: ['数学', '物理'],
    createdAt: '2023-04-10T14:30:00Z',
    updatedAt: '2023-10-02T16:15:00Z'
  },
  {
    id: 'student-2',
    email: 'ito@example.com',
    displayName: '伊藤 さくら',
    role: 'student',
    grade: 'junior-high-3',
    interests: ['英語', '国語'],
    createdAt: '2023-05-22T09:45:00Z',
    updatedAt: '2023-09-15T10:20:00Z'
  }
];

export { mockTeachers, mockStudents }