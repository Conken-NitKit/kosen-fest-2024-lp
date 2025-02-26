"use client";

import { GridBackground } from "@/components/ui/background/grid";
import { TypingAnimationText } from "@/components/ui/text/typing-animation";
import { useCssVariable } from "@/hooks/use-css-variable";

export const Heading = () => {
  return (
    <GridBackground
      tag={<div className="flex h-screen w-screen items-center justify-center" />}
      color={useCssVariable("--on-surface") ?? ""}
      fade={false}
      cellSize="8px"
    >
      <TypingAnimationText
        // biome-ignore lint/a11y/useHeadingContent: <explanation>
        element={<h1 />}
        texts={[
          { text: "Welcome", className: "text-on-tertiary-container" },
          { text: "to the" },
          { text: "Conken", className: "text-on-tertiary-container" },
          { text: "exhibit!🚀" },
        ]}
      />
    </GridBackground>
  );
};
