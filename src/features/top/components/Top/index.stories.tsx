import type { Meta, StoryObj } from "@storybook/react";
import { Top } from ".";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export default {
  title: "features/top/top",
  component: Top,
  args: {
    pictures: Array.from({ length: 10 }).map((_, i) =>
      i % 3 === 0 || i % 5 === 0
        ? { src: "/placeholder/square.png", alt: "mock", id: i.toString() }
        : { src: "/placeholder/banner.png", alt: "mock", id: i.toString() },
    ),
  },
} satisfies Meta<typeof Top>;
