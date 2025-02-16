import type { Meta, StoryObj } from "@storybook/react";
import NextLink from "next/link";
import { Card } from ".";

type Story = StoryObj<typeof Card>;

export const Elevated: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Button: Story = {
  args: { mode: "button" },
};

export const DisabledButton: Story = {
  args: { mode: "button", disabled: true },
};

export const Link: Story = {
  render: ({ color, elevation, children }) => {
    return (
      <Card mode="link" tag={<NextLink href="/" />} color={color} elevation={elevation}>
        {children}
      </Card>
    );
  },
};

export const DisabledLink: Story = {
  render: ({ color, elevation, children }) => {
    return (
      <Card mode="link" tag={<NextLink href="/" />} color={color} elevation={elevation} disabled>
        {children}
      </Card>
    );
  },
};

export default {
  title: "my-ui/card",
  component: Card,
  args: {
    color: "elevated",
    elevation: "flat",
    children: "Card Content",
  },
} satisfies Meta<typeof Card>;
