import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  disabled?: boolean;
  children: (props: { className: string }) => ReactNode;
} & Omit<ComponentProps<"li">, "children">;
/**
 * UncontainedCarouselと合わせて使うアイテム
 * @param props.disabled - 無効になっているかどうか
 * @param props.children - アイテムの内容
 * @returns
 */
export const UncontainedCarouselItem = ({ disabled, className, children, ...props }: Props) => {
  return (
    <li
      {...props}
      className={cn(
        // min-w-0 shrink-0 grow-0を組み合わせて要素のサイズを固定し、勝手に広がったり縮んだりしないようにする
        // gapで指定するとうまくいかないためこちらにplを指定
        "min-w-0 shrink-0 grow-0 pl-padding-8",
        className,
      )}
    >
      {children({
        className:
          "rounded-radius-xl border-[1px] border-outline bg-surface shadow-flat hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
      })}
    </li>
  );
};
