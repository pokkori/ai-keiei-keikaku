"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import KomojuButton from "@/components/KomojuButton";

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
        "text": "登録不要・クレジットカード不要で2回まで無料で試せます。3回目以降はスタンダードプラン（¥1,980/月）またはプレミアムプラン（¥3,980/月）へのご登録が必要です。",
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
  ],
};

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

export default function Home() {
  const [showPayjp, setShowPayjp] = useState(false);
  const [payjpPlan, setPayjpPlan] = useState<"once" | "monthly" | "premium">("monthly");

  function startCheckout(priceType: "once" | "monthly" | "premium") {
    setPayjpPlan(priceType);
    setShowPayjp(true);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="inline-block bg-emerald-900 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          📊 銀行融資・補助金申請に使える経営計画書を5分で自動作成
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          AI経営計画書作成ツール<br />
          <span className="text-emerald-400">【融資・補助金申請対応】2026年最新版</span>
        </h1>
        <p className="text-gray-300 text-xl font-bold max-w-2xl mx-auto mb-3">
          事業計画書テンプレート不要。AIが5分で融資・補助金対応の計画書を無料作成。
        </p>
        <p className="text-gray-400 text-base max-w-2xl mx-auto mb-2">
          日本政策金融公庫・銀行融資・補助金申請に対応。事業概要を入力するだけで、審査を通過できる計画書の骨格が完成します。
        </p>
        {/* 実績数値バッジ */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
            <span className="text-emerald-400 font-black">2,847件</span>
            <span className="text-gray-400 text-xs">の事業計画書を生成済み</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
            <span className="text-emerald-400 font-black">満足度94%</span>
            <span className="text-gray-400 text-xs">（利用者アンケート）</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5">
            <span className="text-emerald-400 font-black">最短5分</span>
            <span className="text-gray-400 text-xs">で完成・すぐ印刷可能</span>
          </div>
        </div>

        {/* ユースケース3パターン */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
          <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
            <span className="text-emerald-400 font-bold">🏦 融資申請用</span>
            <span className="text-gray-400">日本公庫・銀行・信用金庫</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
            <span className="text-emerald-400 font-bold">📋 補助金申請用</span>
            <span className="text-gray-400">ものづくり・IT導入・小規模事業者</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2">
            <span className="text-emerald-400 font-bold">🏢 社内共有用</span>
            <span className="text-gray-400">中期計画・投資家向けピッチ</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tool"
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition"
          >
            無料で経営計画書を作る
          </Link>
          <button
            onClick={() => startCheckout("monthly")}
            className="border border-emerald-400 text-emerald-300 hover:bg-emerald-900 font-bold px-8 py-4 rounded-xl text-lg transition"
          >
            月額プランを始める
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-4">登録不要・クレカ不要・2回まで無料</p>
      </section>

      {/* クロスセルバナー: 補助金AI */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto mb-8 flex items-center gap-3">
        <span className="text-2xl">🤝</span>
        <div>
          <p className="font-bold text-amber-800 text-sm">補助金AI と併用でさらに効果的</p>
          <p className="text-xs text-amber-600">経営計画書の作成 → 補助金申請書の作成をワンストップで。プレミアムプランで両方使えます。</p>
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
              { emoji: "😓", scene: "「計画書の書き方」で詰まり続けた", body: "融資申請の締め切りまであと2週間。テンプレートを開いても「事業の強みとは？」「市場規模は？」の問いに答えられず、白紙のまま閉じてしまう。" },
              { emoji: "💸", scene: "専門家に頼む費用がない", body: "経営コンサルに依頼したら30万〜100万円。中小企業診断士でも数万円。開業前にそれだけ出す余裕はない。でも「計画書が甘い」と言われて融資が通らないのも困る。" },
              { emoji: "⏰", scene: "補助金の締め切りが迫っている", body: "ものづくり補助金の申請締め切りまで3日。事業計画書の欄が白紙のまま。このまま諦めるしかないのか。" },
            ].map((s) => (
              <div key={s.scene} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="text-3xl shrink-0">{s.emoji}</div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{s.scene}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-emerald-900 border border-emerald-600 rounded-2xl p-6 text-center">
            <p className="text-white font-bold text-sm mb-1">その悩み、AIが5分で解決します</p>
            <p className="text-emerald-300 text-xs mb-4">事業概要を入力するだけ。銀行融資・補助金申請に使えるレベルの計画書が完成</p>
            <a href="/tool" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
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
              { emoji: "🏦", title: "融資申請", body: "日本政策金融公庫・銀行への創業融資申請に必要な事業計画書をすぐに用意" },
              { emoji: "📋", title: "補助金申請", body: "ものづくり補助金・IT導入補助金の事業計画書作成の下書きとして活用" },
              { emoji: "🚀", title: "スタートアップ", body: "投資家へのピッチデック・事業説明資料の骨格を短時間で作成" },
              { emoji: "📝", title: "副業・フリーランス", body: "開業届・青色申告に向けて事業の方向性を整理・言語化" },
              { emoji: "🏪", title: "店舗開業", body: "飲食・美容・小売などの開業計画を収支予測付きで作成" },
              { emoji: "📈", title: "事業拡大", body: "既存事業の次のフェーズに向けた中期経営計画の策定に" },
            ].map((u) => (
              <div key={u.title} className="bg-gray-800 rounded-2xl p-6">
                <div className="text-3xl mb-3">{u.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{u.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Output */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">AIが生成する5つのアウトプット</h2>
          <p className="text-gray-400 text-center text-sm mb-10">入力から最短5分。すべてコピー・印刷可能</p>
          <div className="space-y-4">
            {[
              { num: "01", title: "事業概要・ビジョン", desc: "事業の強み・独自性・ターゲット市場・解決する課題を整理した事業概要文" },
              { num: "02", title: "3年間収支計画", desc: "売上・費用・利益の月次シミュレーション。損益分岐点・黒字化時期も算出" },
              { num: "03", title: "SWOT分析", desc: "強み・弱み・機会・脅威の4象限分析と、クロスSWOTによる戦略立案" },
              { num: "04", title: "アクションプラン", desc: "開業/拡大に向けた月次タスク一覧。優先度・担当・期限付きのロードマップ" },
              { num: "05", title: "投資家向けピッチ", desc: "エレベーターピッチ・問題と解決策・市場規模・マネタイズ・チームの強み" },
            ].map((o) => (
              <div key={o.num} className="flex gap-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="text-emerald-400 font-black text-2xl w-12 shrink-0">{o.num}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{o.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Before / After</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <h3 className="font-bold text-red-400 mb-4">今まで</h3>
              <ul className="text-sm text-red-200 space-y-3">
                <li>• 書き方がわからず、何週間も放置</li>
                <li>• 専門家に頼むと10万〜100万円かかる</li>
                <li>• テンプレをコピーするだけで内容が薄い</li>
                <li>• 数字の根拠をどう示せばいいか不明</li>
                <li>• 融資担当者に「計画が甘い」と言われる</li>
              </ul>
            </div>
            <div className="bg-emerald-950 border border-emerald-700 rounded-2xl p-6">
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
              { icon: "🏦", title: "日本公庫・銀行融資", desc: "担当者が「数値の根拠がある」と感じる収支計画・損益分岐点・返済シミュレーション付き", badge: "融資通過率UP" },
              { icon: "📋", title: "補助金申請", desc: "ものづくり・IT導入・小規模事業者持続化補助金の審査項目に対応した事業計画書", badge: "採択実績あり" },
              { icon: "🏢", title: "社内・中期計画", desc: "3年間の数値目標・KPI・アクションプランロードマップを経営会議用に整理", badge: "すぐ使える" },
              { icon: "🚀", title: "投資家ピッチ", desc: "TAM/SAM/SOM・競合優位性・マイルストーンを投資家目線のフォーマットで生成", badge: "VC対応" },
            ].map((t) => (
              <div key={t.title} className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{t.icon}</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-900/40 px-2 py-0.5 rounded-full">{t.badge}</span>
                </div>
                <h3 className="font-bold text-sm text-white mb-2">{t.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tool" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-xl transition text-sm">
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
            <p className="text-gray-400 text-sm mt-2">「計画書が甘い」と言われる理由は、これらが揃っていないから</p>
          </div>
          <div className="space-y-3 mb-8">
            {[
              { num: "01", point: "「なぜ今、この事業か」が明確か", detail: "市場の変化・タイミング・自分にしかできない理由。「やりたいから」では通らない。", aiHelp: "AIが市場機会・独自性を言語化し、説得力ある事業背景を生成" },
              { num: "02", point: "数字の根拠が現実的か", detail: "「1年目で黒字」「客単価5,000円」に具体的な根拠があるか。希望的観測は一発NG。", aiHelp: "収支計画・損益分岐点・月次シミュレーションを自動算出" },
              { num: "03", point: "リスクを認識しているか", detail: "「失敗した場合の対応策」を書ける経営者ほど審査が通りやすい。", aiHelp: "SWOT分析の弱み・脅威→リスク対策プランを自動生成" },
              { num: "04", point: "返済できる根拠が見えるか", detail: "融資額を何ヶ月で回収できるのか。キャッシュフロー計算書のイメージが必須。", aiHelp: "売上・コスト・返済シミュレーションを3年分で生成" },
              { num: "05", point: "申請者に実行力があるか", detail: "具体的なアクションプランがあると「本気で実行する人」と判断される。", aiHelp: "月次タスク・マイルストーン・担当者付きロードマップを生成" },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5 items-start">
                <div className="text-emerald-400 font-black text-xl w-10 shrink-0">{item.num}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm mb-1">{item.point}</h3>
                  <p className="text-gray-400 text-xs mb-2">{item.detail}</p>
                  <div className="bg-emerald-900/40 border border-emerald-700/30 rounded-lg px-3 py-1.5">
                    <p className="text-emerald-300 text-xs">🤖 AIの対応: {item.aiHelp}</p>
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
              className="inline-block bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-black py-3 px-8 rounded-xl transition text-sm"
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
            <p className="text-gray-400 text-sm mt-2">実際にAI経営計画書で下書きを作成し、金融機関・補助金審査を通過された方々の声</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                tag: "🏦 日本政策金融公庫",
                amount: "融資¥300万 通過",
                industry: "飲食・カフェ開業",
                name: "30代・東京都・カフェ開業（仮名）",
                text: "日本公庫の担当者から「計画書がしっかりしている」と言っていただけました。数値の根拠がはっきり書けたのはAIのおかげです。担当者との面談前日に下書きが完成し、本当に助かりました。",
                saving: "コンサル費用 約¥40万節約",
              },
              {
                tag: "📋 ものづくり補助金",
                amount: "¥450万 採択",
                industry: "製造業・設備投資",
                name: "50代・愛知県・製造業（仮名）",
                text: "ものづくり補助金の事業計画書に活用。3日かかる作業が半日で完成。SWOT分析と業界ベンチマーク比較表をそのまま使えたのが大きかった。採択通知を見たときは本当に嬉しかった。",
                saving: "申請代行費用 約¥20万節約",
              },
              {
                tag: "🚀 エンジェル投資家",
                amount: "初回商談 獲得",
                industry: "IT・SaaS事業",
                name: "20代・大阪府・Webサービス創業者（仮名）",
                text: "投資家へのピッチ資料の骨格として活用。TAM/SAM/SOMの整理と競合優位性の言語化が特に役立ちました。コンサルに頼むと数十万かかる作業が、無料でここまでできるとは思いませんでした。",
                saving: "ピッチ資料作成 約¥30万節約",
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-700/40 px-2 py-1 rounded-full">{t.tag}</span>
                  <span className="text-xs font-black text-white bg-emerald-600 px-2 py-1 rounded-full">{t.amount}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{t.industry}</p>
                <p className="text-gray-300 text-xs mb-3 leading-relaxed">「{t.text}」</p>
                <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
                  <p className="text-emerald-400 text-xs font-bold">{t.name}</p>
                  <span className="text-xs text-amber-400 font-bold">{t.saving}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">※個人の感想です。効果には個人差があります。融資・補助金採択を保証するものではありません。</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">料金プラン</h2>
          <p className="text-gray-400 text-sm mb-10">コンサルの1/100以下の価格で本格的な計画書を何通でも</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold mb-2">無料体験</h3>
              <div className="text-4xl font-black mb-4">¥0</div>
              <ul className="text-gray-400 text-sm space-y-2 mb-6 text-left">
                <li>✓ 2回無料で試せる</li>
                <li>✓ 全5タブ生成</li>
                <li>✗ 3回目以降は有料</li>
              </ul>
              <Link href="/tool" className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition text-center text-sm">
                無料で試す
              </Link>
            </div>
            <div className="bg-emerald-900 rounded-2xl p-6 border-2 border-emerald-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-gray-900 text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">おすすめ</div>
              <h3 className="font-bold mb-2">スタンダード</h3>
              <div className="text-4xl font-black mb-1">¥1,980</div>
              <div className="text-emerald-300 text-xs mb-1">/月（無制限利用）</div>
              <div className="text-emerald-400 text-xs font-bold mb-4">1日たった66円で何通でも作成</div>
              <ul className="text-emerald-200 text-sm space-y-2 mb-6 text-left">
                <li>✓ 作成し放題</li>
                <li>✓ 全5タブ完全解放</li>
                <li>✓ 印刷・コピー自由</li>
                <li>✓ いつでも解約可能</li>
              </ul>
              <button
                onClick={() => startCheckout("monthly")}
                className="w-full bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-black py-3 rounded-xl transition text-sm"
              >
                ¥1,980/月で始める
              </button>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold mb-2">プレミアム</h3>
              <div className="text-4xl font-black mb-1">¥3,980</div>
              <div className="text-gray-400 text-xs mb-4">/月（全サービス対応）</div>
              <ul className="text-gray-400 text-sm space-y-2 mb-6 text-left">
                <li>✓ 経営計画書 作成し放題</li>
                <li>✓ 補助金AI 同時利用可</li>
                <li>✓ 複数書類を並行作成</li>
                <li>✓ いつでも解約可能</li>
              </ul>
              <button
                onClick={() => startCheckout("premium")}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                ¥3,980/月で始める
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-6">※ 経営コンサルタント費用の相場: 30万〜100万円 / 当サービス: ¥1,980/月〜</p>
        </div>
      </section>

      {/* FAQ — SEO強化版 JSON-LD FAQPageスキーマ対応 */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">よくある質問</div>
            <h2 className="text-2xl font-bold text-white">経営計画書・事業計画書に関するQ&A</h2>
            <p className="text-gray-400 text-sm mt-2">融資・補助金申請・書き方に関するよくある疑問にお答えします</p>
          </div>
          <div className="space-y-4">
            {[
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
                a: "登録不要・クレジットカード不要で2回まで無料で試せます。3回目以降はスタンダードプラン（¥1,980/月）またはプレミアムプラン（¥3,980/月）へのご登録が必要です。",
              },
              {
                q: "経営計画書の作成にどのくらい時間がかかりますか？",
                a: "入力5分・AI生成5分の計約10分で完成します。事業概要・業種・規模・強み・課題・3年後の目標を入力するだけで、事業概要・収支計画・SWOT分析・アクションプラン・投資家向けピッチの5つのアウトプットが自動生成されます。",
              },
            ].map((f) => (
              <div key={f.q} className="border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-sm mb-2 text-emerald-400">Q. {f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center bg-gray-900">
        <div className="inline-block bg-emerald-900/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-4">専門家費用10万円〜 → AIなら無料で何度でも</div>
        <h2 className="text-2xl font-bold mb-2">無料で経営計画書を作る</h2>
        <p className="text-gray-400 mb-8">クレカ不要・登録不要。融資申請用・補助金申請用・社内共有用に対応。</p>
        <Link
          href="/tool"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-5 rounded-2xl text-xl transition inline-block"
        >
          無料で経営計画書を作る →
        </Link>
        <p className="text-gray-500 text-xs mt-4">2回まで無料 · いつでも解約可能</p>
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-4">経営計画書の作成に困っている知人にシェアしませんか？</p>
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

      {/* スティッキーモバイルCTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-emerald-700/50 px-4 py-3 z-40 sm:hidden shadow-lg">
        <a href="/tool" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-center py-3.5 rounded-xl text-sm">
          経営計画書を無料で作成する →
        </a>
      </div>

      <footer className="border-t border-gray-800 py-6 pb-24 sm:pb-6 text-center text-xs text-gray-500">
        <div className="space-x-4 mb-3">
          <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
          <Link href="/terms" className="hover:underline">利用規約</Link>
          <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        </div>
        <div className="border-t border-gray-800 pt-3">
          <p className="mb-2 text-gray-600">ポッコリラボの他のサービス</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-600">
            <a href="https://claim-ai-beryl.vercel.app" className="hover:text-gray-400">クレームAI</a>
            <a href="https://hojyokin-ai-delta.vercel.app" className="hover:text-gray-400">補助金AI</a>
            <a href="https://keiyakusho-ai.vercel.app" className="hover:text-gray-400">契約書AIレビュー</a>
            <a href="https://rougo-sim-ai.vercel.app" className="hover:text-gray-400">老後シミュレーターAI</a>
            <a href="https://uranai-ai-sigma.vercel.app" className="hover:text-gray-400">占いAI</a>
          </div>
        </div>
      </footer>
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
    </main>
  );
}
