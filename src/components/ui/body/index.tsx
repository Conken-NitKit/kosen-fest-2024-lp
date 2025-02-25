import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Body = ({ className, children, ...props }: ComponentProps<"body">) => {
  return (
    <body
      className={cn("bg-surface text-on-surface transition duration-500 ease-in-out", className)}
      {...props}
    >
      {children}
    </body>
  );
};
