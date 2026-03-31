import type { Metadata } from "next";
import Link from "next/link";

interface KeywordData {
  title: string;
  h1: string;
  description: string;
  features: { icon: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  lastUpdated: string;
}

export const KEYWORDS: Record<string, KeywordData> = {
  "keiei-keikaku-kakikata": {
    title: "経営計画書 書き方 テンプレート | AI経営計画書",
    h1: "経営計画書 書き方 テンプレート",
    description: "経営計画書の書き方とテンプレートをAIがサポート。会社の現状分析から5年計画まで、プロ品質の経営計画書を作成できます。",
    features: [
      { icon: "📋", title: "テンプレート自動生成", text: "業種・規模・目的に合わせた経営計画書テンプレートをAIが自動生成" },
      { icon: "✍️", title: "AI文章補完", text: "会社情報を入力するだけで経営理念・ビジョン・数値目標の文章をAIが作成" },
      { icon: "📊", title: "財務計画統合", text: "売上目標・費用計画・損益計画を自動計算してビジュアルで表示" },
    ],
    faqs: [
      { q: "経営計画書に必ず入れるべき項目は？", a: "経営理念・現状分析（SWOT）・中期目標・行動計画・財務計画が基本5項目です。AIが不足項目を自動チェックします。" },
      { q: "初めて経営計画書を作る場合は？", a: "AIに質問に答えるだけで経営計画書の骨格が完成します。業種別のサンプルも参照できます。" },
      { q: "どれくらいの期間をカバーすればいい？", a: "一般的には1年（単年計画）と3〜5年（中期計画）を合わせて作成します。AIが両方の計画を連動して作成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "chusho-kigyou-keiei-senryaku": {
    title: "中小企業 経営 戦略 立て方 | AI経営計画書",
    h1: "中小企業 経営 戦略 立て方",
    description: "中小企業向けの経営戦略の立て方を解説。AIが業界分析・競合調査・差別化戦略まで総合的にサポートします。",
    features: [
      { icon: "🎯", title: "戦略フレームワーク支援", text: "3C分析・SWOT・ポーターの5力など戦略フレームワークをAIが適用" },
      { icon: "🔍", title: "競合分析", text: "業界の競合状況をAIが分析し、差別化ポイントと弱みを明確化" },
      { icon: "🚀", title: "実行計画策定", text: "戦略を具体的なアクションプランに落とし込む支援をAIが提供" },
    ],
    faqs: [
      { q: "中小企業が経営戦略を持つメリットは？", a: "方向性が明確になり、社員が同じ目標に向かって動けます。銀行融資や補助金申請にも有利です。" },
      { q: "戦略と計画の違いは？", a: "戦略は「どの方向に進むか」の大きな方針、計画は「どう実行するか」の具体的手順です。AIが両方を連動して作成します。" },
      { q: "小規模事業者でも戦略は必要？", a: "規模が小さいからこそ限られたリソースを集中させる戦略が重要です。AIが小規模事業者向けのシンプルな戦略立案を支援します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "jigyo-keikaku-sakusei": {
    title: "事業計画 作成 ポイント | AI経営計画書",
    h1: "事業計画 作成 ポイント",
    description: "事業計画書の作成ポイントを解説。銀行融資・補助金申請・投資家向けなど目的別の事業計画書をAIが作成します。",
    features: [
      { icon: "🏦", title: "融資申請対応", text: "銀行・日本政策金融公庫の審査基準に合わせた事業計画書をAIが作成" },
      { icon: "💰", title: "補助金申請対応", text: "ものづくり補助金・IT補助金など各補助金の申請様式に対応した計画書を生成" },
      { icon: "📈", title: "投資家向け作成", text: "VCや投資家が見るポイントを押さえたビジネスプランをAIが作成" },
    ],
    faqs: [
      { q: "融資用と補助金用で事業計画書は変わる？", a: "基本構成は同じですが、審査基準が異なります。AIが申請先に合わせた最適な内容にカスタマイズします。" },
      { q: "財務計画の数字はどう作ればいい？", a: "過去実績・市場規模・競合他社の数字を参考に合理的な根拠を示すことが重要です。AIが数字の作成と根拠説明をサポートします。" },
      { q: "事業計画書の長さは？", a: "融資用は10〜15ページ、補助金は様式に従います。AIが適切なボリュームで作成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "keiei-vision-mission-sakusei": {
    title: "経営 ビジョン ミッション 作り方 | AI経営計画書",
    h1: "経営 ビジョン ミッション 作り方",
    description: "会社のビジョン・ミッション・バリューの作り方を解説。AIが経営理念の言語化と浸透をサポートします。",
    features: [
      { icon: "🌟", title: "理念言語化AI", text: "創業の想いや大切にしていることを質問に答えるだけでビジョン・ミッションに変換" },
      { icon: "💡", title: "業種別サンプル提供", text: "業種・規模・ターゲットに合わせた理念表現のサンプルをAIが多数提示" },
      { icon: "🔄", title: "社員浸透プラン", text: "作成したビジョンを社員に浸透させるための取り組みプランをAIが提案" },
    ],
    faqs: [
      { q: "ビジョンとミッションの違いは？", a: "ミッションは「なぜ存在するか（現在の使命）」、ビジョンは「どこを目指すか（将来像）」です。AIが分かりやすく整理して作成します。" },
      { q: "短くてシンプルな理念がいい？", a: "覚えやすく行動指針になる短い言葉が理想です。AIが長い考えをキャッチコピー的に凝縮する支援をします。" },
      { q: "経営理念はいつ作るべき？", a: "創業時が理想ですが、成長フェーズで見直すことも重要です。AIがステージに合った理念の作成・更新をサポートします。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "5year-keiei-keikaku": {
    title: "5年 経営計画 中期計画 書き方 | AI経営計画書",
    h1: "5年 経営計画 中期計画 書き方",
    description: "5年間の中期経営計画の書き方を解説。年度別目標から長期ビジョンまで、AIが体系的な中期計画書を作成します。",
    features: [
      { icon: "📅", title: "年度別計画自動生成", text: "5年間の目標を年度別にブレイクダウンしてAIが具体的な計画に落とし込み" },
      { icon: "🎯", title: "KPI設定支援", text: "売上・利益・人員・シェアなど重要指標のKPI設定をAIがサポート" },
      { icon: "🔮", title: "シナリオ分析", text: "楽観・中立・悲観の3シナリオで5年後のパターンをAIがシミュレーション" },
    ],
    faqs: [
      { q: "中期経営計画は何年が一般的？", a: "3〜5年が一般的です。変化の激しい業界では3年、安定した業界では5年計画が多いです。" },
      { q: "中期計画と単年度計画の関係は？", a: "中期計画の目標を年度に分割して単年度計画を作成します。AIが自動的に年度別目標値を算出します。" },
      { q: "計画が大きくブレた場合はどうする？", a: "半期ごとのレビューと計画修正が重要です。AIが実績vs計画の差異分析と修正案を提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "keiei-keikaku-jugyoin-kyoyu": {
    title: "経営計画書 従業員 共有 方法 | AI経営計画書",
    h1: "経営計画書 従業員 共有 方法",
    description: "経営計画書を従業員と共有・浸透させる方法を解説。AIが社員向け説明資料の作成と浸透プログラムをサポートします。",
    features: [
      { icon: "👥", title: "社員向け資料変換", text: "経営者視点の計画書を社員が理解・共感しやすい資料にAIが変換" },
      { icon: "📣", title: "浸透プラン作成", text: "全社発表・部署別説明・個人面談など段階的な浸透プログラムをAIが設計" },
      { icon: "🔗", title: "個人目標連動", text: "会社の経営計画と個人の目標設定（MBO）を連動させる仕組みをAIが支援" },
    ],
    faqs: [
      { q: "経営計画書をいつ社員に共有すべき？", a: "期初（4月・1月など）の全社会議で共有するのが一般的です。AIが発表シナリオと資料を作成します。" },
      { q: "全ての計画を社員に見せるべき？", a: "財務目標は全員に共有、詳細な数字は管理職のみという分け方が多いです。AIが公開レベル別の資料作成を支援します。" },
      { q: "社員の共感を得るには？", a: "数字だけでなく「なぜその目標か」「社員にとってのメリット」を明確にすることが重要です。AIが共感を得る伝え方の資料を作成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "swot-bunseki-keiei": {
    title: "SWOT分析 経営計画 活用法 | AI経営計画書",
    h1: "SWOT分析 経営計画 活用法",
    description: "SWOT分析を経営計画に活用する方法を解説。AIが自社の強み・弱み・機会・脅威を分析して戦略立案をサポートします。",
    features: [
      { icon: "🔍", title: "SWOT自動分析", text: "業界・規模・提供情報からAIが自社のSWOT要素を自動抽出・整理" },
      { icon: "🔄", title: "クロスSWOT戦略立案", text: "強み×機会・弱み×脅威などのクロス分析からAIが具体的な戦略を生成" },
      { icon: "📊", title: "競合比較分析", text: "主要競合との比較でSWOTをより精度高く作成するAIサポート" },
    ],
    faqs: [
      { q: "SWOT分析をどう経営計画に活かす？", a: "強みを活かす・弱みを補う・機会を捉える・脅威を回避する4つの戦略方向が導けます。AIがクロスSWOTで具体的な戦略を提案します。" },
      { q: "SWOT分析のよくある失敗は？", a: "表面的な要因の列挙で終わることです。「なぜそれが強みか」「競合比較で何が優位か」を深掘りすることが重要です。" },
      { q: "SWOT分析はどれくらいの頻度で更新すべき？", a: "年1回の計画更新時と、大きな環境変化があった時に見直しましょう。AIが最新情報に基づいて分析を更新します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "solo-jigyou-keiei-keikaku": {
    title: "個人事業主 経営計画 書き方 | AI経営計画書",
    h1: "個人事業主 経営計画 書き方",
    description: "個人事業主・フリーランス向けの経営計画書の書き方を解説。シンプルで実践的な計画書をAIがサポートします。",
    features: [
      { icon: "👤", title: "個人事業主特化テンプレート", text: "法人向けと異なる個人事業主の経営計画書形式をAIが提供" },
      { icon: "💼", title: "確定申告連動", text: "青色申告・確定申告と連動した収支計画をAIが作成" },
      { icon: "📈", title: "成長ロードマップ", text: "副業→個人事業→法人化へのステップアップ計画をAIが設計" },
    ],
    faqs: [
      { q: "個人事業主に経営計画書は必要？", a: "資金調達・補助金申請だけでなく、自分の事業方向性を整理するためにも有効です。AIがシンプルな1枚の計画書作成を支援します。" },
      { q: "フリーランスの売上目標の立て方は？", a: "単価×案件数×稼働月数で計算します。AIが現実的な目標設定と達成プランを一緒に考えます。" },
      { q: "法人化のタイミングと計画の関係は？", a: "売上800万〜1,000万円超が法人化の一般的なタイミングです。AIが法人化を見据えた成長計画を作成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "startup-jigyo-keikaku": {
    title: "スタートアップ 事業計画書 投資家向け | AI経営計画書",
    h1: "スタートアップ 事業計画書 投資家向け",
    description: "投資家向けスタートアップ事業計画書の作成方法を解説。AIがピッチデッキと事業計画書をベンチャーキャピタル基準で作成します。",
    features: [
      { icon: "🚀", title: "投資家向けピッチ資料", text: "VCが重視する市場規模・差別化・チーム・財務計画を押さえたピッチデッキをAIが作成" },
      { icon: "📊", title: "財務モデル作成", text: "3〜5年の財務予測（P&L・BS・CF）をAIが作成。投資家の質問に答えられる根拠も用意" },
      { icon: "🌍", title: "TAM/SAM/SOM分析", text: "市場規模の算出と参入戦略をAIが分析。投資家が納得するマーケット分析を提供" },
    ],
    faqs: [
      { q: "投資家向け事業計画書で最重要なポイントは？", a: "「なぜ今」「なぜこのチーム」「市場規模はどれだけ大きいか」の3点です。AIが投資家目線で計画書を評価・改善します。" },
      { q: "ピッチデッキは何枚が適切？", a: "10〜15枚が一般的です。シード期は課題→解決策→市場→チームを中心に構成します。AIが最適な構成を提案します。" },
      { q: "バリュエーションはどう算出する？", a: "ステージ・業界・成長率に応じた算定方法があります。AIが投資家が使う計算方法で合理的なバリュエーション根拠を作成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "franchise-keiei-keikaku": {
    title: "フランチャイズ 経営計画 加盟店 | AI経営計画書",
    h1: "フランチャイズ 経営計画 加盟店",
    description: "フランチャイズ加盟店向けの経営計画書を解説。本部への提出書類から自店舗の独自戦略までAIがサポートします。",
    features: [
      { icon: "🏪", title: "FC加盟店計画書作成", text: "フランチャイズ本部への提出用経営計画書をAIが書式に合わせて作成" },
      { icon: "📍", title: "エリア特性分析", text: "出店エリアの商圏・競合・人口統計をAIが分析して店舗別計画に反映" },
      { icon: "💡", title: "独自施策立案", text: "FC本部のルール内で差別化できる自店舗独自の取り組みをAIが提案" },
    ],
    faqs: [
      { q: "FC加盟前に経営計画書は必要？", a: "加盟審査で必要なほか、自分自身が投資回収できるかを判断するためにも重要です。AIが損益シミュレーションを作成します。" },
      { q: "FC本部から計画書の書式が決まっている場合は？", a: "指定書式がある場合もAIが対応します。書式に合わせた内容入力と数値計算をサポートします。" },
      { q: "複数店舗展開する場合の計画は？", a: "1店舗目から複数展開を見据えた事業計画書をAIが作成。資金調達・人員計画・出店タイミングも含めて設計します。" },
    ],
    lastUpdated: "2026-03-31",
  },
};

const ALL_SLUGS = Object.keys(KEYWORDS);

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = KEYWORDS[slug];
  if (!data) return { title: "Not Found" };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      modifiedTime: data.lastUpdated,
      url: `https://ai-keiei-keikaku.vercel.app/keywords/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
    alternates: {
      canonical: `https://ai-keiei-keikaku.vercel.app/keywords/${slug}`,
    },
    other: {
      "article:modified_time": data.lastUpdated,
    },
  };
}

export default async function KeywordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = KEYWORDS[slug];

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>ページが見つかりません</h1>
          <Link href="/" style={{ color: "#8b5cf6" }}>トップページへ戻る</Link>
        </div>
      </div>
    );
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": data.lastUpdated,
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", color: "#e2e8f0", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: "bold", marginBottom: "1rem", background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {data.h1}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "2rem" }}>{data.description}</p>
            <Link
              href="/"
              style={{ display: "inline-block", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", color: "#fff", padding: "1rem 2.5rem", borderRadius: "50px", fontWeight: "bold", fontSize: "1.1rem", textDecoration: "none" }}
            >
              今すぐ無料で経営計画書を作成 →
            </Link>
          </div>

          {/* Features */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center", color: "#8b5cf6" }}>AIが支援する3つのポイント</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {data.features.map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "12px", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{f.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#8b5cf6" }}>{f.title}</h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center", color: "#8b5cf6" }}>よくある質問</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {data.faqs.map((faq, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "12px", padding: "1.5rem" }}>
                  <h3 style={{ fontWeight: "bold", marginBottom: "0.75rem", color: "#8b5cf6", fontSize: "1rem" }}>Q: {faq.q}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginBottom: "3rem", padding: "2rem", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#8b5cf6" }}>プロ品質の経営計画書をAIで作成</h2>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>会社情報を入力するだけで経営計画書が完成</p>
            <Link
              href="/"
              style={{ display: "inline-block", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", color: "#fff", padding: "1rem 2.5rem", borderRadius: "50px", fontWeight: "bold", textDecoration: "none" }}
            >
              無料で作成してみる →
            </Link>
          </div>

          {/* Last Updated */}
          <p style={{ textAlign: "center", color: "#475569", fontSize: "0.8rem", marginBottom: "2rem" }}>
            最終更新: {data.lastUpdated}
          </p>

          {/* Cross Sell */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
            <h3 style={{ textAlign: "center", color: "#94a3b8", marginBottom: "1rem" }}>他のAIツールも試してみる</h3>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="https://hojo-kin-ai.vercel.app" style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "0.9rem" }}>補助金AI</Link>
              <Link href="https://kakuteishinkoku-ai.vercel.app" style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "0.9rem" }}>確定申告AI</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
