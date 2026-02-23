import { HTMLAttributes, ReactNode } from "react";

import type { TrendDirection } from "../SummaryStatsTrendIndicator/summaryStatsTrendIndicator.types";

/**
 * Props for the SummaryStatsItem component.
 *
 * Defines the props used to render a single stat: a primary value, description,
 * optional trend indicator, optional tooltip, and optional expandable content
 * (children). Used by the SummaryStatsItem component to display one metric in
 * a summary stats row.
 *
 * @see SummaryStatsItem - Component that consumes these props.
 * @property children - Optional ReactNode rendered in the expandable area when this stat is active.
 */
export interface SummaryStatsItemProperties {
  /**
   * The main value to display (e.g., "$0.00", "156").
   */
  value: string;
  /**
   * Brief text that identifies the metric.
   */
  description: string;
  /**
   * Trend indicator showing the change direction.
   */
  trend?: TrendDirection;
  /**
   * Text describing the trend or change (e.g., "+15%", "-5%", "0%").
   */
  trendText?: string;
  /**
   * Tooltip content for the info icon. If provided, displays an info icon.
   */
  infoTooltip?: string;
  /**
   * Content to display when this stat is active (for expandable variant).
   * This content will be rendered in the expandable area below the stats row.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
}

export type SummaryStatsItemProps = SummaryStatsItemProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;

/**
 * Return type for the separator configuration helper.
 * Determines visibility and display modes of vertical/horizontal separators
 * between stat items based on layout and position.
 */
export interface SeparatorConfig {
  showVerticalSeparator: boolean;
  paddingRight: "1" | undefined;
  verticalSeparatorDisplay: "flex" | { xs: "none"; md: "flex" };
  showHorizontalSeparator: { xs: "block" | "none"; md: "block" | "none" };
}
