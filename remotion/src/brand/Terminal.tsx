import React from "react";
import { C } from "./colors";
import { FONTS } from "./fonts";

type Props = {
  title?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  variant?: "dark" | "amber";
};

export const Terminal: React.FC<Props> = ({
  title = "patchwork · render",
  width = 920,
  height = 320,
  children,
  variant = "dark",
}) => {
  const bg = variant === "amber" ? C.charcoal : "#0E0C0A";
  return (
    <div
      style={{
        width,
        height,
        background: bg,
        border: `1px solid ${C.line}`,
        boxShadow: `0 30px 80px ${C.ink}88, inset 0 1px 0 ${C.line}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 32,
          borderBottom: `1px solid ${C.line}`,
          background: "#15110E",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <Dot color="#FF5F57" />
        <Dot color="#FEBC2E" />
        <Dot color="#28C840" />
        <div
          style={{
            marginLeft: 12,
            color: C.mute,
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: 16,
          fontFamily: FONTS.mono,
          fontSize: 13,
          color: C.cream,
          lineHeight: 1.55,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: color,
    }}
  />
);

export const Line: React.FC<{ color?: string; bold?: boolean }> = ({
  color = C.cream,
  bold,
}) => (
  <div
    style={{
      color,
      fontWeight: bold ? 700 : 400,
      whiteSpace: "pre",
    }}
  />
);

export const Prompt: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.amber }}>❯ {children}</span>
);
