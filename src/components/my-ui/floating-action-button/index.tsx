import { useCssVariable } from "@/hooks/use-css-variable";
import { cn } from "@/lib/utils";
import { getElementOrThrow } from "@/utils/get-element-or-throw";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Slot } from "../core/slot";

type IconProps = {
  className: string;
};

type Props = {
  size: "sm" | "md" | "lg";
  shape: "default" | "circle";
  color: "surface" | "primary" | "secondary" | "tertiary";
  design: "flat" | "clay";
  children: (props: IconProps) => ReactNode;
  className?: string;
} & (
  | { tag: ReactElement }
  // { tag: undefined }だと引数が必要になるので注意
  | ({ tag?: undefined } & Omit<ComponentProps<typeof motion.button>, "children">)
);
/**
 * 画面上で最も一般的または重要なアクションにはFABを使用する
 * - FABはコンテンツがスクロールしている間も画面上に残るようにする必要がある
 * @param props.size - ボタンのサイズ ("sm" | "md" | "lg")
 * @param props.shape - ボタンの形状 ("default" | "circle")
 * @param props.color - ボタンの色 ("surface" | "primary" | "secondary" | "tertiary")
 * @param props.design - ボタンのデザイン ("flat" | "clay")
 * @param props.children - ボタンのアイコン
 * @param props.className - ボタンの位置やマージンなどを制御する必要があるときに使う
 * @param props.tag - Linkにしたい時などカスタムタグを使用する場合に指定
 */
export const FloatingActionButton = ({
  size,
  shape,
  color,
  design,
  className,
  // icon
  children,
  ...props
}: Props) => {
  const getComponent = () => {
    if (props.tag) {
      const tag = getElementOrThrow(props.tag);
      return tag;
    }
    const type = props.type ? props.type : "button";
    return (
      <motion.button
        // whileTapだけだとfilterがなぜか変わらないのでこうする
        variants={{
          normal: { filter: "brightness(1)" },
          tap: { filter: "brightness(var(--brightness-press))", scale: 0.9 },
          // なぜかエラーが出るのでゴリ押し
          active: { filter: `brightness(${useCssVariable("--brightness-active", (v) => v)})` },
        }}
        type={type}
        initial="normal"
        whileTap="tap"
        // classと競合するのでこちらにまとめる
        whileHover="active"
        whileFocus="active"
        {...props}
      />
    );
  };

  return (
    <Slot
      element={getComponent()}
      className={cn(buttonVariants({ color, size, shape, design }), className)}
    >
      {children({ className: cn(iconVariants({ size })) })}
    </Slot>
  );
};

const buttonVariants = cva(
  "flex items-center justify-center outline-outline transition cursor-pointer z-level1",
  {
    variants: {
      color: {
        surface: "bg-surface-container-low text-primary",
        primary: "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container",
      },
      size: {
        sm: "size-[40px] rounded-radius-md",
        md: "size-[56px] rounded-radius-lg",
        lg: "size-[96px] rounded-radius-xl",
      },
      shape: {
        default: "",
        circle: "rounded-radius-full",
      },
      design: {
        flat: "shadow-flat",
        clay: "shadow-clay",
      },
    },
  },
);

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-[24px]",
      md: "size-[24px]",
      lg: "size-[36px]",
    },
  },
});
