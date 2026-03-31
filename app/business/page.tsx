"use client";
import Link from "next/link";
import { useState } from "react";

const PROBLEMS = [
  { icon: "書類", text: "顧問先の経営計画書作成に毎回10時間以上かかる" },
  { icon: "業務", text: "創業融資・補助金申請の計画書を量産できない" },
  { icon: "分析", text: "SWOT・収支計画・ピッチ資料の品質が担当者次第" },
  { icon: "融資", text: "金融機関提出用の書式に整えるのが手間" },
  { icon: "更新", text: "複数クライアントを抱え、作業が並行処理できない" },
  { icon: "収益", text: "計画書作成を外注すると1件30〜50万円かかる" },
];

const FEATURES = [
  {
    icon: "∞",
    title: "経営計画書 生成無制限",
    desc: "顧問先・支援先の件数に関わらず、月額定額で何件でも生成可能。1件あたりのコストを圧倒的に削減します。",
  },
  {
    icon: "書類",
    title: "6種類の出力形式",
    desc: "事業概要・3年収支・SWOT・アクションプラン・投資家ピッチ・競合分析を一括生成。用途別に使い分けられます。",
  },
  {
    icon: "融資",
    title: "日本政策金融公庫・補助金対応",
    desc: "創業計画書・ものづくり補助金・事業再構築補助金の提出様式に合わせた出力形式を選択可能。",
  },
  {
    icon: "人員",
    title: "複数担当者共有",
    desc: "事務所・チームのメンバー全員が同じアカウントで利用可能。品質が担当者に依存しない仕組みを実現。",
  },
  {
    icon: "優先",
    title: "優先サポート（24h以内）",
    desc: "個別の業種・用途に合わせた使い方の相談に対応。顧問先への提案資料作成もサポートします。",
  },
  {
    icon: "業種",
    title: "業種別プリセット20種",
    desc: "飲食・IT・製造・小売・建設・医療など主要業種のプリセットを搭載。最短3分で計画書ドラフトが完成。",
  },
];

const CASES = [
  {
    role: "税理士事務所・所長",
    text: "創業計画書の作成が月に20件を超え、スタッフの残業が常態化していました。導入後は1件あたり2時間→20分に短縮。顧問料に含めて提供できるようになりました。",
  },
  {
    role: "中小企業診断士・独立3年目",
    text: "補助金申請の支援案件が増える中、計画書品質のバラつきが悩みでした。AIのドラフトを元に仕上げる形にしたら、品質が安定して顧客満足度が上がりました。",
  },
  {
    role: "創業支援NPO・支援員",
    text: "支援対象の創業者が多く、一人ひとりの計画書作成に時間が割けませんでした。これで支援キャパが3倍になり、断らなくて済む件数が増えました。",
  },
];

const FAQS = [
  {
    q: "何名まで使えますか？",
    a: "事務所・チームでの共有利用が可能です。人数制限は設けていません（1アカウント共有形式）。",
  },
  {
    q: "請求書払い・銀行振込は対応していますか？",
    a: "法人のお客様には個別対応しています。X（@levona_design）またはsupport@pokkorilab.comにてご相談ください。",
  },
  {
    q: "顧問先に提供するビジネスモデルで使えますか？",
    a: "顧問先向けの計画書作成支援ツールとしてのご利用は歓迎しています。サービス転売（利用権の再販）は禁止しています。",
  },
  {
    q: "生成した計画書の著作権はどうなりますか？",
    a: "生成した計画書の利用権はお客様に帰属します。金融機関・補助金窓口への提出、顧問先への提供にお使いいただけます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "翌月更新前にご連絡いただければいつでも解約できます。違約金は一切ありません。",
  },
];

export default function BusinessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 text-xl">
              ✕
            </button>
            <div className="text-base font-bold mb-3 text-center text-emerald-700">法人プラン</div>
            <h2 className="text-lg font-bold mb-1 text-center">ビジネスプランに申し込む</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">経営計画書 生成無制限 + 優先サポート</p>
            <a
              href="mailto:support@pokkorilab.com?subject=AI経営計画書%20ビジネスプラン申込み&body=会社名%3A%0A担当者名%3A%0Aメールアドレス%3A%0Aご利用人数%3A%0Aご質問があればこちらに%3A"
              className="block w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors text-center mb-3"
            >
              メールで申し込む（¥19,800/月）
            </a>
            <a
              href="https://twitter.com/messages/compose?recipient_id=levona_design"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-emerald-600 text-emerald-700 font-medium py-3 rounded-xl hover:bg-emerald-50 transition-colors text-center text-sm"
            >
              X（@levona_design）でDM相談
            </a>
            <p className="text-xs text-gray-400 text-center mt-4">請求書払い・銀行振込も対応</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">AI経営計画書 — 法人・士業向け</span>
          <Link
            href="/tool"
            className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            無料で試す
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-900 px-6 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 mb-6">
            税理士・中小企業診断士・コンサル・創業支援機関向け
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            経営計画書の作成を、<br />
            <span className="text-emerald-400">月額定額で無制限に。</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            創業融資・補助金申請・経営改善計画——<br className="hidden md:block" />
            1件あたり2時間かかっていた計画書を、AIが20分でドラフト生成。
          </p>
          <p className="text-gray-400 text-sm mb-10">
            事業概要・3年収支・SWOT・アクションプラン・投資家ピッチを一括出力。<br className="hidden md:block" />
            日本政策金融公庫・ものづくり補助金・事業再構築補助金の形式に対応。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-emerald-900/40 transition-colors"
            >
              ビジネスプランに申し込む ¥19,800/月
            </button>
            <Link
              href="/tool"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl text-base border border-white/20 transition-colors"
            >
              まず無料で試す →
            </Link>
          </div>
          <p className="text-gray-500 text-xs mt-4">月額¥19,800（税込）。いつでも解約可能。請求書払い対応。</p>
        </div>
      </section>

      {/* ROI計算 */}
      <section className="bg-emerald-50 border-y border-emerald-200 px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-emerald-300">
            ROI試算
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            月3件の計画書作成で<span className="text-emerald-700">元が取れる</span>
          </h2>
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm max-w-lg mx-auto text-left">
            <table className="text-sm w-full">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-600 font-medium">外注した場合（1件30万円×月3件）</td>
                  <td className="py-3 text-red-600 font-bold text-right">¥900,000/月</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600 font-medium">人件費（2h × @3,000円 × 月3件）</td>
                  <td className="py-3 text-red-500 font-bold text-right">¥18,000/月</td>
                </tr>
                <tr className="border-t-2 border-emerald-400">
                  <td className="pt-4 pr-4 text-gray-900 font-bold">ビジネスプラン（無制限）</td>
                  <td className="pt-4 text-emerald-600 font-bold text-xl text-right">¥19,800/月</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">※ 外注費・人件費は試算です。実際のコスト削減額はご利用状況により異なります。</p>
        </div>
      </section>

      {/* 課題 */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              士業・コンサルの現場リアル
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              こんな課題、ありませんか？
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-3 shadow-sm">
                <span className="text-2xl leading-none mt-0.5">{p.icon}</span>
                <p className="text-sm text-gray-700 font-medium leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能 */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              ビジネスプラン 機能一覧
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              計画書作成の全工程をAIがサポート
            </h2>
            <p className="text-sm text-gray-500">¥19,800/月で、チーム全員が無制限に利用可能</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-3">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{f.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* プラン比較 */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              プラン比較
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">個人プランとビジネスプランの違い</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-5 py-4 font-semibold text-gray-700">項目</th>
                  <th className="text-center px-5 py-4 font-semibold text-gray-500">
                    個人プラン<br />
                    <span className="text-xs font-normal">¥2,980/回〜</span>
                  </th>
                  <th className="text-center px-5 py-4 font-bold text-emerald-700 bg-emerald-50">
                    ビジネスプラン<br />
                    <span className="text-xs font-normal">¥19,800/月</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["月間生成件数", "従量制", "無制限"],
                  ["担当者共有", "1名", "チーム全員"],
                  ["業種別プリセット", "5種", "20種"],
                  ["請求書払い", "—", "✓"],
                  ["優先サポート", "—", "✓（24h以内）"],
                  ["補助金様式対応", "—", "✓"],
                ].map(([label, ind, biz], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-700">{label}</td>
                    <td className="px-5 py-4 text-center text-gray-400">{ind}</td>
                    <td className="px-5 py-4 text-center font-semibold text-emerald-700 bg-emerald-50/30">{biz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-emerald-100 transition-colors"
            >
              ビジネスプランに申し込む ¥19,800/月
            </button>
          </div>
        </div>
      </section>

      {/* 導入事例 */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              導入事例
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">士業・コンサルからの声</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">&ldquo;{c.text}&rdquo;</p>
                <p className="text-xs font-semibold text-gray-500">{c.role}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">※ 掲載内容はお客様の許可を得た体験談です（一部表現を編集しています）。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              よくある質問
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <span className="text-gray-400 text-lg flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 py-20 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            経営計画書の作成コストを<br />
            <span className="text-emerald-400">今月から削減する</span>
          </h2>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            月3件の計画書でコスト回収。無制限利用で件数が増えるほど効果が大きくなります。
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-emerald-900/40 transition-colors"
          >
            ビジネスプランに申し込む ¥19,800/月
          </button>
          <p className="text-gray-500 text-xs mt-4">いつでも解約可能 / 違約金なし / 請求書払い対応</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 ポッコリラボ</span>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-gray-700 transition-colors">特商法</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">プライバシーポリシー</Link>
            <Link href="/tool" className="hover:text-gray-700 transition-colors">無料ツール</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
