"use client";

import { motion } from "framer-motion";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider
      disableTransitionOnChange
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      <Motion>{children}</Motion>
    </NextThemeProvider>
  );
};

const Motion = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="bg-background"
      animate={{ backgroundColor: theme === "dark" ? "#080808" : "#ffffff" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
