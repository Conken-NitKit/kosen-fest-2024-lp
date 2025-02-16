import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitch } from ".";

type Story = StoryObj<typeof ThemeSwitch>;

export const Default: Story = {};

export default {
  title: "components/ui/domain/theme-switch",
  component: ThemeSwitch,
} satisfies Meta<typeof ThemeSwitch>;
