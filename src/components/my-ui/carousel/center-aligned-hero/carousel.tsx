import { useRingBufferIndex } from "@/hooks/use-ring-buffer-index";
import { cn } from "@/lib/utils";
import { AnimatePresence, type HTMLMotionProps, motion, usePresenceData } from "motion/react";
import { type PropsWithChildren, type ReactNode, useState } from "react";

type Props<T> = {
  items: T[];
  className: string;
  children: (props: { item: T; className: string }) => ReactNode;
};
export const CenterAlignedHeroCarousel = <T,>({ items, className, children }: Props<T>) => {
  const [getSelectedIndex, controlSelectedIndex] = useRingBufferIndex(items.length);
  const [direction, setDirection] = useState<-1 | 1>(1);

  return (
    <section
      className={cn(
        "grid grid-cols-[minmax(40px,56px)_1fr_minmax(40px,56px)] grid-rows-1 gap-padding-8 px-padding-16 py-padding-8",
        className,
      )}
    >
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <SmallItem
          key={getSelectedIndex(-1)}
          type="button"
          onClick={() => {
            controlSelectedIndex.setPrev();
            setDirection(-1);
          }}
        >
          {children({ item: items[getSelectedIndex(-1)], className: "rounded-radius-xl" })}
        </SmallItem>
      </AnimatePresence>
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <LargeItem key={getSelectedIndex()}>
          {children({ item: items[getSelectedIndex()], className: "rounded-radius-xl" })}
        </LargeItem>
      </AnimatePresence>
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <SmallItem
          key={getSelectedIndex(1)}
          type="button"
          onClick={() => {
            controlSelectedIndex.setNext();
            setDirection(1);
          }}
        >
          {children({ item: items[getSelectedIndex(1)], className: "rounded-radius-xl" })}
        </SmallItem>
      </AnimatePresence>
    </section>
  );
};

const LargeItem = ({ children }: PropsWithChildren) => {
  const direction = usePresenceData();
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", delay: 0.1, visualDuration: 0.1, bounce: 0.4 },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="h-full rounded-radius-xl border-border-1 border-outline bg-surface shadow-flat"
    >
      {children}
    </motion.div>
  );
};

const SmallItem = ({ className, children, ...props }: HTMLMotionProps<"button">) => {
  const direction = usePresenceData();
  return (
    <motion.button
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", delay: 0.1, visualDuration: 0.1, bounce: 0.4 },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className={cn(
        "h-full rounded-radius-xl border-border-1 border-outline bg-surface shadow-flat",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
