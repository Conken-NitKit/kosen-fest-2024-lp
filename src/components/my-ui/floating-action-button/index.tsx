import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { match } from "ts-pattern";

type IconProps = {
  className: string;
};

type Props = Omit<ComponentProps<"button">, "className"> & {
  size: "sm" | "md" | "lg";
  icon: (props: IconProps) => ReactNode;
  shape: "default" | "circle";
};
export const FloatingActionButton = ({
  type = "button",
  size,
  icon,
  shape = "default",
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center bg-surface-container-high text-primary",
        {
          "h-container-sm w-container-sm rounded-md": size === "sm",
          "h-container w-container rounded-lg": size === "md",
          "h-container-lg w-container-lg rounded-xl": size === "lg",
        },
        {
          "rounded-full": shape === "circle",
        },
      )}
      type={type}
      {...props}
    >
      {icon({
        className: match(size)
          .with("sm", () => ({ className: "h-icon-sm w-icon-sm" }))
          .with("md", () => ({ className: "h-icon w-icon" }))
          .with("lg", () => ({ className: "h-icon-lg w-icon-lg" }))
          .exhaustive().className,
      })}
    </button>
  );
};
