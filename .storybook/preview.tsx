import React from "react";
import type { Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "@nimbus-ds/styles/dist/index.css";
import "./static/style.css";

export const globalTypes = {
  nimbusTheme: {
    name: "Nimbus Theme",
    description:
      "Nimbus theme generation and mode (auto, base, dark, next, next-dark)",
    defaultValue: "auto",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "auto", title: "Auto (Base / Next)" },
        { value: "base", title: "base" },
        { value: "dark", title: "dark" },
        { value: "next", title: "next" },
        { value: "next-dark", title: "next-dark" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  globalTypes,
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
    (renderStory, context) => (
      <ThemeNimbusProvider context={context}>
        {renderStory()}
      </ThemeNimbusProvider>
    ),
  ],
};

export default preview;
