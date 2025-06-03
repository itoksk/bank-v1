import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Shield, MessageCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              教育の力で、未来を創る
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              教材バンクは、全国の先生と生徒をつなぎ、質の高い教育を誰もが受けられる社会を目指しています。
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <BookOpen className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                豊富な教材コンテンツ
              </h3>
              <p className="text-gray-600">
                数学、国語、理科、社会、英語をはじめ、道徳、情報、技術、美術、音楽など、
                幅広い教科の教材を提供しています。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                先生と生徒をつなぐ
              </h3>
              <p className="text-gray-600">
                全国の優れた先生方の授業を、場所や時間を問わず受講できます。
                双方向のコミュニケーションで、学びをより深めることができます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Award className="h-12 w-12 text-yellow-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                最新の教育トレンド
              </h3>
              <p className="text-gray-600">
                ICT活用、生成AI、デジタルシティズンシップなど、
                現代の教育に必要な新しい分野の教材も充実しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">私たちのミッション</h2>
            <p className="text-xl mb-8">
              教育のデジタル化を推進し、すべての生徒が質の高い教育を受けられる
              機会を提供することで、教育格差の解消を目指します。
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              今すぐ始める
            </Link>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            充実のサポート体制
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <MessageCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  24時間サポート
                </h3>
                <p className="text-gray-600">
                  技術的な問題や質問があれば、いつでもサポートチームが対応いたします。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  安全なプラットフォーム
                </h3>
                <p className="text-gray-600">
                  個人情報保護とデータセキュリティを最優先に考え、
                  安心して利用できる環境を提供しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            さあ、始めましょう
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=teacher"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              教師として登録
            </Link>
            <Link
              to="/register?role=student"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              生徒として登録
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;