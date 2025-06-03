import React from 'react';
import { GraduationCap } from 'lucide-react';

interface GradeSelectorProps {
  selectedGrade: string;
  onChange: (grade: string) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade, onChange }) => {
  const grades = [
    { id: 'all', name: 'すべて' },
    { id: 'elementary', name: '小学校' },
    { id: 'elementary-1', name: '小学1年生' },
    { id: 'elementary-2', name: '小学2年生' },
    { id: 'elementary-3', name: '小学3年生' },
    { id: 'elementary-4', name: '小学4年生' },
    { id: 'elementary-5', name: '小学5年生' },
    { id: 'elementary-6', name: '小学6年生' },
    { id: 'junior-high', name: '中学校' },
    { id: 'junior-high-1', name: '中学1年生' },
    { id: 'junior-high-2', name: '中学2年生' },
    { id: 'junior-high-3', name: '中学3年生' },
    { id: 'high-school', name: '高等学校' },
    { id: 'high-school-1', name: '高校1年生' },
    { id: 'high-school-2', name: '高校2年生' },
    { id: 'high-school-3', name: '高校3年生' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-gray-700 mb-2 text-sm">
        <GraduationCap className="h-4 w-4" />
        <span>学年</span>
      </div>
      <select
        value={selectedGrade}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48"
      >
        {grades.map(grade => (
          <option key={grade.id} value={grade.id}>
            {grade.name}
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

export default GradeSelector;