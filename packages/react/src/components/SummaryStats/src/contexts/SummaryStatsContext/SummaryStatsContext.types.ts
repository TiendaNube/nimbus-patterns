import { ReactNode } from "react";

/**
 * Value provided by SummaryStatsContext. Drives layout, expandable state, stat registration,
 * and active stat selection for the SummaryStats compound component.
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
  layout: "horizontal" | "grid";
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
