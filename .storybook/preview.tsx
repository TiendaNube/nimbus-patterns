import React from "react";
import type { Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "@nimbus-ds/styles/dist/index.css";
import "./static/style.css";
// import "./static/editor.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
      autodocs: true,
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
};

export default preview;

export const decorators = [
  (renderStory) => <ThemeNimbusProvider>{renderStory()}</ThemeNimbusProvider>,
];
