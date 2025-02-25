"use client";

import { cn } from "@/lib/utils";
import { uuid } from "@/utils/uuid";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

type Props = {
  texts: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursor?: { className?: string };
};
/**
 * タイピングアニメーションのあるテキスト
 * @param props.texts - テキストの配列。適用したいスタイルごとに文字列を分ける
 * @param props.cursor - カーソル(キャレット)をカスタマイズしたいときに設定
 */
export const TypingAnimationText = ({ texts, className, cursor }: Props) => {
  // 受け取ったテキストを単語単位の配列にする。単語自体は文字配列として管理する
  const wordsArray = texts.flatMap(({ text, className }) =>
    text.split(" ").map((word) => ({ text: word.split(""), className })),
  );

  // scope: その範囲内に絞るためのref
  const [scope, animate] = useAnimate();
  // その要素が画面内に入ったかどうか判定
  const isInView = useInView(scope);
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
            <div key={uuid()} className="inline-block">
              {word.text.map((char, index) => (
                // ここは最初は非表示だが、表示されるときにinline-block opacity-100 w-fitが付与される
                <motion.span
                  initial={{}}
                  key={uuid()}
                  className={cn("hidden text-black opacity-0 dark:text-white", word.className)}
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
    <div
      className={cn(
        "text-center font-bold text-base sm:text-xl md:text-3xl lg:text-5xl",
        className,
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
          "inline-block h-4 w-[4px] rounded-sm bg-blue-500 md:h-6 lg:h-10",
          cursor?.className,
        )}
      />
    </div>
  );
};
