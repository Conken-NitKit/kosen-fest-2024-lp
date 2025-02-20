import { cn } from "@/lib/utils";
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
      return props.tag;
    }
    const type = props.type ? props.type : "button";
    return <motion.button type={type} whileTap={{ scale: 0.9 }} {...props} />;
  };

  return (
    // Linkをアニメーションできるようにmotion.divでラップ
    <motion.div className="inline-flex items-center justify-center" whileTap={{ scale: 0.9 }}>
      <Slot
        element={getComponent()}
        className={cn(buttonVariants({ color, size, shape, design }), className)}
      >
        {children({ className: cn(iconVariants({ size })) })}
      </Slot>
    </motion.div>
  );
};

const buttonVariants = cva(
  "flex items-center justify-center outline-outline transition cursor-pointer z-level1 active:brightness-press hover:brightness-hover-focus focus:brightness-hover-focus",
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
