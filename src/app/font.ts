import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const fontVariables = `${roboto.variable}`;
