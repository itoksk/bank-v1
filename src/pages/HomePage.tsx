import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Clock, Star, Award } from 'lucide-react';
import MaterialCard from '../components/materials/MaterialCard';
import CategorySelector from '../components/materials/CategorySelector';
import GradeSelector from '../components/materials/GradeSelector';
import { fetchPopularMaterials, fetchLatestMaterials, fetchFeaturedMaterials } from '../services/materialService';
import { Material } from '../types/material';
import HeroSection from '../components/home/HeroSection';
import FeaturedTeacherSection from '../components/home/FeaturedTeacherSection';

const HomePage: React.FC = () => {
  const [popularMaterials, setPopularMaterials] = useState<Material[]>([]);
  const [latestMaterials, setLatestMaterials] = useState<Material[]>([]);
  const [featuredMaterials, setFeaturedMaterials] = useState<Material[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [popular, latest, featured] = await Promise.all([
          fetchPopularMaterials({ category: selectedCategory, grade: selectedGrade, limit: 8 }),
          fetchLatestMaterials({ category: selectedCategory, grade: selectedGrade, limit: 8 }),
          fetchFeaturedMaterials({ limit: 3 })
        ]);
        
        setPopularMaterials(popular);
        setLatestMaterials(latest);
        setFeaturedMaterials(featured);
      } catch (error) {
        console.error('Failed to fetch materials', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory, selectedGrade]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Filter Controls */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <CategorySelector 
                selectedCategory={selectedCategory} 
                onChange={setSelectedCategory} 
              />
              <GradeSelector 
                selectedGrade={selectedGrade} 
                onChange={setSelectedGrade} 
              />
            </div>
            <Link 
              to="/search" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
            >
              詳細検索
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Materials */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="h-6 w-6 text-orange-500" />
              今月のおすすめ教材
            </h2>
            <Link 
              to="/search?category=featured" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
            >
              もっと見る
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : (
              featuredMaterials.map(material => (
                <MaterialCard 
                  key={material.id} 
                  material={material} 
                  featured={true}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Popular Materials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-500" />
              人気の教材
            </h2>
            <Link 
              to="/search?category=popular" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
            >
              もっと見る
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : popularMaterials.length > 0 ? (
              popularMaterials.map(material => (
                <MaterialCard 
                  key={material.id} 
                  material={material} 
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">
                該当する教材が見つかりませんでした。
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Latest Materials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-6 w-6 text-green-500" />
              新着の教材
            </h2>
            <Link 
              to="/search?category=new" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
            >
              もっと見る
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : latestMaterials.length > 0 ? (
              latestMaterials.map(material => (
                <MaterialCard 
                  key={material.id} 
                  material={material} 
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">
                該当する教材が見つかりませんでした。
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Teachers */}
      <FeaturedTeacherSection />
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">教育の力を共に高めましょう</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            あなたの教材や授業を共有して、全国の生徒たちの学びを支援しませんか？
            登録は簡単で、すぐに始められます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register?role=teacher" 
              className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-full font-medium transition-colors"
            >
              教師として登録
            </Link>
            <Link 
              to="/register?role=student" 
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-medium transition-colors"
            >
              生徒として登録
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;