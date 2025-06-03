import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BookOpen, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-105"
        >
          <BookOpen className="h-8 w-8" />
          <span className="hidden sm:inline">教材バンク</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/search?category=popular" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            人気教材
          </Link>
          <Link 
            to="/search?category=new" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            新着教材
          </Link>
          <Link 
            to="/search" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            教材検索
          </Link>
        </nav>

        {/* Search and User */}
        <div className="flex items-center gap-4">
          <Link 
            to="/search" 
            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="検索"
          >
            <Search className="h-5 w-5" />
          </Link>

          {user ? (
            <UserMenu />
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1 py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>ログイン</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/search?category=popular" 
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                人気教材
              </Link>
              <Link 
                to="/search?category=new" 
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                新着教材
              </Link>
              <Link 
                to="/search" 
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                教材検索
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;