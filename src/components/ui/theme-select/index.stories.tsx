import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSelect } from ".";

type Story = StoryObj<typeof ThemeSelect>;

export const Default: Story = {};

export default {
  title: "ui/theme-switch",
  component: ThemeSelect,
} satisfies Meta<typeof ThemeSelect>;
