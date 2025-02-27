import {
  UncontainedCarousel,
  UncontainedCarouselItem,
} from "@/components/my-ui/carousel/uncontained";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type Artwork = {
  src: string;
  alt: string;
  id: string;
};

type Props = {
  artworks: Artwork[];
};
export const ArtworksCarousel = ({ artworks }: Props) => {
  return (
    <UncontainedCarousel className="h-[400px] w-full" loop autoScrollOptions={{ playOnInit: true }}>
      {artworks.map(({ src, alt, id }) => (
        <UncontainedCarouselItem key={id}>
          {({ className }) => (
            <Link href={`/artworks/${id}`}>
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
