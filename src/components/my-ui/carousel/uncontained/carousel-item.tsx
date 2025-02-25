import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  disabled?: boolean;
  children: (props: { className: string }) => ReactNode;
} & Omit<ComponentProps<"li">, "children">;
export const UncontainedCarouselItem = ({ disabled, className, children, ...props }: Props) => {
  return (
    <li
      {...props}
      className={cn(
        // min-w-0 shrink-0 grow-0を組み合わせて要素のサイズを固定し、勝手に広がったり縮んだりしないようにする
        // 影が不自然だったのでなくしている
        "min-w-0 shrink-0 grow-0 rounded-radius-xl border-border-1 border-outline bg-surface hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
        className,
      )}
    >
      {children({ className: "rounded-radius-xl" })}
    </li>
  );
};
