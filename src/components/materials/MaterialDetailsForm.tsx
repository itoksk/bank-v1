import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, BookOpen, Target, Users, Settings, Lightbulb, Shield, Zap, ArrowRight } from 'lucide-react';
import { Material, MaterialDetails, PreparationItem, CurriculumAlignment, AssessmentCriterion, EvaluationMethod, ICTIntegration, DigitalResource } from '../../types/material';
import { generateMaterialDetailsTemplate } from '../../services/lessonGuideService';
import EvaluationCriteriaTable from './EvaluationCriteriaTable';
import toast from 'react-hot-toast';

interface MaterialDetailsFormProps {
  material: Material;
  initialDetails?: MaterialDetails;
  onSave: (details: MaterialDetails) => void;
  onCancel: () => void;
}

const MaterialDetailsForm: React.FC<MaterialDetailsFormProps> = ({
  material,
  initialDetails,
  onSave,
  onCancel
}) => {
  const [details, setDetails] = useState<MaterialDetails>(
    initialDetails || generateMaterialDetailsTemplate(material)
  );
  const [activeTab, setActiveTab] = useState<'basic' | 'curriculum' | 'assessment' | 'support' | 'ict'>('basic');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(details);
      toast.success('教材詳細を保存しました');
    } catch (error) {
      console.error('Failed to save material details', error);
      toast.error('保存に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const addPreparationItem = () => {
    setDetails(prev => ({
      ...prev,
      preparationItems: [
        ...prev.preparationItems,
        {
          category: 'material',
          name: '',
          quantity: '',
          isOptional: false
        }
      ]
    }));
  };

  const updatePreparationItem = (index: number, item: PreparationItem) => {
    setDetails(prev => ({
      ...prev,
      preparationItems: prev.preparationItems.map((p, i) => i === index ? item : p)
    }));
  };

  const removePreparationItem = (index: number) => {
    setDetails(prev => ({
      ...prev,
      preparationItems: prev.preparationItems.filter((_, i) => i !== index)
    }));
  };

  const addLearningObjective = () => {
    setDetails(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const updateLearningObjective = (index: number, objective: string) => {
    setDetails(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => i === index ? objective : obj)
    }));
  };

  const removeLearningObjective = (index: number) => {
    setDetails(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const addDigitalResource = () => {
    setDetails(prev => ({
      ...prev,
      digitalResources: [
        ...prev.digitalResources,
        {
          type: 'video',
          name: '',
          description: '',
          usage: ''
        }
      ]
    }));
  };

  const updateDigitalResource = (index: number, resource: DigitalResource) => {
    setDetails(prev => ({
      ...prev,
      digitalResources: prev.digitalResources.map((r, i) => i === index ? resource : r)
    }));
  };

  const removeDigitalResource = (index: number) => {
    setDetails(prev => ({
      ...prev,
      digitalResources: prev.digitalResources.filter((_, i) => i !== index)
    }));
  };

  const updateAssessmentCriteria = (criteria: AssessmentCriterion[]) => {
    setDetails(prev => ({
      ...prev,
      assessmentCriteria: criteria
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">教材詳細設定</h2>
            <p className="text-gray-600 mt-1">「{material.title}」の詳細情報を設定します</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              戻る
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              次へ（授業ガイド作成）
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
              activeTab === 'curriculum' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('curriculum')}
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              カリキュラム
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'assessment' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('assessment')}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              評価
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'support' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('support')}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              個別支援
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'ict' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('ict')}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              ICT活用
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Learning Objectives */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">学習目標</h3>
                <button
                  onClick={addLearningObjective}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  追加
                </button>
              </div>
              <div className="space-y-3">
                {details.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateLearningObjective(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="学習目標を入力..."
                    />
                    <button
                      onClick={() => removeLearningObjective(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">前提知識・技能</h3>
              <textarea
                value={details.prerequisites.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  prerequisites: e.target.value.split('\n').filter(p => p.trim())
                }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="前提となる知識や技能を1行ずつ入力..."
              />
            </div>

            {/* Target Students */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">対象生徒</h3>
              <input
                type="text"
                value={details.targetStudents}
                onChange={(e) => setDetails(prev => ({ ...prev, targetStudents: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="対象となる生徒について記入..."
              />
            </div>

            {/* Preparation Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">準備物</h3>
                <button
                  onClick={addPreparationItem}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  追加
                </button>
              </div>
              <div className="space-y-3">
                {details.preparationItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border border-gray-200 rounded-lg">
                    <select
                      value={item.category}
                      onChange={(e) => updatePreparationItem(index, { ...item, category: e.target.value as any })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="material">教材</option>
                      <option value="equipment">機器</option>
                      <option value="handout">配布物</option>
                      <option value="digital">デジタル</option>
                    </select>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updatePreparationItem(index, { ...item, name: e.target.value })}
                      placeholder="名称"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={item.quantity || ''}
                      onChange={(e) => updatePreparationItem(index, { ...item, quantity: e.target.value })}
                      placeholder="数量"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={item.isOptional || false}
                          onChange={(e) => updatePreparationItem(index, { ...item, isOptional: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        任意
                      </label>
                      <button
                        onClick={() => removePreparationItem(index)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Considerations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">安全上の注意点</h3>
              <textarea
                value={details.safetyConsiderations.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  safetyConsiderations: e.target.value.split('\n').filter(s => s.trim())
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="安全上の注意点を1行ずつ入力..."
              />
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Curriculum Alignment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">学習指導要領との対応</h3>
              <div className="space-y-4">
                {details.curriculumAlignment.map((alignment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        value={alignment.code}
                        onChange={(e) => {
                          const newAlignment = [...details.curriculumAlignment];
                          newAlignment[index] = { ...alignment, code: e.target.value };
                          setDetails(prev => ({ ...prev, curriculumAlignment: newAlignment }));
                        }}
                        placeholder="項目コード"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={alignment.title}
                        onChange={(e) => {
                          const newAlignment = [...details.curriculumAlignment];
                          newAlignment[index] = { ...alignment, title: e.target.value };
                          setDetails(prev => ({ ...prev, curriculumAlignment: newAlignment }));
                        }}
                        placeholder="項目名"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={alignment.competencyArea}
                        onChange={(e) => {
                          const newAlignment = [...details.curriculumAlignment];
                          newAlignment[index] = { ...alignment, competencyArea: e.target.value as any };
                          setDetails(prev => ({ ...prev, curriculumAlignment: newAlignment }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="知識・技能">知識・技能</option>
                        <option value="思考・判断・表現">思考・判断・表現</option>
                        <option value="学びに向かう力・人間性">学びに向かう力・人間性</option>
                      </select>
                    </div>
                    <textarea
                      value={alignment.description}
                      onChange={(e) => {
                        const newAlignment = [...details.curriculumAlignment];
                        newAlignment[index] = { ...alignment, description: e.target.value };
                        setDetails(prev => ({ ...prev, curriculumAlignment: newAlignment }));
                      }}
                      placeholder="内容説明"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Units */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">関連単元</h3>
              <textarea
                value={details.relatedUnits.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  relatedUnits: e.target.value.split('\n').filter(u => u.trim())
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="関連する単元を1行ずつ入力..."
              />
            </div>

            {/* Cross-curricular Connections */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">他教科との関連</h3>
              <textarea
                value={details.crossCurricularConnections.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  crossCurricularConnections: e.target.value.split('\n').filter(c => c.trim())
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="他教科との関連を1行ずつ入力..."
              />
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {/* Assessment Criteria Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">評価規準</h3>
              <EvaluationCriteriaTable
                criteria={details.assessmentCriteria}
                onChange={updateAssessmentCriteria}
                editable={true}
              />
            </div>

            {/* Evaluation Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">評価方法</h3>
              <div className="space-y-4">
                {details.evaluationMethods.map((method, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        value={method.method}
                        onChange={(e) => {
                          const newMethods = [...details.evaluationMethods];
                          newMethods[index] = { ...method, method: e.target.value };
                          setDetails(prev => ({ ...prev, evaluationMethods: newMethods }));
                        }}
                        placeholder="評価方法"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={method.timing}
                        onChange={(e) => {
                          const newMethods = [...details.evaluationMethods];
                          newMethods[index] = { ...method, timing: e.target.value as any };
                          setDetails(prev => ({ ...prev, evaluationMethods: newMethods }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="導入">導入</option>
                        <option value="展開">展開</option>
                        <option value="まとめ">まとめ</option>
                        <option value="事後">事後</option>
                      </select>
                      <input
                        type="text"
                        value={method.target}
                        onChange={(e) => {
                          const newMethods = [...details.evaluationMethods];
                          newMethods[index] = { ...method, target: e.target.value };
                          setDetails(prev => ({ ...prev, evaluationMethods: newMethods }));
                        }}
                        placeholder="評価対象"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      value={method.tools.join('\n')}
                      onChange={(e) => {
                        const newMethods = [...details.evaluationMethods];
                        newMethods[index] = { 
                          ...method, 
                          tools: e.target.value.split('\n').filter(t => t.trim()) 
                        };
                        setDetails(prev => ({ ...prev, evaluationMethods: newMethods }));
                      }}
                      placeholder="評価ツールを1行ずつ入力..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            {/* Differentiation Strategies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">個別最適化の方法</h3>
              <textarea
                value={details.differentiationStrategies.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  differentiationStrategies: e.target.value.split('\n').filter(s => s.trim())
                }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="個別最適化の方法を1行ずつ入力..."
              />
            </div>

            {/* Support for Special Needs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">特別な配慮を要する生徒への支援</h3>
              <textarea
                value={details.supportForSpecialNeeds.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  supportForSpecialNeeds: e.target.value.split('\n').filter(s => s.trim())
                }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="特別な配慮を要する生徒への支援方法を1行ずつ入力..."
              />
            </div>

            {/* Extension Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">発展的な学習活動</h3>
              <textarea
                value={details.extensionActivities.join('\n')}
                onChange={(e) => setDetails(prev => ({
                  ...prev,
                  extensionActivities: e.target.value.split('\n').filter(a => a.trim())
                }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="発展的な学習活動を1行ずつ入力..."
              />
            </div>
          </div>
        )}

        {activeTab === 'ict' && (
          <div className="space-y-6">
            {/* ICT Integration */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ICT活用方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">使用機器</label>
                  <textarea
                    value={details.ictIntegration.devices.join('\n')}
                    onChange={(e) => setDetails(prev => ({
                      ...prev,
                      ictIntegration: {
                        ...prev.ictIntegration,
                        devices: e.target.value.split('\n').filter(d => d.trim())
                      }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="使用機器を1行ずつ入力..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">使用ソフトウェア</label>
                  <textarea
                    value={details.ictIntegration.software.join('\n')}
                    onChange={(e) => setDetails(prev => ({
                      ...prev,
                      ictIntegration: {
                        ...prev.ictIntegration,
                        software: e.target.value.split('\n').filter(s => s.trim())
                      }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="使用ソフトウェアを1行ずつ入力..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">生徒の役割</label>
                  <input
                    type="text"
                    value={details.ictIntegration.studentRole}
                    onChange={(e) => setDetails(prev => ({
                      ...prev,
                      ictIntegration: { ...prev.ictIntegration, studentRole: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="生徒の役割を記入..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">教師の役割</label>
                  <input
                    type="text"
                    value={details.ictIntegration.teacherRole}
                    onChange={(e) => setDetails(prev => ({
                      ...prev,
                      ictIntegration: { ...prev.ictIntegration, teacherRole: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="教師の役割を記入..."
                  />
                </div>
              </div>
            </div>

            {/* Digital Resources */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">デジタル教材・リソース</h3>
                <button
                  onClick={addDigitalResource}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  追加
                </button>
              </div>
              <div className="space-y-4">
                {details.digitalResources.map((resource, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <select
                        value={resource.type}
                        onChange={(e) => updateDigitalResource(index, { ...resource, type: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="video">動画</option>
                        <option value="simulation">シミュレーション</option>
                        <option value="quiz">クイズ</option>
                        <option value="document">文書</option>
                        <option value="website">ウェブサイト</option>
                      </select>
                      <input
                        type="text"
                        value={resource.name}
                        onChange={(e) => updateDigitalResource(index, { ...resource, name: e.target.value })}
                        placeholder="リソース名"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={resource.url || ''}
                          onChange={(e) => updateDigitalResource(index, { ...resource, url: e.target.value })}
                          placeholder="URL（任意）"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeDigitalResource(index)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <textarea
                        value={resource.description}
                        onChange={(e) => updateDigitalResource(index, { ...resource, description: e.target.value })}
                        placeholder="説明"
                        rows={2}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <textarea
                        value={resource.usage}
                        onChange={(e) => updateDigitalResource(index, { ...resource, usage: e.target.value })}
                        placeholder="使用場面"
                        rows={2}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialDetailsForm;