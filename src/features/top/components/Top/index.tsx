"use client";

import { Main } from "@/components/ui/main";
import { TypingAnimationText } from "@/components/ui/text/typing-animation";
import { ThemeSelect } from "@/components/ui/theme-select";
import { type Picture, PicturesCarousel } from "../pictures-carousel";

type Props = {
  pictures: Picture[];
};
export const Top = ({ pictures }: Props) => {
  return (
    <div>
      {/* TODO: 実装できたら追加 */}
      <div className="flex">
        <div>Top App Bar</div>
        <div>コンピュータ研究部</div>
        <ThemeSelect />
      </div>
      <Main className="mt-spacer-normal flex flex-col items-center justify-center gap-spacer-normal">
        <TypingAnimationText
          texts={[
            { text: "Welcome", className: "text-tertiary-container" },
            { text: "to the" },
            { text: "Conken", className: "text-tertiary-container" },
            { text: "exhibit!" },
          ]}
        />
        <PicturesCarousel pictures={pictures} />
      </Main>
    </div>
  );
};
