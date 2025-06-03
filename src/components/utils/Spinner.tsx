import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-blue-600' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-4'
  };
  
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`spinner ${sizeClass} ${color} rounded-full animate-spin border-t-transparent`}></div>
  );
};

export default Spinner;