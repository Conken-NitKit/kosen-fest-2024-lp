import { type Picture, PicturesCarousel } from "./carousel";

type Props = {
  pictures: Picture[];
};
export const Pictures = ({ pictures }: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <PicturesCarousel pictures={pictures} />
    </div>
  );
};
