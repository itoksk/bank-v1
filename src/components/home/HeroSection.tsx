import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 w-full h-full" 
          style={{ 
            backgroundImage: 'url("https://images.pexels.com/photos/267586/pexels-photo-267586.jpeg?auto=compress&cs=tinysrgb&w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
            教育の力で、<br className="md:hidden" />
            <span className="text-yellow-300">未来</span>を創る
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fadeIn animation-delay-200">
            全国の先生が作った質の高い授業と教材を、<br className="hidden md:inline" />
            いつでもどこでも無料で学べるプラットフォーム
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-12 animate-fadeIn animation-delay-400">
            <input
              type="text"
              placeholder="教科名、単元名、キーワードで検索..."
              className="w-full h-14 pl-5 pr-16 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1 h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="検索"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3 animate-fadeIn animation-delay-600">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              #数学
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              #国語
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              #理科
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              #社会
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              #英語
            </span>
          </div>
        </div>
      </div>
      
      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white">
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;