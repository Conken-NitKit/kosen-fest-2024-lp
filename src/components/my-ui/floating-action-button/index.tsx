import { cn } from "@/lib/utils";
import { getElementOrThrow } from "@/utils/get-element-or-throw";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import { type ComponentProps, type ReactElement, type ReactNode, cloneElement } from "react";

type IconProps = {
  className: string;
};

type Props = {
  size: "sm" | "md" | "lg";
  shape: "default" | "circle";
  color: "surface" | "primary" | "secondary" | "tertiary";
  elevation: "flat" | "clay";
  icon: (props: IconProps) => ReactNode;
  disabled?: boolean;
} & (
  | { tag: ReactElement }
  | ({ tag: undefined } & Omit<ComponentProps<typeof motion.button>, "className">)
);
export const FloatingActionButton = ({
  size,
  shape,
  color,
  elevation,
  icon,
  disabled = false,
  ...props
}: Props) => {
  const getComponent = () => {
    if (props.tag) {
      const tag = getElementOrThrow(props.tag);
      if (disabled) {
        return <div aria-disabled />;
      }
      return tag;
    }
    const type = props.type ? props.type : "button";
    return (
      <motion.button
        type={type}
        disabled={disabled}
        whileTap={{ filter: "brightness(.7)", scale: 0.9 }}
        {...props}
      />
    );
  };

  // cloneElementの参考: https://ja.react.dev/reference/react/cloneElement
  // cloneElement(element, props, ...children)
  // cloneElement を呼び出して、element を基に、異なる props と children を持った React 要素を作成します
  return cloneElement(
    getComponent(),
    {
      className: cn(buttonVariants({ color, size, shape, elevation })),
    },
    icon({ className: cn(iconVariants({ size })) }),
  );
};

const buttonVariants = cva(
  "flex items-center justify-center outline-outline transition hover:brightness-hover focus:brightness-focus disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled",
  {
    variants: {
      color: {
        surface: "bg-surface-container-high text-primary",
        primary: "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container",
      },
      size: {
        sm: "h-container-sm w-container-sm rounded-md",
        md: "h-container w-container rounded-lg",
        lg: "h-container-lg w-container-lg rounded-xl",
      },
      shape: {
        default: "",
        circle: "rounded-full",
      },
      elevation: {
        flat: "shadow-flat",
        clay: "shadow-clay",
      },
    },
  },
);

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "h-icon-sm w-icon-sm",
      md: "h-icon w-icon",
      lg: "h-icon-lg w-icon-lg",
    },
  },
});
