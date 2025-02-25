import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import type { PropsWithChildren } from "react";

type Props = {
  className: string;
};
/**
 * 画像の幅に合わせてカルーセルを表示するコンポーネント
 * @param props.children - UncontainedCarouselItemを渡す
 * @param props.className - これでheight, widthを画面サイズに応じて指定する必要がある
 */
export const UncontainedCarousel = ({ className, children }: PropsWithChildren<Props>) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  return (
    <section className="px-padding-16 py-padding-8">
      {/* カルーセルの表示領域。ここにheight, widthを適用 */}
      <div ref={emblaRef} className={cn("overflow-hidden", className)}>
        {/* コンテナ。ここにrefでtransformが当たることでスクロールして移動する */}
        <ul className="flex h-full gap-padding-8">{children}</ul>
      </div>
    </section>
  );
};
