"use client";

import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type Artwork, ArtworksCarousel } from "./carousel";

type Props = {
  artworks: Artwork[];
};
export const Artworks = ({ artworks }: Props) => {
  return (
    // 画面の上から25%下の位置に要素が写ったらアニメーション
    <motion.div
      className="flex h-full min-h-[125vh] w-screen flex-col items-center justify-center gap-spacer-normal bg-on-surface pt-spacer-normal"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ margin: "-25% 0px -75% 0px" }}
    >
      <h2
        className={cn(
          font.display,
          // 文字を透明にし、clip-textを使ってグラデーション
          "bg-gradient-to-b from-surface-container-lowest to-surface-container-lowest/25 bg-clip-text font-bold text-transparent",
        )}
      >
        Artworks
      </h2>
      <ArtworksCarousel artworks={artworks} />
      {/* TODO: 後で実装 */}
      <div className="text-surface-container-lowest">Browse Artworks Button</div>
    </motion.div>
  );
};
