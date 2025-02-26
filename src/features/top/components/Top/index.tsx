import { Container } from "@/components/ui/container";
import { Main } from "@/components/ui/main";
import { ThemeSelect } from "@/components/ui/theme-select";
import { Heading } from "../heading";
import { type Picture, PicturesCarousel } from "../pictures-carousel";

type Props = {
  pictures: Picture[];
};
export const Top = ({ pictures }: Props) => {
  return (
    <Container>
      {/* TODO: 実装できたら追加 */}
      <div className="flex">
        <div>Top App Bar</div>
        <div>コンピュータ研究部</div>
        <ThemeSelect />
      </div>
      <Main className="mt-spacer-normal flex flex-col items-center justify-center gap-spacer-normal">
        <Heading />
        <PicturesCarousel pictures={pictures} />
      </Main>
    </Container>
  );
};
