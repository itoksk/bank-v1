import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">教材バンク</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              全国の教師がカリキュラムと授業動画を共有し、生徒が無料で質の高い学習を楽しめるプラットフォーム。
              教育の力で未来を創る。
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@kyozai-bank.example.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">教材を探す</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?category=popular" className="text-gray-400 hover:text-blue-400 transition-colors">
                  人気教材
                </Link>
              </li>
              <li>
                <Link to="/search?category=new" className="text-gray-400 hover:text-blue-400 transition-colors">
                  新着教材
                </Link>
              </li>
              <li>
                <Link to="/search?subject=math" className="text-gray-400 hover:text-blue-400 transition-colors">
                  数学
                </Link>
              </li>
              <li>
                <Link to="/search?subject=science" className="text-gray-400 hover:text-blue-400 transition-colors">
                  理科
                </Link>
              </li>
              <li>
                <Link to="/search?subject=japanese" className="text-gray-400 hover:text-blue-400 transition-colors">
                  国語
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  サービス概要
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 教材バンク. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;