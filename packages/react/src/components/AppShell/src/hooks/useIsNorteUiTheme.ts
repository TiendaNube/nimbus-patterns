import { useTheme } from "@nimbus-ds/styles";

const NORTE_UI_THEMES = ["next-norteui", "next-norteui-dark"];

/**
 * Returns true only under the Norte UI themes (Path B, Decision 0081).
 * Theme keys are compared exactly so `next` and `next-dark` stay invariant.
 * `currentTheme` is widened to string because the installed
 * `@nimbus-ds/styles` `Theme` type may not list the Norte UI keys yet.
 */
export const useIsNorteUiTheme = (): boolean => {
  const { currentTheme } = useTheme();
  return NORTE_UI_THEMES.includes(currentTheme as string);
};
