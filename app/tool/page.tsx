"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import { track } from '@vercel/analytics';

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

type Tab = "overview" | "finance" | "swot" | "action" | "pitch" | "benchmark" | "checklist";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "📋 事業概要" },
  { id: "finance", label: "💰 収支計画" },
  { id: "swot", label: "🔍 SWOT分析" },
  { id: "action", label: "📅 アクションプラン" },
  { id: "pitch", label: "🚀 投資家ピッチ" },
  { id: "benchmark", label: "📊 業界比較" },
  { id: "checklist", label: "✅ 融資チェック" },
];

// 業種別ベンチマーク数値（中小企業白書2024年版ベース）
const INDUSTRY_BENCHMARKS: Record<string, {
  salesGrowth: string;
  profitMargin: string;
  loanApproval: string;
  avgSales: string;
  tips: string;
}> = {
  "飲食・カフェ": {
    salesGrowth: "2〜5%",
    profitMargin: "3〜8%",
    loanApproval: "約62%",
    avgSales: "中小飲食店 平均年商3,200万円",
    tips: "飲食業の利益率は3〜8%が平均。10%超えは高収益店舗。原価率30%以下・人件費30%以下が黒字経営の目安です。",
  },
  "小売・EC": {
    salesGrowth: "3〜8%",
    profitMargin: "5〜12%",
    loanApproval: "約58%",
    avgSales: "中小小売 平均年商4,800万円",
    tips: "EC小売の粗利率は40〜60%が目安。送料・返品コストを加味した実質利益率5〜12%が一般的です。",
  },
  "IT・Web・アプリ": {
    salesGrowth: "10〜25%",
    profitMargin: "15〜30%",
    loanApproval: "約71%",
    avgSales: "中小IT企業 平均年商8,500万円",
    tips: "IT・SaaS業界の利益率は15〜30%と他業種より高め。ARR/MRRの継続収益モデルが融資審査でも高評価を受けます。",
  },
  "製造業": {
    salesGrowth: "1〜4%",
    profitMargin: "3〜7%",
    loanApproval: "約65%",
    avgSales: "中小製造業 平均年商1.2億円",
    tips: "製造業の利益率は3〜7%。設備稼働率80%以上・在庫回転率の改善が収益向上の鍵。補助金採択率も高い業種です。",
  },
  "建設・不動産": {
    salesGrowth: "2〜6%",
    profitMargin: "4〜10%",
    loanApproval: "約60%",
    avgSales: "中小建設 平均年商9,200万円",
    tips: "建設業の完工利益率は4〜10%が目安。外注費率50%超は要注意。職人の確保と工期管理が評価ポイントです。",
  },
  "医療・介護・福祉": {
    salesGrowth: "3〜8%",
    profitMargin: "5〜12%",
    loanApproval: "約74%",
    avgSales: "訪問介護 平均年商6,500万円",
    tips: "介護・医療は診療報酬・介護報酬が安定収入。人件費比率60〜70%が標準。融資承認率が高い業種の一つです。",
  },
  "美容・エステ": {
    salesGrowth: "2〜6%",
    profitMargin: "8〜18%",
    loanApproval: "約55%",
    avgSales: "美容室 平均年商2,800万円",
    tips: "美容・サロンの粗利率は70〜80%と高め。技術単価の向上とリピート率（70%以上が優良）が収益の鍵です。",
  },
  "教育・スクール": {
    salesGrowth: "4〜10%",
    profitMargin: "10〜20%",
    loanApproval: "約67%",
    avgSales: "教育サービス 平均年商3,900万円",
    tips: "教育・スクール業は粗利率が高く（60〜80%）、固定費管理が重要。継続率（退会率5%以下が優良）が評価されます。",
  },
  "コンサルティング": {
    salesGrowth: "5〜15%",
    profitMargin: "20〜35%",
    loanApproval: "約69%",
    avgSales: "中小コンサル 平均年商4,200万円",
    tips: "コンサル業は利益率20〜35%と高水準。一方で属人的リスクを問われます。顧問契約比率と1人月単価が審査のポイントです。",
  },
  "農業・食品": {
    salesGrowth: "1〜4%",
    profitMargin: "3〜8%",
    loanApproval: "約70%",
    avgSales: "農業法人 平均年商5,000万円",
    tips: "農業・食品加工は6次産業化で利益率が向上。農林漁業向け融資は日本政策金融公庫の専門窓口で承認率が高めです。",
  },
  "輸送・物流": {
    salesGrowth: "2〜5%",
    profitMargin: "3〜7%",
    loanApproval: "約63%",
    avgSales: "中小物流 平均年商7,800万円",
    tips: "物流業の燃料費・人件費は変動リスク大。傭車率の管理と荷主分散（上位3社で50%以下）がリスク評価のポイントです。",
  },
  "その他": {
    salesGrowth: "2〜6%",
    profitMargin: "5〜10%",
    loanApproval: "約60%",
    avgSales: "中小企業全般 平均年商5,000万円",
    tips: "業種を問わず、融資審査では「返済可能なキャッシュフロー」と「代表者の実行力の根拠」が最重視されます。",
  },
};

