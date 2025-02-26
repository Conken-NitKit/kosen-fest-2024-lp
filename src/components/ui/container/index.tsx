import { useCssVariable } from "@/hooks/use-css-variable";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { GridBackground } from "../background/grid";

export const Container = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    // 二つの背景を重ねている
    <div
      className={cn(
        "bg-radial-[circle_at_right_top] from-primary-container via-secondary-container to-tertiary-container text-on-surface transition duration-500 ease-in-out",
        className,
      )}
      {...props}
    >
      <GridBackground color={useCssVariable("--on-surface")} fade={false}>
        {children}
      </GridBackground>
    </div>
  );
};
