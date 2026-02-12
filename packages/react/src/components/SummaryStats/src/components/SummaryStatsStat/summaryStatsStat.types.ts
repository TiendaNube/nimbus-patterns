import { HTMLAttributes, ReactNode } from "react";

import type { TrendDirection } from "../SummaryStatsTrendIndicator/summaryStatsTrendIndicator.types";

/**
 * Props for the SummaryStatsStat component. Defines the primary value, description,
 * optional trend indicator, tooltip, and expandable children used when the stat is active.
 */
export interface SummaryStatsStatProperties {
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

export type SummaryStatsStatProps = SummaryStatsStatProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
