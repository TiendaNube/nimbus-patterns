import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayCardFooterProperties = PropsWithChildren<{
  /**
   * Icon rendered before the footer's content.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
}>;
