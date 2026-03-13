import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI経営計画書作成 | 事業概要を入力するだけ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f1923 0%, #1a3a2a 50%, #0f1923 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>📊</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#86efac", marginBottom: 16, textAlign: "center" }}>
          AI経営計画書作成
        </div>
        <div style={{ fontSize: 24, color: "#bbf7d0", textAlign: "center", maxWidth: 900, marginBottom: 4, display: "flex" }}>
          日本公庫融資・補助金申請用の事業計画書をAIが3分で自動生成
        </div>
        <div style={{ fontSize: 22, color: "#4ade80", textAlign: "center", maxWidth: 900, display: "flex" }}>
          コンサル費¥10万以上を節約。登録不要で今すぐ使える。
        </div>
        <div
          style={{
            marginTop: 28,
            padding: "12px 36px",
            background: "#16a34a",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 700,
            display: "flex",
          }}
        >
          無料1回 → プレミアム¥980/月〜
        </div>
      </div>
    ),
    { ...size }
  );
}
