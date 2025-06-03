import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Award } from 'lucide-react';
import { fetchFeaturedTeachers } from '../../services/userService';
import { Teacher } from '../../types/user';

const FeaturedTeacherSection: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchFeaturedTeachers({ limit: 4 });
        setTeachers(data);
      } catch (error) {
        console.error('Failed to fetch featured teachers', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6 text-purple-600" />
            人気の先生
          </h2>
          <Link 
            to="/teachers" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
          >
            すべての先生を見る
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
            ))
          ) : (
            teachers.map(teacher => (
              <Link 
                key={teacher.id} 
                to={`/profile/${teacher.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="h-32 bg-gradient-to-r from-blue-100 to-teal-100 relative">
                  {teacher.isFeatured && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>注目の先生</span>
                    </div>
                  )}
                </div>
                
                <div className="px-6 pt-0 pb-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 -mt-10 mb-4 overflow-hidden">
                    {teacher.profileImage ? (
                      <img 
                        src={teacher.profileImage} 
                        alt={teacher.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold">
                        {teacher.displayName ? teacher.displayName.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {teacher.displayName}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-3">
                    {teacher.school} • {teacher.subject}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      教材 {teacher.materialCount}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full">
                      👍 {teacher.likeCount}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeacherSection;