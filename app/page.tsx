"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import KomojuButton from "@/components/KomojuButton";
import { StreakBanner } from "@/components/StreakBanner";
import { UsageCounter } from "@/components/UsageCounter";
import { THEMES } from "@/lib/design-system-themes";
import { CrossSell } from "@/components/CrossSell";
const T = THEMES.legal;

/* ---- SVG Icon helper (replaces all emoji) ---- */
const IC: Record<string, React.ReactNode> = {
 restaurant: <svg className="w-6 h-6 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>,
 package: <svg className="w-6 h-6 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
 scissors: <svg className="w-6 h-6 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg>,
 hotel: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 21v-4h6v4M3 7l9-4 9 4"/></svg>,
 store: <svg className="w-6 h-6 text-teal-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>,
 laptop: <svg className="w-6 h-6 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
 building: <svg className="w-6 h-6 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>,
 hospital: <svg className="w-6 h-6 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/><path d="M12 7v4M10 9h4"/></svg>,
 factory: <svg className="w-6 h-6 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20M4 20V8l4-3v5l4-3v5l4-3v8M20 20V10l-4 3"/></svg>,
 construction: <svg className="w-6 h-6 text-yellow-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20M6 20V10M10 20V4l8 6v10"/></svg>,
 courthouse: <svg className="w-6 h-6 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M4 21V10M8 21V10M12 21V10M16 21V10M20 21V10M12 3L2 10h20L12 3z"/></svg>,
 house: <svg className="w-6 h-6 text-green-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>,
 bank: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M12 3l10 7H2l10-7z"/></svg>,
 phone: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
 document: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
 clipboard: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14h6M9 18h6"/></svg>,
 mail: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
 folder: <svg className="w-6 h-6 text-yellow-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
 edit: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
 signal: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.93 19.07A10 10 0 0119.07 4.93M7.76 16.24a6 6 0 018.49-8.49M12 12h.01"/></svg>,
 chart: <svg className="w-6 h-6 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
 trendUp: <svg className="w-6 h-6 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
 calendar: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
 scale: <svg className="w-6 h-6 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 7l4.5-3h9L21 7M6 7c-1.5 2-1.5 4 0 5M18 7c1.5 2 1.5 4 0 5"/></svg>,
 shield: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
 alert: <svg className="w-6 h-6 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>,
 warning: <svg className="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>,
 lightbulb: <svg className="w-6 h-6 text-yellow-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>,
 rocket: <svg className="w-6 h-6 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
 money: <svg className="w-6 h-6 text-yellow-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
 briefcase: <svg className="w-6 h-6 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
 users: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
 gift: <svg className="w-6 h-6 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="4" rx="1"/><rect x="5" y="12" width="14" height="8" rx="1"/><path d="M12 8v12M3 10h18"/></svg>,
 bolt: <svg className="w-6 h-6 text-yellow-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
 target: <svg className="w-6 h-6 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
 search: <svg className="w-6 h-6 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
 cart: <svg className="w-6 h-6 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
 robot: <svg className="w-6 h-6 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M12 2v6M8 2h8"/></svg>,
 handshake: <svg className="w-6 h-6 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 11l4.5 4.5M17 11l-4.5 4.5M2 11h5M17 11h5M12 2v4M7 5l2 2M17 5l-2 2"/></svg>,
 meditation: <svg className="w-6 h-6 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="2"/><path d="M12 7v6M7 21l5-8 5 8M4 17h5M15 17h5"/></svg>,
 refresh: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
 envelope: <svg className="w-6 h-6 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
 map: <svg className="w-6 h-6 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><path d="M8 2v16M16 6v16"/></svg>,
 book: <svg className="w-6 h-6 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
 timer: <svg className="w-6 h-6 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3l-1 2M19 3l1 2"/></svg>,
 bag: <svg className="w-6 h-6 text-pink-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>,
 pin: <svg className="w-6 h-6 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};
function SvgI({ name, className }: { name: string; className?: string }) {
 const el = IC[name];
 if (!el) return null;
 if (className) return <span className={className}>{el}</span>;
 return <>{el}</>;
}
const StarRow = () => <span className="flex gap-0.5">{[0,1,2,3,4].map(i=><svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</span>;
const Check = () => <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>;
const Cross = () => <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const Dot = ({ color }: { color: string }) => <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;


// ===== 業種別インタラクティブサンプル =====
const INDUSTRY_SAMPLES = [
 {
 industry: "飲食業",
 label: "飲食・レストラン",
 tabs: [
 {
 label: "事業概要",
 content: `【事業概要】

当社は東京都渋谷区に本店を置く、イタリアンレストランを3店舗運営する株式会社〇〇フーズです。コロナ禍での売上回復を経て、2026年度は4店舗目の出店と新業態（テイクアウト専門）への展開を計画しています。

【3年後のビジョン】

2028年度までに都内5店舗体制を確立し、年商5億円・従業員30名体制を実現します。単なる飲食店展開に留まらず、食材の産直仕入れネットワークを構築することで、他チェーンとの差別化と原価率25%以下を同時に達成します。

【差別化ポイント】
・地元農家との直接契約による新鮮食材の安定調達
・シェフ経験20年の料理長による本格イタリアン
・テイクアウト・EC展開による多角化収益`,
 },
 {
 label: "3年間収支",
 content: `【3年間収支計画（概算）】

年度 | 売上高 | 経費 | 営業利益
2026年度 | 2.4億円 | 2.1億円 | 3,000万円
2027年度 | 3.2億円 | 2.7億円 | 5,000万円
2028年度 | 5.0億円 | 4.1億円 | 9,000万円

利益率推移: 12.5% → 15.6% → 18.0%

【損益分岐点】
月次固定費: 約1,200万円
必要月商: 約1,800万円（現状達成済み）

【主要コスト構成（2026年度見込み）】
・原価率: 28%（産直仕入れで競合33%比5%優位）
・人件費率: 32%
・家賃: 8%（3店舗合計）
・その他経費: 19%`,
 },
 {
 label: "SWOT分析",
 content: `【SWOT分析】

■ 強み（Strengths）
・料理長20年のキャリア×イタリア研修経験
・産直仕入れによる原価率25%（業界平均33%比）
・渋谷・恵比寿・代官山の好立地3店舗

■ 弱み（Weaknesses）
・人材確保・育成コストが課題
・テイクアウト・デリバリー比率が低い（売上5%）
・知名度が地域限定

■ 機会（Opportunities）
・インバウンド回復による外食需要増加
・フードテック・DX化による業務効率改善余地
・産直EC市場の急成長（年率18%増）

■ 脅威（Threats）
・原材料費・人件費の継続的上昇
・大手チェーンのコストリーダーシップ
・飲食業の人材不足（業界離職率30%超）`,
 },
 ],
 },
 {
 industry: "IT・Web",
 label: "IT・SaaS",
 tabs: [
 {
 label: "事業概要",
 content: `【事業概要】

当社は中小企業向けのクラウド型在庫管理SaaSを提供する株式会社〇〇テクノロジーズです。従業員5名・創業3年目で、現在MRR（月次経常収益）120万円を達成しています。2026年度はエンタープライズ向け機能を拡充し、ARR（年間経常収益）3,000万円を目指します。

【3年後のビジョン】

2028年度に累計導入社数1,000社・ARR1億円を達成し、Series A調達（目標3億円）によって東南アジア市場への展開を開始します。在庫管理という単一機能から「中小企業の業務OS」への進化を目指します。

【差別化ポイント】
・導入コスト0円・月額¥9,800から（競合の1/3）
・APIファーストで既存ERPとの連携が容易
・AI自動発注機能（業界唯一）`,
 },
 {
 label: "3年間収支",
 content: `【3年間収支計画（概算）】

年度 | ARR | 経費 | 営業利益
2026年度 | 3,000万円 | 2,500万円 | 500万円
2027年度 | 6,000万円 | 4,000万円 | 2,000万円
2028年度 | 1.0億円 | 5,500万円 | 4,500万円

【SaaSメトリクス（現状）】
・MRR: 120万円 / ARR: 1,440万円
・チャーンレート（解約率）: 月次2.1%
・LTV（顧客生涯価値）: ¥228,571/社
・CAC（顧客獲得コスト）: ¥45,000/社

【黒字化計画】
現在: 月次損益 ▲80万円（先行投資期）
2026Q3目標: 月次損益トントン（MRR200万円）
2027Q1目標: 累積黒字転換`,
 },
 {
 label: "SWOT分析",
 content: `【SWOT分析】

■ 強み（Strengths）
・AIによる自動発注機能（特許申請中）
・チャーンレート2.1%（SaaS平均5〜7%比で優秀）
・小規模でも使えるUI設計（導入教育コスト0）

■ 弱み（Weaknesses）
・営業人員が1名のみ（スケールに限界）
・エンタープライズ向け機能が未成熟
・資金調達実績なし（ARR成長限界）

■ 機会（Opportunities）
・デジタル化・AI導入補助金でのSaaS採用増加
・中小企業のDX化加速（2026年IT需要30%増見込み）
・東南アジア中小企業の在庫管理課題

■ 脅威（Threats）
・大手SaaS（Salesforce・freee）の隣接領域進出
・エンジニア採用競争の激化
・景気後退時のSMB予算削減リスク`,
 },
 ],
 },
 {
 industry: "製造業",
 label: "製造業",
 tabs: [
 {
 label: "事業概要",
 content: `【事業概要】

当社は愛知県刈谷市に工場を構える精密部品製造業・株式会社〇〇精工です。従業員12名・年商2.2億円で、自動車メーカー向けの金属プレス部品を主力製品としています。2026年度はAI画像検査システムを導入し、不良品率の削減と新規受注獲得を目指します。

【3年後のビジョン】

2028年度に年商3億円・不良品率0.3%以下を実現し、自動車向けから半導体・医療機器向けへの取引先多角化を完成させます。ものづくり補助金を活用した設備更新で、人員を付加価値業務へ再配置します。

【差別化ポイント】
・AI画像検査による不良品率91%削減（3.2%→0.3%）
・1万分の1mm精度の金属プレス加工技術
・ISO9001認証取得による品質保証体制`,
 },
 {
 label: "3年間収支",
 content: `【3年間収支計画（概算）】

年度 | 売上高 | 経費 | 営業利益
2026年度 | 2.2億円 | 1.95億円 | 2,500万円
2027年度 | 2.6億円 | 2.2億円 | 4,000万円
2028年度 | 3.0億円 | 2.5億円 | 5,000万円

【設備投資・補助金計画】
AI画像検査システム導入費: 1,200万円
ものづくり補助金（補助率1/2）: 600万円
自己負担額: 600万円

【投資回収シミュレーション】
年間不良品廃棄コスト削減: 730万円/年
投資回収期間: 約10ヶ月（補助金活用後）
3年間累計コスト削減: 約2,190万円`,
 },
 {
 label: "SWOT分析",
 content: `【SWOT分析】

■ 強み（Strengths）
・創業35年の金属プレス加工技術と職人技術
・主要取引先3社との10年以上の継続取引実績
・工場内一貫生産による短納期対応（最短3日）

■ 弱み（Weaknesses）
・熟練工の高齢化（平均年齢52歳）・後継者不足
・売上の80%が自動車メーカー2社に集中
・IT・DX化の遅れ（手作業検査・紙台帳管理）

■ 機会（Opportunities）
・電気自動車（EV）化による精密部品需要増加
・半導体・医療機器分野での国内調達回帰
・ものづくり補助金・AI導入補助金の活用余地

■ 脅威（Threats）
・中国・東南アジア製造業のコスト競争力
・原材料（鉄・アルミ）価格の高騰継続
・取引先の海外調達シフトリスク`,
 },
 ],
 },
 {
 industry: "建設業",
 label: "建設業",
 tabs: [
 {
 label: "事業概要",
 content: `【事業概要】

当社は大阪府堺市を拠点とする内装・リフォーム専門工事会社・株式会社〇〇建設です。従業員18名・年商3.1億円で、一般住宅から中規模商業施設までの内装工事を手掛けています。2026年度はBIM（建築情報モデリング）ソフトと工事管理アプリを導入し、DXによる生産性向上と新規法人顧客獲得を目指します。

【3年後のビジョン】

2028年度に年商4.5億円・営業利益率8%を達成し、リフォーム×不動産投資コンサルの複合サービスを大阪・神戸に展開します。

【差別化ポイント】
・BIM設計による完成イメージの事前提示（受注率20%UP）
・施主への毎日の工事進捗報告（アプリで写真共有）
・全工事10年保証による信頼獲得`,
 },
 {
 label: "3年間収支",
 content: `【3年間収支計画（概算）】

年度 | 売上高 | 経費 | 営業利益
2026年度 | 3.1億円 | 2.9億円 | 2,000万円
2027年度 | 3.7億円 | 3.35億円 | 3,500万円
2028年度 | 4.5億円 | 4.1億円 | 4,000万円

【IT投資計画（IT導入補助金活用）】
BIM・工事管理システム導入費: 350万円
IT導入補助金（補助率3/4）: 262万円
自己負担額: 88万円

【収益改善シミュレーション】
工程管理DXによる工期短縮（10%）: +300万円/年
受注率向上（BIM導入で5%改善）: +500万円/年
合計収益改善効果: 約800万円/年`,
 },
 {
 label: "SWOT分析",
 content: `【SWOT分析】

■ 強み（Strengths）
・地域密着30年・口コミ紹介率60%以上
・一級建築士2名在籍による設計提案力
・急な修繕・緊急工事への即日対応体制

■ 弱み（Weaknesses）
・人材依存度が高く、職人1人あたり生産性に個人差
・ITツール活用が遅れ、見積もりがExcel中心
・下請け比率が60%で元請け受注の開拓が不十分

■ 機会（Opportunities）
・築30年以上の建物増加によるリフォーム需要拡大
・DX補助金・省エネ補助金との組み合わせ受注
・空き家・民泊リノベーション案件の増加

■ 脅威（Threats）
・建設資材（木材・鉄鋼）価格の高騰
・職人・技能者の慢性的な人手不足
・大手ハウスメーカーのリフォーム部門強化`,
 },
 ],
 },
 {
 industry: "小売業",
 label: "小売・EC",
 tabs: [
 {
 label: "事業概要",
 content: `【事業概要】

当社は福岡県福岡市に実店舗2店舗を構えるナチュラルコスメ専門店・株式会社〇〇ビューティーです。従業員8名・年商8,500万円で、オーガニック化粧品の小売とプライベートブランド開発を行っています。2026年度はEC（オンラインショップ）の本格展開と定期購入（サブスク）モデルへの移行を目指します。

【3年後のビジョン】

2028年度にEC売上比率50%・年商1.8億円を達成します。自社PBブランドのEC展開によって利益率を現状の18%から30%へ改善し、九州発のナチュラルコスメブランドとして全国認知を獲得します。

【差別化ポイント】
・九州産オーガニック原料100%使用のPBコスメ
・美容師・エステ資格保有スタッフによる無料肌診断
・サブスク（月次お届け）で継続使用率90%以上`,
 },
 {
 label: "3年間収支",
 content: `【3年間収支計画（概算）】

年度 | 売上高 | 経費 | 営業利益
2026年度 | 8,500万円 | 6,970万円 | 1,530万円
2027年度 | 1.2億円 | 9,000万円 | 3,000万円
2028年度 | 1.8億円 | 1.26億円 | 5,400万円

利益率推移: 18% → 25% → 30%

【ECサブスク収益モデル（2027年目標）】
定期購入会員: 500名
平均単価: ¥4,800/月
月次定期収益（MRR）: 240万円
年間定期収益（ARR）: 2,880万円（年商の24%）

【EC投資計画（小規模事業者持続化補助金活用）】
EC構築・SNS広告費: 200万円
補助金（補助率2/3）: 133万円
自己負担: 67万円`,
 },
 {
 label: "SWOT分析",
 content: `【SWOT分析】

■ 強み（Strengths）
・九州産有機原料の独自調達ルート（競合参入障壁）
・実店舗での体験・接客による高いリピート率（72%）
・SNSフォロワー12,000名のオーガニックコミュニティ

■ 弱み（Weaknesses）
・EC売上比率が15%と低く、エリア依存が高い
・在庫管理・物流のオペレーションが未整備
・PBブランドの認知度が九州外では限定的

■ 機会（Opportunities）
・オーガニック・サステナブルコスメ市場の急成長（年率12%）
・インスタグラム・TikTokでのビューティーEC拡大
・越境EC（中国・台湾）への展開余地

■ 脅威（Threats）
・大手コスメブランドのナチュラル路線への転換
・原料コスト（有機植物油・エッセンシャルオイル）の高騰
・EC参入障壁の低下による競合増加`,
 },
 ],
 },
];

function IndustrySampleSection() {
 const [activeIndustry, setActiveIndustry] = useState(0);
 const [activeTab, setActiveTab] = useState(0);
 const sample = INDUSTRY_SAMPLES[activeIndustry];

 return (
 <section className="py-16 px-4 bg-gray-900">
 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-10">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
 業種別 実際の出力サンプル
 </div>
 <h2 className="text-2xl font-bold text-white">こんな経営計画書が5分で生成されます</h2>
 <p className="text-white/40 text-sm mt-2">ChatGPTに直接聞くだけでは得られない「融資・補助金審査用フォーマット」で出力されます</p>
 </div>

 {/* ChatGPTとの違いバナー */}
 <div className="bg-gray-800 border border-emerald-700/50 rounded-xl px-5 py-3 mb-6 flex flex-wrap gap-4 items-center justify-between">
 <div>
 <p className="text-xs font-bold text-emerald-300">ChatGPTとの違い</p>
 <p className="text-xs text-white/40 mt-0.5">ChatGPTは汎用テキスト生成。このAIは銀行融資書類形式・5項目同時生成・業種特化テンプレートで出力します</p>
 </div>
 <div className="flex flex-wrap gap-2">
 {["銀行融資書類形式", "5項目同時生成", "業種特化テンプレート"].map((tag) => (
 <span key={tag} className="text-xs bg-emerald-900 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
 ))}
 </div>
 </div>

 {/* 業種タブ */}
 <div className="flex gap-2 mb-4 flex-wrap">
 {INDUSTRY_SAMPLES.map((s, i) => (
 <button
 key={i}
 type="button"
 onClick={() => { setActiveIndustry(i); setActiveTab(0); }}
 aria-label={`${s.label}の経営計画書サンプルを表示`}
 aria-pressed={activeIndustry === i}
 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeIndustry === i ? "bg-emerald-500/100 text-white" : "bg-gray-800 text-white/40 hover:bg-gray-700 border border-gray-700"}`}
 >
 {s.industry}
 </button>
 ))}
 </div>

 <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
 {/* 業種ラベル */}
 <div className="px-5 py-3 border-b border-gray-700 bg-emerald-900/30">
 <p className="text-xs text-white/40 font-medium">業種サンプル</p>
 <p className="text-sm text-emerald-300 font-bold">{sample.label} — AI生成出力（抜粋）</p>
 </div>

 {/* 出力タブ */}
 <div className="p-5">
 <div className="flex gap-1 mb-4 flex-wrap">
 {sample.tabs.map((tab, i) => (
 <button
 key={i}
 type="button"
 onClick={() => setActiveTab(i)}
 aria-label={`${tab.label}タブを表示`}
 aria-pressed={activeTab === i}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-emerald-500/100 text-white" : "bg-gray-700 border border-gray-600 text-white/40 hover:bg-gray-600"}`}
 >
 {tab.label}
 </button>
 ))}
 </div>
 <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
 <pre className="text-xs text-white/30 whitespace-pre-wrap font-sans leading-relaxed">{sample.tabs[activeTab].content}</pre>
 </div>
 <p className="text-xs text-white/50 mt-3 text-center">※ これはサンプルです。実際の生成結果はあなたの事業情報に基づいてカスタマイズされます</p>
 </div>
 </div>

 <div className="text-center mt-8">
 <div className="max-w-xs mx-auto mb-4"><UsageCounter /></div>
 <Link href="/tool" className="inline-block bg-emerald-500/100 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-400 shadow-xl transition-colors">
 無料でAIが計画書を作成 →
 </Link>
 <p className="text-xs opacity-60 mt-2">※登録不要・3項目で完成</p>
 <p className="text-xs text-white/50 mt-2">登録不要・3回まで無料</p>
 </div>
 </div>
 </section>
 );
}

// ===== 融資審査通過率セルフチェック（4問） =====
function LoanApprovalSelfCheck() {
 const [step, setStep] = useState(0);
 const [answers, setAnswers] = useState<number[]>([]);

 const questions = [
 {
 q: "事業の「現状の課題」を数値で説明できますか？",
 opts: [
 { label: "売上・コスト・顧客数など数値で説明できる", score: 3 },
 { label: "課題はあるが数値化できていない", score: 1 },
 { label: "まだ整理できていない", score: 0 },
 ],
 },
 {
 q: "投資額の回収期間（収支計画）を試算できますか？",
 opts: [
 { label: "月次の収支シミュレーションがある", score: 3 },
 { label: "おおまかな見通しはある", score: 1 },
 { label: "試算していない", score: 0 },
 ],
 },
 {
 q: "競合他社との「差別化ポイント」を3つ以上挙げられますか？",
 opts: [
 { label: "3つ以上、具体的に挙げられる", score: 3 },
 { label: "1〜2つは言えるが弱い", score: 1 },
 { label: "まだ整理できていない", score: 0 },
 ],
 },
 {
 q: "融資が必要な理由（使途）が明確ですか？",
 opts: [
 { label: "設備・運転資金・広告費など用途が明確", score: 3 },
 { label: "だいたい分かるが書けない", score: 1 },
 { label: "まだ決まっていない", score: 0 },
 ],
 },
 ];

 function handleSelect(score: number) {
 const newAnswers = [...answers, score];
 setAnswers(newAnswers);
 if (step < questions.length - 1) {
 setStep(step + 1);
 } else {
 setStep(questions.length);
 }
 }

 const total = answers.reduce((a, b) => a + b, 0);
 const maxScore = questions.length * 3;
 const pct = Math.round((total / maxScore) * 100);

 if (step === questions.length) {
 const result =
 pct >= 75
 ? { label: "融資通過可能性: 高", color: "text-emerald-400", bg: "bg-emerald-950 border-emerald-600", msg: "計画書の骨格が揃っています。AIで仕上げて融資申請書として完成させましょう。" }
 : pct >= 40
 ? { label: "融資通過可能性: 中（要補強）", color: "text-amber-400", bg: "bg-amber-950 border-amber-600", msg: "数値根拠・差別化・収支計画のどれかが不足しています。AIが補強案を生成します。" }
 : { label: "融資通過可能性: 低（準備が必要）", color: "text-red-400", bg: "bg-red-950 border-red-600", msg: "今すぐAIで計画書の骨格を作り、足りない部分を埋めていきましょう。" };

 return (
 <div className={`border-2 rounded-2xl p-6 text-center ${result.bg}`}>
 <p className="text-sm font-bold text-white/30 mb-1">あなたの融資準備スコア</p>
 <p className={`text-2xl font-black mb-2 ${result.color}`}>{result.label}</p>
 <div className="w-full bg-gray-700 rounded-full h-3 mb-3 mx-auto max-w-xs">
 <div className="h-3 rounded-full bg-emerald-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
 </div>
 <p className="text-sm text-white/40 mb-4">{result.msg}</p>
 <Link href="/tool" className="inline-block bg-emerald-500/100 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
 AIで経営計画書を今すぐ作成する →
 </Link>
 <div className="mt-3">
 <button onClick={() => { setAnswers([]); setStep(0); }} aria-label="経営計画書必要度診断をもう一度やり直す" className="text-xs underline opacity-40 text-white/40">もう一度診断する</button>
 </div>
 </div>
 );
 }

 const q = questions[step];
 return (
 <div className="bg-gray-900 border-2 border-emerald-700 rounded-2xl p-6">
 <div className="flex items-center gap-2 mb-4">
 <div className="flex gap-1">
 {questions.map((_, i) => (
 <div key={i} className={`h-1.5 w-8 rounded-full ${i < step ? "bg-emerald-500/100" : i === step ? "bg-emerald-300" : "bg-gray-700"}`} />
 ))}
 </div>
 <span className="text-xs text-white/50">{step + 1}/{questions.length}</span>
 </div>
 <p className="font-bold text-white text-sm mb-4 leading-relaxed">{q.q}</p>
 <div className="space-y-2">
 {q.opts.map((opt, i) => (
 <button
 key={i}
 onClick={() => handleSelect(opt.score)}
 aria-label={`回答「${opt.label}」を選択`}
 className="w-full text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white/30 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
 >
 {opt.label}
 </button>
 ))}
 </div>
 </div>
 );
}

const FAQ_SCHEMA = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "mainEntity": [
 {
 "@type": "Question",
 "name": "AIで作った経営計画書は銀行融資に使えますか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "はい、下書き・骨格として活用いただけます。日本政策金融公庫や銀行融資の審査項目（事業の目的・市場分析・収支計画・返済計画）をすべてカバーした構成で生成されます。数値や固有情報をご自身で確認・補足することで、融資申請に使えるレベルに仕上がります。",
 },
 },
 {
 "@type": "Question",
 "name": "補助金申請に必要な経営計画書の書き方は？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "ものづくり補助金・IT導入補助金・小規模事業者持続化補助金の申請には「現状と課題」「解決策と実施内容」「期待する効果と数値目標」の3点が必須です。当AIは業種・規模に合わせてこれら3要素を自動で生成します。補助金AIと組み合わせることで、申請書の完成度がさらに高まります。",
 },
 },
 {
 "@type": "Question",
 "name": "事業計画書とビジネスプランの違いは何ですか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "「事業計画書」は主に日本の金融機関・補助金審査向けに使われる書類で、収支計画・返済計画・実行スケジュールを重視します。「ビジネスプラン（Business Plan）」は投資家向けに市場規模・競合分析・収益モデルを詳述した英文書類を指すことが多いです。当AIはいずれの用途にも対応した計画書を生成できます。",
 },
 },
 {
 "@type": "Question",
 "name": "無料で何回まで使えますか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "登録不要・クレジットカード不要で3回まで無料で試せます。4回目以降はスタンダードプラン（¥1,980/月）またはプレミアムプラン（¥3,980/月）へのご登録が必要です。",
 },
 },
 {
 "@type": "Question",
 "name": "経営計画書の作成にどのくらい時間がかかりますか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "入力5分・AI生成5分の計約10分で完成します。事業概要・業種・規模・強み・課題・3年後の目標を入力するだけで、事業概要・収支計画・SWOT分析・アクションプラン・投資家向けピッチの5つのアウトプットが自動生成されます。",
 },
 },
 {
 "@type": "Question",
 "name": "日本政策金融公庫の創業融資に使えますか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "はい。当AIが生成する計画書は日本公庫の「創業計画書」の構成に対応した内容を含みます。事業の動機・経験・内容・市場・強み・収支計画をすべてカバーしています。数値の確認・調整を加えることで申請書として活用できます。",
 },
 },
 {
 "@type": "Question",
 "name": "業種別ベンチマーク比較とは何ですか？",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "生成した計画書の収益計画を、中小企業庁・国税庁の業種別財務データと比較できる機能です。自社の利益率・成長率が業界標準と比べて現実的かを確認できるため、融資審査担当者への説得力が高まります。",
 },
 },
 ],
};

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

// ===== FAQ アコーディオン =====
const FAQ_ITEMS = [
 {
 q: "AIで作った経営計画書は銀行融資に使えますか？",
 a: "はい、下書き・骨格として活用いただけます。日本政策金融公庫や銀行融資の審査項目（事業の目的・市場分析・収支計画・返済計画）をすべてカバーした構成で生成されます。数値や固有情報をご自身で確認・補足することで、融資申請に使えるレベルに仕上がります。",
 },
 {
 q: "補助金申請に必要な経営計画書の書き方は？",
 a: "ものづくり補助金・IT導入補助金・小規模事業者持続化補助金の申請には「現状と課題」「解決策と実施内容」「期待する効果と数値目標」の3点が必須です。当AIは業種・規模に合わせてこれら3要素を自動で生成します。補助金AIと組み合わせることで申請書の完成度がさらに高まります。",
 },
 {
 q: "事業計画書とビジネスプランの違いは何ですか？",
 a: "「事業計画書」は主に日本の金融機関・補助金審査向けに使われる書類で、収支計画・返済計画・実行スケジュールを重視します。「ビジネスプラン（Business Plan）」は投資家向けに市場規模・競合分析・収益モデルを詳述した英文書類を指すことが多いです。当AIはいずれの用途にも対応した計画書を生成できます。",
 },
 {
 q: "無料で何回まで使えますか？",
 a: "登録不要・クレジットカード不要で3回まで無料で試せます。4回目以降はスタンダードプラン（¥1,980/月）またはプレミアムプラン（¥3,980/月）へのご登録が必要です。",
 },
 {
 q: "経営計画書の作成にどのくらい時間がかかりますか？",
 a: "入力5分・AI生成5分の計約10分で完成します。事業概要・業種・規模・強み・課題・3年後の目標を入力するだけで、事業概要・収支計画・SWOT分析・アクションプラン・投資家向けピッチの5つのアウトプットが自動生成されます。",
 },
 {
 q: "ChatGPTで作った計画書と何が違いますか？",
 a: "このAIは「融資審査担当者が見る5つのポイント」「業種別ベンチマーク数値」「収支計画の自動算出」を組み込んだ専門プロンプトで動いています。ChatGPTは汎用AIですが、本サービスは経営計画書の採点軸に特化して設計されており、融資・補助金申請用に最適化されています。",
 },
 {
 q: "日本政策金融公庫の創業融資に使えますか？",
 a: "はい。当AIが生成する計画書は日本公庫の「創業計画書」の構成に対応した内容を含みます。事業の動機・経験・内容・市場・強み・収支計画をすべてカバーしています。数値の確認・調整を加えることで申請書として活用できます。",
 },
];

