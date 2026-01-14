import React from "react";
import type { Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "@nimbus-ds/styles/dist/index.css";
import "./static/style.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: "dark",
      darkClass: "darkClass",
      lightClass: "lightClass",
      stylePreview: true,
      light,
      dark,
    },
    docs: {
      container: ThemeDocsProvider,
    },
    options: {
      storySort: {
        order: ["Atomic", "Composite", "Skeleton"],
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: "fullscreen",
  },
  decorators: [
    (renderStory) => <ThemeNimbusProvider>{renderStory()}</ThemeNimbusProvider>,
  ],
};

export default preview;
