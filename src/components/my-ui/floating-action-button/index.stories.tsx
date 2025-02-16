import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import NextLink from "next/link";
import { FloatingActionButton } from ".";

type Story = StoryObj<typeof FloatingActionButton>;

export const Surface: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Link: Story = {
  // args渡して指定するとなぜかエラーになったのでその対策でrender使ってる
  render: (args) => (
    <FloatingActionButton {...args} asChild>
      <NextLink href="/" />
    </FloatingActionButton>
  ),
};

export const DisabledLink: Story = {
  render: (args) => (
    <FloatingActionButton disabled {...args} asChild>
      <NextLink href="/" />
    </FloatingActionButton>
  ),
};

export default {
  title: "my-ui/floating-action-button",
  component: FloatingActionButton,
  args: {
    color: "surface",
    size: "md",
    shape: "default",
    elevation: "flat",
    type: "button",
    icon: ({ className }) => <Pencil className={className} />,
  },
} satisfies Meta<typeof FloatingActionButton>;
