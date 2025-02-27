"use client";

import { GridBackground } from "@/components/ui/background/grid";
import { TypingAnimationText } from "@/components/ui/text/typing-animation";
import { useCssVariable } from "@/hooks/use-css-variable";

export const Heading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* childrenとして渡すとマスクがかかって文字が見えなくなるのでこうするしかない */}
      <GridBackground
        color={useCssVariable("--on-surface") ?? ""}
        cellSize="8px"
        className="absolute h-screen w-screen"
      />
      <TypingAnimationText
        tag="h1"
        texts={[
          { text: "Welcome", className: "text-on-tertiary-container" },
          { text: "to the" },
          { text: "Conken", className: "text-on-tertiary-container" },
          { text: "exhibit!🚀" },
        ]}
        // テキストを中央寄せにするにはtext-alignを忘れずに設定する
        className="text-center"
      />
    </div>
  );
};
