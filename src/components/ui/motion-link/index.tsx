import { type MotionProps, motion } from "motion/react";
import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, keyof MotionProps> & MotionProps;
export const MotionLink = (props: Props) => {
  return <MotionLinkPrimitive {...props} />;
};

const MotionLinkPrimitive = motion(Link);
