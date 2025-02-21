import { MotionLink } from "@/components/ui/motion-link";
import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import { Command, Pencil, Scissors } from "lucide-react";
import { FloatingActionButton } from "../floating-action-button";
import { DropdownMenu } from "./menu";
import { DropdownMenuItem } from "./menu-item.container";

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

export const Link: Story = {
  args: {
    children: Array.from({ length: 4 }).map((_, index) => (
      <DropdownMenuItem
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        label={`${index} Menu Item`}
        leadingIcon={(props) => <Scissors {...props} />}
        trailingIcon={({ className }) => (
          <div className={cn("flex", className)}>
            <Command />
            <span>X</span>
          </div>
        )}
        element={<MotionLink href="/" />}
      />
    )),
  },
};

export default {
  title: "my-ui/dropdown-menu/dropdown-menu",
  component: DropdownMenu,
  args: {
    trigger: () => (
      <FloatingActionButton size="md" shape="default" color="surface">
        {(props) => <Pencil {...props} />}
      </FloatingActionButton>
    ),
    children: Array.from({ length: 4 }).map((_, index) => (
      <DropdownMenuItem
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        label={`${index} Menu Item`}
        leadingIcon={(props) => <Scissors {...props} />}
        trailingIcon={({ className }) => (
          <div className={cn("flex", className)}>
            <Command />
            <span>X</span>
          </div>
        )}
      />
    )),
  },
} satisfies Meta<typeof DropdownMenu>;
