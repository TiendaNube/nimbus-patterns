import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/components";

import light, { dark } from "./theme.definitions";
import {
  hasNativeNorteUiThemes,
  isNorteUiFallbackTheme,
  themeVars,
  toProviderTheme,
} from "./themeVars";

const NorteUiUnavailableNotice: React.FC = () => (
  <div
    role="alert"
    data-nimbus-norteui-unavailable="true"
    style={{
      padding: "8px 12px",
      marginBottom: "8px",
      borderRadius: "4px",
      border: "1px solid #b45309",
      background: "#fffbeb",
      color: "#78350f",
      fontSize: "12px",
    }}
  >
    Norte UI is unavailable: the installed <code>@nimbus-ds/styles</code> does
    not include the native <code>next-norteui</code> /{" "}
    <code>next-norteui-dark</code> themes yet. The legacy <code>next</code> /{" "}
    <code>next-dark</code> themes are rendered instead.
  </div>
);

export type NimbusThemeName = Theme | "next-norteui" | "next-norteui-dark";

export type NimbusToolbarTheme =
  | "auto"
  | NimbusThemeName
  | "side-by-side"
  | "side-by-side-dark";

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
    toolbarTheme !== "side-by-side" &&
    toolbarTheme !== "side-by-side-dark" &&
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
  const docsProviderTheme = toProviderTheme(resolvedTheme);
  const isResolvedDark =
    toolbarTheme === "side-by-side-dark" ||
    resolvedTheme === "dark" ||
    resolvedTheme === "next-dark" ||
    resolvedTheme === "next-norteui-dark";

  return (
    <DocsContainer {...props} theme={isResolvedDark ? dark : light}>
      <ThemeProvider theme={docsProviderTheme}>
        <div
          data-nimbus-theme={docsProviderTheme}
          data-nimbus-requested-theme={resolvedTheme}
          data-nimbus-provider-theme={docsProviderTheme}
        >
          {(isNorteUiFallbackTheme(resolvedTheme) ||
            isNorteUiFallbackTheme(toolbarTheme)) && (
            <NorteUiUnavailableNotice />
          )}
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
  selectedTheme?: NimbusToolbarTheme;
  storyParameters?: { nimbusTheme?: NimbusThemeName; fileName?: string };
}> = ({ children, context, theme, selectedTheme, storyParameters }) => {
  const isDark = useDarkMode();
  const activeToolbarTheme: NimbusToolbarTheme | undefined =
    theme ?? selectedTheme ?? context?.globals?.nimbusTheme;
  const activeParameters = storyParameters ?? context?.parameters;

  if (
    activeToolbarTheme === "side-by-side" ||
    activeToolbarTheme === "side-by-side-dark"
  ) {
    const isDarkComparison = activeToolbarTheme === "side-by-side-dark";
    const leftTheme: NimbusThemeName = isDarkComparison ? "dark" : "base";
    const rightTheme: NimbusThemeName = isDarkComparison
      ? "next-norteui-dark"
      : "next-norteui";

    if (!hasNativeNorteUiThemes) {
      // Norte UI themes are not installed: block the comparison instead of
      // rendering `next` pretending to be `next-norteui`.
      const leftProviderTheme = toProviderTheme(leftTheme);
      return (
        <ThemeProvider theme={leftProviderTheme}>
          <div
            data-nimbus-theme={leftProviderTheme}
            data-nimbus-requested-theme={activeToolbarTheme}
            data-nimbus-provider-theme={leftProviderTheme}
            data-nimbus-comparison-blocked="true"
            style={{ minHeight: "100%" }}
          >
            <NorteUiUnavailableNotice />
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
    }

    return (
      <div
        data-nimbus-theme={activeToolbarTheme}
        data-nimbus-provider-theme={`${toProviderTheme(
          leftTheme
        )}|${toProviderTheme(rightTheme)}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          width: "100%",
        }}
      >
        {isNorteUiFallbackTheme(activeToolbarTheme) && (
          <div style={{ gridColumn: "1 / -1" }}>
            <NorteUiUnavailableNotice />
          </div>
        )}
        <ThemeProvider
          theme={toProviderTheme(leftTheme)}
          data-nimbus-theme={leftTheme}
          style={{
            backgroundColor: themeVars.colors.neutral.background,
            color: themeVars.colors.neutral.textHigh,
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {children}
        </ThemeProvider>
        <ThemeProvider
          theme={toProviderTheme(rightTheme)}
          data-nimbus-theme={rightTheme}
          style={{
            backgroundColor: themeVars.colors.neutral.background,
            color: themeVars.colors.neutral.textHigh,
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {children}
        </ThemeProvider>
      </div>
    );
  }

  const resolvedTheme = resolveNimbusTheme({
    toolbarTheme: activeToolbarTheme,
    isDarkMode: isDark,
    storyThemeParam: activeParameters?.nimbusTheme,
    fileName: activeParameters?.fileName,
  });

  const providerTheme = toProviderTheme(resolvedTheme);

  return (
    <ThemeProvider theme={providerTheme}>
      <div
        data-nimbus-theme={providerTheme}
        data-nimbus-requested-theme={resolvedTheme}
        data-nimbus-provider-theme={providerTheme}
        style={{ minHeight: "100%" }}
      >
        {isNorteUiFallbackTheme(resolvedTheme) && <NorteUiUnavailableNotice />}
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
