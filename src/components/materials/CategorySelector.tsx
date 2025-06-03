import React from 'react';
import { BookOpen } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onChange }) => {
  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'math', name: '数学' },
    { id: 'japanese', name: '国語' },
    { id: 'science', name: '理科' },
    { id: 'social', name: '社会' },
    { id: 'english', name: '英語' },
    { id: 'moral', name: '道徳' },
    { id: 'information', name: '情報' },
    { id: 'technology', name: '技術' },
    { id: 'art', name: '美術' },
    { id: 'music', name: '音楽' },
    { id: 'nursing', name: '看護' },
    { id: 'fishery', name: '水産' },
    { id: 'agriculture', name: '農業' },
    { id: 'industry', name: '工業' },
    { id: 'ict', name: 'ICT' },
    { id: 'ai', name: '生成AI' },
    { id: 'citizenship', name: 'デジタルシティズンシップ' },
    { id: 'other', name: 'その他' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-gray-700 mb-2 text-sm">
        <BookOpen className="h-4 w-4" />
        <span>教科</span>
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48"
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default CategorySelector;