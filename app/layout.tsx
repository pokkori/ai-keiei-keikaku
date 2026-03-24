import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import FeedbackButton from "@/components/FeedbackButton";
import "./globals.css";


const SITE_URL = "https://ai-keiei-keikaku.vercel.app";
const TITLE = "AI経営計画書作成｜経営計画書を無料でAI自動生成・融資・補助金申請・創業計画に対応";
const DESC = "経営計画書をAIが無料で自動生成。事業概要・強み・課題を入力するだけでAIが収支計画・SWOT分析・アクションプラン・投資家向けピッチまで自動生成。日本政策金融公庫の融資申請・補助金申請・創業計画書に活用。登録不要で無料お試し。¥2,980/回〜。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%2310b981'><rect x='10' y='50' width='18' height='40'/><rect x='35' y='30' width='18' height='60'/><rect x='60' y='15' width='18' height='75'/></svg>" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI経営計画書作成",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI経営計画書作成" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "経営計画書作成ツール", "item": `${SITE_URL}/tool` },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "AI経営計画書作成",
      "url": SITE_URL,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "keywords": "経営計画書,AI自動生成,無料,融資,補助金申請,創業計画,SWOT分析,日本政策金融公庫",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "無料お試し1回・プレミアム ¥2,980/回〜" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "どんな経営計画書が作れますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "日本公庫融資申請・補助金申請（ものづくり補助金・IT導入補助金等）・創業計画書・投資家向けピッチ資料など、幅広いビジネス文書に対応しています。SWOT分析・収支計画・アクションプランも自動生成します。"
          }
        },
        {
          "@type": "Question",
          "name": "融資・補助金申請に実際に使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "日本政策金融公庫の創業計画書フォーマットや各種補助金の事業計画書として活用できます。ただし、AIが生成した内容を必ずご自身で確認・修正してからご提出ください。実際にご利用された方が融資通過・補助金採択されたケースがあります。"
          }
        },
        {
          "@type": "Question",
          "name": "無料で使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "登録不要で1回分の経営計画書生成を無料でお試しいただけます。プレミアムプラン（¥980/月）で無制限生成・PDF出力・複数バージョン保存が可能になります。"
          }
        },
        {
          "@type": "Question",
          "name": "日本政策金融公庫の融資申請に使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "日本政策金融公庫の「創業計画書」「企業概要書」のフォーマットに合わせた経営計画書を生成できます。ただし、AIが生成した内容はあくまで下書きです。融資審査に提出する前に、必ず内容を確認・修正し、担当者と相談の上で最終化してください。専門家（中小企業診断士・税理士）への確認も推奨します。"
          }
        },
        {
          "@type": "Question",
          "name": "SWOT分析はどのように生成されますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "業種・事業内容・強み・課題を入力すると、AIが強み（Strength）・弱み（Weakness）・機会（Opportunity）・脅威（Threat）の4象限を自動分析します。業界トレンドや競合環境も考慮した内容が生成されるため、コンサルタントに依頼した場合と同等の分析が数分で完成します。"
          }
        },
        {
          "@type": "Question",
          "name": "税理士・コンサルタントが顧客サポートに使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "税理士・中小企業診断士・経営コンサルタントが顧客向けの経営計画書作成支援として活用いただけます。法人プランでは複数クライアント分を一括生成・管理することができ、初回面談の準備時間を大幅に短縮できます。詳細は「士業・法人向けプラン」ページをご覧ください。"
          }
        },
        {
          "@type": "Question",
          "name": "生成された経営計画書の著作権は誰にありますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "本サービスで生成された経営計画書のコンテンツはご利用者様にご利用いただけます。ただし、AIが生成したコンテンツの著作権については現在法的解釈が定まっていない部分もあるため、重要な提出書類として使用する場合は専門家にご確認ください。事業計画の内容はご自身の責任でご確認・修正の上ご利用ください。"
          }
        },
        {
          "@type": "Question",
          "name": "収支計画・財務シミュレーションも作れますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "売上予測・費用構造・損益分岐点・キャッシュフローを含む収支計画をAIが自動生成します。初年度・3年・5年の財務シミュレーションも出力可能で、銀行融資や投資家向けのピッチ資料として活用できます。数値は実際のビジネス状況に合わせてご修正ください。"
          }
        },
        {
          "@type": "Question",
          "name": "スタートアップの投資家向けピッチ資料にも使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "投資家向けのエグゼクティブサマリー・市場規模（TAM/SAM/SOM）・競合分析・マイルストーン・財務プロジェクションを含むピッチ資料の骨格をAIが生成します。シード〜シリーズA段階のスタートアップが投資家に初回説明する際の下書き作成として最適です。"
          }
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <footer className="flex justify-center py-2">
          <FeedbackButton serviceName="AI経営計画書" />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
