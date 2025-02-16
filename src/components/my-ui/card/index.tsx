import { cn } from "@/lib/utils";
import { getElementOrThrow } from "@/utils/get-element-or-throw";
import { omit } from "@/utils/object";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactElement,
  cloneElement,
} from "react";

type Props = {
  color: "elevated" | "filled" | "outlined";
  elevation: "flat" | "clay";
  className?: string;
  disabled?: boolean;
} & (
  | ({ mode: "button" } & ComponentProps<typeof motion.button>)
  // 入れ子のaタグも面倒なので避ける
  | { mode: "link"; tag: ReactElement }
  // TODO: draggableは面倒なので必要になったら実装する。
  | ({ mode?: "default" | "draggable" } & ComponentProps<typeof motion.div>)
);
export const Card = ({
  color,
  elevation,
  className,
  children,
  disabled,
  ...props
}: PropsWithChildren<Props>) => {
  const getComponent = () => {
    // 型ガードの仕様で分割代入して mode === "button" としてpropsを絞り込むことはできないのでこうする
    if (props.mode === "button") {
      const type = props.type ? props.type : "button";
      return <motion.button type={type} {...omit(props, ["mode", "type"])} disabled={disabled} />;
    }
    if (props.mode === "link") {
      const tag = getElementOrThrow(props.tag);
      if (disabled) {
        return <div aria-disabled />;
      }
      return tag;
    }
    return <motion.div {...omit(props, ["mode"])} aria-disabled={disabled} />;
  };

  return cloneElement(
    // elementをJSX形式で渡すと上手く動かない
    getComponent(),
    {
      className: cn(cardVariants({ color, elevation, mode: props.mode }), className),
    },
    children,
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
    elevation: {
      flat: "",
      clay: "",
    },
    mode: {
      default: "",
      button: "",
      draggable: "",
      link: "",
    },
  },
  defaultVariants: {
    mode: "default",
  },
});
