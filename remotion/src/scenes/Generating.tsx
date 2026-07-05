import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { C } from "../brand/colors";
import { FONTS } from "../brand/fonts";
import { GrainOverlay } from "../brand/GrainOverlay";
import { Timecode } from "../brand/Timecode";

// 13 - 18s | 390 - 540 frames
// Render progress: 0 → 100%. Five output files appear on the right as they finish.
export const Generating: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progress 0 → 100% over 130 frames
  const progress = interpolate(frame, [10, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const progressPct = Math.round(progress * 100);

  // Stage labels that change
  const stages = [
    { from: 0, to: 0.18, label: "analyzing diff · 3 commits" },
    { from: 0.18, to: 0.4, label: "rendering release reel · 1280×720" },
    { from: 0.4, to: 0.6, label: "transcribing captions · 4.2s avg" },
    { from: 0.6, to: 0.78, label: "composing social thread · 10 tweets" },
    { from: 0.78, to: 0.92, label: "generating migration guide · MDX" },
    { from: 0.92, to: 1, label: "rendering newsletter · MJML" },
  ];
  const currentStage =
    stages.find((s) => progress >= s.from && progress < s.to) || stages[stages.length - 1];

  // Outputs appear at staggered times
  const outputs = [
    { ext: "MP4", name: "release-reel-v2.4.0.mp4", size: "18.4 MB", trigger: 0.22 },
    { ext: "MD", name: "CHANGELOG.md", size: "4.2 KB", trigger: 0.4 },
    { ext: "TXT", name: "social-thread.txt", size: "2.1 KB", trigger: 0.62 },
    { ext: "MDX", name: "MIGRATION.mdx", size: "1.8 KB", trigger: 0.82 },
    { ext: "MJML", name: "newsletter.mjml", size: "3.1 KB", trigger: 0.98 },
  ];

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
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
            · RENDERING · 5 ARTIFACTS
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
              boxShadow: `0 0 10px ${C.amber}`,
            }}
          />
          RENDERING · 87s ETA
        </div>
      </div>

      {/* Eyebrow + headline */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          color: C.amber,
          letterSpacing: "0.22em",
          marginBottom: 12,
        }}
      >
        · GENERATING ARTIFACTS
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: 56,
          color: C.paper,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          marginBottom: 32,
          fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
        }}
      >
        Building the{" "}
        <span style={{ color: C.amber, fontStyle: "italic", fontWeight: 400 }}>
          story
        </span>{" "}
        while you ship.
      </div>

      {/* Main two-column: progress (left) + outputs (right) */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          minHeight: 0,
        }}
      >
        {/* LEFT: Progress panel */}
        <div
          style={{
            background: C.charcoal,
            border: `1px solid ${C.line}`,
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Big progress number */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              fontFamily: FONTS.display,
              fontVariationSettings: '"opsz" 144',
              letterSpacing: "-0.04em",
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: 96,
                color: C.paper,
                lineHeight: 0.9,
              }}
            >
              {String(progressPct).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: FONTS.display,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 56,
                color: C.mute,
                lineHeight: 0.9,
              }}
            >
              %
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: 6,
              background: "#0E0C0A",
              border: `1px solid ${C.line}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${C.amber} 0%, ${C.amberGlow} 100%)`,
                boxShadow: `0 0 20px ${C.amber}66`,
              }}
            />
          </div>

          {/* Stage label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: C.cream,
              marginTop: 4,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.amber,
                boxShadow: `0 0 8px ${C.amber}`,
              }}
            />
            <span style={{ color: C.amber }}>→</span>
            <span style={{ color: C.paper }}>{currentStage.label}</span>
          </div>

          {/* Stage checklist */}
          <div
            style={{
              marginTop: 6,
              paddingTop: 14,
              borderTop: `1px solid ${C.line}`,
              display: "flex",
              flexDirection: "column",
              gap: 7,
            }}
          >
            {stages.map((s, i) => {
              const done = progress >= s.to;
              const active = progress >= s.from && progress < s.to;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    color: done
                      ? C.cream
                      : active
                      ? C.amber
                      : C.mute,
                    opacity: done || active ? 1 : 0.45,
                    letterSpacing: "0.04em",
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      textAlign: "center",
                      color: done ? "#6A9955" : active ? C.amber : C.mute,
                      fontWeight: 700,
                    }}
                  >
                    {done ? "✓" : active ? "●" : "○"}
                  </span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Outputs list */}
        <div
          style={{
            background: C.charcoal,
            border: `1px solid ${C.line}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              borderBottom: `1px solid ${C.line}`,
              background: "#15110E",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: C.mute,
                letterSpacing: "0.22em",
              }}
            >
              · ARTIFACTS
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: C.amber,
                letterSpacing: "0.18em",
              }}
            >
              {outputs.filter((o) => progress >= o.trigger).length} / {outputs.length}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {outputs.map((o) => (
              <OutputRow key={o.name} output={o} progress={progress} />
            ))}
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderTop: `1px solid ${C.line}`,
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.mute,
              letterSpacing: "0.18em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>TOTAL · 28.6 MB</span>
            <span style={{ color: C.amber }}>UPLOAD TO CDN</span>
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
        <span>· 04 / 07 · GENERATING</span>
        <span style={{ color: C.amber }}>87 SECONDS · 5 ARTIFACTS</span>
      </div>
    </AbsoluteFill>
  );
};

const OutputRow: React.FC<{
  output: { ext: string; name: string; size: string; trigger: number };
  progress: number;
}> = ({ output, progress }) => {
  const isDone = progress >= output.trigger;
  const op = interpolate(
    progress,
    [output.trigger - 0.05, output.trigger + 0.04],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const slideX = interpolate(
    progress,
    [output.trigger - 0.05, output.trigger + 0.04],
    [16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "13px 18px",
        gap: 14,
        borderBottom: `1px solid ${C.line}`,
        opacity: op,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          fontWeight: 700,
          color: isDone ? C.amber : C.mute,
          letterSpacing: "0.16em",
          width: 44,
        }}
      >
        {output.ext}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 13,
          color: isDone ? C.paper : C.mute,
          flex: 1,
        }}
      >
        {output.name}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          color: isDone ? C.cream : C.mute,
          opacity: isDone ? 0.7 : 0.5,
        }}
      >
        {output.size}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: isDone ? "#6A9955" : C.mute,
          width: 20,
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        {isDone ? "✓" : "·"}
      </span>
    </div>
  );
};
