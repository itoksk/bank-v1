import React from 'react';
import { Clipboard } from 'lucide-react';
import { Material } from '../../types/material';

interface MaterialRequirementsProps {
  material: Material;
}

const MaterialRequirements: React.FC<MaterialRequirementsProps> = ({ material }) => {
  if (!material.preparationItems || material.preparationItems.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Clipboard className="h-5 w-5 text-blue-600" />
        準備するもの
      </h3>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {material.preparationItems.map((item, index) => (
          <li 
            key={index}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {index + 1}
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialRequirements;