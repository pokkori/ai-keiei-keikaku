"use client";
import { useState } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

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
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="inline-block bg-emerald-900 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          📊 銀行融資・補助金申請に使える経営計画書を5分で自動作成
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          5分で経営計画書を自動作成。<br />
          <span className="text-emerald-400">銀行融資・補助金申請に使える。</span>
        </h1>
        <p className="text-gray-300 text-xl font-bold max-w-2xl mx-auto mb-3">
          専門家に頼むと10万円〜。AIなら無料で何度でも。
        </p>
        <p className="text-gray-400 text-base max-w-2xl mx-auto mb-8">
          日本政策金融公庫・銀行融資・補助金申請に対応。事業概要を入力するだけで、審査を通過できる計画書の骨格が完成します。
        </p>

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

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "30代・飲食店開業準備中", text: "日本公庫の融資申請に使いました。担当者に「計画書がしっかりしている」と言われ、500万円の融資が通りました" },
              { name: "40代・製造業・個人事業主", text: "ものづくり補助金の申請書作成で使用。3日かかると思っていた事業計画部分が2時間で仕上がりました" },
              { name: "20代・Webサービス創業者", text: "投資家へのピッチ資料の骨格として活用。エンジェル投資家から300万円の出資が決まりました" },
            ].map((t) => (
              <div key={t.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">「{t.text}」</p>
                <p className="text-emerald-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">※個人の感想です。効果には個人差があります。</p>
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

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">よくある質問</h2>
          <div className="space-y-4">
            {[
              { q: "どんな業種に対応していますか？", a: "飲食・小売・IT・製造・建設・医療・美容・教育・不動産など全業種対応しています。AIが業種に合わせた内容を生成します。" },
              { q: "生成された計画書をそのまま金融機関に提出できますか？", a: "骨格・骨子として活用いただけます。数値や固有の情報はご自身で確認・修正の上ご利用ください。多くの方が下書きとして活用し、仕上げに1〜2時間で完成されています。" },
              { q: "スタンダードとプレミアムの違いは？", a: "スタンダード（¥1,980/月）はAI経営計画書の無制限利用。プレミアム（¥3,980/月）は補助金AIとの同時利用や複数書類の並行作成が可能です。経営計画書と補助金申請書をワンストップで作成したい方はプレミアムがおすすめです。" },
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
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
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
        <PayjpModal
          publicKey={PAYJP_PUBLIC_KEY}
          planLabel={payjpPlan === "once" ? "スタンダード ¥1,980/月" : payjpPlan === "premium" ? "プレミアム ¥3,980/月" : "スタンダード ¥1,980/月"}
          plan={payjpPlan}
          onSuccess={() => setShowPayjp(false)}
          onClose={() => setShowPayjp(false)}
        />
      )}
    </main>
  );
}
