import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Material } from '../../types/material';

interface MaterialLessonFlowProps {
  material: Material;
}

const MaterialLessonFlow: React.FC<MaterialLessonFlowProps> = ({ material }) => {
  if (!material.lessonFlow || material.lessonFlow.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">この教材には授業フローが設定されていません。</p>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          授業の流れ
        </h3>
        <div className="text-sm text-gray-500">
          合計: {material.duration}分
        </div>
      </div>
      
      <div className="space-y-4">
        {material.lessonFlow.map((phase, index) => (
          <div 
            key={index}
            className="relative flex flex-col md:flex-row md:items-start gap-4 p-4 border border-gray-200 rounded-lg bg-white"
          >
            {/* Timeline connector */}
            {index < material.lessonFlow!.length - 1 && (
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
            )}
            
            {/* Phase number */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl z-10">
              {index + 1}
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{phase.name}</h4>
                <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{phase.duration}分</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{phase.description}</p>
              
              {phase.pdfPages && phase.pdfPages.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span>使用ページ: {phase.pdfPages.join(', ')}ページ</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {material.teachingPoints && material.teachingPoints.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">指導ポイント</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            {material.teachingPoints.map((point, index) => (
              <li key={index} className="text-gray-700">{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {material.evaluationMethods && material.evaluationMethods.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">評価方法</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            {material.evaluationMethods.map((method, index) => (
              <li key={index} className="text-gray-700">{method}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MaterialLessonFlow;