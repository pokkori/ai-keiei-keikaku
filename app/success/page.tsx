"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#10b981", "#059669", "#eab308", "#3b82f6", "#8b5cf6", "#f97316"];
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
    setParticles(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    // Komoju session verify
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`/api/komoju/verify?session_id=${sessionId}`).catch(() => {});
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">&#x1F4CA;</div>
          <h1 className="text-3xl font-black mb-2">ご購入ありがとうございます！</h1>
          <p className="text-emerald-300">経営計画書AIの全機能が使えるようになりました</p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-700 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-emerald-300 mb-3 text-sm">あなたの特典</h2>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">&#10003;</span>
              AI経営計画書の自動生成
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">&#10003;</span>
              事業概要・収支計画・SWOT分析
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">&#10003;</span>
              アクションプラン自動作成
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">&#10003;</span>
              投資家向けピッチ資料生成
            </li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-emerald-200 text-center text-sm">経営計画作成の3ステップ</h2>

          <Link href="/tool" className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-400">1</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">事業情報を入力する</p>
              <p className="text-xs text-emerald-300/60">8項目を入力するだけでAIが計画書を生成</p>
            </div>
            <span className="text-gray-500 group-hover:text-emerald-400 transition-colors">&rarr;</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-400">2</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">5タブの分析結果を確認</p>
              <p className="text-xs text-emerald-300/60">事業概要/収支/SWOT/アクション/ピッチ</p>
            </div>
            <span className="text-gray-500 group-hover:text-emerald-400 transition-colors">&rarr;</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-400">3</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">計画書をコピー・印刷</p>
              <p className="text-xs text-emerald-300/60">銀行融資・投資家面談にそのまま活用</p>
            </div>
            <span className="text-gray-500 group-hover:text-emerald-400 transition-colors">&rarr;</span>
          </Link>
        </div>


        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-1">ご感想をお聞かせください（30秒）</p>
          <a href="mailto:support@pokkorilab.com?subject=%E3%81%94%E6%84%9F%E6%83%B3&body=%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E5%90%8D%EF%BC%9A%0A%E6%84%9F%E6%83%B3%EF%BC%9A" className="text-xs text-blue-500 underline hover:text-blue-700">感想を送る →</a>
        </div>
        <div className="text-center bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-xs text-emerald-300/60 mb-1">経営計画は定期的な見直しが鍵</p>
          <p className="text-sm font-bold text-emerald-200">このサイトをブックマークしておきましょう</p>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center py-12 px-4">
      <Suspense fallback={<p className="text-emerald-400">読み込み中...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
