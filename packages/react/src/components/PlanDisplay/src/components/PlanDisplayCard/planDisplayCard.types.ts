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
