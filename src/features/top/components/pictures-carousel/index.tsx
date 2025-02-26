import {
  UncontainedCarousel,
  UncontainedCarouselItem,
} from "@/components/my-ui/carousel/uncontained";
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type Picture = {
  src: string;
  alt: string;
  id: string;
};

type Props = {
  pictures: Picture[];
};
export const PicturesCarousel = ({ pictures }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <UncontainedCarousel
      className="h-[400px] w-full xl:w-[1280px]"
      loop
      autoScrollOptions={{ playOnInit: true }}
      // initアニメーション
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      {pictures.map(({ src, alt, id }) => (
        <UncontainedCarouselItem key={id}>
          {({ className }) => (
            <Link href={`/pictures/${id}`}>
              <Image
                src={src}
                alt={alt}
                className={cn("h-full w-auto", className)}
                height={200}
                width={500}
                priority
              />
            </Link>
          )}
        </UncontainedCarouselItem>
      ))}
    </UncontainedCarousel>
  );
};
