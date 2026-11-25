import { useTheme } from "@nimbus-ds/styles";

/**
 * Norte UI theme flags derived from the theme in effect.
 */
export interface NorteUiThemeState {
  /**
   * `true` when the theme in effect is exactly `next-norteui` or
   * `next-norteui-dark`. Gates the Norte UI spacing changes.
   */
  isNorteUi: boolean;
  /**
   * `true` only when the theme in effect is exactly `next-norteui`.
   * Gates the Norte UI color changes, which do not apply to `next-norteui-dark`.
   */
  isNorteUiLight: boolean;
}

/**
 * Reads the theme of the nearest `ThemeProvider` from `@nimbus-ds/styles` and
 * reports whether a Norte UI theme is in effect. Any other theme, or no
 * provider, returns `false` for both flags.
 *
 * @returns The Norte UI flags for the theme in effect.
 */
export const useNorteUiTheme = (): NorteUiThemeState => {
  const { currentTheme } = useTheme();
  const isNorteUiLight = currentTheme === "next-norteui";
  return {
    isNorteUi: isNorteUiLight || currentTheme === "next-norteui-dark",
    isNorteUiLight,
  };
};
