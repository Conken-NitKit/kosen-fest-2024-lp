import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Main = ({ className, children, ...props }: ComponentProps<"main">) => {
  return (
    <main className={cn("px-spacer-small sm:px-spacer-normal", className)} {...props}>
      {children}
    </main>
  );
};
