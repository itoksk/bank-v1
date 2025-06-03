import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Send, ThumbsUp, Star } from 'lucide-react';
import { MaterialComment } from '../../types/material';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/dateUtils';
import Spinner from '../utils/Spinner';

// Mock data - in a real app, this would come from an API
const mockComments: MaterialComment[] = [
  {
    id: 'comment-1',
    text: 'この教材はとても分かりやすかったです。特に図解の部分が生徒たちに好評でした。',
    author: {
      id: 'teacher-5',
      email: 'kobayashi@example.com',
      displayName: '小林 直子',
      role: 'teacher',
      createdAt: '2022-05-05T13:20:00Z',
      updatedAt: '2023-09-01T09:30:00Z'
    },
    createdAt: '2023-09-18T10:15:00Z',
    isTeacher: true,
    rating: 5
  },
  {
    id: 'comment-2',
    text: '公式の導き方がよく理解できました。でも練習問題がもう少し多いといいと思います。',
    author: {
      id: 'student-1',
      email: 'nakata@example.com',
      displayName: '中田 大輔',
      role: 'student',
      createdAt: '2023-04-10T14:30:00Z',
      updatedAt: '2023-10-02T16:15:00Z'
    },
    createdAt: '2023-09-20T16:45:00Z',
    isTeacher: false
  },
  {
    id: 'comment-3',
    text: 'グラフの書き方が特に役立ちました。私のクラスでも同じアプローチを試してみます。',
    author: {
      id: 'teacher-2',
      email: 'yamada@example.com',
      displayName: '山田 健太',
      role: 'teacher',
      createdAt: '2022-06-10T10:15:00Z',
      updatedAt: '2023-10-05T08:45:00Z'
    },
    createdAt: '2023-09-25T08:30:00Z',
    isTeacher: true,
    rating: 4
  }
];

interface MaterialCommentsProps {
  materialId: string;
}

const MaterialComments: React.FC<MaterialCommentsProps> = ({ materialId }) => {
  const [comments, setComments] = useState<MaterialComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { user, isTeacher } = useAuth();

  useEffect(() => {
    // Simulate API call to fetch comments
    setIsLoading(true);
    setTimeout(() => {
      setComments(mockComments);
      setIsLoading(false);
    }, 500);
  }, [materialId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !user) return;
    
    // In a real app, this would be an API call
    const newCommentObj: MaterialComment = {
      id: `comment-${Date.now()}`,
      text: newComment,
      author: user,
      createdAt: new Date().toISOString(),
      isTeacher: isTeacher
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        コメント・評価
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({comments.length})
        </span>
      </h2>
      
      {/* Comment Form */}
      {user ? (
        <form 
          onSubmit={handleSubmitComment}
          className="mb-8 bg-gray-50 rounded-xl p-4"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden flex-shrink-0">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            
            <div className="flex-grow">
              <textarea
                placeholder="コメントを入力..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              コメントを送信
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-gray-600 mb-3">コメントするにはログインが必要です。</p>
          <a 
            href="/login" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ログイン / 登録
          </a>
        </div>
      )}
      
      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="medium" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div 
              key={comment.id}
              className={`p-4 rounded-xl ${
                comment.isTeacher ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${
                  comment.isTeacher ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                } flex items-center justify-center`}>
                  {comment.author.profileImage ? (
                    <img 
                      src={comment.author.profileImage} 
                      alt={comment.author.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {comment.author.displayName}
                    </span>
                    {comment.isTeacher && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                        教師
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                
                {comment.isTeacher && comment.rating && (
                  <div className="ml-auto flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < comment.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 mb-3">{comment.text}</p>
              
              <div className="flex justify-end">
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors text-sm">
                  <ThumbsUp className="h-4 w-4" />
                  <span>役に立った</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          まだコメントはありません。最初のコメントを残しましょう。
        </div>
      )}
    </div>
  );
};

export default MaterialComments;