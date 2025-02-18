import { type ReactNode, isValidElement } from "react";

/** elementがJSXタグなら値を返し、そうでなければエラーを投げる */
export const getElementOrThrow = (element: ReactNode) => {
  // isValidElementでelementがJSXタグか判定
  if (isValidElement(element)) {
    return element;
  }
  throw new Error("children must be a JSX tag");
};
