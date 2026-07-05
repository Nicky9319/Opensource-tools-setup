import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C } from "./colors";
import { FONTS } from "./fonts";

type Props = {
  fps?: number;
  label?: string;
  blinking?: boolean;
  size?: number;
};

export const Timecode: React.FC<Props> = ({
  fps = 24,
  label = "TC",
  blinking = true,
  size = 18,
}) => {
  const frame = useCurrentFrame();
  const { fps: compFps } = useVideoConfig();
  void compFps;

  const totalSeconds = frame / fps;
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = Math.floor(totalSeconds % 60);
  const ff = frame % fps;

  const pad = (n: number) => String(n).padStart(2, "0");

  const blink = blinking
    ? interpolate(frame % 16, [0, 8, 16], [1, 0.25, 1], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: FONTS.mono,
        fontSize: size,
        fontWeight: 500,
        color: C.paper,
        letterSpacing: "0.12em",
        opacity: blink,
      }}
    >
      <span style={{ opacity: 0.5 }}>{label}</span>
      <span>
        {pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}
      </span>
    </div>
  );
};
