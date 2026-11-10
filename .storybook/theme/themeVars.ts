import * as stylesModule from "@nimbus-ds/styles";
import type { Theme } from "@nimbus-ds/styles";

const FALLBACK_THEME_VARS = {
  colors: {
    primary: {
      surface: "var(--nimbus-colors-primary-surface)",
      surfaceHighlight: "var(--nimbus-colors-primary-surfaceHighlight)",
      interactive: "var(--nimbus-colors-primary-interactive)",
      interactiveHover: "var(--nimbus-colors-primary-interactiveHover)",
      interactivePressed: "var(--nimbus-colors-primary-interactivePressed)",
      textLow: "var(--nimbus-colors-primary-textLow)",
      textHigh: "var(--nimbus-colors-primary-textHigh)",
    },
    success: {
      surface: "var(--nimbus-colors-success-surface)",
      surfaceHighlight: "var(--nimbus-colors-success-surfaceHighlight)",
      interactive: "var(--nimbus-colors-success-interactive)",
      interactiveHover: "var(--nimbus-colors-success-interactiveHover)",
      interactivePressed: "var(--nimbus-colors-success-interactivePressed)",
      textLow: "var(--nimbus-colors-success-textLow)",
      textHigh: "var(--nimbus-colors-success-textHigh)",
    },
    warning: {
      surface: "var(--nimbus-colors-warning-surface)",
      surfaceHighlight: "var(--nimbus-colors-warning-surfaceHighlight)",
      interactive: "var(--nimbus-colors-warning-interactive)",
      interactiveHover: "var(--nimbus-colors-warning-interactiveHover)",
      interactivePressed: "var(--nimbus-colors-warning-interactivePressed)",
      textLow: "var(--nimbus-colors-warning-textLow)",
      textHigh: "var(--nimbus-colors-warning-textHigh)",
    },
    danger: {
      surface: "var(--nimbus-colors-danger-surface)",
      surfaceHighlight: "var(--nimbus-colors-danger-surfaceHighlight)",
      interactive: "var(--nimbus-colors-danger-interactive)",
      interactiveHover: "var(--nimbus-colors-danger-interactiveHover)",
      interactivePressed: "var(--nimbus-colors-danger-interactivePressed)",
      textLow: "var(--nimbus-colors-danger-textLow)",
      textHigh: "var(--nimbus-colors-danger-textHigh)",
    },
    neutral: {
      background: "var(--nimbus-colors-neutral-background)",
      surface: "var(--nimbus-colors-neutral-surface)",
      surfaceDisabled: "var(--nimbus-colors-neutral-surfaceDisabled)",
      surfaceHighlight: "var(--nimbus-colors-neutral-surfaceHighlight)",
      interactive: "var(--nimbus-colors-neutral-interactive)",
      interactiveHover: "var(--nimbus-colors-neutral-interactiveHover)",
      interactivePressed: "var(--nimbus-colors-neutral-interactivePressed)",
      textDisabled: "var(--nimbus-colors-neutral-textDisabled)",
      textLow: "var(--nimbus-colors-neutral-textLow)",
      textHigh: "var(--nimbus-colors-neutral-textHigh)",
    },
    aiGenerative: {
      interactiveHover: "var(--nimbus-colors-aiGenerative-interactiveHover)",
      textLow: "var(--nimbus-colors-aiGenerative-textLow)",
      interactivePressed:
        "var(--nimbus-colors-aiGenerative-interactivePressed)",
      surfaceHighlight: "var(--nimbus-colors-aiGenerative-surfaceHighlight)",
      surface: "var(--nimbus-colors-aiGenerative-surface)",
      background: "var(--nimbus-colors-aiGenerative-background)",
      textHigh: "var(--nimbus-colors-aiGenerative-textHigh)",
    },
    aiGradient: {
      blueHigh: "var(--nimbus-colors-aiGradient-blueHigh)",
      blueLight: "var(--nimbus-colors-aiGradient-blueLight)",
      purpleHigh: "var(--nimbus-colors-aiGradient-purpleHigh)",
      purpleLight: "var(--nimbus-colors-aiGradient-purpleLight)",
      pinkHigh: "var(--nimbus-colors-aiGradient-pinkHigh)",
      pinkLight: "var(--nimbus-colors-aiGradient-pinkLight)",
    },
  },
  fontFamily: {
    sans: "var(--nimbus-fontFamily-sans)",
    mono: "var(--nimbus-fontFamily-mono)",
  },
  fontSize: {
    body: {
      caption: "var(--nimbus-fontSize-body-caption)",
      base: "var(--nimbus-fontSize-body-base)",
      highlight: "var(--nimbus-fontSize-body-highlight)",
    },
    title: {
      h1: "var(--nimbus-fontSize-title-h1)",
      h2: "var(--nimbus-fontSize-title-h2)",
      h3: "var(--nimbus-fontSize-title-h3)",
      h4: "var(--nimbus-fontSize-title-h4)",
      h5: "var(--nimbus-fontSize-title-h5)",
      h6: "var(--nimbus-fontSize-title-h6)",
    },
  },
  fontWeight: {
    regular: "var(--nimbus-fontWeight-regular)",
    medium: "var(--nimbus-fontWeight-medium)",
    bold: "var(--nimbus-fontWeight-bold)",
  },
  lineWeight: {
    body: {
      caption: "var(--nimbus-lineWeight-body-caption)",
      base: "var(--nimbus-lineWeight-body-base)",
      highlight: "var(--nimbus-lineWeight-body-highlight)",
    },
    title: {
      h1: "var(--nimbus-lineWeight-title-h1)",
      h2: "var(--nimbus-lineWeight-title-h2)",
      h3: "var(--nimbus-lineWeight-title-h3)",
      h4: "var(--nimbus-lineWeight-title-h4)",
      h5: "var(--nimbus-lineWeight-title-h5)",
      h6: "var(--nimbus-lineWeight-title-h6)",
    },
  },
  shadow: {
    level: {
      "0": "var(--nimbus-shadow-level-0)",
      "1": "var(--nimbus-shadow-level-1)",
      "2": "var(--nimbus-shadow-level-2)",
      "3": "var(--nimbus-shadow-level-3)",
      "4": "var(--nimbus-shadow-level-4)",
      "5": "var(--nimbus-shadow-level-5)",
    },
  },
  components: {
    thumbnail: {
      background: "var(--nimbus-components-thumbnail-background)",
    },
  },
  shape: {
    border: {
      radius: {
        "1": "var(--nimbus-shape-border-radius-1)",
        "2": "var(--nimbus-shape-border-radius-2)",
        "3": "var(--nimbus-shape-border-radius-3)",
        "4": "var(--nimbus-shape-border-radius-4)",
        "5": "var(--nimbus-shape-border-radius-5)",
        "6": "var(--nimbus-shape-border-radius-6)",
        "0-5": "var(--nimbus-shape-border-radius-0-5)",
        full: "var(--nimbus-shape-border-radius-full)",
        base: "var(--nimbus-shape-border-radius-base)",
        half: "var(--nimbus-shape-border-radius-half)",
      },
      width: {
        "1": "var(--nimbus-shape-border-width-1)",
        "2": "var(--nimbus-shape-border-width-2)",
        "3": "var(--nimbus-shape-border-width-3)",
        "4": "var(--nimbus-shape-border-width-4)",
        "5": "var(--nimbus-shape-border-width-5)",
      },
    },
  },
  spacing: {
    "1": "var(--nimbus-spacing-1)",
    "2": "var(--nimbus-spacing-2)",
    "3": "var(--nimbus-spacing-3)",
    "4": "var(--nimbus-spacing-4)",
    "5": "var(--nimbus-spacing-5)",
    "6": "var(--nimbus-spacing-6)",
    "7": "var(--nimbus-spacing-7)",
    "8": "var(--nimbus-spacing-8)",
    "9": "var(--nimbus-spacing-9)",
    "10": "var(--nimbus-spacing-10)",
    "11": "var(--nimbus-spacing-11)",
    "12": "var(--nimbus-spacing-12)",
    "14": "var(--nimbus-spacing-14)",
    "16": "var(--nimbus-spacing-16)",
    "18": "var(--nimbus-spacing-18)",
    "20": "var(--nimbus-spacing-20)",
    "0-5": "var(--nimbus-spacing-0-5)",
    "1-5": "var(--nimbus-spacing-1-5)",
    "2-5": "var(--nimbus-spacing-2-5)",
    "3-5": "var(--nimbus-spacing-3-5)",
    "4-5": "var(--nimbus-spacing-4-5)",
  },
  zIndex: {
    "100": "var(--nimbus-zIndex-100)",
    "200": "var(--nimbus-zIndex-200)",
    "300": "var(--nimbus-zIndex-300)",
    "400": "var(--nimbus-zIndex-400)",
    "500": "var(--nimbus-zIndex-500)",
    "600": "var(--nimbus-zIndex-600)",
    "700": "var(--nimbus-zIndex-700)",
    "800": "var(--nimbus-zIndex-800)",
    "900": "var(--nimbus-zIndex-900)",
    "1000": "var(--nimbus-zIndex-1000)",
    "1100": "var(--nimbus-zIndex-1100)",
  },
  motion: {
    speed: {
      base: "var(--nimbus-motion-speed-base)",
      fast: "var(--nimbus-motion-speed-fast)",
      slow: "var(--nimbus-motion-speed-slow)",
      slower: "var(--nimbus-motion-speed-slower)",
    },
  },
  breakpoint: {
    xs: "var(--nimbus-breakpoint-xs)",
    md: "var(--nimbus-breakpoint-md)",
    lg: "var(--nimbus-breakpoint-lg)",
    xl: "var(--nimbus-breakpoint-xl)",
    xxl: "var(--nimbus-breakpoint-xxl)",
  },
  utils: {
    focus: "var(--nimbus-utils-focus)",
    aiFocus: "var(--nimbus-utils-aiFocus)",
  },
} as const;

export const themeVars =
  (stylesModule as unknown as { themeVars?: typeof FALLBACK_THEME_VARS })
    .themeVars ?? FALLBACK_THEME_VARS;

export const hasNativeNorteUiThemes = Boolean(
  (stylesModule as unknown as Record<string, unknown>).useNextThemeWarning
);

export const toProviderTheme = (
  theme: Theme | "next-norteui" | "next-norteui-dark"
): Theme => {
  if (hasNativeNorteUiThemes) {
    return theme as Theme;
  }
  if (theme === "next-norteui") {
    return "next";
  }
  if (theme === "next-norteui-dark") {
    return "next-dark";
  }
  return theme;
};

/**
 * True when the theme requires Norte UI but the installed `@nimbus-ds/styles`
 * has no native `next-norteui` / `next-norteui-dark` themes, so the provider
 * would silently render the legacy `next` / `next-dark` themes instead.
 */
export const isNorteUiFallbackTheme = (theme?: string): boolean =>
  !hasNativeNorteUiThemes &&
  (theme === "next-norteui" ||
    theme === "next-norteui-dark" ||
    theme === "side-by-side" ||
    theme === "side-by-side-dark");