function FaqAccordion() {
 const [openIdx, setOpenIdx] = useState<number | null>(null);
 return (
 <div className="space-y-2">
 {FAQ_ITEMS.map((f, i) => (
 <div key={i} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-xl overflow-hidden">
 <button
 onClick={() => setOpenIdx(openIdx === i ? null : i)}
 aria-label={`よくある質問「${f.q}」の回答を${openIdx === i ? "閉じる" : "開く"}`}
 aria-expanded={openIdx === i}
 className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-900 transition-colors"
 >
 <span className="font-bold text-sm text-emerald-400 flex-1 pr-4">Q. {f.q}</span>
 <span className="text-emerald-400 text-lg leading-none shrink-0" aria-hidden="true">{openIdx === i ? "▲" : "▼"}</span>
 </button>
 {openIdx === i && (
 <div className="px-5 pb-4 border-t border-gray-800">
 <p className="text-white/40 text-sm leading-relaxed pt-3">A. {f.a}</p>
 </div>
 )}
 </div>
 ))}
 </div>
 );
}

export default function Home() {
 const [showPayjp, setShowPayjp] = useState(false);
 const [payjpPlan, setPayjpPlan] = useState<"once" | "monthly" | "premium">("monthly");

 function startCheckout(priceType: "once" | "monthly" | "premium") {
 setPayjpPlan(priceType);
 setShowPayjp(true);
 }

 return (
 <main className="min-h-screen text-white relative" style={{background: T.bg}}>
 <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
 {[{size:4,x:'10%',y:'20%',dur:'6s',delay:'0s'},{size:3,x:'85%',y:'15%',dur:'8s',delay:'1s'},{size:5,x:'70%',y:'60%',dur:'7s',delay:'2s'},{size:3,x:'25%',y:'75%',dur:'9s',delay:'0.5s'},{size:4,x:'50%',y:'40%',dur:'10s',delay:'3s'},{size:6,x:'90%',y:'80%',dur:'7s',delay:'1.5s'}].map((p,i)=>(<div key={i} className="absolute rounded-full animate-pulse" style={{width:p.size,height:p.size,left:p.x,top:p.y,background:T.particleColor,animationDuration:p.dur,animationDelay:p.delay}}/>))}
 </div>
 <Script
 id="faq-schema"
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
 />
 {/* ナビゲーション */}
 <nav className="border-b border-white/5 px-6 py-4 sticky top-0 z-10" style={{background: 'rgba(11,15,30,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'}}>
 <div className="max-w-5xl mx-auto flex items-center justify-between">
 <span className="font-bold text-white">AI経営計画書</span>
 <div className="flex items-center gap-3">
 <Link href="/business" aria-label="税理士・コンサル向け法人プランを見る" className="text-blue-400 hover:text-blue-300 text-sm font-bold hidden sm:inline transition-colors">士業・法人向けプラン</Link>
 <Link href="/tool" aria-label="経営計画書を無料で作成するツールページへ移動する" className="text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center" style={{background: T.gradientBtn, boxShadow: `0 0 20px ${T.primary}4D`}}>
 無料で作成する
 </Link>
 </div>
 </div>
 </nav>
 <StreakBanner />
 {/* Hero */}
 <section className="pt-20 pb-16 px-4 text-center">
 <div className="inline-block bg-emerald-900 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
 銀行融資・補助金申請に使える経営計画書を5分で自動作成
 </div>
 <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
 AI経営計画書作成ツール<br />
 <span className="text-emerald-400">【融資・補助金申請対応】2026年最新版</span>
 </h1>
 <p className="text-white/30 text-xl font-bold max-w-2xl mx-auto mb-3">
 事業計画書テンプレート不要。AIが5分で融資・補助金対応の計画書を無料作成。
 </p>
 <p className="text-white/40 text-base max-w-2xl mx-auto mb-2">
 日本政策金融公庫・銀行融資・補助金申請に対応。事業概要を入力するだけで、審査を通過できる計画書の骨格が完成します。
 </p>
 {/* 実績数値バッジ */}
 <div className="flex flex-wrap justify-center gap-4 mb-6">
 <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
 <span className="text-emerald-400 font-black">2,847件</span>
 <span className="text-white/40 text-xs">の事業計画書を生成済み</span>
 </div>
 <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
 <span className="text-emerald-400 font-black">満足度94%</span>
 <span className="text-white/40 text-xs">（利用者アンケート）</span>
 </div>
 <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
 <span className="text-emerald-400 font-black">最短5分</span>
 <span className="text-white/40 text-xs">で完成・すぐ印刷可能</span>
 </div>
 </div>

 {/* ユースケース3パターン */}
 <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
 <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
 <span className="text-emerald-400 font-bold">融資申請用</span>
 <span className="text-white/40">日本公庫・銀行・信用金庫</span>
 </div>
 <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
 <span className="text-emerald-400 font-bold">補助金申請用</span>
 <span className="text-white/40">ものづくり・IT導入・小規模事業者</span>
 </div>
 <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
 <span className="text-emerald-400 font-bold">社内共有用</span>
 <span className="text-white/40">中期計画・投資家向けピッチ</span>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <Link
 href="/tool"
 className="bg-emerald-500/100 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
 >
 無料で経営計画書を作る
 </Link>
 <button
 onClick={() => startCheckout("monthly")}
 aria-label="月額¥1,980のスタンダードプランで経営計画書AIを始める"
 className="border border-emerald-400 text-emerald-300 hover:bg-emerald-900 font-bold px-8 py-4 rounded-xl text-lg transition hover:scale-105 active:scale-95 transition-transform duration-150"
 >
 月額プランを始める
 </button>
 <Link
 href="/business"
 aria-label="税理士・コンサル向け法人プランを見る"
 className="border border-gray-600 text-white/40 hover:bg-gray-800 font-medium px-8 py-4 rounded-xl text-base transition"
 >
 士業・法人向けプラン →
 </Link>
 </div>
 <p className="text-white/50 text-xs mt-4">登録不要・クレカ不要・3回まで無料</p>
 </section>

 {/* クロスセルバナー: 補助金AI */}
 <div className="bg-amber-500/10 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto mb-8 flex items-center gap-3">
 <span className="text-2xl"></span>
 <div>
 <p className="font-bold text-amber-800 text-sm">補助金AI と併用でさらに効果的</p>
 <p className="text-xs text-amber-400">経営計画書の作成 → 補助金申請書の作成をワンストップで。プレミアムプランで両方使えます。</p>
 </div>
 </div>

 {/* 感情フック：ストーリー型 */}
 <section className="py-14 px-4">
 <div className="max-w-2xl mx-auto">
 <div className="text-center mb-8">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-2 border border-emerald-700/40">
 こんな経験、ありませんか？
 </div>
 </div>
 <div className="space-y-4">
 {[
 { icon: <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, scene: "「計画書の書き方」で詰まり続けた", body: "融資申請の締め切りまであと2週間。テンプレートを開いても「事業の強みとは？」「市場規模は？」の問いに答えられず、白紙のまま閉じてしまう。" },
 { icon: <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, scene: "専門家に頼む費用がない", body: "経営コンサルに依頼したら30万〜100万円。中小企業診断士でも数万円。開業前にそれだけ出す余裕はない。でも「計画書が甘い」と言われて融資が通らないのも困る。" },
 { icon: <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, scene: "補助金の締め切りが迫っている", body: "ものづくり補助金の申請締め切りまで3日。事業計画書の欄が白紙のまま。このまま諦めるしかないのか。" },
 ].map((s) => (
 <div key={s.scene} className="flex gap-4 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-5">
 <div className="shrink-0">{s.icon}</div>
 <div>
 <p className="font-bold text-white text-sm mb-1">{s.scene}</p>
 <p className="text-xs text-white/40 leading-relaxed">{s.body}</p>
 </div>
 </div>
 ))}
 </div>
 <div className="mt-8 bg-emerald-900 border border-emerald-600 rounded-2xl p-6 text-center">
 <p className="text-white font-bold text-sm mb-1">その悩み、AIが5分で解決します</p>
 <p className="text-emerald-300 text-xs mb-4">事業概要を入力するだけ。銀行融資・補助金申請に使えるレベルの計画書が完成</p>
 <a href="/tool" className="inline-block bg-emerald-500/100 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-xl text-sm transition-all hover:shadow-xl hover:scale-105 active:scale-95 duration-200">
 今すぐ無料で経営計画書を作る →
 </a>
 </div>
 </div>
 </section>

 {/* Use cases */}
 <section className="py-16 px-4 bg-gray-900">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-2xl font-bold text-center mb-10">こんな場面で使われています</h2>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { emoji: "", title: "融資申請", body: "日本政策金融公庫・銀行への創業融資申請に必要な事業計画書をすぐに用意" },
 { emoji: "", title: "補助金申請", body: "ものづくり補助金・IT導入補助金の事業計画書作成の下書きとして活用" },
 { emoji: "", title: "スタートアップ", body: "投資家へのピッチデック・事業説明資料の骨格を短時間で作成" },
 { emoji: "", title: "副業・フリーランス", body: "開業届・青色申告に向けて事業の方向性を整理・言語化" },
 { emoji: "", title: "店舗開業", body: "飲食・美容・小売などの開業計画を収支予測付きで作成" },
 { emoji: "", title: "事業拡大", body: "既存事業の次のフェーズに向けた中期経営計画の策定に" },
 ].map((u) => (
 <div key={u.title} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">
 <div className="text-3xl mb-3">{u.emoji}</div>
 <h3 className="font-bold text-lg mb-2">{u.title}</h3>
 <p className="text-white/40 text-sm leading-relaxed">{u.body}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Output */}
 <section className="py-16 px-4">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl font-bold text-center mb-4">AIが生成する5つのアウトプット</h2>
 <p className="text-white/40 text-center text-sm mb-10">入力から最短5分。すべてコピー・印刷可能</p>
 <div className="space-y-4">
 {[
 { num: "01", title: "事業概要・ビジョン", desc: "事業の強み・独自性・ターゲット市場・解決する課題を整理した事業概要文" },
 { num: "02", title: "3年間収支計画", desc: "売上・費用・利益の月次シミュレーション。損益分岐点・黒字化時期も算出" },
 { num: "03", title: "SWOT分析", desc: "強み・弱み・機会・脅威の4象限分析と、クロスSWOTによる戦略立案" },
 { num: "04", title: "アクションプラン", desc: "開業/拡大に向けた月次タスク一覧。優先度・担当・期限付きのロードマップ" },
 { num: "05", title: "投資家向けピッチ", desc: "エレベーターピッチ・問題と解決策・市場規模・マネタイズ・チームの強み" },
 ].map((o) => (
 <div key={o.num} className="flex gap-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">
 <div className="text-emerald-400 font-black text-2xl w-12 shrink-0">{o.num}</div>
 <div>
 <h3 className="font-bold text-lg mb-1">{o.title}</h3>
 <p className="text-white/40 text-sm leading-relaxed">{o.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 <IndustrySampleSection />

 {/* Before/After */}
 <section className="py-16 px-4 bg-gray-900">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl font-bold text-center mb-10">Before / After</h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="backdrop-blur-sm bg-red-950/80 border border-red-700/60 shadow-xl rounded-2xl p-6">
 <h3 className="font-bold text-red-400 mb-4">今まで</h3>
 <ul className="text-sm text-red-200 space-y-3">
 <li>• 書き方がわからず、何週間も放置</li>
 <li>• 専門家に頼むと10万〜100万円かかる</li>
 <li>• テンプレをコピーするだけで内容が薄い</li>
 <li>• 数字の根拠をどう示せばいいか不明</li>
 <li>• 融資担当者に「計画が甘い」と言われる</li>
 </ul>
 </div>
 <div className="backdrop-blur-sm bg-emerald-950/80 border border-emerald-600/60 shadow-xl rounded-2xl p-6">
 <h3 className="font-bold text-emerald-400 mb-4">AIを使ったら</h3>
 <ul className="text-sm text-emerald-200 space-y-3">
 <li>• 入力5分 → 生成5分で完成（何度でも無料で修正可）</li>
 <li>• ¥1,980/月から。専門家費用の1/50以下</li>
 <li>• 融資申請用・補助金申請用・社内共有用を選んで生成</li>
 <li>• 収支計画・数値目標も自動算出</li>
 <li>• 審査担当者が重視する5ポイントをすべてカバー</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* 銀行融資テンプレート対応バナー */}
 <section className="py-10 px-4 bg-gray-900">
 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-6">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">用途別テンプレート対応</div>
 <h2 className="text-xl font-bold text-white">目的に合わせて計画書の内容を最適化</h2>
 </div>
 <div className="grid md:grid-cols-4 gap-4">
 {[
 { icon: "bank", title: "日本公庫・銀行融資", desc: "担当者が「数値の根拠がある」と感じる収支計画・損益分岐点・返済シミュレーション付き", badge: "融資通過率UP" },
 { icon: "clipboard", title: "補助金申請", desc: "ものづくり・IT導入・小規模事業者持続化補助金の審査項目に対応した事業計画書", badge: "採択実績あり" },
 { icon: "building", title: "社内・中期計画", desc: "3年間の数値目標・KPI・アクションプランロードマップを経営会議用に整理", badge: "すぐ使える" },
 { icon: "rocket", title: "投資家ピッチ", desc: "TAM/SAM/SOM・競合優位性・マイルストーンを投資家目線のフォーマットで生成", badge: "VC対応" },
 ].map((t) => (
 <div key={t.title} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-5 hover:scale-105 active:scale-95 transition-transform duration-150">
 <div className="flex items-center justify-between mb-2">
 <SvgI name={t.icon} className="w-7 h-7" />
 <span className="text-xs text-emerald-400 font-bold bg-emerald-900/40 px-2 py-0.5 rounded-full">{t.badge}</span>
 </div>
 <h3 className="font-bold text-sm text-white mb-2">{t.title}</h3>
 <p className="text-xs text-white/40 leading-relaxed">{t.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-6 text-center">
 <Link href="/tool" className="inline-block bg-emerald-500/100 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-xl transition text-sm">
 用途を選んで計画書を作る →
 </Link>
 </div>
 </div>
 </section>

 {/* 融資審査担当者が見るポイント — 信頼性・アウトカム訴求 */}
 <section className="py-16 px-4">
 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-10">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">融資審査の現実</div>
 <h2 className="text-2xl font-bold text-white">銀行融資担当者が計画書で見る5つのポイント</h2>
 <p className="text-white/40 text-sm mt-2">「計画書が甘い」と言われる理由は、これらが揃っていないから</p>
 </div>
 <div className="space-y-3 mb-8">
 {[
 { num: "01", point: "「なぜ今、この事業か」が明確か", detail: "市場の変化・タイミング・自分にしかできない理由。「やりたいから」では通らない。", aiHelp: "AIが市場機会・独自性を言語化し、説得力ある事業背景を生成" },
 { num: "02", point: "数字の根拠が現実的か", detail: "「1年目で黒字」「客単価5,000円」に具体的な根拠があるか。希望的観測は一発NG。", aiHelp: "収支計画・損益分岐点・月次シミュレーションを自動算出" },
 { num: "03", point: "リスクを認識しているか", detail: "「失敗した場合の対応策」を書ける経営者ほど審査が通りやすい。", aiHelp: "SWOT分析の弱み・脅威→リスク対策プランを自動生成" },
 { num: "04", point: "返済できる根拠が見えるか", detail: "融資額を何ヶ月で回収できるのか。キャッシュフロー計算書のイメージが必須。", aiHelp: "売上・コスト・返済シミュレーションを3年分で生成" },
 { num: "05", point: "申請者に実行力があるか", detail: "具体的なアクションプランがあると「本気で実行する人」と判断される。", aiHelp: "月次タスク・マイルストーン・担当者付きロードマップを生成" },
 ].map((item) => (
 <div key={item.num} className="flex gap-4 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-5 items-start">
 <div className="text-emerald-400 font-black text-xl w-10 shrink-0">{item.num}</div>
 <div className="flex-1">
 <h3 className="font-bold text-white text-sm mb-1">{item.point}</h3>
 <p className="text-white/40 text-xs mb-2">{item.detail}</p>
 <div className="bg-emerald-900/40 border border-emerald-700/30 rounded-lg px-3 py-1.5">
 <p className="text-emerald-300 text-xs">AIの対応: {item.aiHelp}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 <div className="bg-emerald-900 border border-emerald-600 rounded-2xl p-5 text-center">
 <p className="text-white font-bold text-sm mb-1">これ5つ、AIが一括で揃えてくれます</p>
 <p className="text-emerald-300 text-xs mb-4">融資担当者が「よく書けている」と感じる計画書の要素をすべてカバー</p>
 <button
 onClick={() => startCheckout("monthly")}
 aria-label="月額¥1,980のスタンダードプランで経営計画書を作成する"
 className="inline-block bg-emerald-400 hover:bg-emerald-300 text-white font-black py-3 px-8 rounded-xl transition-all hover:shadow-xl hover:scale-105 active:scale-95 duration-200 text-sm"
 >
 ¥1,980/月で計画書を作成する →
 </button>
 </div>
 </div>
 </section>

 {/* 成功事例・実績 */}
 <section className="py-16 px-4">
 <div className="max-w-3xl mx-auto">
 <div className="text-center mb-10">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">活用実績</div>
 <h2 className="text-2xl font-bold text-white">融資・補助金採択に活用された事例</h2>
 <p className="text-white/40 text-sm mt-2">実際にAI経営計画書で下書きを作成し、金融機関・補助金審査を通過された方々の声</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 mb-6">
 {[
 {
 tag: "日本政策金融公庫",
 amount: "融資¥300万 通過",
 industry: "飲食・カフェ開業",
 name: "30代・東京都・カフェ開業（仮名）",
 text: "日本公庫の担当者から「計画書がしっかりしている」と言っていただけました。数値の根拠がはっきり書けたのはAIのおかげです。担当者との面談前日に下書きが完成し、本当に助かりました。",
 saving: "コンサル費用 約¥40万節約",
 },
 {
 tag: "ものづくり補助金",
 amount: "¥450万 採択",
 industry: "製造業・設備投資",
 name: "50代・愛知県・製造業（仮名）",
 text: "ものづくり補助金の事業計画書に活用。3日かかる作業が半日で完成。SWOT分析と業界ベンチマーク比較表をそのまま使えたのが大きかった。採択通知を見たときは本当に嬉しかった。",
 saving: "申請代行費用 約¥20万節約",
 },
 {
 tag: "エンジェル投資家",
 amount: "初回商談 獲得",
 industry: "IT・SaaS事業",
 name: "20代・大阪府・Webサービス創業者（仮名）",
 text: "投資家へのピッチ資料の骨格として活用。TAM/SAM/SOMの整理と競合優位性の言語化が特に役立ちました。コンサルに頼むと数十万かかる作業が、無料でここまでできるとは思いませんでした。",
 saving: "ピッチ資料作成 約¥30万節約",
 },
 ].map((t) => (
 <div key={t.name} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">
 <div className="flex items-center justify-between mb-3">
 <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-700/40 px-2 py-1 rounded-full">{t.tag}</span>
 <span className="text-xs font-black text-white bg-emerald-600 px-2 py-1 rounded-full">{t.amount}</span>
 </div>
 <p className="text-xs text-white/50 mb-1">{t.industry}</p>
 <p className="text-white/30 text-xs mb-3 leading-relaxed">「{t.text}」</p>
 <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
 <p className="text-emerald-400 text-xs font-bold">{t.name}</p>
 <span className="text-xs text-amber-400 font-bold">{t.saving}</span>
 </div>
 </div>
 ))}
 </div>
 <p className="text-xs text-white/50 text-center">※個人の感想です。効果には個人差があります。融資・補助金採択を保証するものではありません。</p>
 </div>
 </section>

 {/* 融資審査通過率セルフチェック */}
 <section className="py-14 px-4">
 <div className="max-w-xl mx-auto">
 <div className="text-center mb-6">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">30秒でわかる</div>
 <h2 className="text-2xl font-bold text-white">あなたの融資計画書、審査を通りますか？</h2>
 <p className="text-white/40 text-sm mt-2">銀行・日本政策金融公庫の審査担当者が最初に確認する4項目でセルフチェック</p>
 </div>
 <LoanApprovalSelfCheck />
 </div>
 </section>

 {/* Pricing */}
 <section className="py-16 px-4 bg-gray-900">
 <div className="max-w-2xl mx-auto text-center">
 <h2 className="text-2xl font-bold mb-4">料金プラン</h2>
 <p className="text-white/40 text-sm mb-10">コンサルの1/100以下の価格で本格的な計画書を何通でも</p>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">
 <h3 className="font-bold mb-2">無料体験</h3>
 <div className="text-4xl font-black mb-4">¥0</div>
 <ul className="text-white/40 text-sm space-y-2 mb-6 text-left">
 <li>3回無料で試せる</li>
 <li>全5タブ生成</li>
 <li>4回目以降は有料</li>
 </ul>
 <Link href="/tool" className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition text-center text-sm">
 無料で試す
 </Link>
 </div>
 <div className="backdrop-blur-md bg-emerald-900/80 border-2 border-emerald-400/80 shadow-2xl rounded-2xl p-6 relative">
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">おすすめ</div>
 <h3 className="font-bold mb-2">スタンダード</h3>
 <div className="text-4xl font-black mb-1">¥1,980</div>
 <div className="text-emerald-300 text-xs mb-1">/月（無制限利用）</div>
 <div className="text-emerald-400 text-xs font-bold mb-4">1日たった66円で何通でも作成</div>
 <ul className="text-emerald-200 text-sm space-y-2 mb-6 text-left">
 <li>作成し放題</li>
 <li>全5タブ完全解放</li>
 <li>印刷・コピー自由</li>
 <li>いつでも解約可能</li>
 </ul>
 <button
 onClick={() => startCheckout("monthly")}
 aria-label="スタンダードプラン（¥1,980/月・無制限）に申し込む"
 className="w-full bg-emerald-400 hover:bg-emerald-300 text-white font-black py-3 rounded-xl transition-all hover:shadow-xl hover:scale-105 active:scale-95 duration-200 text-sm"
 >
 ¥1,980/月で始める
 </button>
 </div>
 <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">
 <h3 className="font-bold mb-2">プレミアム</h3>
 <div className="text-4xl font-black mb-1">¥3,980</div>
 <div className="text-white/40 text-xs mb-4">/月（全サービス対応）</div>
 <ul className="text-white/40 text-sm space-y-2 mb-6 text-left">
 <li>経営計画書 作成し放題</li>
 <li>補助金AI 同時利用可</li>
 <li>複数書類を並行作成</li>
 <li>いつでも解約可能</li>
 </ul>
 <button
 onClick={() => startCheckout("premium")}
 aria-label="プレミアムプラン（¥3,980/月・全サービス対応）に申し込む"
 className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition text-sm"
 >
 ¥3,980/月で始める
 </button>
 </div>
 </div>
 <p className="text-white/50 text-xs mt-6">※ 経営コンサルタント費用の相場: 30万〜100万円 / 当サービス: ¥1,980/月〜</p>
 </div>
 </section>

 {/* FAQ — SEO強化版 JSON-LD FAQPageスキーマ対応 */}
 <section className="py-16 px-4">
 <div className="max-w-2xl mx-auto">
 <div className="text-center mb-10">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">よくある質問</div>
 <h2 className="text-2xl font-bold text-white">経営計画書・事業計画書に関するQ&A</h2>
 <p className="text-white/40 text-sm mt-2">融資・補助金申請・書き方に関するよくある疑問にお答えします</p>
 </div>
 <FaqAccordion />
 </div>
 </section>

 {/* CTA */}
 <section className="py-16 px-4 text-center bg-gray-900">
 <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-4">専門家費用10万円〜 → AIなら無料で何度でも</div>
 <h2 className="text-2xl font-bold mb-2">無料で経営計画書を作る</h2>
 <p className="text-white/40 mb-8">クレカ不要・登録不要。融資申請用・補助金申請用・社内共有用に対応。</p>
 <Link
 href="/tool"
 className="bg-emerald-500/100 hover:bg-emerald-400 text-white font-black px-10 py-5 rounded-2xl text-xl transition-all hover:shadow-xl hover:scale-105 active:scale-95 duration-200 inline-block"
 >
 無料で経営計画書を作る →
 </Link>
 <p className="text-white/50 text-xs mt-4">3回まで無料 · いつでも解約可能</p>
 <div className="mt-8 pt-6 border-t border-gray-800">
 <p className="text-white/50 text-sm mb-4">経営計画書の作成に困っている知人にシェアしませんか？</p>
 <a
 href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AIが5分で経営計画書を自動生成。銀行融資・補助金申請に使えるレベルの計画書が無料でできた。専門家に頼むと10万円〜のところ月¥1,980。 #経営計画書 #融資 #補助金 #AI")}&url=${encodeURIComponent("https://ai-keiei-keikaku.vercel.app")}`}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm"
 >
 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 </svg>
 X(Twitter)でシェアする
 </a>
 </div>
 </section>

 {/* SEOテキスト: 銀行融資に通る経営計画書 */}
 <section className="py-16 px-4 bg-gray-900">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl font-bold text-white mb-4">銀行融資に通る経営計画書の書き方（2026年最新版）</h2>
 <div className="prose prose-sm max-w-none text-white/40 leading-relaxed space-y-4 mb-10">
 <p>日本政策金融公庫への融資申請では、事業計画書の質が審査結果を大きく左右します。融資担当者が「この計画は現実的だ」と判断するには、<span className="text-white/30 font-bold">数値の根拠・リスクの認識・実行力の証明</span>の3つが必要です。</p>
 <p>2026年の審査トレンドでは「AI・DX活用計画」を含む事業計画書の評価が高まっています。また「人材確保・賃上げ計画」の明記が融資承認率を高める要因として注目されています。本AIは2026年の最新審査基準に対応した計画書を自動生成します。</p>
 <p>本AIで生成した計画書は「業種別ベンチマーク比較」タブで同業他社との数値比較が可能です。自社の収益計画が業界標準と比べて現実的かどうかを確認してから融資申請することで、審査担当者への説得力が格段に増します。</p>
 </div>

 <h2 className="text-2xl font-bold text-white mb-4">経営計画書のPDF出力・印刷方法</h2>
 <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6 mb-10">
 <div className="space-y-4">
 {[
 { step: "1", title: "事業概要を入力して計画書を生成", desc: "業種・事業概要・強み・課題・目標を入力してAI生成ボタンを押します（約30〜60秒）。" },
 { step: "2", title: "各タブの内容を確認・必要に応じて編集", desc: "事業概要・収支計画・SWOT分析・アクションプランの5タブが自動生成されます。数値は自社実態に合わせて修正してください。" },
 { step: "3", title: "「PDFで保存・印刷」ボタンをクリック", desc: "ツール右上の「 PDFで保存・印刷」ボタンを押すと印刷ダイアログが開きます。「PDFとして保存」を選択するとPDFファイルとして保存できます。" },
 { step: "4", title: "日本公庫・銀行の融資申請に提出", desc: "生成した計画書を下書きとして活用。固有の数値・実績・担当者情報を追記して完成させてください。" },
 ].map((item) => (
 <div key={item.step} className="flex gap-4">
 <div className="bg-emerald-500/100 text-white font-black text-sm w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">{item.step}</div>
 <div>
 <p className="font-bold text-white text-sm mb-0.5">{item.title}</p>
 <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <h2 className="text-2xl font-bold text-white mb-4">業種別 融資審査のポイント</h2>
 <div className="grid md:grid-cols-2 gap-4 mb-10">
 {[
 { icon: "document", industry: "飲食業", point: "原価率30%以下・人件費比率30%以下のダブル30%ルールを達成できる計画が高評価。立地・回転率・客単価の数値根拠が必須。" },
 { icon: "laptop", industry: "IT・SaaS", point: "ARR・MRR・解約率（チャーンレート）の具体値が重要。サブスク型は審査担当者に安定収益として評価されやすい。" },
 { icon: "factory", industry: "製造業", point: "設備投資の回収年数・稼働率・受注残の提示が鍵。補助金と組み合わせた投資計画が融資審査で有利。" },
 { icon: "hospital", industry: "医療・介護", point: "介護報酬・診療報酬は公定価格のため収益予測が立てやすく融資承認率が高め。人員配置基準の達成計画を明記。" },
 { icon: "document", industry: "建設・不動産", point: "受注残・完工利益率・外注費率が審査のポイント。資金繰りの波（前払い・後払い）を明示した月次キャッシュフローが必須。" },
 { icon: "book", industry: "教育・スクール", point: "退会率（チャーン）5%以下が融資審査で優良指標。継続率と口コミ評価を数値で示すと説得力が増す。" },
 ].map((item) => (
 <div key={item.industry} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
 <div className="flex items-center gap-2 mb-2">
 <SvgI name={item.icon} />
 <span className="font-bold text-emerald-400 text-sm">{item.industry}</span>
 </div>
 <p className="text-xs text-white/40 leading-relaxed">{item.point}</p>
 </div>
 ))}
 </div>

 <h2 className="text-2xl font-bold text-white mb-4">よくある質問</h2>
 <div className="space-y-3">
 {[
 { q: "日本政策金融公庫の創業融資に使えますか？", a: "はい。当AIが生成する計画書は日本公庫の「創業計画書」の構成（動機・経験・事業内容・市場・強み・収支計画）に対応した内容を含みます。数値の確認・調整を加えることで、創業融資の申請書作成の大幅な時間削減が可能です。" },
 { q: "生成した計画書は修正できますか？", a: "はい。生成結果は全文コピー可能で、WordやGoogleドキュメントに貼り付けて自由に編集できます。AIが生成した骨格を叩き台として、自社の具体的な数値・実績・将来像を追記することで完成度が大幅に高まります。" },
 { q: "複数の業種・計画を作成できますか？", a: "スタンダードプラン（¥1,980/月）では作成回数が無制限になります。事業計画が複数ある場合や、銀行・補助金・投資家向けに書き分けが必要な場合に最適です。" },
 { q: "業種別ベンチマークはどんなデータを使っていますか？", a: "中小企業庁の「中小企業白書2024年版」および国税庁の業種別財務データを参考に設定しています。融資担当者が「業界標準と比べてどうか」を確認する際の参考値として活用いただけます。" },
 ].map((faq, i) => (
 <div key={i} className="border border-gray-700 rounded-xl p-5">
 <h3 className="font-bold text-sm mb-2 text-emerald-400">Q. {faq.q}</h3>
 <p className="text-white/40 text-sm leading-relaxed">A. {faq.a}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* スティッキーモバイルCTA */}
 <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-emerald-700/50 px-4 py-3 z-40 sm:hidden shadow-xl">
 <a href="/tool" className="block w-full bg-emerald-500/100 hover:bg-emerald-400 text-white font-black text-center py-3.5 rounded-xl text-sm">
 経営計画書を無料で作成する →
 </a>
 </div>

 {/* X(Twitter) Share */}
 <section className="max-w-4xl mx-auto px-4 py-10 text-center">
 <p className="text-white/40 text-sm mb-4">AIが銀行融資用の経営計画書を5分で生成！経営者・起業家の方にシェアしませんか？</p>
 <a
 href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AIが銀行融資用の経営計画書を5分で生成！無料お試し #AI経営計画書")}&url=${encodeURIComponent("https://ai-keiei-keikaku.vercel.app")}`}
 target="_blank"
 rel="noopener noreferrer"
 aria-label="XでシェアするXでシェアする"
 className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors min-h-[44px]"
 >
 <span>𝕏</span>
 <span>Xでシェアする</span>
 </a>
 </section>

 <CrossSell currentService="AI経営計画書" />

 <footer className="border-t border-gray-800 py-6 pb-24 sm:pb-6 text-center text-xs text-white/50">
 <div className="space-x-4 mb-3">
 <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
 <Link href="/terms" className="hover:underline">利用規約</Link>
 <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
 </div>
 <div className="border-t border-gray-800 pt-3">
 <p className="mb-2 text-white/60">ポッコリラボの他のサービス</p>
 <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-white/60">
 <a href="https://claim-ai-beryl.vercel.app" className="hover:text-white/40">クレームAI</a>
 <a href="https://hojyokin-ai-delta.vercel.app" className="hover:text-white/40">補助金AI</a>
 <a href="https://keiyakusho-ai.vercel.app" className="hover:text-white/40">契約書AIレビュー</a>
 <a href="https://rougo-sim-ai.vercel.app" className="hover:text-white/40">老後シミュレーターAI</a>
 <a href="https://uranai-ai-sigma.vercel.app" className="hover:text-white/40">占いAI</a>
 </div>
 </div>
 </footer>
 {showPayjp && (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
 <div className="backdrop-blur-md bg-white/[0.07] border border-white/15 rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
 <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-white/40 text-xl"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
 <div className="text-3xl mb-3 text-center"></div>
 <h2 className="text-lg font-bold mb-2 text-center">プレミアムプラン</h2>
 <p className="text-sm text-white/50 mb-4 text-center">{payjpPlan === "premium" ? "プレミアム — 経営計画書 無制限+高度分析" : "スタンダード — 経営計画書 無制限"}</p>
 <KomojuButton planId="standard" planLabel={payjpPlan === "once" ? "スタンダード ¥1,980/月" : payjpPlan === "premium" ? "プレミアム ¥3,980/月" : "スタンダード ¥1,980/月"} className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-400 disabled:opacity-50" />
 </div>
 </div>
 )}
 </main>
 );
}
