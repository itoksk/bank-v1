import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, School, BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';
  
  const [role, setRole] = useState<'teacher' | 'student'>(initialRole as 'teacher' | 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Update role when URL param changes
  useEffect(() => {
    if (initialRole === 'teacher' || initialRole === 'student') {
      setRole(initialRole);
    }
  }, [initialRole]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password || !confirmPassword || !displayName) {
      toast.error('必須項目を入力してください');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('パスワードが一致しません');
      return;
    }
    
    if (password.length < 6) {
      toast.error('パスワードは6文字以上で入力してください');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare user data based on role
      const userData = {
        email,
        displayName,
        role,
        ...(role === 'teacher' ? {
          school,
          subject,
          experience: parseInt(experience) || 0
        } : {
          grade
        })
      };
      
      await register(userData, password);
      toast.success('登録が完了しました');
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('登録に失敗しました。入力内容を確認してください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">アカウント登録</h1>
          <p className="text-gray-600">
            {role === 'teacher' ? '教師' : '生徒'}としてアカウントを作成します
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Role Selector */}
          <div className="flex mb-6 border border-gray-200 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-3 text-center ${
                role === 'teacher'
                  ? 'bg-blue-600 text-white rounded-l-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 transition-colors'
              }`}
              onClick={() => setRole('teacher')}
            >
              教師
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-center ${
                role === 'student'
                  ? 'bg-blue-600 text-white rounded-r-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 transition-colors'
              }`}
              onClick={() => setRole('student')}
            >
              生徒
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@example.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                氏名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  autoComplete="name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="山田 太郎"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Teacher-specific fields */}
            {role === 'teacher' && (
              <>
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                    所属学校
                  </label>
                  <div className="relative">
                    <input
                      id="school"
                      name="school"
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="○○中学校"
                    />
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    担当教科
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      <option value="math">数学</option>
                      <option value="japanese">国語</option>
                      <option value="science">理科</option>
                      <option value="social">社会</option>
                      <option value="english">英語</option>
                      <option value="other">その他</option>
                    </select>
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    指導歴（年数）
                  </label>
                  <div className="relative">
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      max="50"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </>
            )}
            
            {/* Student-specific fields */}
            {role === 'student' && (
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  学年
                </label>
                <div className="relative">
                  <select
                    id="grade"
                    name="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="elementary-1">小学1年生</option>
                    <option value="elementary-2">小学2年生</option>
                    <option value="elementary-3">小学3年生</option>
                    <option value="elementary-4">小学4年生</option>
                    <option value="elementary-5">小学5年生</option>
                    <option value="elementary-6">小学6年生</option>
                    <option value="junior-high-1">中学1年生</option>
                    <option value="junior-high-2">中学2年生</option>
                    <option value="junior-high-3">中学3年生</option>
                    <option value="high-school-1">高校1年生</option>
                    <option value="high-school-2">高校2年生</option>
                    <option value="high-school-3">高校3年生</option>
                  </select>
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                パスワード <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-1 text-sm text-gray-500">6文字以上で入力してください</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                パスワード（確認） <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <User className="h-5 w-5" />
                )}
                登録する
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちの方は
              <Link to="/login" className="ml-1 font-medium text-blue-600 hover:text-blue-800 transition-colors">
                ログイン
              </Link>
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;