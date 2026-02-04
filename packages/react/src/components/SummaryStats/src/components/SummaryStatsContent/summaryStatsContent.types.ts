import { HTMLAttributes, ReactNode } from "react";

export interface SummaryStatsContentProperties {
  /**
   * Content to be rendered inside the expandable area.
   * Typically contains charts, tables, or additional details.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type SummaryStatsContentProps = SummaryStatsContentProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
