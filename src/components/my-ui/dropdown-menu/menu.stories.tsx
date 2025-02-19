import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import { Command, Pencil, Scissors } from "lucide-react";
import { FloatingActionButton } from "../floating-action-button";
import { DropdownMenu } from "./menu";
import { DropdownMenuItem } from "./menu-item";

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

export default {
  title: "my-ui/dropdown-menu",
  component: DropdownMenu,
  args: {
    trigger: () => (
      <FloatingActionButton size="md" shape="default" color="surface" design="flat">
        {(props) => <Pencil {...props} />}
      </FloatingActionButton>
    ),
    children: (props) =>
      Array.from({ length: 4 }).map((_, index) => (
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
          {...props}
        />
      )),
  },
} satisfies Meta<typeof DropdownMenu>;
