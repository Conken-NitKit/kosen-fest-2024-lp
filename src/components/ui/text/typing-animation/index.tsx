"use client";

import { Slot } from "@/components/my-ui/core/slot";
import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { type HtmlHTMLAttributes, type ReactElement, type ReactNode, useEffect } from "react";

type Props = {
  texts: {
    text: string;
    className?: string;
  }[];
  cursor?: { className?: string };
  element?: ReactNode;
};
/**
 * タイピングアニメーションのあるテキスト
 * @param props.texts - テキストの配列。適用したいスタイルごとに文字列を分ける
 * @param props.cursor - カーソル(キャレット)をカスタマイズしたいときに設定
 * @param props.element - このコンポーネントのタグを変更したいときに設定
 */
export const TypingAnimationText = ({ texts, cursor, element }: Props) => {
  // 受け取ったテキストを単語単位の配列にする。単語自体は文字配列として管理する
  const wordsArray = texts.flatMap(({ text, className }) =>
    text
      .split(" ")
      // split("")では絵文字は分割されないのでArray.fromを使うべき
      .map((word) => ({ text: Array.from(word), className })),
  );

  // scope: その範囲内に絞るためのref
  const [scope, animate] = useAnimate();
  // その要素が画面内に入ったかどうか判定
  const isInView = useInView(scope, { once: true });
  useEffect(() => {
    if (isInView) {
      // scope範囲内にあるspanに文字ごとのアニメーションを適用
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          // 文字ごとに0.1秒遅延
          delay: stagger(0.1),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            // ここはindexでkey指定をする
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                // ここは最初は非表示だが、表示されるときにinline-block opacity-100 w-fitが付与される
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={`char-${index}`}
                  initial={{}}
                  className={cn("hidden text-on-surface opacity-0", word.className)}
                >
                  {char}
                </motion.span>
              ))}
              {/* スペース */}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <Slot
      element={element ? element : <div />}
      className={cn(
        font.display,
        "font-bold",
        (element as unknown as ReactElement<HtmlHTMLAttributes<HTMLElement>> | undefined)?.props
          .className,
      )}
    >
      {renderWords()}
      {/* カーソル(キャレット) */}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-[16px] w-[4px] rounded-radius-xs bg-on-surface md:h-[24px] lg:h-[40px]",
          cursor?.className,
        )}
      />
    </Slot>
  );
};
