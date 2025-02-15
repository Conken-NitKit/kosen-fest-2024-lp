import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import NextLink from "next/link";
import { FloatingActionButton } from ".";

type Story = StoryObj<typeof FloatingActionButton>;

export const Surface: Story = {
  args: { color: "surface" },
};

export const Primary: Story = {
  args: { color: "primary" },
};

export const Secondary: Story = {
  args: { color: "secondary" },
};

export const Tertiary: Story = {
  args: { color: "tertiary" },
};

export const Disabled: Story = {
  args: { color: "surface", disabled: true },
};

export const Link: Story = {
  // args渡して指定するとなぜかエラーになったのでその対策でrender使ってる
  render: ({ color, ...args }) => (
    <FloatingActionButton color={color ? color : "surface"} {...args} asChild>
      <NextLink href="/" />
    </FloatingActionButton>
  ),
};

export const DisabledLink: Story = {
  render: ({ color, ...args }) => (
    <FloatingActionButton color={color ? color : "surface"} disabled {...args} asChild>
      <NextLink href="/" />
    </FloatingActionButton>
  ),
};

export default {
  title: "my-ui/floating-action-button",
  component: FloatingActionButton,
  args: {
    size: "md",
    shape: "default",
    elevation: "flat",
    icon: ({ className }) => <Pencil className={className} />,
  },
} satisfies Meta<typeof FloatingActionButton>;
