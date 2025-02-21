import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  type UseFloatingOptions,
  type UseInteractionsReturn,
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
import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { match } from "ts-pattern";
import { Slot } from "../core/slot";
import { DropdownMenuProvider } from "./provider";

export type DropdownMenuRole = "menu" | "select" | "combobox" | "menucheckbox" | "menuradio";

type Props = {
  trigger: (props: { selectedLabel: string | null }) => ReactNode;
  children: ReactNode;
  // roleは指定できるようにする
  role?: DropdownMenuRole;
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
    children,
    onOpenChange: handleOpenChange,
    role = "menu",
    loop,
  }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // メニューの用途の場合これは無効化される
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
    const handleSelect = useCallback(
      (index: number) => {
        // メニューの用途でない場合のみselect状態を管理する
        if (role === "select" || role === "combobox") {
          setSelectedIndex(index);
        }
        setIsOpen(false);
      },
      [role],
    );

    const getItemPropsFactory = useCallback(
      (index: number) => {
        const fn: UseInteractionsReturn["getItemProps"] = (props) => {
          return getItemProps({
            ...props,
            // 選択時の処理
            // MouseEventにはジェネリクスがなかったのでこう
            onClick: (e: React.MouseEvent<HTMLLIElement>) => {
              props?.onClick?.(e);
              handleSelect(index);
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => {
              props?.onKeyDown?.(e);
              if (e.key === "Enter") {
                // ここでe.preventDefaultしないとバグる
                e.preventDefault();
                handleSelect(index);
              }
            },
          });
        };
        return fn;
      },
      [getItemProps, handleSelect],
    );

    const trigger = renderTrigger({
      // メニューの用途の場合このラベルは常にnullになる
      selectedLabel: selectedIndex ? menuItemLabelRef.current[selectedIndex] : null,
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
        <DropdownMenuProvider
          getItemPropsFactory={getItemPropsFactory}
          activeIndex={activeIndex}
          selectedIndex={selectedIndex}
          role={role}
        >
          <FloatingList elementsRef={menuItemRef} labelsRef={menuItemLabelRef}>
            {isOpen && (
              // createPortalでここだけdocument.body内にレンダリング
              <FloatingPortal>
                {/* modal={true}だと、modal内のみのフォーカスに制限されるので無効にする */}
                <FloatingFocusManager context={context} modal={false}>
                  <ul
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-level2 inline-flex min-w-[112px] max-w-[280px] flex-col rounded-radius-xs bg-surface-container py-padding-8 outline-0"
                  >
                    {children}
                  </ul>
                </FloatingFocusManager>
              </FloatingPortal>
            )}
          </FloatingList>
        </DropdownMenuProvider>
      </div>
    );
  },
);
