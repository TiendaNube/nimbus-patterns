import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider } from "@nimbus-ds/styles";

import light, { dark } from "./theme.definitions";

const channel = addons.getChannel();

const useDarkMode = () => {
  const [isDark, setDark] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("darkClass");
    }
    return false;
  });

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  return isDark;
};

export const ThemeDocsProvider: React.FC<any> = (props) => {
  const isDark = useDarkMode();

  return <DocsContainer {...props} theme={isDark ? dark : light} />;
};

export const ThemeNimbusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDark = useDarkMode();

  return (
    <ThemeProvider theme={isDark ? "dark" : "base"}>{children}</ThemeProvider>
  );
};
