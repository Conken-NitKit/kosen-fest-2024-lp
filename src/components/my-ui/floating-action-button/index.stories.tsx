import { NextMotionLink } from "@/components/ui/next-motion-link";
import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { FloatingActionButton } from ".";

type Story = StoryObj<typeof FloatingActionButton>;

export const Surface: Story = {};

export const Link: Story = {
  // argsを使って指定するとなぜかエラーになったのでその対策でrender使ってる
  render: (args) => <FloatingActionButton {...args} element={() => <NextMotionLink href="/" />} />,
};

export default {
  title: "my-ui/floating-action-button",
  component: FloatingActionButton,
  args: {
    color: "surface",
    size: "md",
    shape: "default",
    type: "button",
    children: ({ className }) => <Pencil className={className} />,
  },
} satisfies Meta<typeof FloatingActionButton>;
