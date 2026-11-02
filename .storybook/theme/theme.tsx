import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/components";

import light, { dark } from "./theme.definitions";

export type NimbusThemeName = Theme | "next-norteui" | "next-norteui-dark";

export type NimbusToolbarTheme = "auto" | NimbusThemeName;

export interface ResolveNimbusThemeInput {
  toolbarTheme?: NimbusToolbarTheme;
  isDarkMode?: boolean;
  storyThemeParam?: NimbusThemeName;
  fileName?: string;
  globals?: {
    nimbusTheme?: NimbusToolbarTheme;
  };
  parameters?: {
    nimbusTheme?: NimbusThemeName;
    fileName?: string;
  };
}

const VALID_EXPLICIT_THEMES: NimbusThemeName[] = [
  "base",
  "dark",
  "next",
  "next-dark",
  "next-norteui",
  "next-norteui-dark",
];

export const resolveNimbusTheme = (
  input: ResolveNimbusThemeInput = {}
): NimbusThemeName => {
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
  const isNorteUiGeneration =
    storyThemeParam === "next-norteui" ||
    storyThemeParam === "next-norteui-dark" ||
    normalizedFileName.includes("/src/next/");

  if (isNorteUiGeneration) {
    if (storyThemeParam === "next-norteui-dark") {
      return "next-norteui-dark";
    }
    return isDarkMode ? "next-norteui-dark" : "next-norteui";
  }

  if (storyThemeParam === "next" || storyThemeParam === "next-dark") {
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
    | { nimbusTheme?: NimbusThemeName; fileName?: string }
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
    resolvedTheme === "dark" ||
    resolvedTheme === "next-dark" ||
    resolvedTheme === "next-norteui-dark";

  return (
    <DocsContainer {...props} theme={isResolvedDark ? dark : light}>
      <ThemeProvider theme={resolvedTheme as Theme}>
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
    <ThemeProvider theme={resolvedTheme as Theme}>
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
