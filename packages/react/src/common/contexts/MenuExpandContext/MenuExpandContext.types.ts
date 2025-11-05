import { PopoverPlacement } from "@nimbus-ds/components";
import { Dispatch, SetStateAction } from "react";

export interface MenuExpandContextValue {
  /** True when the menu is expanded; false when collapsed. */
  expanded: boolean;

  /** Whether to show popovers for buttons when the menu is collapsed. Defaults to true. */
  showPopoversWhenCollapsed?: boolean;

  /** Position of the popovers for buttons when the menu is collapsed. Defaults to "right". */
  popoverPosition?: PopoverPlacement;

  /** ID of the currently active accordion popover. Used to ensure only one popover is open at a time. */
  activeAccordionPopover: string | null;

  /** Function to set the active accordion popover ID. */
  setActiveAccordionPopover: Dispatch<SetStateAction<string | null>>;
}
