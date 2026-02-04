export interface SummaryStatsContextValue {
  /**
   * The ID of the currently selected stat (for expandable variant).
   */
  selectedId: string | null;
  /**
   * Function to select a stat by ID.
   */
  onSelect: (id: string) => void;
  /**
   * Whether the SummaryStats container is in expandable mode.
   */
  expandable: boolean;
  /**
   * The layout type of the SummaryStats container.
   */
  layout: "horizontal" | "grid";
}
