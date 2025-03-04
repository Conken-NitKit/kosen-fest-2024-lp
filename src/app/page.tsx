import { artworks } from "@/config/artworks";
import { Top } from "@/features/top/components/top";

export default function TopPage() {
  return <Top artworks={artworks} />;
}
