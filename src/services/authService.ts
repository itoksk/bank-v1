import { User, Teacher, Student } from '../types/user';
import { mockTeachers, mockStudents } from '../data/mockUsers';

// Mock user session storage (in a real app, this would use localStorage, cookies, etc.)
let currentUser: User | null = null;

export const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, this would verify credentials with a backend
      // For demo purposes, we'll accept any email ending with @example.com
      if (email.endsWith('@example.com') && password.length >= 6) {
        // Find user in mock data
        let user = mockTeachers.find(u => u.email === email) || 
                  mockStudents.find(u => u.email === email);
        
        if (!user) {
          // Create a new user if not found
          const isTeacher = email.includes('teacher');
          const now = new Date().toISOString();
          const userId = `user-${Date.now()}`;
          
          if (isTeacher) {
            const newTeacher: Teacher = {
              id: userId,
              email,
              displayName: email.split('@')[0],
              role: 'teacher',
              school: '',
              subject: '',
              experience: 0,
              materialCount: 0,
              likeCount: 0,
              followerCount: 0,
              isFeatured: false,
              createdAt: now,
              updatedAt: now
            };
            mockTeachers.push(newTeacher);
            user = newTeacher;
          } else {
            const newStudent: Student = {
              id: userId,
              email,
              displayName: email.split('@')[0],
              role: 'student',
              grade: 'high-school-1',
              interests: [],
              createdAt: now,
              updatedAt: now
            };
            mockStudents.push(newStudent);
            user = newStudent;
          }
        }
        
        currentUser = user;
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const mockRegister = async (userData: Partial<User>, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate required fields
      if (!userData.email || !password || password.length < 6) {
        reject(new Error('Invalid user data or password too short'));
        return;
      }

      const now = new Date().toISOString();
      const userId = `user-${Date.now()}`;
      
      // Create a new user based on role
      if (userData.role === 'teacher') {
        const newTeacher: Teacher = {
          id: userId,
          email: userData.email,
          displayName: userData.displayName || userData.email.split('@')[0],
          role: 'teacher',
          school: '',
          subject: '',
          experience: 0,
          materialCount: 0,
          likeCount: 0,
          followerCount: 0,
          isFeatured: false,
          createdAt: now,
          updatedAt: now,
          ...userData
        };
        mockTeachers.push(newTeacher);
        currentUser = newTeacher;
        resolve(newTeacher);
      } else {
        const newStudent: Student = {
          id: userId,
          email: userData.email,
          displayName: userData.displayName || userData.email.split('@')[0],
          role: 'student',
          grade: 'high-school-1',
          interests: [],
          createdAt: now,
          updatedAt: now,
          ...userData
        };
        mockStudents.push(newStudent);
        currentUser = newStudent;
        resolve(newStudent);
      }
    }, 800);
  });
};

export const mockLogout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      resolve();
    }, 300);
  });
};

export const mockGetCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 300);
  });
};