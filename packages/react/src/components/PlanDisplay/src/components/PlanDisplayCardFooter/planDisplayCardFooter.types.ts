import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayCardFooterProperties = PropsWithChildren<{
  /**
   * Optional leading icon for an add-on style footer row (e.g. a point-of-sale icon next to a link).
   * When provided, the footer renders the icon and children side by side.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
}>;
