import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  render?: (props: { children: ReactNode }) => ReactNode;
} & ComponentProps<typeof motion.a>;
/**
 * motion.aをベースにしたリンクコンポーネント
 * @param props.render - 子要素をレンダリングするための関数（オプション）
 * @param props.props - motion.aコンポーネントに渡されるプロパティ（オプション）
 */
export const Link = ({ render, ...props }: Props) => {
  if (render) {
    return render({ children: <motion.a {...props} /> });
  }

  return <motion.a {...props} />;
};

/** 実際にLinkが受け取るPropsとは違い、オブジェクトで指定するときにわかりやすくした共通して用いる型 */
export type LinkProps = {
  render?: (props: { children: ReactNode }) => ReactNode;
  props?: ComponentProps<typeof motion.a>;
};
