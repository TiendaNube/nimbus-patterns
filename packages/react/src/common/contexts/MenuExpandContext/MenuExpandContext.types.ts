export interface MenuExpandContextValue {
  /** True when the menu is expanded; false when collapsed. */
  expanded: boolean;

  /** Whether to show tooltips for buttons when the menu is collapsed. Defaults to true. */
  showTooltipsWhenCollapsed?: boolean;

  /** Position of the tooltips for buttons when the menu is collapsed. Defaults to "right". */
  tooltipsPosition?: "top" | "bottom" | "left" | "right";
}
