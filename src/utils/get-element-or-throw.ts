import { type ReactElement, isValidElement } from "react";

export const getElementOrThrow = (element: ReactElement) => {
  // isValidElementでchildrenがJSXタグか判定
  if (isValidElement(element)) {
    return element;
  }
  throw new Error("children must be a JSX tag");
};
