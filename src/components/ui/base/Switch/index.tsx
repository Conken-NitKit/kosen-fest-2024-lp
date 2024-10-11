"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type PropsWithChildren,
  forwardRef,
} from "react";

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  PropsWithChildren<
    ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
      thumbProps?: {
        className?: string;
      };
    }
  >
>(({ className, children, checked, onCheckedChange, thumbProps, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input",
        className,
      )}
      onCheckedChange={(isChecked) => {
        onCheckedChange?.(isChecked);
      }}
      checked={checked}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0",
          thumbProps?.className,
        )}
      >
        {children}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
