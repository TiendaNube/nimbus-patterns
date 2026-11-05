import React from "react";
import type { Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "@nimbus-ds/styles/dist/index.css";
import "./static/style.css";

export const globalTypes = {
  nimbusTheme: {
    name: "Nimbus Theme",
    description: "Active Nimbus theme generation and color mode",
    defaultValue: "auto",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "auto", title: "Auto (Base / Norte UI by story)" },
        { value: "base", title: "Base (Light)" },
        { value: "dark", title: "Dark (Base Dark)" },
        { value: "next", title: "Next (Premium Plan Light)" },
        { value: "next-dark", title: "Next Dark (Premium Plan Dark)" },
        { value: "next-norteui", title: "Next Norte UI (Light)" },
        { value: "next-norteui-dark", title: "Next Norte UI Dark" },
        {
          value: "side-by-side",
          title: "Side-by-Side (Base vs Next Norte UI)",
        },
        {
          value: "side-by-side-dark",
          title: "Side-by-Side (Dark vs Next Norte UI Dark)",
        },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  globalTypes,
  initialGlobals: {
    nimbusTheme: "auto",
  },
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
        order: ["Foundations", "Atomic", "Composite", "Next", "Skeleton"],
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
