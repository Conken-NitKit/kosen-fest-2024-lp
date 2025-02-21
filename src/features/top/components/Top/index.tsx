"use client";

import { useEffect, useState } from "react";
import { Creations } from "../Creations";
import { LogoAnimation } from "../LogoAnimation";
import { Pictures } from "../Pictures";

export const Top = () => {
  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShow(false), 2000); // 2秒後に非表示
  //   return () => clearTimeout(timer);
  // }, []);

  // if (show) return <LogoAnimation />;

  return (
    <div>
      <div>コンピュータ研究部</div>
      <div>Pictures</div>
      <Pictures />
      <Creations />
    </div>
  );
};
