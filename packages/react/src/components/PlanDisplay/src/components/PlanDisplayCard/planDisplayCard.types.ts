import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export interface PlanDisplayCardProperties {
  /**
   * Renders the card with the legacy featured treatment (primary 3px border and level-3 shadow).
   * New consumers should use `ribbonLabel` or `gradient` to express the intended emphasis.
   * Ignored when either of those props is provided.
   * @deprecated Use `ribbonLabel` or `gradient` instead. This prop will be removed in a future major release.
   */
  highlighted?: boolean;
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
// than silently overridden. `style` remains accepted for backwards-compatible typing even
// though Box currently drops it at runtime, matching the pre-Plans 2.0 public surface.
export type PlanDisplayCardProps =
  PropsWithChildren<PlanDisplayCardProperties> &
    Omit<
      BoxProps,
      | "borderColor"
      | "borderRadius"
      | "borderStyle"
      | "borderWidth"
      | "boxShadow"
    >;
