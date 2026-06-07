import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Varcheck Studio — We build things embarrassingly good.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000000",
          fontFamily: "sans-serif",
          padding: "96px",
        }}
      >
        {/* Inset 1px white border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid #ffffff",
          }}
        />

        {/* Top-left label */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 64,
            display: "flex",
            fontSize: 12,
            letterSpacing: "0.2em",
            color: "#555555",
            textTransform: "uppercase",
          }}
        >
          VARCHECK STUDIO
        </div>

        {/* Center-left headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            We build things
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            <span style={{ color: "#ffffff", marginRight: 16 }}>embarrassingly</span>
            <span style={{ color: "#b8ff57" }}>good.</span>
          </div>
        </div>

        {/* Bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 64,
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.1em",
            color: "#555555",
          }}
        >
          varcheck.in
        </div>

        {/* Bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 64,
            display: "flex",
            fontSize: 12,
            color: "#333333",
          }}
        >
          Software. Design. Strategy.
        </div>
      </div>
    ),
    { ...size }
  );
}
