import type { MenuExpandContextValue } from "./MenuExpandContext.types";

export const initialMenuContext: MenuExpandContextValue = {
  expanded: true,
} as const;
