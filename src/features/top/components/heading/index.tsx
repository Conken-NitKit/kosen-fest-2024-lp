"use client";

import { GridBackground } from "@/components/ui/background/grid";
import { TypingAnimationText } from "@/components/ui/text/typing-animation";
import { useCssVariable } from "@/hooks/use-css-variable";

export const Heading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <GridBackground
        color={useCssVariable("--on-surface") ?? ""}
        cellSize="8px"
        className="absolute h-full w-full"
      />
      <TypingAnimationText
        tag="h1"
        texts={[
          { text: "Welcome", className: "text-on-tertiary-container" },
          { text: "to the" },
          { text: "Conken", className: "text-on-tertiary-container" },
          { text: "exhibit!🚀" },
        ]}
      />
    </div>
  );
};
