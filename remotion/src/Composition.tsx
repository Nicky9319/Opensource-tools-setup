import "./index.css";
import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./brand/colors";
import { GitPush } from "./scenes/GitPush";
import { CICDRun } from "./scenes/CICDRun";
import { PatchworkKicksIn } from "./scenes/PatchworkKicksIn";
import { Generating } from "./scenes/Generating";
import { ReelShowcase } from "./scenes/ReelShowcase";
import { SocialPosts } from "./scenes/SocialPosts";
import { CTA } from "./scenes/CTA";

const FPS = 30;
const TOTAL = 960;

// Scene timings (in frames at 30fps):
// 0–120    Git Push          (4s)
// 120–270  CI/CD Run         (5s)
// 270–390  Patchwork KicksIn (4s)
// 390–540  Generating        (5s)
// 540–690  Reel Showcase     (5s)
// 690–870  Social Posts      (6s)
// 870–960  CTA               (3s)

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Sequence from={0} durationInFrames={120}>
        <GitPush />
      </Sequence>
      <Sequence from={120} durationInFrames={150}>
        <CICDRun />
      </Sequence>
      <Sequence from={270} durationInFrames={120}>
        <PatchworkKicksIn />
      </Sequence>
      <Sequence from={390} durationInFrames={150}>
        <Generating />
      </Sequence>
      <Sequence from={540} durationInFrames={150}>
        <ReelShowcase />
      </Sequence>
      <Sequence from={690} durationInFrames={180}>
        <SocialPosts />
      </Sequence>
      <Sequence from={870} durationInFrames={90}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SCENE_TIMING = {
  FPS,
  TOTAL,
  gitPush: [0, 120],
  cicd: [120, 270],
  patch: [270, 390],
  generating: [390, 540],
  reel: [540, 690],
  social: [690, 870],
  cta: [870, 960],
} as const;
