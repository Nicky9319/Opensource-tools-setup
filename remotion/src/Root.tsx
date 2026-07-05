import "./index.css";
import { Composition } from "remotion";
import { MyComposition, SCENE_TIMING } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PatchworkPromo"
        component={MyComposition}
        durationInFrames={SCENE_TIMING.TOTAL}
        fps={SCENE_TIMING.FPS}
        width={1280}
        height={720}
      />
    </>
  );
};
