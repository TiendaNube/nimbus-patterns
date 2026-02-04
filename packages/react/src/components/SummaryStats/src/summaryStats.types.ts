import { HTMLAttributes, ReactNode } from "react";

import { SummaryStatsStat, SummaryStatsContent } from "./components";

export interface SummaryStatsComponents {
  Stat: typeof SummaryStatsStat;
  Content: typeof SummaryStatsContent;
}

export interface SummaryStatsProperties {
  /**
   * Content to be rendered inside the SummaryStats component.
   * Typically composed of SummaryStats.Stat and SummaryStats.Content subcomponents.
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
  /**
   * The ID of the initially selected stat (for expandable variant).
   */
  defaultSelectedId?: string;
  /**
   * Controlled selected stat ID (for expandable variant).
   */
  selectedId?: string;
  /**
   * Callback fired when a stat is selected (for expandable variant).
   */
  onSelect?: (id: string) => void;
}

export type SummaryStatsProps = SummaryStatsProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
