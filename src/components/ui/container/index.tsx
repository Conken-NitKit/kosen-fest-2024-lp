"use client";

import { useCssVariable } from "@/hooks/use-css-variable";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { GridBackground } from "../background/grid";

export const Container = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    // 二つの背景を重ねている
    <div
      className={cn(
        "bg-surface-container-lowest text-on-surface transition duration-500 ease-in-out",
        className,
      )}
      {...props}
    >
      <GridBackground color={useCssVariable("--on-surface") ?? ""} fade={false} cellSize="8px">
        {children}
      </GridBackground>
    </div>
  );
};
