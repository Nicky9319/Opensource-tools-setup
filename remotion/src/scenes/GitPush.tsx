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

// 0 - 4s | 0 - 120 frames
// Developer edits a dark-mode toggle, commits, pushes to GitHub.
export const GitPush: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // IDE fades in
  const ideIn = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const ideX = interpolate(frame, [4, 22], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Terminal lines appear one by one
  const t1 = frame >= 24;
  const t2 = frame >= 36;
  const t3 = frame >= 50;
  const t4 = frame >= 62;
  const t5 = frame >= 74;
  const t6 = frame >= 86;

  // GitHub commit success panel
  const githubIn = interpolate(frame, [76, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const githubX = interpolate(frame, [76, 100], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Cursor blink in the editor
  const cursorBlink = interpolate(frame % 16, [0, 8, 16], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Code reveal — line by line
  const codeLine = (start: number) =>
    frame >= start ? 1 : 0;

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

      {/* Top header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
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
            · DEVELOPER · LOCAL
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: C.amber,
            letterSpacing: "0.18em",
          }}
        >
          TUE · 09:14 UTC
        </span>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          minHeight: 0,
        }}
      >
        {/* LEFT: IDE mockup */}
        <div
          style={{
            opacity: ideIn,
            transform: `translateX(${ideX}px)`,
            background: C.charcoal,
            border: `1px solid ${C.line}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* IDE titlebar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
              borderBottom: `1px solid ${C.line}`,
              background: "#15110E",
              gap: 8,
            }}
          >
            <Dot color="#FF5F57" />
            <Dot color="#FEBC2E" />
            <Dot color="#28C840" />
            <span
              style={{
                marginLeft: 10,
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: C.mute,
                letterSpacing: "0.06em",
              }}
            >
              ~/dev/patchwork-web — Visual Studio Code
            </span>
          </div>

          {/* File tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: `1px solid ${C.line}`,
              background: "#0E0C0A",
            }}
          >
            {[
              { name: "ThemeToggle.tsx", active: true },
              { name: "tailwind.config.js", active: false },
              { name: "layout.tsx", active: false },
            ].map((f) => (
              <div
                key={f.name}
                style={{
                  padding: "8px 14px",
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: f.active ? C.paper : C.mute,
                  borderRight: `1px solid ${C.line}`,
                  background: f.active ? C.charcoal : "transparent",
                  borderTop: f.active ? `2px solid ${C.amber}` : "2px solid transparent",
                }}
              >
                {f.name}
              </div>
            ))}
          </div>

          {/* Code editor */}
          <div
            style={{
              flex: 1,
              padding: "18px 22px",
              fontFamily: FONTS.mono,
              fontSize: 13,
              lineHeight: 1.7,
              color: C.cream,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              overflow: "hidden",
            }}
          >
            <CodeLine num={1} content={<><K>export function</K> <Fn>ThemeToggle</Fn>() {"{"}</>} show={codeLine(0)} />
            <CodeLine num={2} content={<>  <K>const</K> [theme, setTheme] = <Fn>useState</Fn>(<S>"light"</S>)</>} show={codeLine(4)} />
            <CodeLine num={3} content={<>  <K>const</K> isDark = theme === <S>"dark"</S></>} show={codeLine(8)} />
            <CodeLine num={4} content={<>  <K>return</K> (</>} show={codeLine(12)} />
            <CodeLine num={5} content={<>    &lt;<T>button</T></>} show={codeLine(16)} />
            <CodeLine num={6} content={<>      onClick={"{}"} toggleTheme</>} show={codeLine(18)} />
            <CodeLine num={7} content={<>      className=<S>"theme-toggle"</S></>} show={codeLine(20)} />
            <CodeLine num={8} content={<>      aria-label=<S>"Toggle theme"</S></>} show={codeLine(22)} />
            <CodeLine num={9} content={<>    &gt;</>} show={codeLine(24)} />
            <CodeLine num={10} content={<>      {"{isDark ? "}<S>"🌙"</S> : <S>"☀️"</S>{"}"}</>} show={codeLine(26)} />
            <CodeLine num={11} content={<>    &lt;/<T>button</T>&gt;</>} show={codeLine(28)} />
            <CodeLine num={12} content={<>  )</>} show={codeLine(30)} />
            <CodeLine num={13} content={<>{"}"}</>} show={codeLine(32)} />
            <div style={{ display: "flex", alignItems: "center", height: 22 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 16,
                  background: C.amber,
                  opacity: cursorBlink,
                }}
              />
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 14px",
              borderTop: `1px solid ${C.line}`,
              background: "#0E0C0A",
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: C.mute,
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ display: "flex", gap: 14 }}>
              <span style={{ color: C.amber }}>main*</span>
              <span>TypeScript React</span>
            </span>
            <span>UTF-8 · LF</span>
          </div>
        </div>

        {/* RIGHT: Terminal + GitHub commit */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: 0,
          }}
        >
          {/* Terminal */}
          <div
            style={{
              opacity: ideIn,
              transform: `translateX(${ideX}px)`,
              background: "#0E0C0A",
              border: `1px solid ${C.line}`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                borderBottom: `1px solid ${C.line}`,
                background: "#15110E",
                gap: 8,
              }}
            >
              <Dot color="#FF5F57" />
              <Dot color="#FEBC2E" />
              <Dot color="#28C840" />
              <span
                style={{
                  marginLeft: 10,
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: C.mute,
                }}
              >
                zsh — patchwork-web
              </span>
            </div>
            <div
              style={{
                padding: "16px 18px",
                fontFamily: FONTS.mono,
                fontSize: 13,
                lineHeight: 1.7,
                color: C.cream,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 220,
              }}
            >
              {t1 && (
                <div>
                  <span style={{ color: C.amber }}>❯</span> git add .
                </div>
              )}
              {t2 && (
                <div>
                  <span style={{ color: C.amber }}>❯</span> git commit -m{" "}
                  <span style={{ color: C.paper }}>"feat: add dark mode support"</span>
                </div>
              )}
              {t3 && (
                <div style={{ color: C.mute }}>
                  [main a1b2c3d] feat: add dark mode support
                </div>
              )}
              {t3 && (
                <div style={{ color: C.mute }}>
                  3 files changed, 187 insertions(+), 12 deletions(-)
                </div>
              )}
              {t4 && (
                <div>
                  <span style={{ color: C.amber }}>❯</span> git push origin main
                </div>
              )}
              {t5 && (
                <div style={{ color: C.mute }}>
                  Enumerating objects: 14, done.
                </div>
              )}
              {t5 && (
                <div style={{ color: C.mute }}>
                  Writing objects: 100% (14/14), 4.21 KiB
                </div>
              )}
              {t6 && (
                <div style={{ color: C.amber, fontWeight: 700, marginTop: 4 }}>
                  ✓ pushed to origin/main · a1b2c3d
                </div>
              )}
            </div>
          </div>

          {/* GitHub success panel */}
          <div
            style={{
              opacity: githubIn,
              transform: `translateX(${githubX}px)`,
              background: C.charcoal,
              border: `1px solid ${C.amber}`,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
              boxShadow: `0 0 40px ${C.amber}22`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: C.amber,
                  letterSpacing: "0.18em",
                }}
              >
                <GithubIcon />
                patchwork / patchwork-web
              </div>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  color: C.mute,
                  letterSpacing: "0.16em",
                }}
              >
                PUSH EVENT
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: C.amber,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: 16,
                  color: C.ink,
                }}
              >
                P
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 15,
                  color: C.paper,
                  fontWeight: 600,
                }}
              >
                paarth
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: C.mute,
                }}
              >
                pushed 1 commit to <span style={{ color: C.paper }}>main</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 6,
                padding: "10px 14px",
                background: "#0E0C0A",
                border: `1px solid ${C.line}`,
                fontFamily: FONTS.mono,
                fontSize: 13,
                color: C.cream,
              }}
            >
              <span style={{ color: C.amber }}>a1b2c3d</span>
              <span style={{ color: C.mute }}>·</span>
              <span style={{ color: C.paper }}>
                feat: add dark mode support
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 6,
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: C.mute,
                letterSpacing: "0.08em",
              }}
            >
              <span style={{ color: C.amber }}>+187</span>
              <span style={{ color: C.rust }}>-12</span>
              <span>3 files</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom eyebrow */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONTS.mono,
          fontSize: 10,
          color: C.mute,
          letterSpacing: "0.18em",
          opacity: 0.7,
        }}
      >
        <span>· 01 / 07 · GIT PUSH</span>
        <span>PR #1842 OPENED</span>
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

const GithubIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={C.amber}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 015.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

// Syntax-highlighted line with line number
const CodeLine: React.FC<{
  num: number;
  content: React.ReactNode;
  show: number;
}> = ({ num, content, show }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      opacity: show,
      transform: `translateX(${(1 - show) * 8}px)`,
      transition: "none",
    }}
  >
    <span
      style={{
        width: 22,
        textAlign: "right",
        fontFamily: FONTS.mono,
        fontSize: 12,
        color: C.mute,
        opacity: 0.5,
        flexShrink: 0,
      }}
    >
      {num}
    </span>
    <span style={{ whiteSpace: "pre" }}>{content}</span>
  </div>
);

// Syntax highlight helpers
const K: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#C586C0" }}>{children}</span>
);
const Fn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#DCDCAA" }}>{children}</span>
);
const S: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.amber }}>{children}</span>
);
const T: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#4EC9B0" }}>{children}</span>
);
