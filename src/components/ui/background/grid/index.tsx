import { Slot } from "@/components/my-ui/core/slot";
import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  tag?: ReactNode;
  color: string;
  cellSize?: string | number;
  strokeWidth?: string | number;
  fade?: boolean;
};
/**
 * 任意の要素にグリット背景のスタイルを付与する
 * @param props.tag - tagを変えたいときに設定
 * @param props.color - グリットの色
 * @param props.cellSize - グリットのセルのサイズ(default: "24px")
 * @param props.strokeWidth - グリットの線の太さ(default: "2px")
 * @param props.fade - グリットのフェード(default: true)
 */
export const GridBackground = ({
  tag,
  color,
  cellSize = "24px",
  strokeWidth = "4px",
  fade = true,
  children,
}: PropsWithChildren<Props>) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' stroke='${color}' stroke-width='${strokeWidth}' fill-opacity='0.4' >
      <path d='M 100 0 L 100 200'/>
      <path d='M 0 100 L 200 100'/>
    </svg>
  `;
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <Slot
      element={tag ? tag : <div />}
      style={{
        backgroundImage: `url("${svgDataUrl}")`,
        backgroundRepeat: "repeat",
        backgroundSize: cellSize,
        maskImage: fade ? "radial-gradient(ellipse at top, white, transparent 70%)" : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse at top, white, transparent 70%)"
          : undefined,
      }}
    >
      {children}
    </Slot>
  );
};
