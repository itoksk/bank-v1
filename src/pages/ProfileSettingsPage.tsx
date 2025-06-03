import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, School, BookOpen, Calendar,
  Camera, Save, Key, Shield, Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form states
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // In a real app with Supabase, fetch user profile data
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      // Set other fields...
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName || !email) {
      toast.error('必須項目を入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app with Supabase:
      // 1. Upload profile image if changed
      // 2. Update user profile data
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('プロフィールを更新しました');
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error('プロフィールの更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">アカウント設定</h1>

        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <nav className="flex overflow-x-auto">
              <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium whitespace-nowrap">
                プロフィール
              </button>
              <button className="px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-gray-900 whitespace-nowrap">
                パスワード
              </button>
              <button className="px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-gray-900 whitespace-nowrap">
                通知設定
              </button>
              <button className="px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-gray-900 whitespace-nowrap">
                プライバシー
              </button>
            </nav>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
              {/* Profile Image */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">プロフィール画像</h2>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <User className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">
                      推奨サイズ: 500x500px, 最大2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">基本情報</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      氏名 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      所属学校
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例：東京第一中学校"
                      />
                      <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        担当教科
                      </label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        指導歴（年数）
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          min="0"
                          max="50"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="5"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      自己紹介
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="自己紹介や指導方針などを書いてください"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">その他の設定</h2>
                
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => navigate('/settings/password')}
                    className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-gray-400" />
                      <span>パスワード変更</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/settings/notifications')}
                    className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <span>通知設定</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/settings/privacy')}
                    className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <span>プライバシー設定</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 rounded-b-xl flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  キャンセル
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      変更を保存
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;