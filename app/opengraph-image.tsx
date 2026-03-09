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
        <div style={{ fontSize: 28, color: "#bbf7d0", textAlign: "center", maxWidth: 900 }}>
          事業概要を入力するだけ
        </div>
        <div style={{ fontSize: 24, color: "#4ade80", marginTop: 12, textAlign: "center" }}>
          本格的な経営計画書をAIが5分で生成 ⚡
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "12px 32px",
            background: "#16a34a",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 600,
          }}
        >
          ¥2,980 / 回〜
        </div>
      </div>
    ),
    { ...size }
  );
}
