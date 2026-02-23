import { ReactNode } from "react";

/**
 * Layout variant for the SummaryStats container.
 * - "horizontal": single row (optionally with scroll/expand).
 * - "grid": 2-column grid.
 */
export type SummaryStatsLayout = "horizontal" | "grid";

/**
 * Shape of the context provided by SummaryStats. Includes activeId, onToggle, expandable,
 * layout, registerStat, statIds, isHorizontalLayout, visibleStatIds, and optional isScrollPaneBlock.
 * Use this type when building expandable or layout-aware stat components (e.g. SummaryStatsStat)
 * that need to read or react to the container’s expand/collapse state or layout.
 * Invariants: `activeId` is `null` when no stat is expanded; stat registration and ordering
 * are reflected in `statIds`.
 */
export interface SummaryStatsContextValue {
  /**
   * The id of the currently active stat (for expandable variant).
   */
  activeId: string | null;
  /**
   * Function to toggle a stat by id.
   */
  onToggle: (id: string) => void;
  /**
   * Whether the SummaryStats container is in expandable mode.
   */
  expandable: boolean;
  /**
   * The layout type of the SummaryStats container.
   */
  layout: SummaryStatsLayout;
  /**
   * When true, this stat is inside the ScrollPane block (horizontal/mobile). Used so the last stat in that block does not show a trailing separator.
   */
  isScrollPaneBlock?: boolean;
  /**
   * Registers a stat and its expandable content. Pass isScrollPane true when inside the ScrollPane block.
   */
  registerStat: (
    id: string,
    content: ReactNode,
    isScrollPane?: boolean
  ) => void;
  /**
   * Removes a stat from the registry and ID lists on unmount.
   */
  unregisterStat: (id: string) => void;
  /**
   * Array of registered stat IDs in order (or, in ScrollPane block, only ids of that block).
   */
  statIds: string[];
  /**
   * Whether the stats row uses horizontal layout (single row). True when layout is "horizontal".
   */
  isHorizontalLayout: boolean;
  /**
   * Array of stat IDs that are visible. Used for conditional rendering or filtering.
   */
  visibleStatIds: string[];
}
