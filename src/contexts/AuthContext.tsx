import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Teacher, Student } from '../types/user';
import { mockLogin, mockLogout, mockRegister, mockGetCurrentUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isTeacher: false,
  isStudent: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const currentUser = await mockGetCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to get current user', err);
        setError('認証情報の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await mockLogin(email, password);
      setUser(user);
    } catch (err) {
      console.error('Login failed', err);
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await mockRegister(userData, password);
      setUser(user);
    } catch (err) {
      console.error('Registration failed', err);
      setError('登録に失敗しました。入力内容を確認してください。');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await mockLogout();
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
      setError('ログアウトに失敗しました');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is a teacher or student
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isTeacher,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};