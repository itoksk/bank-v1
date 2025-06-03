import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Eye, ThumbsUp, GitFork, Clock, ArrowLeft, Download, Bookmark, 
  BookOpen, Share2, Star, ThumbsDown, MessageSquare 
} from 'lucide-react';
import { fetchMaterialById } from '../services/materialService';
import { Material } from '../types/material';
import { formatDate } from '../utils/dateUtils';
import VideoPlayer from '../components/materials/VideoPlayer';
import MaterialVersionHistory from '../components/materials/MaterialVersionHistory';
import MaterialRequirements from '../components/materials/MaterialRequirements';
import MaterialLessonFlow from '../components/materials/MaterialLessonFlow';
import RelatedMaterials from '../components/materials/RelatedMaterials';
import MaterialComments from '../components/materials/MaterialComments';
import Spinner from '../components/utils/Spinner';

const MaterialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'guide' | 'comments' | 'versions'>('details');

  useEffect(() => {
    const loadMaterial = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const data = await fetchMaterialById(id);
        setMaterial(data);
      } catch (err) {
        console.error('Failed to fetch material', err);
        setError('教材の読み込みに失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterial();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
        <p className="text-gray-600 mb-8">{error || '教材が見つかりませんでした。'}</p>
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

  // Determine difficulty level color
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-600';
      case 2: return 'bg-blue-100 text-blue-600';
      case 3: return 'bg-yellow-100 text-yellow-600';
      case 4: return 'bg-orange-100 text-orange-600';
      case 5: return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const difficultyClass = getDifficultyColor(material.difficulty);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <Link 
            to="/search" 
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>教材一覧に戻る</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Video Player */}
            <div className="lg:w-7/12">
              <VideoPlayer videoUrl={material.videoUrl} thumbnailUrl={material.thumbnailUrl} />
            </div>
            
            {/* Material Details */}
            <div className="lg:w-5/12">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                  {material.subject}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-500 text-white">
                  {material.grade}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{material.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-gray-500">
                  <Eye className="h-5 w-5" />
                  <span>{material.viewCount}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{material.likeCount}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <GitFork className="h-5 w-5" />
                  <span>{material.forkCount}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <Link
                  to={`/profile/${material.author.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                    {material.author.profileImage ? (
                      <img 
                        src={material.author.profileImage} 
                        alt={material.author.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-medium">
                        {material.author.displayName?.charAt(0).toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{material.author.displayName}</div>
                    <div className="text-sm text-gray-500">{formatDate(material.createdAt)}</div>
                  </div>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">授業時間</div>
                    <div className="font-medium">{material.duration}分</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">難易度</div>
                    <div className={`px-2 py-0.5 rounded-full text-xs inline-block ${difficultyClass}`}>
                      レベル {material.difficulty}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mb-8">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>教材PDFダウンロード</span>
                </button>
                <button className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to={`/material/${id}/fork`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <GitFork className="h-4 w-4" />
                  <span>この教材をフォーク</span>
                </Link>
                {material.forkFrom && (
                  <Link
                    to={`/material/${material.forkFrom.id}`}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>元の教材</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="border-b border-gray-200 sticky top-16 bg-white z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto whitespace-nowrap">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'details' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('details')}
            >
              教材詳細
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'guide' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('guide')}
            >
              授業ガイド
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'comments' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              コメント・評価
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'versions' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('versions')}
            >
              バージョン履歴
            </button>
          </div>
        </div>
      </section>
      
      {/* Tab Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
              {activeTab === 'details' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">教材概要</h2>
                  <p className="text-gray-700 mb-8 whitespace-pre-line">{material.description}</p>
                  
                  <MaterialRequirements material={material} />
                </div>
              )}
              
              {activeTab === 'guide' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">授業ガイド</h2>
                  
                  <MaterialLessonFlow material={material} />
                </div>
              )}
              
              {activeTab === 'comments' && (
                <MaterialComments materialId={material.id} />
              )}
              
              {activeTab === 'versions' && (
                <MaterialVersionHistory material={material} />
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-4/12">
              <div className="sticky top-36">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">教材を評価する</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <ThumbsUp className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">役に立った</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                      <ThumbsDown className="h-5 w-5 text-red-500" />
                      <span className="font-medium">役に立たなかった</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 transition-colors">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">お気に入り</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span className="font-medium">コメント</span>
                    </button>
                  </div>
                </div>
                
                <RelatedMaterials materialId={material.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaterialDetailPage;