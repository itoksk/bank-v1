import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GitFork, ArrowLeft, Save, Eye, Wand2, Copy,
  BookOpen, Clock, Target, Users, Settings
} from 'lucide-react';
import { Material, MaterialForkRequest } from '../types/material';
import { fetchMaterialById, forkMaterial } from '../services/materialService';
import { useAuth } from '../contexts/AuthContext';
import CategorySelector from '../components/materials/CategorySelector';
import GradeSelector from '../components/materials/GradeSelector';
import Spinner from '../components/utils/Spinner';
import toast from 'react-hot-toast';

const MaterialForkPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [originalMaterial, setOriginalMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isForking, setIsForking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fork customization states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetGrade, setTargetGrade] = useState('');
  const [targetSubject, setTargetSubject] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [duration, setDuration] = useState(45);
  const [customInstructions, setCustomInstructions] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);

  useEffect(() => {
    const loadMaterial = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const material = await fetchMaterialById(id);
        setOriginalMaterial(material);
        
        // Initialize form with original material data
        setTitle(`${material.title} (フォーク版)`);
        setDescription(material.description);
        setTargetGrade(material.grade);
        setTargetSubject(material.subject);
        setDifficulty(material.difficulty);
        setDuration(material.duration);
      } catch (err) {
        console.error('Failed to fetch material', err);
        setError('教材の読み込みに失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterial();
  }, [id]);

  const handleFork = async () => {
    if (!originalMaterial || !user) return;

    if (!title.trim()) {
      toast.error('タイトルを入力してください');
      return;
    }

    setIsForking(true);
    try {
      const forkRequest: MaterialForkRequest = {
        originalMaterialId: originalMaterial.id,
        title: title.trim(),
        description: description.trim(),
        targetGrade,
        targetSubject,
        difficulty,
        duration,
        customInstructions: customInstructions.trim(),
        focusAreas
      };

      const forkedMaterial = await forkMaterial(originalMaterial.id, forkRequest);
      
      toast.success('教材をフォークしました');
      navigate(`/material/${forkedMaterial.id}`);
    } catch (error) {
      console.error('Failed to fork material', error);
      toast.error('フォークに失敗しました');
    } finally {
      setIsForking(false);
    }
  };

  const handleAddFocusArea = (area: string) => {
    if (area && !focusAreas.includes(area)) {
      setFocusAreas([...focusAreas, area]);
    }
  };

  const handleRemoveFocusArea = (area: string) => {
    setFocusAreas(focusAreas.filter(a => a !== area));
  };

  const copyFromOriginal = (field: 'title' | 'description') => {
    if (!originalMaterial) return;
    
    switch (field) {
      case 'title':
        setTitle(originalMaterial.title);
        break;
      case 'description':
        setDescription(originalMaterial.description);
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !originalMaterial) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
        <p className="text-gray-600 mb-8">{error || '教材が見つかりませんでした。'}</p>
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <GitFork className="h-6 w-6 text-blue-600" />
              教材をフォーク
            </h1>
            <p className="text-gray-600">元の教材をベースに新しい教材を作成します</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Original Material Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                元の教材
              </h2>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {originalMaterial.thumbnailUrl ? (
                    <img
                      src={originalMaterial.thumbnailUrl}
                      alt={originalMaterial.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{originalMaterial.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{originalMaterial.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {originalMaterial.subject}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {originalMaterial.grade}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                      難易度 {originalMaterial.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                      {originalMaterial.duration}分
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    作成者: {originalMaterial.author.displayName}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{originalMaterial.viewCount}</div>
                      <div className="text-xs text-gray-500">視聴回数</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{originalMaterial.likeCount}</div>
                      <div className="text-xs text-gray-500">いいね</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{originalMaterial.forkCount}</div>
                      <div className="text-xs text-gray-500">フォーク</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fork Customization Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                フォーク設定
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      タイトル <span className="text-red-500">*</span>
                    </label>
                    <button
                      onClick={() => copyFromOriginal('title')}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                      元のタイトルをコピー
                    </button>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="フォーク版のタイトルを入力..."
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">説明</label>
                    <button
                      onClick={() => copyFromOriginal('description')}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                      元の説明をコピー
                    </button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="フォーク版の説明を入力..."
                  />
                </div>

                {/* Target Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CategorySelector
                    selectedCategory={targetSubject}
                    onChange={setTargetSubject}
                  />
                  <GradeSelector
                    selectedGrade={targetGrade}
                    onChange={setTargetGrade}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      難易度
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>Level 1 (とても簡単)</option>
                      <option value={2}>Level 2 (簡単)</option>
                      <option value={3}>Level 3 (普通)</option>
                      <option value={4}>Level 4 (難しい)</option>
                      <option value={5}>Level 5 (とても難しい)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      授業時間（分）
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      min="10"
                      max="180"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Custom Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カスタム指示
                  </label>
                  <textarea
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="特別な要求や重点的に扱いたい内容があれば記入してください..."
                  />
                </div>

                {/* Focus Areas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    重点分野
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {focusAreas.map((area, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {area}
                        <button
                          onClick={() => handleRemoveFocusArea(area)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="重点分野を追加..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddFocusArea(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => navigate(`/material/${originalMaterial.id}`)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    元の教材を見る
                  </button>
                  
                  <button
                    onClick={handleFork}
                    disabled={isForking || !title.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isForking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        フォーク中...
                      </>
                    ) : (
                      <>
                        <GitFork className="h-4 w-4" />
                        フォークを作成
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fork Information */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">フォークについて</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">フォークとは？</h4>
                <ul className="space-y-1">
                  <li>• 既存の教材をベースに新しい教材を作成</li>
                  <li>• 元の教材の構造や内容を継承</li>
                  <li>• 自分の授業に合わせてカスタマイズ可能</li>
                  <li>• 元の作成者への適切なクレジット表示</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">フォーク後にできること</h4>
                <ul className="space-y-1">
                  <li>• 教材詳細の編集・追加</li>
                  <li>• 授業ガイドの調整</li>
                  <li>• 独自のコンテンツ追加</li>
                  <li>• 他の教師との共有</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForkPage;