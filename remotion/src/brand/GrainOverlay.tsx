import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props = {
  opacity?: number;
  blend?: boolean;
};

// Looping film grain: cycles through 6 turbulence frames.
export const GrainOverlay: React.FC<Props> = ({
  opacity = 0.07,
  blend = true,
}) => {
  const frame = useCurrentFrame();
  const variant = frame % 6;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: blend ? "overlay" : "normal",
        opacity,
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="none">
        <filter id={`g-${variant}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.9 + variant * 0.07}
            numOctaves={2}
            seed={variant * 13}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g-${variant})`} />
      </svg>
    </AbsoluteFill>
  );
};
