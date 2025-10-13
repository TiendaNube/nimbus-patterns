import type { MenuExpandContextValue } from "./MenuExpandContext.types";

export const initialMenuContext: MenuExpandContextValue = {
  expanded: true,
  showTooltipsWhenCollapsed: true,
  tooltipsPosition: "right",
} as const;