// 融資チェックリスト（融資担当者視点）
const LOAN_CHECKLIST = [
  { id: "purpose", label: "事業の目的・背景が明確か", category: "基本" },
  { id: "market", label: "ターゲット市場と規模が具体的か", category: "市場" },
  { id: "differentiation", label: "競合との差別化が説明できるか", category: "差別化" },
  { id: "numbers", label: "売上・費用の数値に根拠があるか", category: "財務" },
  { id: "breakeven", label: "損益分岐点が計算されているか", category: "財務" },
  { id: "risk", label: "リスクと対策が記載されているか", category: "リスク" },
  { id: "repayment", label: "返済計画が具体的か（融資申請時）", category: "財務" },
  { id: "action", label: "具体的なアクションプランがあるか", category: "実行力" },
  { id: "track", label: "申請者の経験・実績が書かれているか", category: "実行力" },
  { id: "cashflow", label: "キャッシュフローの見通しがあるか", category: "財務" },
];

type Result = Record<Exclude<Tab, "checklist">, string>;

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (/^## (.+)$/.test(line)) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(line.replace(/^## (.+)$/, '<h3 class="font-bold text-base mt-4 mb-2 text-emerald-400 border-b border-emerald-800 pb-1">$1</h3>'));
    } else if (/^# (.+)$/.test(line)) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(line.replace(/^# (.+)$/, '<h2 class="font-bold text-lg mt-4 mb-2 text-emerald-300">$1</h2>'));
    } else if (/^- (.+)$/.test(line)) {
      if (!inList) { result.push('<ul class="space-y-1 mb-2">'); inList = true; }
      const inner = line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
      result.push(`<li class="ml-4 list-disc text-gray-300 text-sm">${inner}</li>`);
    } else if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(line)) {
      if (!inList) { result.push('<ul class="space-y-1 mb-2">'); inList = true; }
      const inner = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
      result.push(`<li class="ml-4 list-disc text-gray-300 text-sm">${inner}</li>`);
    } else if (line.trim() === '') {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push('<div class="mt-2"></div>');
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      const inner = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
      result.push(`<p class="text-gray-300 text-sm leading-relaxed">${inner}</p>`);
    }
  }
  if (inList) result.push('</ul>');
  return result.join('\n');
}

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
    benchmark: get("BENCHMARK"),
  };
}

// チェックリスト完成度スコア
function calcChecklistScore(checklist: Record<string, boolean>): number {
  const checked = Object.values(checklist).filter(Boolean).length;
  return Math.round((checked / LOAN_CHECKLIST.length) * 100);
}

const INDUSTRIES = [
  "飲食・カフェ", "小売・EC", "IT・Web・アプリ", "製造業", "建設・不動産",
  "医療・介護・福祉", "美容・エステ", "教育・スクール", "コンサルティング",
  "農業・食品", "輸送・物流", "その他",
];

