import React from 'react';
import { HelpCircle } from 'lucide-react';

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: '教材バンクはどんなサービスですか？',
      answer: '教材バンクは、全国の先生が作成した質の高い授業と教材を共有するプラットフォームです。生徒は無料で教材を視聴し、学習することができます。'
    },
    {
      question: '利用料金はかかりますか？',
      answer: '基本的な機能は無料でご利用いただけます。一部のプレミアム機能については有料となります。詳細は料金プランをご確認ください。'
    },
    {
      question: '対応している教科を教えてください',
      answer: '主要5教科（数学、国語、理科、社会、英語）に加え、道徳、情報、技術、美術、音楽、看護、水産、農業、工業など、幅広い教科に対応しています。また、ICT活用、生成AI、デジタルシティズンシップなどの現代的なテーマの教材も提供しています。'
    },
    {
      question: '教材を投稿するには何が必要ですか？',
      answer: '教師アカウントを作成し、本人確認を完了する必要があります。その後、教材作成ガイドラインに沿って教材を作成し、投稿することができます。'
    },
    {
      question: '生徒の学習進捗は記録されますか？',
      answer: 'はい、生徒アカウントでログインすると、視聴した教材や学習時間、テストの成績などが自動的に記録されます。'
    },
    {
      question: '教材の著作権はどうなりますか？',
      answer: '投稿された教材の著作権は作成者に帰属します。ただし、プラットフォーム上での共有と使用を許諾していただく必要があります。'
    },
    {
      question: '技術的な問題が発生した場合はどうすればよいですか？',
      answer: 'サポートページからお問い合わせいただくか、support@kyozai-bank.example.com までメールでご連絡ください。24時間以内に対応いたします。'
    },
    {
      question: '教材の品質はどのように管理されていますか？',
      answer: '専門家による審査チームが、投稿された教材の内容や品質を確認しています。また、ユーザーからのフィードバックも品質向上に活用しています。'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-blue-600" />
            よくある質問
          </h1>

          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              お探しの回答が見つかりませんでしたか？
            </h2>
            <p className="text-gray-600 mb-4">
              お気軽にサポートチームまでお問い合わせください。
              24時間以内に返信いたします。
            </p>
            <a
              href="mailto:support@kyozai-bank.example.com"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;