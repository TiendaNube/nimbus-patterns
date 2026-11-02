import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import * as nimbusStyles from "@nimbus-ds/styles";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

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

export const vars: {
  color: {
    neutral: {
      background: string;
      textHigh: string;
    };
  };
} = {
  color: {
    neutral: {
      background:
        (nimbusStyles as any).varsThemeBase?.color?.neutral?.background ??
        (nimbusStyles as any).vars?.color?.neutral?.background ??
        nimbusStyles.box?.properties?.backgroundColor?.["neutral-background"] ??
        "var(--nimbus-colors-neutral-background)",
      textHigh:
        (nimbusStyles as any).varsThemeBase?.color?.neutral?.textHigh ??
        (nimbusStyles as any).vars?.color?.neutral?.textHigh ??
        nimbusStyles.box?.properties?.color?.["neutral-textHigh"] ??
        "var(--nimbus-colors-neutral-textHigh)",
    },
  },
};

const VALID_EXPLICIT_THEMES: Theme[] = ["base", "dark", "next", "next-dark"];

export const resolveNimbusTheme = (
  inputOrToolbarTheme?: ResolveNimbusThemeInput | NimbusToolbarTheme,
  isDarkModeArg?: boolean,
  contextArg?: {
    parameters?: {
      nimbusTheme?: Theme;
      fileName?: string;
    };
  }
): Theme => {
  let toolbarTheme: NimbusToolbarTheme | undefined;
  let isDarkMode = false;
  let storyThemeParam: Theme | undefined;
  let fileName: string | undefined;

  if (
    typeof inputOrToolbarTheme === "object" &&
    inputOrToolbarTheme !== null
  ) {
    toolbarTheme =
      inputOrToolbarTheme.toolbarTheme ??
      inputOrToolbarTheme.globals?.nimbusTheme;
    isDarkMode =
      typeof isDarkModeArg === "boolean"
        ? isDarkModeArg
        : Boolean(inputOrToolbarTheme.isDarkMode);
    storyThemeParam =
      inputOrToolbarTheme.storyThemeParam ??
      inputOrToolbarTheme.parameters?.nimbusTheme;
    fileName =
      inputOrToolbarTheme.fileName ?? inputOrToolbarTheme.parameters?.fileName;
  } else {
    toolbarTheme = inputOrToolbarTheme;
    isDarkMode = Boolean(isDarkModeArg);
    storyThemeParam = contextArg?.parameters?.nimbusTheme;
    fileName = contextArg?.parameters?.fileName;
  }

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
  const resolvedTheme = resolveNimbusTheme({
    toolbarTheme,
    isDarkMode: isDark,
    storyThemeParam: context?.parameters?.nimbusTheme,
    fileName: context?.parameters?.fileName,
  });
  const isResolvedDark =
    resolvedTheme === "dark" || resolvedTheme === "next-dark";

  return (
    <DocsContainer {...props} theme={isResolvedDark ? dark : light}>
      <ThemeProvider theme={resolvedTheme}>
        <div
          data-nimbus-theme={resolvedTheme}
          style={{
            backgroundColor: vars.color.neutral.background,
            color: vars.color.neutral.textHigh,
          }}
        >
          {children}
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
      <div
        data-nimbus-theme={resolvedTheme}
        style={{
          backgroundColor: vars.color.neutral.background,
          color: vars.color.neutral.textHigh,
          minHeight: "100%",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};
