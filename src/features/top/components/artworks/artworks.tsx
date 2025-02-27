"use client";

import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { type Artwork, ArtworksCarousel } from "./carousel";

type Props = {
  artworks: Artwork[];
};
export const Artworks = ({ artworks }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.7 });

  return (
    // 画面にこの要素の七割が入ったらアニメーションする
    <motion.div
      className="flex h-[125vh] w-screen flex-col items-center justify-center gap-spacer-normal bg-on-surface"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
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
