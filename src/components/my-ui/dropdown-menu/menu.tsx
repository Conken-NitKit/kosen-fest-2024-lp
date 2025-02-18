import { getElementOrThrow } from "@/utils/get-element-or-throw";
import {
  FloatingFocusManager,
  FloatingPortal,
  type UseFloatingOptions,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  memo,
  useState,
} from "react";
import { Slot } from "../core/slot";

type Props = {
  trigger: ReactNode;
  onOpenChange?: UseFloatingOptions["onOpenChange"];
  // roleは指定できるようにする
  role?: "menu" | "select" | "combobox";
};
/**
 * 「ただのメニューまたは入力候補を表示するため」に使うべき
 * - `Dialog`と違い、背景は暗くしない。スクロールは固定せず、別の要素をクリックできる
 * - overlayをクリックするなどして閉じる点は`Dialog`と同じ
 * - `trigger`要素の下に可能な限り少しスペースを開けてメニューを配置し、できなければ上に配置する
 * @param props.trigger - 何らかの`button`
 * @param props.children - `DropdownMenuItem`等
 * @param props.role - 「入力候補を表示する」用途の場合に指定（デフォルトは`"menu"`）
 */
export const DropdownMenu = memo(
  ({
    trigger,
    children,
    onOpenChange: handleOpenChange,
    role = "menu",
  }: PropsWithChildren<Props>) => {
    // trigger要素のpropsを取得
    const triggerProps = (
      getElementOrThrow(trigger) as unknown as ReactElement<HTMLAttributes<Element>>
    ).props;

    const [isOpen, setIsOpen] = useState(false);
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
    // Floating UIを使う時はクリックするためにonClickではなくこちらを使う
    const clickProps = useClick(context);
    // menu外側をクリックするなどして閉じる
    const dismissProps = useDismiss(context);
    const roleProps = useRole(context, { role });
    const { getReferenceProps, getFloatingProps } = useInteractions([
      clickProps,
      dismissProps,
      roleProps,
    ]);

    return (
      <div>
        <Slot element={trigger} ref={refs.setReference} {...getReferenceProps(triggerProps)} />
        {/* 背景は暗くしない。スクロールは固定せず、別の要素をクリックできる */}
        {/* 閉じている時、hidden等のスタイルによる制御でなく、要素を非表示にする */}
        {isOpen && (
          <FloatingPortal>
            {/* modal={true}だと、modal内のみのフォーカスに制限されるので無効にする */}
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-level2 min-w-max"
              >
                {/* childrenでlist表示 */}
                <ul className="bg-surface-container px-padding-12 py-padding-8">{children}</ul>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    );
  },
);