type TemplateFields = { overview: string; strengths: string; challenges: string; goal3y: string };
const INDUSTRY_TEMPLATES: Record<string, TemplateFields> = {
  "飲食・カフェ": {
    overview: "地元の無農薬野菜を使った健康志向のカフェを開業。20〜40代女性をターゲットに、ランチ・スイーツを提供。テイクアウト・EC通販も展開予定。",
    strengths: "農家直送で仕入れコスト30%削減。管理栄養士の資格保有。SNSフォロワー5,000人。",
    challenges: "開業資金が不足。競合店が多い立地。スタッフ採用が難しい。",
    goal3y: "年商3,000万・2店舗展開・EC月商100万",
  },
  "IT・Web・アプリ": {
    overview: "中小企業向けの業務効率化SaaSを開発・提供。受注管理・在庫管理・請求書発行を一元化するクラウドシステム。",
    strengths: "エンジニア歴10年。既存顧客5社からの収益基盤あり。月次サブスク型の安定収益モデル。",
    challenges: "営業リソースが不足。競合大手との差別化。開発・保守コストの最適化。",
    goal3y: "契約社数200社・ARR5,000万・シリーズA調達",
  },
  "小売・EC": {
    overview: "ハンドメイドアクセサリーのECサイト運営。InstagramやMinneで集客し、自社ECサイトへ誘導。OEM製造も展開予定。",
    strengths: "デザイン力とブランド力。SNSフォロワー12,000人。低在庫・高利益率のビジネスモデル。",
    challenges: "物流コストの高さ。クレーム対応の属人化。季節需要の波への対応。",
    goal3y: "月商500万・自社ブランド確立・百貨店バイヤーとの取引開始",
  },
  "医療・介護・福祉": {
    overview: "訪問介護事業所の開設。要介護1〜3の高齢者を対象に、身体介護・生活援助・通院同行サービスを提供。",
    strengths: "介護福祉士・社会福祉士の有資格者揃い。地域医療機関との連携体制。",
    challenges: "介護士の採用・定着。運転資金の確保（介護報酬の2ヶ月後払い）。",
    goal3y: "利用者数80名・スタッフ20名・地域での認知度No.1",
  },
  "コンサルティング": {
    overview: "製造業向けDXコンサルティング。工場の業務プロセス可視化・改善提案・ITシステム導入支援を提供。",
    strengths: "大手製造業10年の実務経験。デジタル・現場両方を知る希少なスキルセット。",
    challenges: "案件単価の低下リスク。属人的なサービス提供。リピート率の向上。",
    goal3y: "顧問契約10社・年商3,000万・法人化と採用",
  },
};

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
  const [showPayjp, setShowPayjp] = useState(false);
  const [payjpPlan, setPayjpPlan] = useState<"once" | "monthly" | "premium">("monthly");
  const [copied, setCopied] = useState<Tab | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [step, setStep] = useState(1);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [showUpsellTimer, setShowUpsellTimer] = useState(false);
  const upsellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    track('ai_generated', { service: 'AI経営計画書' });
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 402) { track('paywall_shown', { service: 'AI経営計画書' }); setShowPaywall(true); setLoading(false); return; }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "エラーが発生しました。もう一度お試しください。");
        setLoading(false); return;
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("\nDONE:")) {
          const idx = chunk.indexOf("\nDONE:");
          accumulated += chunk.slice(0, idx);
          try {
            const meta = JSON.parse(chunk.slice(idx + 6));
            setRemaining(meta.remaining);
          } catch { /* ignore */ }
        } else {
          accumulated += chunk;
        }
        setResult(parseResult(accumulated));
      }
      setTab("overview");
      setShowComplete(true);
      // 生成後45秒でアップセルポップアップ（非プレミアムかつ残り回数1以下）
      if (!isPremium) {
        upsellTimerRef.current = setTimeout(() => {
          setShowUpsellTimer(true);
        }, 45000);
      }
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  }

  function startCheckout(priceType: "once" | "monthly" | "premium") {
    setPayjpPlan(priceType);
    setShowPayjp(true);
  }

  function copy(content: string, key: Tab) {
    navigator.clipboard.writeText(content);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function print() {
    window.print();
  }

  const canGenerate = form.overview.trim() && form.industry && (isPremium || remaining === null || remaining > 0);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {showPayjp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <div className="text-3xl mb-3 text-center">📊</div>
            <h2 className="text-lg font-bold mb-2 text-center">プレミアムプラン</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">{payjpPlan === "premium" ? "プレミアム — 経営計画書 無制限+高度分析" : "スタンダード — 経営計画書 無制限"}</p>
            <KomojuButton planId="standard" planLabel={payjpPlan === "once" ? "スタンダード ¥1,980/月" : payjpPlan === "premium" ? "プレミアム ¥3,980/月" : "スタンダード ¥1,980/月"} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
          </div>
        </div>
      )}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-emerald-400">📊 AI経営計画書作成</Link>
        <div className="flex items-center gap-4">
          {isPremium && <span className="text-xs text-emerald-400 font-bold">✓ プレミアム</span>}
          {!isPremium && remaining !== null && (
            <span className="text-xs text-gray-400">残り無料 {remaining}回</span>
          )}
          {result && (
            <button
              onClick={print}
              className="text-xs bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              📄 PDFで保存・印刷
            </button>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* ステップインジケーター */}
        {!result && (
          <div className="flex items-center justify-center gap-2 mb-2">
            {[
              { n: 1, label: "基本情報" },
              { n: 2, label: "事業詳細" },
              { n: 3, label: "確認・生成" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  step === s.n ? "bg-emerald-500 text-white" : step > s.n ? "bg-emerald-800 text-emerald-300" : "bg-gray-800 text-gray-500"
                }`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className={`text-xs ${step === s.n ? "text-emerald-400 font-bold" : "text-gray-500"}`}>{s.label}</span>
                {i < 2 && <div className={`w-8 h-px ${step > s.n ? "bg-emerald-700" : "bg-gray-700"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: 基本情報 */}
        {!result && step === 1 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
            <h2 className="font-bold text-lg text-emerald-400">Step 1 — 基本情報</h2>

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

            <button
              onClick={() => setStep(2)}
              disabled={!form.industry}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
            >
              次へ: 事業詳細を入力 →
            </button>
          </div>
        )}

        {/* Step 2: 事業詳細 */}
        {!result && step === 2 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-emerald-400">Step 2 — 事業詳細</h2>
              {INDUSTRY_TEMPLATES[form.industry] && (
                <button
                  onClick={() => {
                    const t = INDUSTRY_TEMPLATES[form.industry];
                    setForm(f => ({ ...f, overview: t.overview, strengths: t.strengths, challenges: t.challenges, goal3y: t.goal3y }));
                  }}
                  className="text-xs bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-700 text-emerald-400 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                >
                  📝 {form.industry}テンプレートを使う
                </button>
              )}
            </div>

            {/* 業種別ベンチマークティップス */}
            {form.industry && INDUSTRY_BENCHMARKS[form.industry] && (() => {
              const bm = INDUSTRY_BENCHMARKS[form.industry];
              return (
                <div className="bg-blue-950/60 border border-blue-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-300 text-sm font-bold">📊 {form.industry}の業界平均ベンチマーク</span>
                    <span className="text-xs text-blue-400 bg-blue-900/40 px-2 py-0.5 rounded-full">中小企業白書2024版</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 mb-1">売上高成長率</p>
                      <p className="text-sm font-black text-white">{bm.salesGrowth}</p>
                    </div>
                    <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 mb-1">利益率平均</p>
                      <p className="text-sm font-black text-white">{bm.profitMargin}</p>
                    </div>
                    <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 mb-1">融資承認率</p>
                      <p className="text-sm font-black text-emerald-300">{bm.loanApproval}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{bm.avgSales}</p>
                  <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-2">
                    <p className="text-xs text-amber-300">💡 {bm.tips}</p>
                  </div>
                </div>
              );
            })()}

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
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    { label: "📉 売上低迷", value: "売上が前年比20%減少しており、新規顧客獲得が課題です" },
                    { label: "👥 人材不足", value: "採用が追いつかず、既存スタッフの業務過多が深刻な問題です" },
                    { label: "💰 資金繰り", value: "売掛金回収が遅く、月末の資金繰りに常に不安があります" },
                    { label: "🏢 競合対応", value: "低価格競合の台頭で、価格競争に巻き込まれています" },
                    { label: "📱 DX推進", value: "業務のデジタル化が遅れており、生産性向上が急務です" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => set("challenges", preset.value)}
                      className="text-xs bg-gray-700 hover:bg-emerald-900/60 border border-gray-600 hover:border-emerald-600 text-gray-300 hover:text-emerald-300 px-2.5 py-1 rounded-lg transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
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

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl transition"
              >
                ← 戻る
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.overview.trim()}
                className="flex-2 flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
              >
                次へ: 内容を確認する →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 確認・生成 */}
        {!result && step === 3 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
            <h2 className="font-bold text-lg text-emerald-400">Step 3 — 確認・生成</h2>

            {/* 融資用途クイック選択 */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-400 mb-3">📌 この計画書の主な用途（任意）</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: "🏦", label: "銀行・日本公庫 融資申請", value: "日本政策金融公庫・銀行・信用金庫への融資申請" },
                  { icon: "📋", label: "補助金申請（ものづくり等）", value: "ものづくり補助金・IT導入補助金・小規模事業者持続化補助金の申請" },
                  { icon: "🏢", label: "社内共有・中期経営計画", value: "社内共有・中期経営計画・投資家向けピッチ資料" },
                  { icon: "🚀", label: "スタートアップ・資金調達", value: "エンジェル投資家・VCへの事業計画・ピッチデッキ" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("overview", form.overview.trim() ? form.overview : opt.value)}
                    className="flex items-center gap-2 text-left bg-gray-700 hover:bg-emerald-900/50 border border-gray-600 hover:border-emerald-600 text-gray-300 hover:text-emerald-300 px-3 py-2 rounded-xl text-xs transition"
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">業種</span>
                <span className="text-white font-medium">{form.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">事業規模</span>
                <span className="text-white font-medium">{form.scale}</span>
              </div>
              {form.businessName && (
                <div className="flex justify-between">
                  <span className="text-gray-400">事業名</span>
                  <span className="text-white font-medium">{form.businessName}</span>
                </div>
              )}
              {form.goal3y && (
                <div className="flex justify-between">
                  <span className="text-gray-400">3年後の目標</span>
                  <span className="text-white font-medium text-right max-w-[60%]">{form.goal3y}</span>
                </div>
              )}
              <div className="border-t border-gray-700 pt-2">
                <span className="text-gray-400 block mb-1">事業概要</span>
                <p className="text-white text-xs leading-relaxed">{form.overview}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">上記の内容で経営計画書を生成します。修正が必要な場合は「戻る」を押してください。</p>

            {!isPremium && remaining === 0 && (
              <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-4 text-center">
                <p className="text-sm text-emerald-200 mb-3">無料回数を使い切りました。</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => startCheckout("monthly")} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-5 py-2 rounded-xl text-sm transition">¥1,980/月 使い放題</button>
                  <button onClick={() => startCheckout("premium")} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition">¥3,980/月 プレミアム</button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl transition">← 戻る</button>
              <button
                onClick={generate}
                disabled={loading || !canGenerate}
                aria-label="経営計画書をAIで自動生成する"
                className="flex-2 flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 rounded-xl text-base transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "AIが経営計画書を作成中..." : "経営計画書を生成する"}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <p className="text-xs text-gray-400 text-center">📊 市場分析 → 💡 戦略立案 → 📋 経営計画書生成</p>
        )}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {showPaywall && (
          <div className="bg-gray-900 border border-emerald-500 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">無料回数が終わりました</h3>
            <p className="text-gray-400 text-sm mb-6">¥1,980/月（スタンダード）または¥3,980/月（プレミアム）</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { track('upgrade_click', { service: 'AI経営計画書', plan: 'monthly' }); startCheckout("monthly"); }} disabled={false} className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-3 rounded-xl transition disabled:opacity-50">
                ¥1,980/月で始める
              </button>
              <button onClick={() => { track('upgrade_click', { service: 'AI経営計画書', plan: 'premium' }); startCheckout("premium"); }} disabled={false} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50">
                ¥3,980/月（プレミアム）
              </button>
            </div>
          </div>
        )}

        {result && showComplete && (
          <div className="bg-emerald-900 border-2 border-emerald-400 rounded-2xl p-5 text-center animate-bounce">
            <p className="text-2xl font-black text-white mb-1">🎉 経営計画書が完成しました！</p>
            <p className="text-emerald-300 text-sm">各タブをクリックして内容を確認・コピーしてください</p>
          </div>
        )}
        {result && (() => {
          const savingMap: Record<string, number> = {
            "個人事業主・フリーランス": 30,
            "法人（1〜5名）": 50,
            "法人（6〜20名）": 80,
            "法人（21名以上）": 100,
          };
          const saving = savingMap[form.scale] ?? 50;
          return (
            <div className="bg-gradient-to-r from-amber-900/60 to-emerald-900/60 border border-amber-500/60 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-sm font-black text-white">コンサル費用 約<span className="text-amber-300 text-xl">¥{saving}万</span> を節約しました</p>
                  <p className="text-xs text-gray-400">{form.scale}・{form.industry || ""}向けコンサルの市場相場 ¥{saving}万〜¥{saving * 2}万 と比較</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`AI経営計画書を使ったら経営コンサル費用¥${saving}万分の作業が5分で完成。融資申請・補助金申請に使えるレベルの計画書が無料で作れた。 https://ai-keiei-keikaku.vercel.app #経営計画書 #AI活用 #起業`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-black text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  ¥{saving}万節約をシェア
                </a>
              </div>
            </div>
          );
        })()}
        {result && (
          <div className="flex justify-end">
            <button
              onClick={() => { setResult(null); setStep(1); setShowComplete(false); }}
              className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 px-3 py-1.5 rounded-lg transition"
            >
              ↩ もう一度作る
            </button>
          </div>
        )}

        {result && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-gray-800">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  aria-label={t.label.replace(/^[^\s]+\s/, "")}
                  aria-current={tab === t.id ? "true" : undefined}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition ${tab === t.id ? "text-emerald-400 border-b-2 border-emerald-400" : "text-gray-500 hover:text-gray-300"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {/* チェックリストタブ */}
              {tab === "checklist" ? (
                <div>
                  <p className="text-sm font-bold text-white mb-2">融資審査通過チェックリスト</p>
                  <p className="text-xs text-gray-400 mb-4">融資担当者・補助金審査官の目線で計画書の完成度を確認しましょう</p>
                  {/* 完成度スコアバー */}
                  {(() => {
                    const score = calcChecklistScore(checklist);
                    const scoreColor = score >= 80 ? "#34d399" : score >= 50 ? "#f59e0b" : "#f87171";
                    return (
                      <div className="bg-gray-800 rounded-xl p-4 mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">完成度スコア</span>
                          <span className="text-2xl font-black" style={{ color: scoreColor }}>{score}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-3 rounded-full transition-all duration-500"
                            style={{ width: `${score}%`, background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}cc)` }} />
                        </div>
                        <p className="text-xs mt-2" style={{ color: scoreColor }}>
                          {score >= 80 ? "融資審査に十分な内容が揃っています！" : score >= 50 ? "あと少し！チェックを増やして完成度を上げましょう" : "基本項目を埋めて計画書を充実させましょう"}
                        </p>
                      </div>
                    );
                  })()}
                  {/* チェックリスト */}
                  <div className="space-y-2 mb-5">
                    {LOAN_CHECKLIST.map((item) => (
                      <label key={item.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-colors"
                        style={{
                          background: checklist[item.id] ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.03)",
                          borderColor: checklist[item.id] ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.08)",
                        }}>
                        <input
                          type="checkbox"
                          checked={!!checklist[item.id]}
                          onChange={(e) => setChecklist(prev => ({ ...prev, [item.id]: e.target.checked }))}
                          className="w-4 h-4 accent-emerald-400"
                        />
                        <div className="flex-1">
                          <span className="text-sm text-white">{item.label}</span>
                          <span className="ml-2 text-xs text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">{item.category}</span>
                        </div>
                        {checklist[item.id] && <span className="text-emerald-400 text-sm">✓</span>}
                      </label>
                    ))}
                  </div>
                  {/* スコアに基づくCTA */}
                  {calcChecklistScore(checklist) >= 80 && (
                    <div className="bg-emerald-900 border border-emerald-600 rounded-xl p-4 text-center">
                      <p className="text-white font-bold text-sm mb-1">🎉 計画書の完成度が高い状態です！</p>
                      <p className="text-emerald-300 text-xs mb-3">今すぐ印刷して金融機関への提出準備をしましょう</p>
                      <button onClick={print} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-2 rounded-xl text-sm transition">
                        印刷して申請準備 →
                      </button>
                    </div>
                  )}
                  {/* シェアカード */}
                  {calcChecklistScore(checklist) >= 60 && (
                    <div className="mt-4">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`AI経営計画書で「${form.businessName || "事業計画書"}」が完成！融資チェックリスト${calcChecklistScore(checklist)}%達成。5分で融資・補助金申請用の計画書ができるの凄すぎる → https://ai-keiei-keikaku.vercel.app #経営計画書 #AI活用 #起業`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm bg-black hover:bg-gray-800 transition"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        完成度{calcChecklistScore(checklist)}%達成をXでシェア
                      </a>
                    </div>
                  )}
                </div>
              ) : (
              <>
              <div className="flex justify-end mb-4 gap-2 flex-wrap">
                <button
                  onClick={() => copy(result[tab as Exclude<Tab, "checklist">], tab as Exclude<Tab, "checklist">)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition"
                >
                  {copied === tab ? "コピー済" : "このタブをコピー"}
                </button>
                <button
                  onClick={print}
                  className="text-xs bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                >
                  📄 PDFで保存・印刷
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`AI経営計画書を試したら「${form.businessName || "事業計画"}」の事業計画書・収支シミュレーション・SWOT分析・投資家ピッチまでが5分で完成した。銀行融資にも使えるレベルで驚いた… → https://ai-keiei-keikaku.vercel.app #経営計画 #AI活用 #起業`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  𝕏 でシェアする
                </a>
              </div>
              {/* 業界比較タブ専用ビジュアル */}
              {tab === "benchmark" && form.industry && INDUSTRY_BENCHMARKS[form.industry] && (() => {
                const bm = INDUSTRY_BENCHMARKS[form.industry];
                // Extract min/max from ranges like "3〜8%"
                const parseRange = (s: string): [number, number] => {
                  const m = s.match(/([\d.]+)[〜~]([\d.]+)/);
                  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
                  const n = s.match(/([\d.]+)/);
                  if (n) return [parseFloat(n[1]), parseFloat(n[1])];
                  return [0, 0];
                };
                const [pmMin, pmMax] = parseRange(bm.profitMargin);
                const [sgMin, sgMax] = parseRange(bm.salesGrowth);
                const laMatch = bm.loanApproval.match(/([\d.]+)/);
                const laPct = laMatch ? parseFloat(laMatch[1]) : 60;
                return (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-emerald-400 mb-3">📊 {form.industry} 業種別ベンチマーク比較</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      {[
                        { label: "利益率（業界平均）", min: pmMin, max: pmMax, unit: "%", color: "#34d399", tip: "この業種の平均的な利益率です。あなたの計画が上回れば審査で有利。" },
                        { label: "売上成長率（業界平均）", min: sgMin, max: sgMax, unit: "%", color: "#60a5fa", tip: "業界全体の成長率。計画書に近い数値を使うと現実的と判断されます。" },
                        { label: "融資承認率（業界）", min: laPct, max: laPct, unit: "%", color: "#f59e0b", tip: "この業種の中小企業融資が通る確率です。業種選択が融資可否に影響します。" },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-800 rounded-xl p-4">
                          <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                          <p className="text-xl font-black mb-2" style={{ color: item.color }}>
                            {item.min === item.max ? `${item.min}${item.unit}` : `${item.min}〜${item.max}${item.unit}`}
                          </p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (item.min + item.max) / 2)}%`, background: item.color }} />
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-950/40 border border-amber-700/40 rounded-xl p-3 mb-4">
                      <p className="text-xs text-amber-300">💡 融資審査のポイント: {bm.tips}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">参考: {bm.avgSales}（中小企業白書2024年版ベース）</p>
                  </div>
                );
              })()}
              {result[tab as Exclude<Tab, "checklist">]
                ? <div className="text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(result[tab as Exclude<Tab, "checklist">]) }} />
                : <p className="text-sm text-gray-500">このセクションの内容がありません。</p>
              }
              </>
              )}
              {tab !== "checklist" && (
              <>
              {/* 次のアクション3選 */}
              <div className="mt-6 bg-white border border-indigo-200 rounded-xl p-4">
                <p className="text-sm font-bold text-indigo-800 mb-3">📋 次にやるべきこと3選</p>
                <ol className="space-y-2">
                  {[
                    { icon: "🖨️", text: "この計画書を印刷して金融機関・投資家との面談に持参する" },
                    { icon: "💰", text: "補助金AIで同じ内容を補助金申請書に転換する（上のボタン）" },
                    { icon: "📅", text: "計画書の数値目標をカレンダーにマイルストーンとして登録する" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-lg leading-none">{item.icon}</span>
                      <span>{i + 1}. {item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* 補助金AIへのクロスセル */}
              <div className="mt-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-xl">
                <p className="text-base font-bold text-amber-900 mb-1">💰 この経営計画書で補助金申請もしよう</p>
                <p className="text-xs text-amber-700 mb-3">ものづくり補助金・IT補助金・小規模事業者持続化補助金の申請書をAIが自動作成。AI採択可能性スコア付き。</p>
                <a href="https://hojyokin-ai-delta.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                  補助金AIで申請書を作成 →
                </a>
              </div>
              {/* freee会計 A8.netアフィリエイト */}
              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm font-bold text-emerald-800 mb-3">📊 経営計画書の数字を管理するなら</p>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+3LSINM+3SPO+9FDPYR"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between bg-white border border-emerald-300 rounded-xl px-4 py-3 hover:bg-emerald-50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-800">freee会計 — 経営数字をリアルタイム管理</div>
                    <div className="text-xs text-slate-500 mt-0.5">30日間無料 • 損益計算書・貸借対照表を自動生成</div>
                  </div>
                  <span className="text-emerald-600 font-bold text-xs bg-emerald-100 px-2 py-1 rounded-full shrink-0 ml-2">無料で試す →</span>
                </a>
                <p className="text-xs text-slate-400 text-center mt-2">※ 広告・PR（freee公式サイトに遷移します）</p>
              </div>
              {/* 電力・ガス コスト削減 A8.netアフィリエイト */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-bold text-green-800 mb-3">⚡ 法人の電気・ガス料金を見直してコスト削減</p>
                <div className="space-y-2">
                  <a
                    href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8F1NOY+4P4C+HVNAP"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between bg-white border border-green-300 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-800">東急でんき&ガス — まとめて切り替えでお得</div>
                      <div className="text-xs text-slate-500 mt-0.5">¥10,000 • 電気とガスをセットで切り替え節約</div>
                    </div>
                    <span className="text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded-full shrink-0 ml-2">料金を見る →</span>
                  </a>
                  <a
                    href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8VPSMQ+4R1I+HWI5T"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between bg-white border border-green-300 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-800">東京ガス — 法人向けガス料金プラン</div>
                      <div className="text-xs text-slate-500 mt-0.5">¥1,750 • 安定供給と充実サポート</div>
                    </div>
                    <span className="text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded-full shrink-0 ml-2">料金を見る →</span>
                  </a>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">※ 広告・PR（各社公式サイトに遷移します）</p>
              </div>
              </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* アップセルタイマーポップアップ（生成後45秒） */}
      {showUpsellTimer && !isPremium && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => { setShowUpsellTimer(false); if (upsellTimerRef.current) clearTimeout(upsellTimerRef.current); }} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <div className="text-3xl mb-3 text-center">📊</div>
            <h2 className="text-lg font-bold mb-1 text-center text-gray-900">計画書をもっと活用しましょう</h2>
            <p className="text-sm text-gray-500 mb-2 text-center">月額¥1,980で無制限作成 + 補助金AIも利用可能</p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4 text-left">
              <li>✓ 経営計画書 作成し放題（業種変更・修正も無制限）</li>
              <li>✓ 融資チェックリストで採択率UP</li>
              <li>✓ 補助金AIとワンストップ連携</li>
            </ul>
            <KomojuButton planId="standard" planLabel="¥1,980/月で始める" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50" />
          </div>
        </div>
      )}

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>
    </main>
  );
}
