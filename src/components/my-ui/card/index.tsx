import { cn } from "@/lib/utils";
import { omit } from "@/utils/object";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import type { ComponentProps, PropsWithChildren, ReactElement } from "react";
import { Slot } from "../core/slot";

type Props = {
  color: "elevated" | "filled" | "outlined";
  design: "flat" | "clay";
  className?: string;
  disabled?: boolean;
} & (
  | ({ mode: "button" } & ComponentProps<typeof motion.button>)
  // TODO: draggableは面倒なので必要になったら実装する。
  | ({ mode?: "default" | "draggable" } & ComponentProps<typeof motion.div>)
  // 入れ子のaタグも面倒なので避ける
  | { mode: "link"; tag: ReactElement }
);
export const Card = ({
  color,
  design,
  className,
  // menu-items
  children,
  disabled,
  ...props
}: PropsWithChildren<Props>) => {
  const getTag = () => {
    // 型ガードの仕様で分割代入して mode === "button" としてpropsを絞り込むことはできないのでこうする
    if (props.mode === "button") {
      const type = props.type ? props.type : "button";
      return <motion.button type={type} {...omit(props, ["mode", "type"])} disabled={disabled} />;
    }
    if (props.mode === "link") {
      if (disabled) {
        return <div aria-disabled />;
      }
      return props.tag;
    }
    return <motion.div {...omit(props, ["mode"])} aria-disabled={disabled} />;
  };

  // elementをJSX形式で渡すと上手く動かない
  return (
    <Slot element={getTag()} className={cn(cardVariants({ color, design, mode: props.mode }))}>
      {children}
    </Slot>
  );
};

// TODO: ここにTailwind CSSのクラスを追加する
const cardVariants = cva("", {
  variants: {
    color: {
      elevated: "",
      filled: "",
      outlined: "",
    },
    design: {
      flat: "",
      clay: "",
    },
    mode: {
      default: "",
      button: "",
      draggable: "",
      link: "",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    mode: "default",
  },
});
