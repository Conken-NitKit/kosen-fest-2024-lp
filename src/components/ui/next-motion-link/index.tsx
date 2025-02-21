import { motion } from "motion/react";
import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

export const NextMotionLink = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<ComponentProps<typeof Link>, "passHref" | "legacyBehavior">>) => {
  return (
    <Link {...props} passHref legacyBehavior>
      {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
      <motion.a className={className}>{children}</motion.a>
    </Link>
  );
};
