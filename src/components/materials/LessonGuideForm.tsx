import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Clock, Users, Target, BookOpen, MessageSquare, Wand2, Eye } from 'lucide-react';
import { Material, LessonGuide, LessonPhase, Activity, LessonGoal, TeachingStrategy, MaterialDetails } from '../../types/material';
import { generateLessonGuideFromMaterial } from '../../services/lessonGuideService';
import toast from 'react-hot-toast';

interface LessonGuideFormProps {
  material: Material;
  materialDetails?: MaterialDetails;
  initialGuide?: LessonGuide;
  onSave: (guide: LessonGuide) => void;
  onCancel: () => void;
}

const LessonGuideForm: React.FC<LessonGuideFormProps> = ({
  material,
  materialDetails,
  initialGuide,
  onSave,
  onCancel
}) => {
  const [guide, setGuide] = useState<LessonGuide | null>(initialGuide || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'plan' | 'strategies' | 'evaluation'>('basic');

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedGuide = await generateLessonGuideFromMaterial(material, materialDetails);
      setGuide(generatedGuide);
      toast.success('授業ガイドを自動生成しました');
    } catch (error) {
      console.error('Failed to generate lesson guide', error);
      toast.error('自動生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!guide) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(guide);
      toast.success('授業ガイドを保存しました');
    } catch (error) {
      console.error('Failed to save lesson guide', error);
      toast.error('保存に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const addLessonPhase = () => {
    if (!guide) return;
    
    const newPhase: LessonPhase = {
      name: '',
      duration: 10,
      description: '',
      activities: [],
      teacherActions: [],
      studentActions: [],
      materials: []
    };
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: [...prev.lessonPlan.phases, newPhase]
      }
    } : null);
  };

  const updateLessonPhase = (index: number, phase: LessonPhase) => {
    if (!guide) return;
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: prev.lessonPlan.phases.map((p, i) => i === index ? phase : p)
      }
    } : null);
  };

  const removeLessonPhase = (index: number) => {
    if (!guide) return;
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: prev.lessonPlan.phases.filter((_, i) => i !== index)
      }
    } : null);
  };

  const addActivity = (phaseIndex: number) => {
    if (!guide) return;
    
    const newActivity: Activity = {
      type: 'individual',
      description: '',
      duration: 5,
      instructions: []
    };
    
    const updatedPhases = [...guide.lessonPlan.phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      activities: [...updatedPhases[phaseIndex].activities, newActivity]
    };
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: updatedPhases
      }
    } : null);
  };

  const updateActivity = (phaseIndex: number, activityIndex: number, activity: Activity) => {
    if (!guide) return;
    
    const updatedPhases = [...guide.lessonPlan.phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      activities: updatedPhases[phaseIndex].activities.map((a, i) => i === activityIndex ? activity : a)
    };
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: updatedPhases
      }
    } : null);
  };

  const removeActivity = (phaseIndex: number, activityIndex: number) => {
    if (!guide) return;
    
    const updatedPhases = [...guide.lessonPlan.phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      activities: updatedPhases[phaseIndex].activities.filter((_, i) => i !== activityIndex)
    };
    
    setGuide(prev => prev ? {
      ...prev,
      lessonPlan: {
        ...prev.lessonPlan,
        phases: updatedPhases
      }
    } : null);
  };

  if (!guide) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">授業ガイドを作成</h2>
          <p className="text-gray-600 mb-8">
            教材詳細の情報から学習指導案に基づいた授業ガイドを自動生成します。<br />
            生成後に微調整を行うことができます。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleAutoGenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  自動生成中...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  授業ガイドを自動生成
                </>
              )}
            </button>
            
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
          </div>
          
          {materialDetails && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-left">
              <h3 className="font-medium text-blue-900 mb-2">参照される教材詳細情報</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 学習目標: {materialDetails.learningObjectives.length}項目</li>
                <li>• 準備物: {materialDetails.preparationItems.length}項目</li>
                <li>• 評価規準: {materialDetails.assessmentCriteria.length}項目</li>
                <li>• カリキュラム対応: {materialDetails.curriculumAlignment.length}項目</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">授業ガイド編集</h2>
            <p className="text-gray-600 mt-1">「{material.title}」の学習指導案</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                // Preview functionality
                console.log('Preview lesson guide:', guide);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              プレビュー
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              保存
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'basic' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              基本情報
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'plan' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('plan')}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              指導過程
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'strategies' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('strategies')}
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              指導方法
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'evaluation' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('evaluation')}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              評価計画
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Unit and Lesson Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">単元名</label>
                <input
                  type="text"
                  value={guide.unitTitle}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, unitTitle: e.target.value } : null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">本時の題材</label>
                <input
                  type="text"
                  value={guide.lessonTitle}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, lessonTitle: e.target.value } : null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">第○時</label>
                <input
                  type="text"
                  value={guide.lessonNumber}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, lessonNumber: e.target.value } : null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">全○時間</label>
                <input
                  type="number"
                  value={guide.totalLessons}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, totalLessons: parseInt(e.target.value) } : null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Unit Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">単元の目標</label>
              <textarea
                value={guide.unitGoals.join('\n')}
                onChange={(e) => setGuide(prev => prev ? {
                  ...prev,
                  unitGoals: e.target.value.split('\n').filter(g => g.trim())
                } : null)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="単元の目標を1行ずつ入力..."
              />
            </div>

            {/* Lesson Goals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">本時の目標（3観点）</h3>
              <div className="space-y-4">
                {guide.lessonGoals.map((goal, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <select
                        value={goal.competencyArea}
                        onChange={(e) => {
                          const newGoals = [...guide.lessonGoals];
                          newGoals[index] = { ...goal, competencyArea: e.target.value as any };
                          setGuide(prev => prev ? { ...prev, lessonGoals: newGoals } : null);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="知識・技能">知識・技能</option>
                        <option value="思考・判断・表現">思考・判断・表現</option>
                        <option value="学びに向かう力・人間性">学びに向かう力・人間性</option>
                      </select>
                      <input
                        type="text"
                        value={goal.goal}
                        onChange={(e) => {
                          const newGoals = [...guide.lessonGoals];
                          newGoals[index] = { ...goal, goal: e.target.value };
                          setGuide(prev => prev ? { ...prev, lessonGoals: newGoals } : null);
                        }}
                        placeholder="目標"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      value={goal.indicators.join('\n')}
                      onChange={(e) => {
                        const newGoals = [...guide.lessonGoals];
                        newGoals[index] = { 
                          ...goal, 
                          indicators: e.target.value.split('\n').filter(i => i.trim()) 
                        };
                        setGuide(prev => prev ? { ...prev, lessonGoals: newGoals } : null);
                      }}
                      placeholder="評価の観点を1行ずつ入力..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">指導過程</h3>
              <button
                onClick={addLessonPhase}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                フェーズを追加
              </button>
            </div>

            <div className="space-y-6">
              {guide.lessonPlan.phases.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      フェーズ {phaseIndex + 1}
                    </h4>
                    <button
                      onClick={() => removeLessonPhase(phaseIndex)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">フェーズ名</label>
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => updateLessonPhase(phaseIndex, { ...phase, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例：導入、展開、まとめ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">時間（分）</label>
                      <input
                        type="number"
                        value={phase.duration}
                        onChange={(e) => updateLessonPhase(phaseIndex, { ...phase, duration: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                    <textarea
                      value={phase.description}
                      onChange={(e) => updateLessonPhase(phaseIndex, { ...phase, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="このフェーズの説明..."
                    />
                  </div>

                  {/* Activities */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">学習活動</label>
                      <button
                        onClick={() => addActivity(phaseIndex)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        活動追加
                      </button>
                    </div>
                    <div className="space-y-3">
                      {phase.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="p-3 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                            <select
                              value={activity.type}
                              onChange={(e) => updateActivity(phaseIndex, activityIndex, { ...activity, type: e.target.value as any })}
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="individual">個人</option>
                              <option value="pair">ペア</option>
                              <option value="group">グループ</option>
                              <option value="whole-class">全体</option>
                            </select>
                            <input
                              type="number"
                              value={activity.duration}
                              onChange={(e) => updateActivity(phaseIndex, activityIndex, { ...activity, duration: parseInt(e.target.value) })}
                              placeholder="時間（分）"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => removeActivity(phaseIndex, activityIndex)}
                              className="px-2 py-1 text-red-500 hover:text-red-700 transition-colors text-sm"
                            >
                              削除
                            </button>
                          </div>
                          <input
                            type="text"
                            value={activity.description}
                            onChange={(e) => updateActivity(phaseIndex, activityIndex, { ...activity, description: e.target.value })}
                            placeholder="活動の説明"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">教師の働きかけ</label>
                      <textarea
                        value={phase.teacherActions.join('\n')}
                        onChange={(e) => updateLessonPhase(phaseIndex, {
                          ...phase,
                          teacherActions: e.target.value.split('\n').filter(a => a.trim())
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        placeholder="教師の働きかけを1行ずつ入力..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">生徒の活動</label>
                      <textarea
                        value={phase.studentActions.join('\n')}
                        onChange={(e) => updateLessonPhase(phaseIndex, {
                          ...phase,
                          studentActions: e.target.value.split('\n').filter(a => a.trim())
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        placeholder="生徒の活動を1行ずつ入力..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-6">
            {/* Teaching Strategies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">指導方法・工夫</h3>
              <div className="space-y-4">
                {guide.teachingStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={strategy.strategy}
                        onChange={(e) => {
                          const newStrategies = [...guide.teachingStrategies];
                          newStrategies[index] = { ...strategy, strategy: e.target.value };
                          setGuide(prev => prev ? { ...prev, teachingStrategies: newStrategies } : null);
                        }}
                        placeholder="指導方法"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={strategy.purpose}
                        onChange={(e) => {
                          const newStrategies = [...guide.teachingStrategies];
                          newStrategies[index] = { ...strategy, purpose: e.target.value };
                          setGuide(prev => prev ? { ...prev, teachingStrategies: newStrategies } : null);
                        }}
                        placeholder="目的"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <textarea
                        value={strategy.implementation}
                        onChange={(e) => {
                          const newStrategies = [...guide.teachingStrategies];
                          newStrategies[index] = { ...strategy, implementation: e.target.value };
                          setGuide(prev => prev ? { ...prev, teachingStrategies: newStrategies } : null);
                        }}
                        placeholder="実施方法"
                        rows={2}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <textarea
                        value={strategy.expectedOutcome}
                        onChange={(e) => {
                          const newStrategies = [...guide.teachingStrategies];
                          newStrategies[index] = { ...strategy, expectedOutcome: e.target.value };
                          setGuide(prev => prev ? { ...prev, teachingStrategies: newStrategies } : null);
                        }}
                        placeholder="期待される成果"
                        rows={2}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questioning Techniques */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">発問の工夫</h3>
              <textarea
                value={guide.questioningTechniques.join('\n')}
                onChange={(e) => setGuide(prev => prev ? {
                  ...prev,
                  questioningTechniques: e.target.value.split('\n').filter(q => q.trim())
                } : null)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="発問の工夫を1行ずつ入力..."
              />
            </div>

            {/* Board Plan */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">板書計画</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {guide.boardPlan.layout.map((section, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {section.position === 'left' ? '左側' : section.position === 'center' ? '中央' : '右側'}
                      </span>
                      <select
                        value={section.type}
                        onChange={(e) => {
                          const newLayout = [...guide.boardPlan.layout];
                          newLayout[index] = { ...section, type: e.target.value as any };
                          setGuide(prev => prev ? {
                            ...prev,
                            boardPlan: { ...prev.boardPlan, layout: newLayout }
                          } : null);
                        }}
                        className="text-xs px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="text">テキスト</option>
                        <option value="diagram">図表</option>
                        <option value="formula">数式</option>
                        <option value="table">表</option>
                      </select>
                    </div>
                    <textarea
                      value={section.content}
                      onChange={(e) => {
                        const newLayout = [...guide.boardPlan.layout];
                        newLayout[index] = { ...section, content: e.target.value };
                        setGuide(prev => prev ? {
                          ...prev,
                          boardPlan: { ...prev.boardPlan, layout: newLayout }
                        } : null);
                      }}
                      rows={4}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      placeholder="板書内容..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div className="space-y-6">
            {/* Formative Assessment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">形成的評価</h3>
              <div className="space-y-4">
                {guide.evaluationPlan.formativeAssessment.map((assessment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={assessment.timing}
                        onChange={(e) => {
                          const newAssessments = [...guide.evaluationPlan.formativeAssessment];
                          newAssessments[index] = { ...assessment, timing: e.target.value };
                          setGuide(prev => prev ? {
                            ...prev,
                            evaluationPlan: { ...prev.evaluationPlan, formativeAssessment: newAssessments }
                          } : null);
                        }}
                        placeholder="評価のタイミング"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={assessment.method}
                        onChange={(e) => {
                          const newAssessments = [...guide.evaluationPlan.formativeAssessment];
                          newAssessments[index] = { ...assessment, method: e.target.value };
                          setGuide(prev => prev ? {
                            ...prev,
                            evaluationPlan: { ...prev.evaluationPlan, formativeAssessment: newAssessments }
                          } : null);
                        }}
                        placeholder="評価方法"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={assessment.criteria}
                        onChange={(e) => {
                          const newAssessments = [...guide.evaluationPlan.formativeAssessment];
                          newAssessments[index] = { ...assessment, criteria: e.target.value };
                          setGuide(prev => prev ? {
                            ...prev,
                            evaluationPlan: { ...prev.evaluationPlan, formativeAssessment: newAssessments }
                          } : null);
                        }}
                        placeholder="評価規準"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={assessment.feedback}
                        onChange={(e) => {
                          const newAssessments = [...guide.evaluationPlan.formativeAssessment];
                          newAssessments[index] = { ...assessment, feedback: e.target.value };
                          setGuide(prev => prev ? {
                            ...prev,
                            evaluationPlan: { ...prev.evaluationPlan, formativeAssessment: newAssessments }
                          } : null);
                        }}
                        placeholder="フィードバック"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summative Assessment */}
            {guide.evaluationPlan.summativeAssessment && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">総括的評価</h3>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={guide.evaluationPlan.summativeAssessment.method}
                      onChange={(e) => setGuide(prev => prev ? {
                        ...prev,
                        evaluationPlan: {
                          ...prev.evaluationPlan,
                          summativeAssessment: prev.evaluationPlan.summativeAssessment ? {
                            ...prev.evaluationPlan.summativeAssessment,
                            method: e.target.value
                          } : undefined
                        }
                      } : null)}
                      placeholder="評価方法"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    value={guide.evaluationPlan.summativeAssessment.criteria.join('\n')}
                    onChange={(e) => setGuide(prev => prev ? {
                      ...prev,
                      evaluationPlan: {
                        ...prev.evaluationPlan,
                        summativeAssessment: prev.evaluationPlan.summativeAssessment ? {
                          ...prev.evaluationPlan.summativeAssessment,
                          criteria: e.target.value.split('\n').filter(c => c.trim())
                        } : undefined
                      }
                    } : null)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="評価規準を1行ずつ入力..."
                  />
                </div>
              </div>
            )}

            {/* Homework and Next Lesson */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">宿題・課題</label>
                <textarea
                  value={guide.homework || ''}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, homework: e.target.value } : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="宿題や課題について記入..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">次時の予告</label>
                <textarea
                  value={guide.nextLessonPreview || ''}
                  onChange={(e) => setGuide(prev => prev ? { ...prev, nextLessonPreview: e.target.value } : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="次時の学習内容について記入..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonGuideForm;