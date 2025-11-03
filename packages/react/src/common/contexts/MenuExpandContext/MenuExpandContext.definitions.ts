import type { MenuExpandContextValue } from "./MenuExpandContext.types";

const noop = () => void 0;

export const initialMenuContext: MenuExpandContextValue = {
  expanded: true,
  showTooltipsWhenCollapsed: true,
  tooltipsPosition: "right",
  activeAccordionPopover: null,
  setActiveAccordionPopover: noop,
};
