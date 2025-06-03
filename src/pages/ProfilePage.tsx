import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User as UserIcon, BookOpen, Mail, School, Calendar, Award, 
  ThumbsUp, Users, FileText, Edit, ArrowLeft, GraduationCap, Heart 
} from 'lucide-react';
import { fetchUserById } from '../services/userService';
import { fetchPopularMaterials } from '../services/materialService';
import { User, Teacher, Student } from '../types/user';
import { Material } from '../types/material';
import MaterialCard from '../components/materials/MaterialCard';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/utils/Spinner';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<User | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const [userData, userMaterials] = await Promise.all([
          fetchUserById(id),
          fetchPopularMaterials({ author: id, limit: 8 })
        ]);
        
        setProfile(userData);
        setMaterials(userMaterials);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setError('プロフィールの読み込みに失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
        <p className="text-gray-600 mb-8">{error || 'プロフィールが見つかりませんでした。'}</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          トップページに戻る
        </Link>
      </div>
    );
  }
  
  const isOwnProfile = user?.id === profile.id;
  const isTeacher = profile.role === 'teacher';
  const teacherProfile = profile as Teacher;
  const studentProfile = profile as Student;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-teal-500"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold overflow-hidden">
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={profile.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-16 w-16" />
                  )}
                </div>
                
                <div className="mt-16 md:mt-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.displayName}
                    </h1>
                    {isTeacher && teacherProfile.isFeatured && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        注目の先生
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    {isTeacher ? (
                      <>
                        <div className="flex items-center gap-1">
                          <School className="h-4 w-4" />
                          <span>{teacherProfile.school || '未設定'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{teacherProfile.subject || '未設定'}</span>
                        </div>
                        {teacherProfile.experience && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>指導歴 {teacherProfile.experience}年</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{studentProfile.grade || '未設定'}</span>
                        </div>
                        {studentProfile.interests && studentProfile.interests.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{studentProfile.interests.join(', ')}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {isOwnProfile ? (
                <Link
                  to="/settings/profile"
                  className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  プロフィールを編集
                </Link>
              ) : (
                <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  フォローする
                </button>
              )}
            </div>
            
            {isTeacher && teacherProfile.bio && (
              <p className="mt-6 text-gray-600 whitespace-pre-line">
                {teacherProfile.bio}
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap gap-6">
              {isTeacher && (
                <>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{teacherProfile.materialCount || 0}</div>
                      <div className="text-sm text-gray-500">教材数</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{teacherProfile.likeCount || 0}</div>
                      <div className="text-sm text-gray-500">いいね</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{teacherProfile.followerCount || 0}</div>
                      <div className="text-sm text-gray-500">フォロワー</div>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <a 
                  href={`mailto:${profile.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Materials Grid (only for teachers) */}
        {isTeacher && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">投稿した教材</h2>
            
            {materials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {materials.map(material => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  まだ教材が投稿されていません
                </h3>
                <p className="text-gray-500">
                  {isOwnProfile ? (
                    <>
                      最初の教材を投稿してみましょう！
                      <br />
                      <Link 
                        to="/materials/new" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        教材を投稿する
                      </Link>
                    </>
                  ) : (
                    'この先生はまだ教材を投稿していません。'
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;