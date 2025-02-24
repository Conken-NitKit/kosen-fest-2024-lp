import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { UncontainedCarouselItem } from "./carousel-item";

type Story = StoryObj<typeof UncontainedCarouselItem>;

export const Default: Story = {};

export default {
  title: "my-ui/carousel/uncontained-carousel-item",
  component: UncontainedCarouselItem,
  args: {
    children: (
      <Image
        width={500}
        height={300}
        src="/placeholder/banner.png"
        alt="mock"
        className="h-full w-auto"
      />
    ),
  },
} satisfies Meta<typeof UncontainedCarouselItem>;
