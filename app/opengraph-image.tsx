import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Raj Aryan — Software Developer & Engineering Student @ SLIET";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#161615",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#f5f5f4",
          backgroundImage: "radial-gradient(circle at 25px 25px, #262624 2%, transparent 0%), radial-gradient(circle at 75px 75px, #262624 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Top Bar: Brand & College */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 20,
              fontFamily: "monospace",
              color: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span>rajaryan2204.vercel.app</span>
          </div>

          <div
            style={{
              fontSize: 18,
              fontFamily: "monospace",
              color: "#a8a29e",
            }}
          >
            SLIET Longowal &apos;26
          </div>
        </div>

        {/* Center Main Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Raj Aryan
          </div>

          <div
            style={{
              fontSize: 28,
              color: "#d6d3d1",
              maxWidth: "850px",
              lineHeight: 1.35,
            }}
          >
            Engineering Student at SLIET & Software Developer building AI tools, computer vision systems, and modern web platforms.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #292524",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js", "Python", "OpenCV", "YOLOv8", "TypeScript", "PostgreSQL"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "#e7e5e4",
                  backgroundColor: "#262624",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #3f3f3c",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 16,
              fontFamily: "monospace",
              color: "#10b981",
              fontWeight: 600,
            }}
          >
            Google Certified · Active Builder ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
