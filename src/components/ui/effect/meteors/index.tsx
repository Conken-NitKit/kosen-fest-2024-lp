import { cn } from "@/lib/utils";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          className={cn(
            "absolute top-1/2 left-1/2 h-[2px] w-[2px] animate-meteor-effect rounded-radius-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:-translate-y-[50%] before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
          }}
        />
      ))}
    </>
  );
};
