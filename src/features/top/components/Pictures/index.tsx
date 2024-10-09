"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    src: "https://via.placeholder.com/800x600/FF5733/FFFFFF?text=Stylish+Image+1",
  },
  {
    id: 2,
    src: "https://via.placeholder.com/800x600/33FF57/FFFFFF?text=Stylish+Image+2",
  },
  {
    id: 3,
    src: "https://via.placeholder.com/800x600/5733FF/FFFFFF?text=Stylish+Image+3",
  },
  {
    id: 4,
    src: "https://via.placeholder.com/800x600/FFFF33/000000?text=Stylish+Image+4",
  },
];

export const Pictures = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Card className="mx-auto w-full max-w-3xl overflow-hidden">
      <CardContent className="relative p-0">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.id}>
                <div className="relative h-[400px] sm:h-[500px]">
                  <Image
                    src={image.src}
                    alt="picture"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="-translate-y-1/2 absolute top-1/2 left-2 transform rounded-full bg-black/20 text-white hover:bg-black/40"
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext
            className="-translate-y-1/2 absolute top-1/2 right-2 transform rounded-full bg-black/20 text-white hover:bg-black/40"
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </CarouselNext>
        </Carousel>
        <div className="-translate-x-1/2 absolute bottom-4 left-1/2 flex transform space-x-2">
          {images.map((image, index) => (
            <Button
              key={image.id}
              variant="ghost"
              size="sm"
              className={`h-2 w-2 rounded-full p-0 transition-all duration-300 ${
                index === current ? "scale-125 bg-white" : "bg-white/50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
