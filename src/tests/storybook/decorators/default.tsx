import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Decorator } from "@storybook/react";

export const DefaultDecorator: Decorator = (Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
