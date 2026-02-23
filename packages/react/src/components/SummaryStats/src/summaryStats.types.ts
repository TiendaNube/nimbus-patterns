import { HTMLAttributes, ReactNode } from "react";

import { SummaryStatsStat } from "./components";
import type { SummaryStatsLayout } from "./contexts";

/**
 * Subcomponents exposed on SummaryStats (e.g. SummaryStats.Stat).
 * Use {@link SummaryStatsStat} for the Stat subcomponent type and API.
 */
export interface SummaryStatsComponents {
  Stat: typeof SummaryStatsStat;
}

/**
 * Props specific to SummaryStats. Children should be {@link SummaryStatsStat}
 * nodes (SummaryStats.Stat). Layout is "horizontal" (default) or "grid".
 * Defaults: layout "horizontal", expandable false.
 *
 * Supports both controlled and uncontrolled modes for the active stat:
 * - **Uncontrolled** (default): omit `activeStatId` and the component manages
 *   active state internally.
 * - **Controlled**: pass `activeStatId` and `onActiveStatIdChange` to manage
 *   the active stat externally (e.g. for routing, analytics, or persistence).
 */
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
  layout?: SummaryStatsLayout;
  /**
   * Enables expandable mode where stats can be clicked to show additional content.
   * @default false
   */
  expandable?: boolean;
  /**
   * The id of the currently active stat (controlled mode).
   * When provided, the component becomes controlled and `onActiveStatIdChange`
   * should be used to handle state changes. Pass `null` for no active stat.
   */
  activeStatId?: string | null;
  /**
   * Callback fired when the active stat changes (controlled mode).
   * Receives the new active stat id, or `null` when the active stat is deselected.
   */
  onActiveStatIdChange?: (activeStatId: string | null) => void;
}

/**
 * Full props for SummaryStats: {@link SummaryStatsProperties} plus HTML element
 * attributes (excluding color). Use for the root SummaryStats component.
 */
export type SummaryStatsProps = SummaryStatsProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
