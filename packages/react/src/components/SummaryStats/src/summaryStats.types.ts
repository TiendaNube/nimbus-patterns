import { HTMLAttributes, ReactNode } from "react";

import { SummaryStatsStat } from "./components";

export interface SummaryStatsComponents {
  Stat: typeof SummaryStatsStat;
}

export interface SummaryStatsProperties {
  /**
   * Content to be rendered inside the SummaryStats component.
   * Composed of SummaryStats.Stat subcomponents.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Layout variant for the stats container.
   * - "horizontal": Items in a single row (2-6 items recommended).
   * - "grid": Items in a 2-column grid layout (2 or 4 items recommended).
   * @default "horizontal"
   */
  layout?: "horizontal" | "grid";
  /**
   * Enables expandable mode where stats can be clicked to show additional content.
   * @default false
   */
  expandable?: boolean;
}

export type SummaryStatsProps = SummaryStatsProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
