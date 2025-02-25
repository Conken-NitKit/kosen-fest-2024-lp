import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Surface = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    <div className={cn("h-screen w-screen bg-surface", className)} {...props}>
      {children}
    </div>
  );
};
