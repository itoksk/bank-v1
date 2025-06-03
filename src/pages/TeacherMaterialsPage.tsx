import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Eye, ThumbsUp, Clock,
  Trash2, Edit, Settings, Download, Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Material } from '../types/material';
import { fetchPopularMaterials } from '../services/materialService';
import MaterialCard from '../components/materials/MaterialCard';
import CategorySelector from '../components/materials/CategorySelector';
import GradeSelector from '../components/materials/GradeSelector';
import Spinner from '../components/utils/Spinner';

const TeacherMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        // In a real app with Supabase, this would fetch only the teacher's materials
        const data = await fetchPopularMaterials({ 
          author: user?.id,
          query: searchQuery,
          category: selectedCategory,
          grade: selectedGrade,
          limit: 50
        });
        setMaterials(data);
      } catch (error) {
        console.error('Failed to fetch materials', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, [user?.id, searchQuery, selectedCategory, selectedGrade, selectedStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleDelete = async (materialId: string) => {
    if (!window.confirm('この教材を削除してもよろしいですか？')) {
      return;
    }

    try {
      // In a real app with Supabase, this would delete the material
      setMaterials(materials.filter(m => m.id !== materialId));
    } catch (error) {
      console.error('Failed to delete material', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">教材管理</h1>
          
          <Link
            to="/teacher/materials/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            新しい教材を作成
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="教材を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors md:w-auto w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span>フィルター</span>
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                  
                  <GradeSelector
                    selectedGrade={selectedGrade}
                    onChange={setSelectedGrade}
                  />
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ステータス
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">すべて</option>
                      <option value="published">公開中</option>
                      <option value="draft">下書き</option>
                      <option value="review">レビュー中</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Materials List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="large" />
          </div>
        ) : materials.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {materials.map(material => (
              <div key={material.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {material.thumbnailUrl ? (
                      <img
                        src={material.thumbnailUrl}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {material.subject}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        {material.grade}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                        公開中
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {material.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {material.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{material.viewCount} 回視聴</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{material.likeCount} いいね</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{material.duration}分</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/teacher/materials/${material.id}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      編集
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      削除
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="ダウンロード"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="共有"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="設定"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              教材がありません
            </h3>
            <p className="text-gray-600 mb-4">
              新しい教材を作成して、生徒たちと共有しましょう。
            </p>
            <Link
              to="/teacher/materials/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              教材を作成
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMaterialsPage;