import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader, BookOpen, Target, Lightbulb, ExternalLink } from 'lucide-react';
import { AIAssistant, ChatMessage, ChatSession } from '../../types/ai';
import { Material } from '../../types/material';
import { sendChatMessage, createChatSession } from '../../services/aiService';
import { useAuth } from '../../contexts/AuthContext';

interface AIAssistantChatProps {
  material: Material;
  assistant: AIAssistant;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ 
  material, 
  assistant, 
  onClose, 
  isEmbedded = false 
}) => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showEducationalInfo, setShowEducationalInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // 学校種を判定する関数
  const determineSchoolLevel = (grade: string): 'elementary' | 'junior-high' | 'high-school' | 'special-needs' => {
    if (grade.includes('elementary') || grade.includes('小学')) {
      return 'elementary';
    } else if (grade.includes('junior-high') || grade.includes('中学')) {
      return 'junior-high';
    } else if (grade.includes('high-school') || grade.includes('高校') || grade.includes('高等学校')) {
      return 'high-school';
    } else if (grade.includes('special') || grade.includes('特別支援')) {
      return 'special-needs';
    }
    return 'junior-high';
  };

  // 学習指導要領PDFのURLを取得
  const getCurriculumPdfUrl = (schoolLevel: 'elementary' | 'junior-high' | 'high-school' | 'special-needs'): string => {
    const pdfUrls = {
      'elementary': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_01.pdf',
      'junior-high': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_02.pdf',
      'high-school': 'https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_03.pdf',
      'special-needs': 'https://www.mext.go.jp/a_menu/shotou/tokubetu/main/1386427.htm'
    };
    return pdfUrls[schoolLevel];
  };

  const schoolLevel = determineSchoolLevel(material.grade);
  const curriculumPdfUrl = getCurriculumPdfUrl(schoolLevel);
  const schoolLevelName = {
    'elementary': '小学校',
    'junior-high': '中学校', 
    'high-school': '高等学校',
    'special-needs': '特別支援学校'
  }[schoolLevel];

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const newSession = await createChatSession(material.id, assistant.id);
        setSession(newSession);
        
        // Add welcome message with educational context including curriculum info
        const welcomeMessage: ChatMessage = {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: `こんにちは！私は${assistant.name}です。

「${material.title}」について、${schoolLevelName}学習指導要領に基づいた教育的サポートを提供します。

📚 **教材情報**
• 教科: ${material.subject}
• 学年: ${material.grade}
• 授業時間: ${material.duration}分
• 難易度: ${material.difficulty}/5

🎯 **学習指導要領準拠**
${schoolLevelName}学習指導要領を自動読み込みし、以下の観点で指導します：
• 知識・技能の習得
• 思考・判断・表現力の育成
• 主体的に学習に取り組む態度の養成

📖 **参照資料**
学習指導要領: ${curriculumPdfUrl}

${material.lessonFlow ? `
📋 **この教材の授業の流れ**
${material.lessonFlow.map((phase, index) => `${index + 1}. ${phase.name} (${phase.duration}分)`).join('\n')}
` : ''}

何でもお気軽に質問してください。教材の内容と学習指導要領に基づいて、理解を深めるお手伝いをします！`,
          timestamp: new Date().toISOString(),
          materialContext: {
            materialId: material.id
          },
          educationalInsights: {
            learningObjective: assistant.educationalGuidelines.learningObjectives[0],
            difficulty: material.difficulty,
            suggestedActivities: assistant.educationalGuidelines.teachingMethods.slice(0, 3)
          }
        };
        
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error('Failed to initialize chat', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, [material.id, assistant.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !session || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      materialContext: {
        materialId: material.id
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await sendChatMessage(
        session.id,
        inputMessage,
        { materialId: material.id, material }
      );
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to send message', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'すみません、一時的にエラーが発生しました。もう一度お試しください。',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerClass = isEmbedded 
    ? "flex flex-col h-full bg-white border-l border-gray-200"
    : "flex flex-col h-96 bg-white rounded-xl border border-gray-200";

  if (isInitializing) {
    return (
      <div className={`flex items-center justify-center ${isEmbedded ? 'h-full' : 'h-96'}`}>
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">AIアシスタントを準備中...</p>
          <p className="text-sm text-gray-500 mt-2">{schoolLevelName}学習指導要領を読み込んでいます...</p>
          <p className="text-xs text-gray-400 mt-1">教材詳細を解析中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{assistant.name}</h3>
            <p className="text-sm text-gray-500">{schoolLevelName}学習指導要領対応</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEducationalInfo(!showEducationalInfo)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="教育情報を表示"
          >
            <BookOpen className="h-5 w-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Educational Info Panel */}
      {showEducationalInfo && (
        <div className="p-4 bg-blue-50 border-b border-gray-200 text-sm">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 font-medium text-blue-900 mb-1">
                <Target className="h-4 w-4" />
                教材情報
              </div>
              <div className="text-blue-800 space-y-1 text-xs">
                <p>• 教科: {material.subject} | 学年: {material.grade}</p>
                <p>• 授業時間: {material.duration}分 | 難易度: {material.difficulty}/5</p>
                {material.preparationItems && material.preparationItems.length > 0 && (
                  <p>• 準備物: {material.preparationItems.slice(0, 2).join('、')}など</p>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 font-medium text-blue-900 mb-1">
                <Lightbulb className="h-4 w-4" />
                学習指導要領
              </div>
              <div className="text-blue-800 text-xs space-y-1">
                <p>• 対象: {schoolLevelName}</p>
                <p>• 指導方法: {assistant.educationalGuidelines.teachingMethods.slice(0, 2).join('、')}</p>
                <a 
                  href={curriculumPdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                >
                  学習指導要領PDF
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {/* Educational Insights */}
              {message.educationalInsights && message.role === 'assistant' && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Target className="h-3 w-3" />
                      <span className="font-medium">学習目標:</span>
                    </div>
                    <p className="text-xs">{message.educationalInsights.learningObjective}</p>
                  </div>
                </div>
              )}
              
              <p className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">{schoolLevelName}学習指導要領と教材詳細を参照して回答中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="質問を入力してください..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {schoolLevelName}学習指導要領と教材詳細に基づいた教育的サポートを提供します
        </p>
      </form>
    </div>
  );
};

export default AIAssistantChat;