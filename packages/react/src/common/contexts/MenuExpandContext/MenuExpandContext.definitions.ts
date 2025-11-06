import { noop } from "@common/utils";
import type { MenuExpandContextValue } from "./MenuExpandContext.types";

export const initialMenuContext: MenuExpandContextValue = {
  expanded: true,
  showPopoversWhenCollapsed: true,
  popoverPosition: "right",
  activeAccordionPopover: null,
  setActiveAccordionPopover: noop,
};
