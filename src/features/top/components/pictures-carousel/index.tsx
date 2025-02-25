import {
  UncontainedCarousel,
  UncontainedCarouselItem,
} from "@/components/my-ui/carousel/uncontained";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type Picture = {
  src: string;
  alt: string;
  id: string;
};

type Props = {
  pictures: Picture[];
};
export const PicturesCarousel = ({ pictures }: Props) => {
  return (
    <UncontainedCarousel className="h-[400px] w-full xl:w-[1280px]">
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
