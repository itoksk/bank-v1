import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Plus, Trash2, Clock, Video,
  FileText, Save, Eye, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CategorySelector from '../components/materials/CategorySelector';
import GradeSelector from '../components/materials/GradeSelector';
import toast from 'react-hot-toast';

const NewMaterialPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('3');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview states
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdf(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();

    if (!title || !description || !category || !grade || !duration) {
      toast.error('必須項目を入力してください');
      return;
    }

    if (!video) {
      toast.error('授業動画をアップロードしてください');
      return;
    }

    if (!pdf) {
      toast.error('教材PDFをアップロードしてください');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app with Supabase:
      // 1. Upload files to Supabase Storage
      // 2. Create material record in the database
      // 3. Associate the material with the current user
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success(isDraft ? '下書きを保存しました' : '教材を公開しました');
      navigate('/teacher/materials');
    } catch (error) {
      console.error('Failed to create material', error);
      toast.error('教材の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">新しい教材を作成</h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {/* Basic Information */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">基本情報</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="例：二次関数の極値 - グラフ作成からの理解"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    説明 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="教材の概要、学習目標、特徴などを記入してください"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CategorySelector
                    selectedCategory={category}
                    onChange={setCategory}
                  />
                  
                  <GradeSelector
                    selectedGrade={grade}
                    onChange={setGrade}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      授業時間 (分) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min="1"
                        max="180"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="45"
                        required
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      難易度 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="1">Level 1 (とても簡単)</option>
                      <option value="2">Level 2 (簡単)</option>
                      <option value="3">Level 3 (普通)</option>
                      <option value="4">Level 4 (難しい)</option>
                      <option value="5">Level 5 (とても難しい)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">メディアアップロード</h2>
              
              <div className="space-y-6">
                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    サムネイル画像
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      {thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Plus className="h-5 w-5" />
                        アップロード
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        推奨サイズ: 1280x720px, 最大2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    授業動画 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      {video ? (
                        <Video className="h-8 w-8 text-blue-600" />
                      ) : (
                        <Video className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        id="video-upload"
                        required
                      />
                      <label
                        htmlFor="video-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Plus className="h-5 w-5" />
                        アップロード
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        最大サイズ: 1GB, 推奨フォーマット: MP4
                      </p>
                      {video && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          {video.name}
                          <button
                            type="button"
                            onClick={() => setVideo(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    教材PDF <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      {pdf ? (
                        <FileText className="h-8 w-8 text-blue-600" />
                      ) : (
                        <FileText className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        className="hidden"
                        id="pdf-upload"
                        required
                      />
                      <label
                        htmlFor="pdf-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Plus className="h-5 w-5" />
                        アップロード
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        最大サイズ: 50MB
                      </p>
                      {pdf && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          {pdf.name}
                          <button
                            type="button"
                            onClick={() => setPdf(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 rounded-b-xl flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                キャンセル
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下書き保存
                </button>

                <button
                  type="button"
                  onClick={() => {}}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      公開する
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMaterialPage;