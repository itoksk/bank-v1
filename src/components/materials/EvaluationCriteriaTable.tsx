import React, { useState } from 'react';
import { Plus, Trash2, Save, Edit3, Check, X } from 'lucide-react';
import { AssessmentCriterion } from '../../types/material';

interface EvaluationCriteriaTableProps {
  criteria: AssessmentCriterion[];
  onChange: (criteria: AssessmentCriterion[]) => void;
  editable?: boolean;
}

const EvaluationCriteriaTable: React.FC<EvaluationCriteriaTableProps> = ({
  criteria,
  onChange,
  editable = true
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCriterion, setEditingCriterion] = useState<AssessmentCriterion | null>(null);

  const competencyAreas = ['知識・技能', '思考・判断・表現', '学びに向かう力・人間性'] as const;

  const addNewCriterion = () => {
    const newCriterion: AssessmentCriterion = {
      competencyArea: '知識・技能',
      criterion: '',
      indicators: ['']
    };
    onChange([...criteria, newCriterion]);
    setEditingIndex(criteria.length);
    setEditingCriterion(newCriterion);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingCriterion({ ...criteria[index] });
  };

  const saveEdit = () => {
    if (editingIndex !== null && editingCriterion) {
      const updatedCriteria = [...criteria];
      updatedCriteria[editingIndex] = editingCriterion;
      onChange(updatedCriteria);
      setEditingIndex(null);
      setEditingCriterion(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingCriterion(null);
  };

  const deleteCriterion = (index: number) => {
    const updatedCriteria = criteria.filter((_, i) => i !== index);
    onChange(updatedCriteria);
  };

  const updateEditingCriterion = (field: keyof AssessmentCriterion, value: any) => {
    if (editingCriterion) {
      setEditingCriterion({
        ...editingCriterion,
        [field]: value
      });
    }
  };

  const addIndicator = () => {
    if (editingCriterion) {
      setEditingCriterion({
        ...editingCriterion,
        indicators: [...editingCriterion.indicators, '']
      });
    }
  };

  const updateIndicator = (indicatorIndex: number, value: string) => {
    if (editingCriterion) {
      const updatedIndicators = [...editingCriterion.indicators];
      updatedIndicators[indicatorIndex] = value;
      setEditingCriterion({
        ...editingCriterion,
        indicators: updatedIndicators
      });
    }
  };

  const removeIndicator = (indicatorIndex: number) => {
    if (editingCriterion && editingCriterion.indicators.length > 1) {
      const updatedIndicators = editingCriterion.indicators.filter((_, i) => i !== indicatorIndex);
      setEditingCriterion({
        ...editingCriterion,
        indicators: updatedIndicators
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">評価規準表</h3>
          {editable && (
            <button
              onClick={addNewCriterion}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              評価規準を追加
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                観点
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                評価規準
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                評価の観点
              </th>
              {editable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  操作
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {criteria.map((criterion, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <select
                      value={editingCriterion?.competencyArea || ''}
                      onChange={(e) => updateEditingCriterion('competencyArea', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      {competencyAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      criterion.competencyArea === '知識・技能' ? 'bg-blue-100 text-blue-800' :
                      criterion.competencyArea === '思考・判断・表現' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {criterion.competencyArea}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <textarea
                      value={editingCriterion?.criterion || ''}
                      onChange={(e) => updateEditingCriterion('criterion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                      rows={2}
                      placeholder="評価規準を入力..."
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{criterion.criterion}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <div className="space-y-2">
                      {editingCriterion?.indicators.map((indicator, indicatorIndex) => (
                        <div key={indicatorIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={indicator}
                            onChange={(e) => updateIndicator(indicatorIndex, e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="評価の観点..."
                          />
                          {editingCriterion.indicators.length > 1 && (
                            <button
                              onClick={() => removeIndicator(indicatorIndex)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addIndicator}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Plus className="h-3 w-3" />
                        観点を追加
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {criterion.indicators.map((indicator, indicatorIndex) => (
                        <div key={indicatorIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                          <span>{indicator}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                {editable && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingIndex === index ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="保存"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="キャンセル"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditing(index)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="編集"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCriterion(index)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="削除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {criteria.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="mb-4">
            <Save className="h-12 w-12 text-gray-300 mx-auto" />
          </div>
          <p className="text-lg font-medium mb-2">評価規準が設定されていません</p>
          <p className="text-sm mb-4">「評価規準を追加」ボタンから新しい評価規準を作成してください。</p>
          {editable && (
            <button
              onClick={addNewCriterion}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              最初の評価規準を追加
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluationCriteriaTable;