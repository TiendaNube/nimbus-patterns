import { ReactNode, RefObject } from "react";

/**
 * Layout variant for the SummaryStats container.
 * - "horizontal": single row (optionally with scroll/expand).
 * - "grid": 2-column grid.
 */
export type SummaryStatsLayout = "horizontal" | "grid";

/**
 * Shape of the context provided by SummaryStats. Includes activeId, onToggle, expandable,
 * layout, registerStat, statIds, isHorizontalLayout, visibleStatIds, and optional isScrollPaneBlock.
 * Use this type when building expandable or layout-aware stat components (e.g. SummaryStatsItem)
 * that need to read or react to the container’s expand/collapse state or layout.
 * Invariants: `activeId` is `null` when no stat is expanded; stat registration and ordering
 * are reflected in `statIds`.
 */
/**
 * Registry entry kept by SummaryStats for each mounted stat. Holds the content
 * rendered in the expanded area and the effective expandable state of the stat.
 */
export interface SummaryStatsRegistryEntry {
  /**
   * Content rendered in the expanded area when the stat is active.
   */
  content: ReactNode;
  /**
   * Whether the stat is interactive (effective per-cell expandable value).
   */
  expandable: boolean;
}

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
   * Registers a stat id on mount. Pass isScrollPane true when inside the ScrollPane block.
   */
  registerStat: (id: string, isScrollPane?: boolean) => void;
  /**
   * Updates the content and effective expandable state of a registered stat.
   * Does not change the stat order and never clears the active stat.
   */
  updateStat: (id: string, entry: SummaryStatsRegistryEntry) => void;
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
  /**
   * Id of the rendered expanded area. Only defined while the area is rendered.
   */
  panelId?: string;
  /**
   * Ref to the element that contains the cells of the current row. Used to
   * move focus between interactive cells with the arrow keys.
   */
  rowRef?: RefObject<HTMLDivElement | null>;
}
