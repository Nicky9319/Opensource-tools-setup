import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C } from "./colors";

type Props = {
  frames?: number;
  speed?: number;
  reverse?: boolean;
  variant?: "amber" | "paper";
  thickness?: number;
  vertical?: boolean;
};

export const FilmStrip: React.FC<Props> = ({
  frames = 18,
  speed = 80,
  reverse = false,
  variant = "amber",
  thickness = 56,
  vertical = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const frameW = vertical ? thickness : height === 0 ? 80 : thickness;
  const frameH = vertical ? width : thickness;
  void frameW;
  void frameH;

  const w = vertical ? thickness : width;
  const h = vertical ? height : thickness;
  const tileSize = vertical ? thickness * 1.4 : thickness * 1.4;

  const offset = interpolate(
    frame,
    [0, speed],
    [0, tileSize * (reverse ? -1 : 1)],
    { extrapolateRight: "clamp" }
  );

  const accent = variant === "amber" ? C.amber : C.paper;

  return (
    <AbsoluteFill
      style={{
        justifyContent: vertical ? "flex-start" : "center",
        alignItems: vertical ? "center" : "stretch",
        flexDirection: vertical ? "row" : "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: vertical ? "100%" : w,
          height: vertical ? h : thickness,
          background: C.ink,
          borderTop: `1px solid ${C.line}`,
          borderBottom: `1px solid ${C.line}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: vertical ? "row" : "row",
          alignItems: "center",
          transform: `translateX(${vertical ? offset : 0}px) translateY(${vertical ? 0 : offset}px)`,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: tileSize,
              height: vertical ? "100%" : thickness,
              flexShrink: 0,
              borderRight: `1px solid ${C.line}`,
              padding: 6,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", gap: 4 }}>
              <Sprocket color={accent} />
              <Sprocket color={accent} />
            </div>
            <span
              style={{
                color: accent,
                opacity: 0.45,
                fontSize: 9,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
                letterSpacing: 1.5,
              }}
            >
              {String(((i % frames) + 1)).padStart(2, "0")}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <Sprocket color={accent} />
              <Sprocket color={accent} />
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Sprocket: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: color,
      opacity: 0.7,
    }}
  />
);
