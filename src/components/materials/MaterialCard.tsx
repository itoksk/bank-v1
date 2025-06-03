import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, BookOpen, ThumbsUp, Star, Clock, GitFork } from 'lucide-react';
import { Material } from '../../types/material';
import { formatDate } from '../../utils/dateUtils';

interface MaterialCardProps {
  material: Material;
  featured?: boolean;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, featured = false }) => {
  const {
    id,
    title,
    description,
    thumbnailUrl,
    subject,
    grade,
    author,
    createdAt,
    viewCount,
    likeCount,
    forkCount,
    duration,
  } = material;

  // Determine difficulty level color
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-600';
      case 2: return 'bg-blue-100 text-blue-600';
      case 3: return 'bg-yellow-100 text-yellow-600';
      case 4: return 'bg-orange-100 text-orange-600';
      case 5: return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const difficultyClass = getDifficultyColor(material.difficulty);

  if (featured) {
    return (
      <Link
        to={`/material/${id}`}
        className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:border-blue-200"
      >
        <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
          <img
            src={thumbnailUrl || 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600'}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                {subject}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">
                {grade}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white line-clamp-2">{title}</h3>
          </div>
        </div>
        
        <div className="flex-grow p-5">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}分</span>
            <span className="mx-2">•</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyClass}`}>
              難易度 {material.difficulty}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Eye className="h-4 w-4" />
              <span>{viewCount}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <ThumbsUp className="h-4 w-4" />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <GitFork className="h-4 w-4" />
              <span>{forkCount}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm overflow-hidden">
                {author.profileImage ? (
                  <img 
                    src={author.profileImage} 
                    alt={author.displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  author.displayName?.charAt(0).toUpperCase() || '?'
                )}
              </div>
              <div>
                <div className="text-sm font-medium">{author.displayName}</div>
                <div className="text-xs text-gray-500">{formatDate(createdAt)}</div>
              </div>
            </div>
            
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium transition-colors group-hover:bg-blue-100">
              詳細を見る
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/material/${id}`}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200 transition-all hover:shadow-md hover:border-blue-200"
    >
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        <img
          src={thumbnailUrl || 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600'}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
            {subject}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500 text-white">
            {grade}
          </span>
        </div>
      </div>
      
      <div className="flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>{duration}分</span>
          <span className="mx-2">•</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyClass}`}>
            難易度 {material.difficulty}
          </span>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Eye className="h-3 w-3" />
            <span>{viewCount}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <ThumbsUp className="h-3 w-3" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <GitFork className="h-3 w-3" />
            <span>{forkCount}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs overflow-hidden">
            {author.profileImage ? (
              <img 
                src={author.profileImage} 
                alt={author.displayName} 
                className="w-full h-full object-cover"
              />
            ) : (
              author.displayName?.charAt(0).toUpperCase() || '?'
            )}
          </div>
          <div className="text-xs text-gray-500">{author.displayName}</div>
        </div>
      </div>
    </Link>
  );
};

export default MaterialCard;