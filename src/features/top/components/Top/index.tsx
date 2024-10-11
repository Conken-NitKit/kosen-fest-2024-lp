"use client";

import { ThemeSwitch } from "@/components/ui/domain/ThemeSwitch";
import { Creations } from "../Creations";
import { Pictures } from "../Pictures";

export const Top = () => {
  return (
    <div>
      <div>コンピュータ研究部</div>
      <div>Pictures</div>
      <ThemeSwitch />
      <Pictures />
      <Creations />
    </div>
  );
};
