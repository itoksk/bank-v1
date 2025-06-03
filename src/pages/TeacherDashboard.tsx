import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Layout, BookOpen, Users, TrendingUp, Settings, 
  Plus, FileText, Video, Clock, Eye, ThumbsUp 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Material } from '../types/material';
import { fetchPopularMaterials } from '../services/materialService';
import MaterialCard from '../components/materials/MaterialCard';
import Spinner from '../components/utils/Spinner';

const TeacherDashboard: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch only the teacher's materials
        const data = await fetchPopularMaterials({ limit: 8 });
        setMaterials(data);
      } catch (error) {
        console.error('Failed to fetch materials', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, []);

  const stats = {
    totalMaterials: materials.length,
    totalViews: materials.reduce((sum, m) => sum + m.viewCount, 0),
    totalLikes: materials.reduce((sum, m) => sum + m.likeCount, 0),
    averageRating: 4.5 // Mock data
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
                教師ダッシュボード
              </h1>
              <p className="text-gray-600">
                {user?.displayName}先生、おはようございます！
              </p>
            </div>
            
            <Link
              to="/teacher/materials/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              新しい教材を作成
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
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">公開中の教材</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">総視聴回数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">総いいね数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均評価</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            to="/teacher/materials"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">教材管理</h3>
            </div>
            <p className="text-gray-600">
              教材の作成、編集、公開設定の管理ができます。
            </p>
          </Link>
          
          <Link
            to="/teacher/students"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Users className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">生徒管理</h3>
            </div>
            <p className="text-gray-600">
              生徒の学習進捗や評価の確認ができます。
            </p>
          </Link>
          
          <Link
            to="/teacher/settings"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Settings className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">設定</h3>
            </div>
            <p className="text-gray-600">
              アカウント設定や通知設定の管理ができます。
            </p>
          </Link>
        </div>
        
        {/* Recent Materials */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">最近の教材</h2>
            <Link
              to="/teacher/materials"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              すべて見る
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="large" />
            </div>
          ) : materials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {materials.slice(0, 4).map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              まだ教材がありません。新しい教材を作成してみましょう。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;