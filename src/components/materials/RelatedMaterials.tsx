import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { fetchRelatedMaterials } from '../../services/materialService';
import { Material } from '../../types/material';
import Spinner from '../utils/Spinner';

interface RelatedMaterialsProps {
  materialId: string;
}

const RelatedMaterials: React.FC<RelatedMaterialsProps> = ({ materialId }) => {
  const [relatedMaterials, setRelatedMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRelatedMaterials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRelatedMaterials(materialId, 4);
        setRelatedMaterials(data);
      } catch (error) {
        console.error('Failed to fetch related materials', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedMaterials();
  }, [materialId]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">関連教材</h3>
        <div className="flex justify-center py-6">
          <Spinner size="medium" />
        </div>
      </div>
    );
  }

  if (relatedMaterials.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">関連教材</h3>
        <p className="text-gray-500 text-center py-4">関連する教材が見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-blue-600" />
        関連教材
      </h3>
      
      <div className="space-y-3">
        {relatedMaterials.map(material => (
          <Link
            key={material.id}
            to={`/material/${material.id}`}
            className="flex gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              {material.thumbnailUrl ? (
                <img
                  src={material.thumbnailUrl}
                  alt={material.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Layers className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{material.title}</h4>
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                  {material.subject}
                </span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-600 rounded text-xs">
                  {material.grade}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedMaterials;