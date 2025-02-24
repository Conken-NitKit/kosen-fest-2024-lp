import { useRingBufferIndex } from "@/hooks/use-ring-buffer-index";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props<T> = {
  items: T[];
  className: string;
  children: (props: { item: T; className: string }) => ReactNode;
};
export const CenterAlignedHeroCarousel = <T,>({ items, className, children }: Props<T>) => {
  const [getSelectedIndex, controlSelectedIndex] = useRingBufferIndex(items.length);

  return (
    <section
      className={cn(
        "grid grid-cols-[minmax(40px,56px)_1fr_minmax(40px,56px)] grid-rows-1 gap-padding-8 px-padding-16 py-padding-8",
        className,
      )}
    >
      <button
        type="button"
        className="h-full rounded-radius-xl border-border-1 border-outline bg-surface shadow-flat"
        onClick={() => {
          controlSelectedIndex.setPrev();
        }}
      >
        {children({ item: items[getSelectedIndex(-1)], className: "rounded-radius-xl" })}
      </button>
      <div className="h-full rounded-radius-xl border-border-1 border-outline bg-surface shadow-flat">
        {children({ item: items[getSelectedIndex()], className: "rounded-radius-xl" })}
      </div>
      <button
        type="button"
        className="h-full rounded-radius-xl border-border-1 border-outline bg-surface shadow-flat"
        onClick={() => {
          controlSelectedIndex.setNext();
        }}
      >
        {children({ item: items[getSelectedIndex(1)], className: "rounded-radius-xl" })}
      </button>
    </section>
  );
};
