import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { FloatingActionButton } from ".";

type Story = StoryObj<typeof FloatingActionButton>;

export const Small: Story = {};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
  },
};

export default {
  title: "my-ui/floating-action-button",
  component: FloatingActionButton,
  args: {
    icon: ({ className }) => <Pencil className={className} />,
    size: "sm",
  },
} satisfies Meta<typeof FloatingActionButton>;
