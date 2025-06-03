import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, BookOpen, Star, TrendingUp, Clock, 
  Calendar, CheckCircle, BarChart 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Material } from '../types/material';
import { fetchPopularMaterials } from '../services/materialService';
import MaterialCard from '../components/materials/MaterialCard';
import Spinner from '../components/utils/Spinner';

const StudentDashboard: React.FC = () => {
  const [recentMaterials, setRecentMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch the student's recently viewed materials
        const data = await fetchPopularMaterials({ limit: 4 });
        setRecentMaterials(data);
      } catch (error) {
        console.error('Failed to fetch materials', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, []);

  // Mock learning stats
  const learningStats = {
    totalHours: 24,
    completedLessons: 12,
    averageScore: 85,
    streak: 7
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Layout className="h-6 w-6 text-blue-600" />
                学習ダッシュボード
              </h1>
              <p className="text-gray-600">
                {user?.displayName}さん、こんにちは！
              </p>
            </div>
            
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              新しい授業を探す
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">総学習時間</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.totalHours}時間</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">完了した授業</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.completedLessons}個</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均スコア</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.averageScore}点</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">学習継続日数</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.streak}日</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Learning Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              学習の進捗
            </h2>
            <Link
              to="/student/progress"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              詳細を見る
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">数学</span>
                <span className="text-gray-900 font-medium">75%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">英語</span>
                <span className="text-gray-900 font-medium">60%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">理科</span>
                <span className="text-gray-900 font-medium">45%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Materials */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              最近の学習
            </h2>
            <Link
              to="/student/history"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              すべて見る
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="large" />
            </div>
          ) : recentMaterials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              まだ学習履歴がありません。新しい授業を見つけてみましょう。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;