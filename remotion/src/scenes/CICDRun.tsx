import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { C } from "../brand/colors";
import { FONTS } from "../brand/fonts";
import { GrainOverlay } from "../brand/GrainOverlay";
import { Timecode } from "../brand/Timecode";

// 4 - 9s | 120 - 270 frames
// GitHub Actions workflow view. Steps light up green one by one.
// Patchwork step is pending (amber).
export const CICDRun: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Steps turn green at staggered times
  const stepTimings = [16, 30, 44, 58, 76, 96, 116, 132];

  const steps = [
    { name: "Checkout repository", time: "00:02" },
    { name: "Setup Node.js 20", time: "00:08" },
    { name: "Install dependencies", time: "00:21" },
    { name: "Run ESLint", time: "00:34" },
    { name: "Run tests (47 suites · 312 tests)", time: "00:48" },
    { name: "Build production bundle", time: "01:12" },
    { name: "Patchwork · Generate release reel", time: "queued", highlight: true },
    { name: "Deploy to Vercel", time: "waiting" },
  ];

  // Animated log line that streams into the right panel
  const logLines = [
    "→ 312 tests collected",
    "✓ src/auth/  (12 tests)",
    "✓ src/api/  (43 tests)",
    "✓ src/ui/  (88 tests)",
    "✓ src/lib/  (51 tests)",
    "✓ src/utils/  (24 tests)",
    "✓ src/server/  (78 tests)",
    "✓ src/hooks/  (16 tests)",
    " 312 passed · 0 failed · 0 skipped",
  ];
  const visibleLogLines = Math.min(
    logLines.length,
    Math.max(0, Math.floor((frame - 56) / 5))
  );

  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        padding: "40px 56px",
        opacity: fadeOut,
        flexDirection: "column",
      }}
    >
      <GrainOverlay opacity={0.05} />

      {/* Top header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Timecode label="TC" fps={30} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              color: C.mute,
              letterSpacing: "0.18em",
            }}
          >
            · CI/CD · GITHUB ACTIONS
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: C.amber,
            letterSpacing: "0.18em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.amber,
              animation: "none",
            }}
          />
          WORKFLOW RUNNING
        </div>
      </div>

      {/* GitHub header */}
      <div
        style={{
          opacity: fadeIn,
          background: C.charcoal,
          border: `1px solid ${C.line}`,
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={C.paper}>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 015.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                color: C.paper,
                fontWeight: 600,
              }}
            >
              patchwork-web /{" "}
              <span style={{ color: C.amber }}>Build & Deploy</span>
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: C.mute,
                marginTop: 2,
                letterSpacing: "0.06em",
              }}
            >
              feat/dark-mode · a1b2c3d · run #1842
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: C.mute,
            letterSpacing: "0.18em",
          }}
        >
          TRIGGERED BY PUSH
        </div>
      </div>

      {/* Two-column: steps list + test log */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 18,
          marginTop: 18,
          minHeight: 0,
        }}
      >
        {/* LEFT: Steps */}
        <div
          style={{
            background: C.charcoal,
            border: `1px solid ${C.line}`,
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0 20px 12px 20px",
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.mute,
              letterSpacing: "0.22em",
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            · WORKFLOW STEPS
          </div>
          <div
            style={{
              flex: 1,
              padding: "8px 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {steps.map((s, i) => {
              const triggered = frame >= stepTimings[i];
              const inProgress = s.highlight && triggered && frame < 132;
              const isPending = !triggered;
              return (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "11px 20px",
                    gap: 14,
                    background: s.highlight && triggered ? `${C.amber}0d` : "transparent",
                    borderLeft: s.highlight
                      ? `2px solid ${triggered ? C.amber : C.line}`
                      : "2px solid transparent",
                  }}
                >
                  <StatusIcon
                    state={
                      inProgress
                        ? "running"
                        : s.highlight && triggered
                        ? "pending"
                        : isPending
                        ? "pending"
                        : "done"
                    }
                    highlight={s.highlight}
                  />
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      color:
                        s.highlight && triggered
                          ? C.amber
                          : isPending
                          ? C.mute
                          : C.paper,
                      fontWeight: s.highlight ? 600 : 400,
                      flex: 1,
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 11,
                      color: isPending ? C.mute : C.cream,
                      opacity: isPending ? 0.4 : 0.7,
                    }}
                  >
                    {s.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Test log */}
        <div
          style={{
            background: "#0E0C0A",
            border: `1px solid ${C.line}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 18px",
              borderBottom: `1px solid ${C.line}`,
              background: "#15110E",
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.mute,
              letterSpacing: "0.22em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>· npm test</span>
            <span style={{ color: C.amber }}>LIVE LOG</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              fontFamily: FONTS.mono,
              fontSize: 12,
              lineHeight: 1.65,
              color: C.cream,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {logLines.slice(0, visibleLogLines).map((line, i) => {
              const isLast = i === visibleLogLines - 1;
              const isPass = line.startsWith("✓");
              const isSummary = line.includes("passed");
              return (
                <div
                  key={i}
                  style={{
                    color: isSummary
                      ? C.amber
                      : isPass
                      ? "#6A9955"
                      : C.cream,
                    fontWeight: isSummary ? 700 : 400,
                  }}
                >
                  {line}
                  {isLast && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 7,
                        height: 13,
                        background: C.amber,
                        marginLeft: 2,
                        opacity: cursorBlink(frame),
                        transform: "translateY(1px)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom eyebrow */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONTS.mono,
          fontSize: 10,
          color: C.mute,
          letterSpacing: "0.18em",
          opacity: 0.7,
        }}
      >
        <span>· 02 / 07 · CI/CD</span>
        <span style={{ color: C.amber }}>6 OF 8 STEPS PASSED</span>
      </div>
    </AbsoluteFill>
  );
};

const cursorBlink = (frame: number) =>
  interpolate(frame % 12, [0, 6, 12], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const StatusIcon: React.FC<{
  state: "done" | "running" | "pending";
  highlight?: boolean;
}> = ({ state, highlight }) => {
  if (state === "done") {
    return (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#1F6F3A",
          border: "1px solid #2D9852",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6 L5 8.5 L9.5 3.5"
            stroke="#7FE39A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (state === "running") {
    return (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: `2px solid ${C.amber}`,
          borderTopColor: "transparent",
          animation: "spin 1s linear infinite",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `1.5px solid ${highlight ? C.amber : C.line}`,
        background: highlight ? `${C.amber}1a` : "transparent",
      }}
    />
  );
};
