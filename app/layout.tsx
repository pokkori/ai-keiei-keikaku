import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITE_URL = "https://ai-keiei-keikaku.vercel.app";
const TITLE = "AI経営計画書作成｜経営計画書を無料でAI自動生成・融資・補助金申請・創業計画に対応";
const DESC = "経営計画書をAIが無料で自動生成。事業概要・強み・課題を入力するだけでAIが収支計画・SWOT分析・アクションプラン・投資家向けピッチまで自動生成。日本政策金融公庫の融資申請・補助金申請・創業計画書に活用。登録不要で無料お試し。¥2,980/回〜。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI経営計画書作成",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geist.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
