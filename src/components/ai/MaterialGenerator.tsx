import React, { useState } from 'react';
import { Sparkles, Wand2, Download, Loader, CheckCircle } from 'lucide-react';
import { Material } from '../../types/material';
import { MaterialGenerationRequest, GeneratedMaterial } from '../../types/ai';
import { generateMaterial } from '../../services/aiService';
import CategorySelector from '../materials/CategorySelector';
import GradeSelector from '../materials/GradeSelector';

interface MaterialGeneratorProps {
  baseMaterial: Material;
  onClose: () => void;
}

const MaterialGenerator: React.FC<MaterialGeneratorProps> = ({ baseMaterial, onClose }) => {
  const [targetGrade, setTargetGrade] = useState('all');
  const [targetSubject, setTargetSubject] = useState(baseMaterial.subject);
  const [difficulty, setDifficulty] = useState(baseMaterial.difficulty);
  const [duration, setDuration] = useState(baseMaterial.duration);
  const [customInstructions, setCustomInstructions] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMaterial, setGeneratedMaterial] = useState<GeneratedMaterial | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const request: MaterialGenerationRequest = {
        baseMaterialId: baseMaterial.id,
        targetGrade,
        targetSubject,
        difficulty,
        duration,
        customInstructions,
        focusAreas
      };
      
      const result = await generateMaterial(request);
      setGeneratedMaterial(result);
    } catch (error) {
      console.error('Failed to generate material', error);
    } finally {
      setIsGenerating(false);
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

  if (generatedMaterial) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">教材生成完了</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{generatedMaterial.title}</h4>
            <p className="text-gray-600 mb-4">{generatedMaterial.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">生成された内容</h5>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {generatedMaterial.content}
              </pre>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                // In a real app, this would save the material
                console.log('Saving generated material:', generatedMaterial);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              教材として保存
            </button>
            <button
              onClick={() => setGeneratedMaterial(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              再生成
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">AI教材生成</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">元の教材</h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{baseMaterial.title}</p>
            <p className="text-sm text-gray-600">{baseMaterial.subject} • {baseMaterial.grade}</p>
          </div>
        </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              教材を生成
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MaterialGenerator;