import { Container } from "@/components/ui/container";
import { Main } from "@/components/ui/main";
import { ThemeSelect } from "@/components/ui/theme-select";
import { type Artwork, Artworks } from "../artworks";
import { Heading } from "../heading";

type Props = {
  artworks: Artwork[];
};
export const Top = ({ artworks }: Props) => {
  return (
    <Container>
      {/* TODO: 実装できたら追加 */}
      <div className="absolute z-level1 flex">
        <div>Top App Bar</div>
        <div>コンピュータ研究部</div>
        <ThemeSelect />
      </div>
      <Main className="mt-spacer-normal flex flex-col items-center justify-center gap-spacer-normal">
        <Heading />
        <Artworks artworks={artworks} />
      </Main>
    </Container>
  );
};
