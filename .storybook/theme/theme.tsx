import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/components";

import light, { dark } from "./theme.definitions";

export type NimbusToolbarTheme = "auto" | Theme;

export interface ResolveNimbusThemeInput {
  toolbarTheme?: NimbusToolbarTheme;
  isDarkMode?: boolean;
  storyThemeParam?: Theme;
  fileName?: string;
  globals?: {
    nimbusTheme?: NimbusToolbarTheme;
  };
  parameters?: {
    nimbusTheme?: Theme;
    fileName?: string;
  };
}

const VALID_EXPLICIT_THEMES: Theme[] = ["base", "dark", "next", "next-dark"];

export const resolveNimbusTheme = (
  input: ResolveNimbusThemeInput = {}
): Theme => {
  const toolbarTheme = input.toolbarTheme ?? input.globals?.nimbusTheme;
  const isDarkMode = Boolean(input.isDarkMode);
  const storyThemeParam =
    input.storyThemeParam ?? input.parameters?.nimbusTheme;
  const fileName = input.fileName ?? input.parameters?.fileName;

  if (
    toolbarTheme &&
    toolbarTheme !== "auto" &&
    VALID_EXPLICIT_THEMES.includes(toolbarTheme)
  ) {
    return toolbarTheme;
  }

  const normalizedFileName = (fileName ?? "").replace(/\\/g, "/");
  const isNextGeneration =
    storyThemeParam === "next" ||
    storyThemeParam === "next-dark" ||
    normalizedFileName.includes("/src/next/");

  if (isNextGeneration) {
    if (storyThemeParam === "next-dark") {
      return "next-dark";
    }
    return isDarkMode ? "next-dark" : "next";
  }

  if (storyThemeParam === "dark") {
    return "dark";
  }

  return isDarkMode ? "dark" : "base";
};

const getStorybookChannel = () => {
  try {
    return addons.getChannel();
  } catch {
    return null;
  }
};

const useDarkMode = () => {
  const [isDark, setDark] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("darkClass");
    }
    return false;
  });

  useEffect(() => {
    const channel = getStorybookChannel();
    if (!channel) {
      return undefined;
    }
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  return isDark;
};

export const ThemeDocsProvider: React.FC<any> = (props) => {
  const isDark = useDarkMode();
  const { children, context } = props;
  const toolbarTheme: NimbusToolbarTheme | undefined =
    context?.store?.userGlobals?.globals?.nimbusTheme ??
    context?.globals?.nimbusTheme;
  let primaryStoryParams:
    | { nimbusTheme?: Theme; fileName?: string }
    | undefined;
  try {
    primaryStoryParams = context?.storyById?.()?.parameters;
  } catch {
    primaryStoryParams = undefined;
  }
  const storyParameters = primaryStoryParams ?? context?.parameters;
  const resolvedTheme = resolveNimbusTheme({
    toolbarTheme,
    isDarkMode: isDark,
    storyThemeParam: storyParameters?.nimbusTheme,
    fileName: storyParameters?.fileName,
  });
  const isResolvedDark =
    resolvedTheme === "dark" || resolvedTheme === "next-dark";

  return (
    <DocsContainer {...props} theme={isResolvedDark ? dark : light}>
      <ThemeProvider theme={resolvedTheme}>
        <div data-nimbus-theme={resolvedTheme}>
          <Box backgroundColor="neutral-background" color="neutral-textHigh">
            {children}
          </Box>
        </div>
      </ThemeProvider>
    </DocsContainer>
  );
};

export const ThemeNimbusProvider: React.FC<{
  children: React.ReactNode;
  context?: any;
  theme?: NimbusToolbarTheme;
}> = ({ children, context, theme }) => {
  const isDark = useDarkMode();
  const resolvedTheme = resolveNimbusTheme({
    toolbarTheme: theme ?? context?.globals?.nimbusTheme,
    isDarkMode: isDark,
    storyThemeParam: context?.parameters?.nimbusTheme,
    fileName: context?.parameters?.fileName,
  });

  return (
    <ThemeProvider theme={resolvedTheme}>
      <div data-nimbus-theme={resolvedTheme} style={{ minHeight: "100%" }}>
        <Box
          backgroundColor="neutral-background"
          color="neutral-textHigh"
          minHeight="100%"
        >
          {children}
        </Box>
      </div>
    </ThemeProvider>
  );
};
