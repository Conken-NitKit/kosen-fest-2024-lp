import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export default {
  title: "my-ui",
  component: IconButton,
} satisfies Meta<typeof IconButton>;
