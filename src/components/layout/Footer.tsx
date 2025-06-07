import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  // Social media sharing functions
  const shareOnX = () => {
    const text = '教材バンクで質の高い教育コンテンツを発見しました！';
    const url = window.location.origin;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll open Instagram
    window.open('https://www.instagram.com/', '_blank');
  };

  const shareOnThreads = () => {
    const text = '教材バンクで質の高い教育コンテンツを発見しました！';
    const url = window.location.origin;
    const threadsUrl = `https://threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(threadsUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = window.location.origin;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

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
              <button
                onClick={shareOnX}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Xでシェア"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button
                onClick={shareOnInstagram}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Instagramで投稿"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                onClick={shareOnThreads}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Threadsでシェア"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button
                onClick={shareOnFacebook}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Facebookでシェア"
              >
                <Facebook className="h-5 w-5" />
              </button>
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