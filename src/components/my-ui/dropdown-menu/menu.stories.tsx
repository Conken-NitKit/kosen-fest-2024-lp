import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { FloatingActionButton } from "../floating-action-button";
import { DropdownMenu } from "./menu";

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

export default {
  title: "my-ui/dropdown-menu",
  component: DropdownMenu,
  args: {
    trigger: (
      <FloatingActionButton size="md" shape="default" color="surface" elevation="flat">
        {(props) => <Pencil {...props} />}
      </FloatingActionButton>
    ),
    children: <div>item</div>,
  },
} satisfies Meta<typeof DropdownMenu>;
