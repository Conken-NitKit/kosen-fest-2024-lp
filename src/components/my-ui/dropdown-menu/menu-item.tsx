import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import type { UseInteractionsReturn } from "@floating-ui/react";
import type { ComponentProps, ReactNode } from "react";

export type DropdownMenuItemRole = "menuitem" | "menuitemcheckbox" | "menuitemradio" | "option";

type Props = {
  leadingIcon?: (props: { className: string }) => ReactNode;
  label: ReactNode;
  trailingIcon?: (props: { className: string }) => ReactNode;
  role: DropdownMenuItemRole;
  getItemProps: UseInteractionsReturn["getItemProps"];
} & Omit<ComponentProps<"li">, "children" | "role" | "className">;
export const DropdownMenuItem = ({
  leadingIcon,
  label,
  trailingIcon,
  getItemProps,
  ...props
}: Props) => {
  return (
    <li
      className="flex h-[48px] min-w-[112px] max-w-[280px] items-center gap-padding-12"
      {...getItemProps(props)}
    >
      {leadingIcon?.({ className: "size-[24px] text-on-surface-variant" })}
      <span className={cn(font.labelLarge, "text-on-surface")}>{label}</span>
      {/* 最後のみ右寄せ */}
      {trailingIcon?.({ className: "size-[24px] ml-auto text-on-surface-variant" })}
    </li>
  );
};
