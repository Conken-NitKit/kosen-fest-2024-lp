import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Container = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-radial-[circle_at_right_top] from-primary-container via-secondary-container to-tertiary-container text-on-surface transition duration-500 ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
