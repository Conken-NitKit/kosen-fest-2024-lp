import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSelect } from ".";

type Story = StoryObj<typeof ThemeSelect>;

export const Default: Story = {};

export default {
  title: "ui/theme-select",
  component: ThemeSelect,
  args: {
    enableTheme: false,
  },
} satisfies Meta<typeof ThemeSelect>;
