import { cn } from "@/lib/utils";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  type UseFloatingOptions,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { cva } from "class-variance-authority";
import {
  Children,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  memo,
  useRef,
  useState,
} from "react";
import { match } from "ts-pattern";
import { Slot } from "../core/slot";
import type { DropdownMenuItemRole } from "./menu-item";

type Props = {
  trigger: (props: { selectedLabel: string | null }) => ReactNode;
  children: (props: { role: DropdownMenuItemRole }) => ReactNode;
  // roleは指定できるようにする
  role?: "menu" | "select" | "combobox" | "menucheckbox" | "menuradio";
  loop?: boolean;
  onOpenChange?: UseFloatingOptions["onOpenChange"];
};
/**
 * 「ただのメニューまたは入力候補を表示するため」に使うべき
 * - `Dialog`と違い、背景は暗くしない。スクロールは固定せず、別の要素をクリックできる
 * - overlayをクリックするなどして閉じる点は`Dialog`と同じ
 * - `trigger`要素の下に可能な限り少しスペースを開けてメニューを配置し、できなければ上に配置する
 * @param props.trigger - 何らかの`button`
 * @param props.children - `DropdownMenuItem`等
 * @param props.role - 入力候補を表示するとき、リストをフィルタリングするための入力も含まれている場合は`"combobox"`、一般用途であれば`"select"`を使用する必要がある（デフォルトは`"menu"`）
 * @param props.loop - Menu内を最初の項目または最後の項目を過ぎて移動するときにフォーカスをループさせるかどうかを決定
 */
export const DropdownMenu = memo(
  ({
    trigger: renderTrigger,
    children: renderChildren,
    onOpenChange: handleOpenChange,
    role = "menu",
    loop,
  }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // MenuItemの一覧。getItemPropsからコンテキスト経由で設定
    const menuItemRef = useRef<Array<HTMLElement | null>>([]);
    // MenuItemのラベル一覧。disabledとなっているものはnullになっている。useListItemを使ってコンテキスト経由で設定
    const menuItemLabelRef = useRef<Array<string | null>>([]);

    // Tailwindは動的なピクセル値を持つクラスをサポートしていないのでFloating UIを使う
    const { refs, floatingStyles, context } = useFloating({
      placement: "bottom-start",
      open: isOpen,
      onOpenChange: (open, event, reason) => {
        setIsOpen(open);
        handleOpenChange?.(open, event, reason);
      },
      // trigger要素の下に可能な限りメニューを配置し、できなければ上に配置する
      middleware: [flip(), shift()],
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      // Floating UIを使う時はクリックするためにonClickではなくこちらを使う
      useClick(context),
      // menu外側をクリックするなどして閉じる
      useDismiss(context),
      useRole(context, {
        role: match(role)
          .with("combobox", "select", (v) => v)
          .otherwise(() => "menu"),
      }),
      useListNavigation(context, {
        listRef: menuItemRef,
        activeIndex,
        selectedIndex,
        // ホバーやキーボードによるアクティブ変更を検知してセット
        onNavigate: setActiveIndex,
        // 最初の項目または最後の項目を過ぎて移動するときにフォーカスをループさせるかどうかを決定
        loop,
      }),
      // ユーザーの入力時に項目にフォーカスを当てる
      useTypeahead(context, {
        listRef: menuItemLabelRef,
        activeIndex,
        selectedIndex,
        // 開いている時だけ更新
        onMatch: isOpen ? setActiveIndex : undefined,
      }),
    ]);

    // ユーザーが選択した時選択されたものを更新して閉じる
    const handleSelect = (index: number) => {
      setSelectedIndex(index);
      setIsOpen(false);
    };

    const trigger = renderTrigger({
      selectedLabel: selectedIndex ? menuItemLabelRef.current[selectedIndex] : null,
    });

    const children = renderChildren({
      role: match(role)
        .returnType<DropdownMenuItemRole>()
        .with("menu", () => "menuitem")
        .with("menucheckbox", () => "menuitemcheckbox")
        .with("menuradio", () => "menuitemradio")
        .otherwise(() => "option"),
    });

    return (
      <div>
        {/* trigger */}
        <Slot
          element={trigger}
          ref={refs.setReference}
          {...getReferenceProps(
            (trigger as unknown as ReactElement<HTMLAttributes<HTMLElement>>).props,
          )}
        />
        {/* 背景は暗くしない。スクロールは固定せず、別の要素をクリックできる */}
        {/* 閉じている時、hidden等のスタイルによる制御でなく、要素を非表示にする */}
        <FloatingList elementsRef={menuItemRef} labelsRef={menuItemLabelRef}>
          {isOpen && (
            <FloatingPortal>
              {/* modal={true}だと、modal内のみのフォーカスに制限されるので無効にする */}
              <FloatingFocusManager context={context} modal={false}>
                <ul
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                  className={cn(menuBoxVariants())}
                >
                  {Children.map(
                    children as unknown as ReactElement<HTMLAttributes<HTMLElement>>,
                    (child, i) => (
                      <Slot
                        element={child}
                        {...getItemProps({
                          ...child.props,
                          // 選択時の処理
                          onClick: (e) => {
                            child.props.onClick?.(e);
                            handleSelect(i);
                          },
                          onKeyDown: (e) => {
                            child.props.onKeyDown?.(e);
                            if (e.key === "Enter") {
                              // ここでe.preventDefaultしないとバグる
                              e.preventDefault();
                              handleSelect(i);
                            }
                          },
                        })}
                        // ホバーやキーボード操作に応じてフォーカス
                        tabIndex={i === activeIndex ? 0 : -1}
                      />
                    ),
                  )}
                </ul>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </div>
    );
  },
);

const menuBoxVariants = cva(
  "z-level2 min-w-[112px] max-w-[280px] rounded-radius-xs bg-surface-container px-padding-12 py-padding-8 outline-0",
);
