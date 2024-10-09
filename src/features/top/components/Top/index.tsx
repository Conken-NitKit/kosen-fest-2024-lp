import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";
import { Creations } from "../Creations";
import { Pictures } from "../Pictures";
export const Top = () => {
  return (
    <div>
      <div>コンピュータ研究部</div>
      <div>Pictures</div>
      <ThemeModeToggle />
      <Pictures />
      <Creations />
    </div>
  );
};
