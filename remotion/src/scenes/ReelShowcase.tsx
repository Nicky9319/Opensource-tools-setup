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

// 18 - 23s | 540 - 690 frames
// The generated reel is shown: a video player frame with title "DARK MODE",
// before/after UI mock, REC indicator, frame counter. The reel is "playing".
export const ReelShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Player scales in
  const playerIn = interpolate(frame, [4, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const playerY = interpolate(frame, [4, 30], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Title fades in after player lands
  const titleIn = interpolate(frame, [36, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const titleY = interpolate(frame, [36, 64], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Before/after split fades in
  const splitIn = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Animated light/dark toggle
  const toggleProgress = interpolate(frame, [85, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const isDark = toggleProgress > 0.5;

  // REC blink
  const recBlink = interpolate(frame % 16, [0, 8, 16], [1, 0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame counter (advances rapidly to look like video playing)
  const reelFrame = 0 + Math.floor(frame * 1.5);
  const ss = Math.floor(reelFrame / 30) % 60;
  const mm = Math.floor(reelFrame / 1800);
  const pad = (n: number) => String(n).padStart(2, "0");
  const timecodeStr = `00:${pad(mm)}:${pad(ss)}`;

  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        padding: "32px 48px",
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
            · OUTPUT · RELEASE REEL
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: C.rust,
            letterSpacing: "0.18em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.rust,
              opacity: recBlink,
            }}
          />
          REC · 30 FPS · 1280×720
        </div>
      </div>

      {/* Player frame */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          opacity: playerIn,
          transform: `translateY(${playerY}px)`,
          minHeight: 0,
        }}
      >
        {/* Top metadata bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            background: "#15110E",
            border: `1px solid ${C.line}`,
            borderBottom: "none",
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: C.mute,
            letterSpacing: "0.1em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 5 }}>
              <Dot color="#FF5F57" />
              <Dot color="#FEBC2E" />
              <Dot color="#28C840" />
            </div>
            <span style={{ color: C.cream }}>
              release-reel-v2.4.0.mp4
            </span>
            <span>· 1280×720 · 30fps · h264</span>
          </div>
          <div
            style={{
              color: C.amber,
              letterSpacing: "0.18em",
            }}
          >
            <span style={{ color: C.amber }}>AUTO-GENERATED</span>
            <span style={{ color: C.mute, marginLeft: 14 }}>{timecodeStr} / 01:00</span>
          </div>
        </div>

        {/* Player screen */}
        <div
          style={{
            flex: 1,
            background: isDark ? "#0B0908" : C.cream,
            border: `1px solid ${C.line}`,
            borderTop: "none",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: "32px 40px",
            transition: "none",
          }}
        >
          {/* Inside the reel — title card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              minHeight: 0,
            }}
          >
            <div
              style={{
                opacity: titleIn,
                transform: `translateY(${titleY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: isDark ? C.amber : C.amber,
                letterSpacing: "0.24em",
                marginBottom: 18,
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
              v2.4.0 · SHIPPED
            </div>

            <div
              style={{
                opacity: titleIn,
                transform: `translateY(${titleY}px)`,
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 140,
                color: isDark ? C.paper : C.ink,
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                textAlign: "center",
                fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
              }}
            >
              dark mode
            </div>

            <div
              style={{
                opacity: titleIn,
                fontFamily: FONTS.display,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 28,
                color: isDark ? C.amber : C.amber,
                marginTop: 12,
                letterSpacing: "-0.01em",
                fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
              }}
            >
              now live in your settings.
            </div>

            {/* Before/after split */}
            <div
              style={{
                opacity: splitIn,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginTop: 36,
                width: "min(900px, 100%)",
              }}
            >
              <UIWindow label="BEFORE" theme="light" />
              <UIWindow label="AFTER" theme="dark" />
            </div>
          </div>

          {/* REC indicator overlay */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              background: "#0B0908aa",
              border: `1px solid ${C.rust}`,
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.paper,
              letterSpacing: "0.18em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.rust,
                opacity: recBlink,
              }}
            />
            REC
          </div>

          {/* Patchwork logo top-right */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              background: "#0B0908aa",
              border: `1px solid ${C.amber}`,
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.amber,
              letterSpacing: "0.18em",
            }}
          >
            <Logo size={14} glow={false} />
            <span>PATCHWORK</span>
          </div>
        </div>
      </div>

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
        <span>· 05 / 07 · RELEASE REEL</span>
        <span style={{ color: C.amber }}>FRAME 0871 / 1800</span>
      </div>
    </AbsoluteFill>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color,
    }}
  />
);

const UIWindow: React.FC<{ label: string; theme: "light" | "dark" }> = ({
  label,
  theme,
}) => {
  const bg = theme === "dark" ? "#1A1714" : "#FFFFFF";
  const fg = theme === "dark" ? C.paper : "#1A1714";
  const muteFg = theme === "dark" ? C.mute : "#8B7E6B";
  const border = theme === "dark" ? C.line : "#E0D8C2";
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONTS.mono,
          fontSize: 8,
          color: muteFg,
          letterSpacing: "0.22em",
        }}
      >
        <span>· {label}</span>
        <span>{theme.toUpperCase()}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 8,
          background: theme === "dark" ? "#0E0C0A" : "#F4ECD8",
          border: `1px solid ${border}`,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: theme === "dark" ? C.amber : "#F5B700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
          }}
        >
          {theme === "dark" ? "🌙" : "☀"}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 11,
            color: fg,
            fontWeight: 600,
            flex: 1,
          }}
        >
          Appearance
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 9,
            color: muteFg,
            letterSpacing: "0.18em",
          }}
        >
          {theme === "dark" ? "DARK" : "LIGHT"}
        </div>
      </div>
      <div
        style={{
          padding: 6,
          background: theme === "dark" ? "#0E0C0A" : "#F4ECD8",
          border: `1px solid ${border}`,
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: muteFg,
          letterSpacing: "0.06em",
        }}
      >
        Lorem ipsum dolor sit amet · consectetur · adipiscing
      </div>
    </div>
  );
};
