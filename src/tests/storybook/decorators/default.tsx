import { fontVariables } from "@/app/font";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Decorator } from "@storybook/react";
import { useEffect } from "react";

export const DefaultDecorator: Decorator = (Story) => {
  // フォントを追加
  useEffect(() => {
    const fontVariableArray = fontVariables.split(" ");

    document.documentElement.classList.add(...fontVariableArray, "list-none");
    document.body.classList.add(
      "bg-surface",
      "text-on-surface",
      "transition",
      "duration-500",
      "ease-in-out",
    );
    return () => {
      document.documentElement.classList.remove(...fontVariableArray, "list-none");
      document.body.classList.remove(
        "bg-surface",
        "text-on-surface",
        "transition",
        "duration-500",
        "ease-in-out",
      );
    };
  }, []);

  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
