import { C } from "./colors";

type Props = {
  size?: number;
  glow?: boolean;
};

export const Logo: React.FC<Props> = ({ size = 96, glow = true }) => {
  const r = size * 0.16;
  const cx = size / 2;
  const cy = size / 2;
  const sprocketR = size * 0.035;
  const sprocketOffset = size * 0.32;

  const sprockets = [
    [cx - sprocketOffset, cy - sprocketOffset],
    [cx, cy - sprocketOffset],
    [cx + sprocketOffset, cy - sprocketOffset],
    [cx - sprocketOffset, cy],
    [cx + sprocketOffset, cy],
    [cx - sprocketOffset, cy + sprocketOffset],
    [cx, cy + sprocketOffset],
    [cx + sprocketOffset, cy + sprocketOffset],
  ] as const;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        filter: glow ? `drop-shadow(0 0 ${size * 0.18}px ${C.amberGlow}55)` : undefined,
      }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <rect x={0} y={0} width={size} height={size} rx={r} fill={C.amber} />
        {sprockets.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={sprocketR} fill={C.ink} />
        ))}
        <text
          x={cx}
          y={cy + size * 0.18}
          textAnchor="middle"
          fontFamily='"Fraunces", "Times New Roman", serif'
          fontWeight={900}
          fontSize={size * 0.62}
          fill={C.ink}
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          P
        </text>
      </svg>
    </div>
  );
};

export const LogoMark: React.FC<Props> = ({ size = 56 }) => (
  <Logo size={size} glow={false} />
);
