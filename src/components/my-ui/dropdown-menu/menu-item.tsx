import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { useListItem } from "@floating-ui/react";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

export type DropdownMenuItemRole = "menuitem" | "menuitemcheckbox" | "menuitemradio" | "option";

type Props = {
  leadingIcon?: (props: { className: string }) => ReactNode;
  label: string;
  trailingIcon?: (props: { className: string }) => ReactNode;
  role: DropdownMenuItemRole;
  disabled?: boolean;
} & Omit<ComponentProps<"li">, "children" | "role" | "className">;
/**
 * DropdownMenuItemはDropdownMenuとあわせて使う
 * @param props.leadingIcon - クラス名を引数に取る関数で、先頭に表示するアイコンをレンダリングします（オプション）
 * @param props.label - メニューアイテムのラベルテキスト
 * @param props.trailingIcon - クラス名を引数に取る関数で、末尾に表示するアイコンをレンダリングします（オプション）
 * @param props.role - メニューアイテムの役割属性。例："menuitem"、"menuitemcheckbox"、"menuitemradio"、"option"
 * @param props.disabled - メニューアイテムが無効かどうかを示すブール値（オプション）
 */
export const DropdownMenuItem = ({
  leadingIcon,
  label,
  trailingIcon,
  disabled,
  ...props
}: Props) => {
  const item = useListItem({ label: disabled ? null : label });

  return (
    <li
      className={cn(listVariants({ disabled }))}
      ref={item.ref}
      aria-disabled={disabled}
      {...props}
    >
      {leadingIcon?.({ className: "size-[24px] text-on-surface-variant" })}
      <span className={cn(font.labelLarge, "text-on-surface")}>{label}</span>
      {/* 最後のみ右寄せ */}
      {trailingIcon?.({ className: "size-[24px] ml-auto text-on-surface-variant" })}
    </li>
  );
};

const listVariants = cva(
  "flex h-[48px] min-w-[112px] max-w-[280px] items-center gap-padding-12 bg-surface-container px-padding-12",
  {
    variants: {
      disabled: {
        true: "",
        false: "hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);
