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
import { Logo } from "../brand/Logo";

// 29 - 32s | 870 - 960 frames
// Quick CTA: logo + wordmark + URL + waitlist.
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const logoIn = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const wordIn = interpolate(frame, [16, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const wordY = interpolate(frame, [16, 44], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const lineIn = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const metaIn = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,183,0,0.10) 0%, transparent 55%)",
        }}
      />
      <GrainOverlay opacity={0.06} />

      {/* Top film strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 24,
          background: C.ink,
          borderBottom: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: 4,
              gap: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 50,
              flexShrink: 0,
              borderRight: `1px solid ${C.line}`,
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amber }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amber }} />
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amber }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amber }} />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 8,
          opacity: logoIn,
          transform: `scale(${0.85 + logoIn * 0.15})`,
        }}
      >
        <Logo size={72} glow />
      </div>

      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          color: C.amber,
          letterSpacing: "0.24em",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: wordIn,
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
        NOW RECORDING · JOIN THE WAITLIST
      </div>

      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: 130,
          color: C.paper,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
          fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
          opacity: wordIn,
          transform: `translateY(${wordY}px)`,
        }}
      >
        patchwork<span style={{ color: C.amber }}>.</span>dev
      </div>

      <div
        style={{
          marginTop: 12,
          height: 3,
          background: C.amber,
          width: lineIn * 580,
          opacity: 0.85,
        }}
      />

      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 48,
          alignItems: "center",
          opacity: metaIn,
        }}
      >
        <Meta label="WAITLIST" value="412" suffix="teams" />
        <Divider />
        <Meta label="AVG RENDER" value="87" suffix="seconds" />
        <Divider />
        <Meta label="STATUS" value="BETA" live />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          color: C.mute,
          fontFamily: FONTS.mono,
          fontSize: 10,
          letterSpacing: "0.18em",
          opacity: metaIn,
        }}
      >
        <span>© 2026 PATCHWORK LABS</span>
        <span>SCENE 07 / 07 · CTA</span>
      </div>
    </AbsoluteFill>
  );
};

const Meta: React.FC<{
  label: string;
  value: string;
  suffix?: string;
  live?: boolean;
}> = ({ label, value, suffix, live }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        color: C.mute,
        letterSpacing: "0.22em",
      }}
    >
      · {label}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <span
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: 44,
          color: C.paper,
          fontVariationSettings: '"opsz" 144',
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </span>
      {live && (
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: C.amber,
            boxShadow: `0 0 8px ${C.amber}`,
            marginBottom: 4,
          }}
        />
      )}
      {suffix && (
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: C.mute,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const Divider: React.FC = () => (
  <div
    style={{
      width: 1,
      height: 48,
      background: C.line,
    }}
  />
);
