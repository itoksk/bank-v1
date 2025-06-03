import React from 'react';
import { GitBranch, Calendar, ArrowRight } from 'lucide-react';
import { Material } from '../../types/material';
import { formatDateTime } from '../../utils/dateUtils';

interface MaterialVersionHistoryProps {
  material: Material;
}

const MaterialVersionHistory: React.FC<MaterialVersionHistoryProps> = ({ material }) => {
  if (!material.versionHistory || material.versionHistory.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">バージョン履歴はありません。</p>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitBranch className="h-6 w-6 text-blue-600" />
          バージョン履歴
        </h2>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
            現在のバージョン: {material.version}
          </span>
        </div>
      </div>
      
      <div className="space-y-8">
        {material.versionHistory.map((version, index) => (
          <div 
            key={index}
            className="relative"
          >
            {/* Timeline connector */}
            {index < material.versionHistory!.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 z-10">
                <GitBranch className="h-5 w-5" />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{version.version}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateTime(version.date)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                    {version.author.profileImage ? (
                      <img 
                        src={version.author.profileImage} 
                        alt={version.author.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      version.author.displayName?.charAt(0).toUpperCase() || '?'
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{version.author.displayName}</span>
                </div>
                
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">{version.changes}</p>
                
                {index === 0 && material.versionHistory!.length > 1 && (
                  <div className="mt-3 flex justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      変更内容を確認
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {material.contributors && material.contributors.length > 0 && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">コントリビューター</h3>
          
          <div className="flex flex-wrap gap-2">
            {material.contributors.map((contributor, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                  {contributor.profileImage ? (
                    <img 
                      src={contributor.profileImage} 
                      alt={contributor.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    contributor.displayName?.charAt(0).toUpperCase() || '?'
                  )}
                </div>
                <span className="text-sm">{contributor.displayName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialVersionHistory;