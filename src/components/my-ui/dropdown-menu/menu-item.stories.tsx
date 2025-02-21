import { MotionLink } from "@/components/ui/motion-link";
import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import { Command, Scissors } from "lucide-react";
import { DropdownMenuItem } from "./menu-item";

type Story = StoryObj<typeof DropdownMenuItem>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    leadingIcon: (props) => <Scissors {...props} />,
    trailingIcon: ({ className }) => (
      <div className={cn("flex", className)}>
        <Command />
        <span>X</span>
      </div>
    ),
  },
};

export const WithOnlyLeadingIcon: Story = {
  args: {
    leadingIcon: (props) => <Scissors {...props} />,
  },
};

export const WithOnlyTrailingIcon: Story = {
  args: {
    trailingIcon: ({ className }) => (
      <div className={cn("flex", className)}>
        <Command />
        <span>X</span>
      </div>
    ),
  },
};

export const Focusable: Story = {
  args: {
    tabIndex: 0,
  },
};

export const Link: Story = {
  args: {
    element: <MotionLink href="/" />,
  },
};

export default {
  title: "my-ui/dropdown-menu/dropdown-menu-item",
  component: DropdownMenuItem,
  args: {
    label: "Menu Item",
    role: "menuitem",
    selected: false,
    disabled: false,
  },
} satisfies Meta<typeof DropdownMenuItem>;
