"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Tab = "overview" | "finance" | "swot" | "action" | "pitch";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "📋 事業概要" },
  { id: "finance", label: "💰 収支計画" },
  { id: "swot", label: "🔍 SWOT分析" },
  { id: "action", label: "📅 アクションプラン" },
  { id: "pitch", label: "🚀 投資家ピッチ" },
];

type Result = Record<Tab, string>;

function parseResult(text: string): Result {
  const get = (tag: string) => {
    const m = text.match(new RegExp(`===\\s*${tag}\\s*===\\s*([\\s\\S]*?)(?====|$)`));
    return m ? m[1].trim() : "";
  };
  return {
    overview: get("OVERVIEW"),
    finance: get("FINANCE"),
    swot: get("SWOT"),
    action: get("ACTION"),
    pitch: get("PITCH"),
  };
}

const INDUSTRIES = [
  "飲食・カフェ", "小売・EC", "IT・Web・アプリ", "製造業", "建設・不動産",
  "医療・介護・福祉", "美容・エステ", "教育・スクール", "コンサルティング",
  "農業・食品", "輸送・物流", "その他",
];

export default function ToolPage() {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    scale: "個人事業主・フリーランス",
    overview: "",
    strengths: "",
    challenges: "",
    goal3y: "",
    initialFund: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [copied, setCopied] = useState<Tab | null>(null);

  useEffect(() => {
    fetch("/api/auth/status").then((r) => r.json()).then((d) => {
      setIsPremium(d.premium);
      setRemaining(d.remaining);
    });
  }, []);

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function generate() {
    if (!form.overview.trim() || !form.industry) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 402) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }
      setResult(parseResult(data.result));
      setRemaining(data.remaining);
      setTab("overview");
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  }

  async function startCheckout(priceType: "once" | "monthly") {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setCheckoutLoading(false);
    }
  }

  function copy(content: string, key: Tab) {
    navigator.clipboard.writeText(content);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function print() {
    window.print();
  }

  const canGenerate = form.overview.trim() && form.industry && (isPremium || (remaining !== null && remaining > 0));

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-emerald-400">📊 AI経営計画書作成</Link>
        <div className="flex items-center gap-4">
          {isPremium && <span className="text-xs text-emerald-400 font-bold">✓ プレミアム</span>}
          {!isPremium && remaining !== null && (
            <span className="text-xs text-gray-400">残り無料 {remaining}回</span>
          )}
          <button
            onClick={print}
            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition"
          >
            印刷
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Form */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
          <h2 className="font-bold text-lg text-emerald-400">事業情報を入力</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">事業名・屋号（任意）</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                placeholder="例：田中食堂 / 株式会社〇〇"
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">業種 <span className="text-red-400">*</span></label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                value={form.industry}
                onChange={(e) => set("industry", e.target.value)}
              >
                <option value="">選択してください</option>
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">事業規模</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                value={form.scale}
                onChange={(e) => set("scale", e.target.value)}
              >
                {["個人事業主・フリーランス", "法人（1〜5名）", "法人（6〜20名）", "法人（21名以上）"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">初期投資・資金調達額（任意）</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                placeholder="例：500万円（自己資金200万＋融資300万）"
                value={form.initialFund}
                onChange={(e) => set("initialFund", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-400">事業概要・やりたいこと <span className="text-red-400">*</span></label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-500 h-28"
              placeholder="例：地元の無農薬野菜を使った健康志向のカフェを開業したい。20〜40代の女性をメインターゲットに、ランチとスイーツを提供。テイクアウトとECサイトでの通販も展開予定。"
              value={form.overview}
              onChange={(e) => set("overview", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">強み・差別化ポイント</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-500 h-24"
                placeholder="例：農家直送で仕入れコスト30%削減。管理栄養士の資格保有。SNSフォロワー5,000人。"
                value={form.strengths}
                onChange={(e) => set("strengths", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">現在の課題・懸念事項</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-500 h-24"
                placeholder="例：開業資金が不足。競合店が多い立地。スタッフ採用が難しい。"
                value={form.challenges}
                onChange={(e) => set("challenges", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-400">3年後の目標</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="例：年商3,000万・2店舗展開・EC売上月100万"
              value={form.goal3y}
              onChange={(e) => set("goal3y", e.target.value)}
            />
          </div>
        </div>

        {!isPremium && remaining === 0 && !result && (
          <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-4 text-center">
            <p className="text-sm text-emerald-200 mb-3">無料回数を使い切りました。</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => startCheckout("once")} disabled={checkoutLoading} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-5 py-2 rounded-xl text-sm transition disabled:opacity-50">
                {checkoutLoading ? "処理中..." : "¥2,980 1回払い"}
              </button>
              <button onClick={() => startCheckout("monthly")} disabled={checkoutLoading} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition disabled:opacity-50">
                {checkoutLoading ? "処理中..." : "¥4,980/月 使い放題"}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={generate}
          disabled={loading || !canGenerate}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl text-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "AIが経営計画書を作成中..." : "経営計画書を生成する"}
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {showPaywall && (
          <div className="bg-gray-900 border border-emerald-500 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">無料回数が終わりました</h3>
            <p className="text-gray-400 text-sm mb-6">¥2,980（1回払い）または¥4,980/月（使い放題）</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => startCheckout("once")} disabled={checkoutLoading} className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-3 rounded-xl transition disabled:opacity-50">
                {checkoutLoading ? "処理中..." : "¥2,980で1回作成"}
              </button>
              <button onClick={() => startCheckout("monthly")} disabled={checkoutLoading} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50">
                {checkoutLoading ? "処理中..." : "¥4,980/月"}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-gray-800">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition ${tab === t.id ? "text-emerald-400 border-b-2 border-emerald-400" : "text-gray-500 hover:text-gray-300"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              <div className="flex justify-end mb-4 gap-2">
                <button
                  onClick={() => copy(result[tab], tab)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition"
                >
                  {copied === tab ? "コピー済" : "このタブをコピー"}
                </button>
                <button
                  onClick={print}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition"
                >
                  印刷
                </button>
              </div>
              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {result[tab] || "このセクションの内容がありません。"}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>
    </main>
  );
}
