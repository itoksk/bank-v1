import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { fetchPopularMaterials } from '../services/materialService';
import { Material, MaterialSearchParams } from '../types/material';
import MaterialCard from '../components/materials/MaterialCard';
import CategorySelector from '../components/materials/CategorySelector';
import GradeSelector from '../components/materials/GradeSelector';
import Spinner from '../components/utils/Spinner';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract search parameters
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialGrade = searchParams.get('grade') || 'all';
  const initialSubject = searchParams.get('subject') || 'all';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGrade, setSelectedGrade] = useState(initialGrade);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  
  // Load materials on component mount and when search params change
  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const params: MaterialSearchParams = {
          query: searchQuery,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          grade: selectedGrade !== 'all' ? selectedGrade : undefined,
          subject: selectedSubject !== 'all' ? selectedSubject : undefined,
          limit: 20
        };
        
        const data = await fetchPopularMaterials(params);
        setMaterials(data);
        setTotalResults(data.length); // In a real app, this would come from the API
      } catch (error) {
        console.error('Failed to fetch materials', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMaterials();
  }, [searchQuery, selectedCategory, selectedGrade, selectedSubject]);
  
  // Update URL search params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (searchQuery) params.q = searchQuery;
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (selectedGrade !== 'all') params.grade = selectedGrade;
    if (selectedSubject !== 'all') params.subject = selectedSubject;
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, selectedGrade, selectedSubject, setSearchParams]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to do anything as the useEffect will handle the search
  };
  
  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedGrade('all');
    setSelectedSubject('all');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">教材を検索</h1>
          
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="キーワードで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors md:w-auto w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span>フィルター</span>
              </button>
              
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors md:w-auto w-full flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                <span>検索</span>
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    詳細フィルター
                  </h3>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    リセット
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                  <GradeSelector
                    selectedGrade={selectedGrade}
                    onChange={setSelectedGrade}
                  />
                  
                  {/* Subject Selector */}
                  <div className="relative">
                    <div className="flex items-center gap-2 text-gray-700 mb-2 text-sm">
                      <span>教科</span>
                    </div>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    >
                      <option value="all">すべて</option>
                      <option value="math">数学</option>
                      <option value="japanese">国語</option>
                      <option value="science">理科</option>
                      <option value="social">社会</option>
                      <option value="english">英語</option>
                      <option value="other">その他</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
                      <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Search Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            検索結果 <span className="text-gray-500 font-normal">({totalResults}件)</span>
          </h2>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">並び替え:</span>
            <select className="appearance-none bg-white border border-gray-300 rounded-lg py-1 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="relevance">関連度</option>
              <option value="newest">新着順</option>
              <option value="popular">人気順</option>
              <option value="rating">評価順</option>
            </select>
            <div className="pointer-events-none relative -ml-7">
              <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="large" />
          </div>
        ) : materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {materials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">検索結果が見つかりませんでした</h3>
            <p className="text-gray-600 mb-6">検索条件を変更して、もう一度お試しください。</p>
            <button 
              onClick={handleResetFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && materials.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
                前へ
              </button>
              
              <button className="px-3 py-1 border border-blue-600 bg-blue-600 text-white rounded-md">
                1
              </button>
              
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                3
              </button>
              
              <span className="px-2 text-gray-500">...</span>
              
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                10
              </button>
              
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
                次へ
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;