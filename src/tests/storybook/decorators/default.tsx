import { ThemeProvider } from "@/providers/theme-provider";
import type { Decorator } from "@storybook/react";

export const DefaultDecorator: Decorator = (Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
