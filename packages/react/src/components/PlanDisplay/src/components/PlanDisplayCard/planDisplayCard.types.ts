import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export interface PlanDisplayCardProperties {
  /**
   * Renders the card with the Plans 2.0 gradient background (primary-surface → neutral-background).
   * Ignored when `ribbonLabel` is provided.
   */
  gradient?: boolean;
  /**
   * Label shown in a ribbon on top of the card (e.g. "Más escogido"). When provided, the card
   * is rendered with the featured style (primary ribbon + 2px primary border, no shadow),
   * taking precedence over `gradient`.
   * @TJS-type React.ReactNode
   */
  ribbonLabel?: ReactNode;
}
// The card owns its own surface treatment, so the border/shadow props are excluded rather
// than silently overridden. `style` is excluded too: Box accepts it in its types but drops it
// at runtime (it renders only sprinkle-generated styles), so leaving it in would type-check
// while doing nothing. Use the `gradient` / `ribbonLabel` variants instead.
export type PlanDisplayCardProps =
  PropsWithChildren<PlanDisplayCardProperties> &
    Omit<
      BoxProps,
      | "borderColor"
      | "borderRadius"
      | "borderStyle"
      | "borderWidth"
      | "boxShadow"
      | "style"
    >;
