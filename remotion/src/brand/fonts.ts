import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

export const display = loadFraunces("normal", {
  weights: ["400", "600", "900"],
  subsets: ["latin"],
});

export const sans = loadBricolage("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const mono = loadJetBrains("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const FONTS = {
  display: display.fontFamily,
  sans: sans.fontFamily,
  mono: mono.fontFamily,
} as const;
