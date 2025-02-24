import { cn } from "@/lib/utils";
import type { ComponentProps, PropsWithChildren } from "react";

type Props = {
  disabled?: boolean;
} & ComponentProps<"li">;
export const UncontainedCarouselItem = ({
  disabled,
  className,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    // min-w-0 shrink-0 grow-0を組み合わせて要素のサイズを固定し、勝手に広がったり縮んだりしないようにする
    <li {...props} className={cn("min-w-0 shrink-0 grow-0", className)}>
      {children}
    </li>
  );
};
