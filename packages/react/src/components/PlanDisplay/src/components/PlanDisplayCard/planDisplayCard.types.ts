import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export interface PlanDisplayCardProperties {
  /**
   * Label rendered in the card's top ribbon, used to emphasize a plan (e.g. "Most popular").
   * Every card reserves the same top ribbon area whether or not it carries a `ribbonLabel`,
   * so comparable cards stay aligned.
   * @TJS-type React.ReactNode
   */
  ribbonLabel?: ReactNode;
  /**
   * Applies the fixed Plans 2.0 gradient treatment to the card. Ignored (fully suppressed)
   * whenever `ribbonLabel` is present.
   */
  gradient?: boolean;
}
export type PlanDisplayCardProps =
  PropsWithChildren<PlanDisplayCardProperties> &
    Omit<BoxProps, "display" | "flexDirection" | "height">;
