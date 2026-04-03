import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#1A1A2E",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FFD700" strokeWidth="2" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="#FFD700" strokeWidth="1.5" />
        <line x1="7" y1="12" x2="17" y2="12" stroke="#FFD700" strokeWidth="1.5" />
        <line x1="7" y1="16" x2="13" y2="16" stroke="#FFD700" strokeWidth="1.5" />
      </svg>
    </div>,
    { ...size }
  );
}
