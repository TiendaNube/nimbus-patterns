export interface SummaryStatsContextValue {
  /**
   * The index of the currently active stat (for expandable variant).
   */
  activeIndex: number | null;
  /**
   * Function to toggle a stat by index.
   */
  onToggle: (index: number) => void;
  /**
   * Whether the SummaryStats container is in expandable mode.
   */
  expandable: boolean;
  /**
   * The layout type of the SummaryStats container.
   */
  layout: "horizontal" | "grid";
}
