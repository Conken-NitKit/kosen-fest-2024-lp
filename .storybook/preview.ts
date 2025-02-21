import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { DefaultDecorator } from "../src/tests/storybook/decorators/default";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [DefaultDecorator],
};

export default preview;
