"use client";

import { Surface } from "@/components/ui/surface";
import { ThemeSelect } from "@/components/ui/theme-select";
import { type Picture, PicturesCarousel } from "../pictures-carousel";

type Props = {
  pictures: Picture[];
};
export const Top = ({ pictures }: Props) => {
  return (
    <Surface>
      {/* TODO: 実装できたら追加 */}
      <div className="flex">
        <div>Top App Bar</div>
        <div>コンピュータ研究部</div>
        <ThemeSelect />
      </div>
      <main>
        <PicturesCarousel pictures={pictures} />
      </main>
    </Surface>
  );
};
