import { User } from '../types/user';
import { mockTeachers, mockStudents } from '../data/mockUsers';

export const fetchUserById = async (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockTeachers.find(t => t.id === id) || 
                  mockStudents.find(s => s.id === id);
      
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

export const fetchFeaturedTeachers = async (limit: number = 3): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featuredTeachers = mockTeachers
        .filter(teacher => teacher.isFeatured)
        .slice(0, limit);
      resolve(featuredTeachers);
    }, 500);
  });
};