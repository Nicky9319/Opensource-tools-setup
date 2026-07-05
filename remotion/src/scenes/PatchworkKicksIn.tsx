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
import { Logo } from "../brand/Logo";

// 9 - 13s | 270 - 390 frames
// Patchwork step lights up. Logo drops in, diff analysis runs, 1 feature + 0 breaking detected.
export const PatchworkKicksIn: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo entrance
  const logoIn = interpolate(frame, [4, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Wordmark slides up
  const wordIn = interpolate(frame, [22, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const wordY = interpolate(frame, [22, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Stats panel slides in from the right
  const panelIn = interpolate(frame, [44, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const panelX = interpolate(frame, [44, 72], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Detection lines
  const l1 = frame >= 54;
  const l2 = frame >= 64;
  const l3 = frame >= 76;
  const l4 = frame >= 90;

  // Sparkles
  const sparkle = interpolate(frame % 12, [0, 6, 12], [0.5, 1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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

      {/* Radial glow behind logo */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(245,183,0,0.10) 0%, transparent 45%)",
        }}
      />

      {/* Top header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
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
            · PATCHWORK · GITHUB ACTION
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
              opacity: sparkle,
            }}
          />
          STEP ACTIVE
        </div>
      </div>

      {/* Main split: brand left, diff analysis right */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 32,
          minHeight: 0,
          alignItems: "center",
        }}
      >
        {/* LEFT: Logo + brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                transform: `scale(${0.5 + logoIn * 0.5}) rotate(${(1 - logoIn) * -10}deg)`,
                opacity: logoIn,
              }}
            >
              <Logo size={88} glow />
            </div>
            <div
              style={{
                opacity: wordIn,
                transform: `translateY(${wordY}px)`,
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 56,
                color: C.paper,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
              }}
            >
              patchwork
            </div>
          </div>

          <div
            style={{
              opacity: wordIn,
              fontFamily: FONTS.display,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 24,
              color: C.amber,
              letterSpacing: "-0.01em",
              marginBottom: 28,
              fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
            }}
          >
            watching your repo...
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: C.charcoal,
              border: `1px solid ${C.amber}`,
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: C.cream,
              opacity: wordIn,
              boxShadow: `0 0 30px ${C.amber}33`,
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
                opacity: sparkle,
              }}
            />
            <span style={{ color: C.amber }}>patchwork/render</span>
            <span style={{ color: C.mute }}>@ v1.4.0</span>
          </div>
        </div>

        {/* RIGHT: Diff analysis */}
        <div
          style={{
            opacity: panelIn,
            transform: `translateX(${panelX}px)`,
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
              · DIFF ANALYSIS
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: C.amber,
                letterSpacing: "0.18em",
              }}
            >
              feat/dark-mode
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: C.cream,
            }}
          >
            {l1 && (
              <LogLine>
                <span style={{ color: C.mute }}>$</span>{" "}
                <span style={{ color: C.amber }}>patchwork</span> analyze{" "}
                <span style={{ color: C.paper }}>--branch=feat/dark-mode</span>
              </LogLine>
            )}
            {l2 && (
              <LogLine>
                <span style={{ color: "#6A9955" }}>✓</span> scanned{" "}
                <span style={{ color: C.amber }}>3 commits</span> ·{" "}
                <span style={{ color: C.amber }}>+187</span>{" "}
                <span style={{ color: C.rust }}>-12</span> lines
              </LogLine>
            )}
            {l3 && (
              <LogLine>
                <span style={{ color: "#6A9955" }}>✓</span> detected:{" "}
                <span style={{ color: C.amber, fontWeight: 700 }}>1 feature</span>
                ,{" "}
                <span style={{ color: C.mute }}>0 breaking</span>,{" "}
                <span style={{ color: C.mute }}>0 deprecations</span>
              </LogLine>
            )}
            {l4 && (
              <div
                style={{
                  marginTop: 4,
                  padding: 10,
                  borderLeft: `2px solid ${C.amber}`,
                  background: `${C.amber}10`,
                  color: C.amber,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                → feature: dark mode · settings.appearance
              </div>
            )}
          </div>

          {/* Stats footer */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <Stat label="FEATURES" value="1" color={C.amber} show={l3} />
            <Stat label="BREAKING" value="0" color={C.mute} show={l3} />
            <Stat label="EST. RENDER" value="87s" color={C.amber} show={l4} />
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
        <span>· 03 / 07 · PATCHWORK DETECTS</span>
        <span style={{ color: C.amber }}>RENDERING IN 87s</span>
      </div>
    </AbsoluteFill>
  );
};

const LogLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{children}</div>
);

const Stat: React.FC<{
  label: string;
  value: string;
  color: string;
  show: boolean;
}> = ({ label, value, color, show }) => {
  const op = interpolate(show ? 1 : 0, [0, 1], [0, 1]);
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRight: `1px solid ${C.line}`,
        opacity: op,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: C.mute,
          letterSpacing: "0.18em",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: 24,
          color,
          fontVariationSettings: '"opsz" 144',
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
    </div>
  );
};
