import { type HTMLAttributes, type ReactNode, type Ref, cloneElement, isValidElement } from "react";

type Props = { element: ReactNode; ref?: Ref<HTMLElement> } & HTMLAttributes<HTMLElement>;

/**
 * `element`を基に、異なる`props`と`children`を持ったReact要素を作成するコンポーネント
 * - `element.props`が引数`props`と被った場合`element.props`は上書きされる
 * - `element.props.children`が引数`children` と被った場合`element.props.children`は上書きされる
 * @param props.element - React要素
 * @param props.children - 上書きしたい`children`
 * @param props.props - 上書きしたい`props`
 */
export const Slot = ({ element, children, ...props }: Props) => {
  // elementがJSXタグか判定し、cloneElementを実行
  return cloneElement(getElementOrThrow(element), props, children);
};

/** elementがJSXタグなら値を返し、そうでなければエラーを投げる */
const getElementOrThrow = (element: ReactNode) => {
  // isValidElementでelementがJSXタグか判定
  if (isValidElement(element)) {
    return element;
  }
  throw new Error("children must be a JSX tag");
};
