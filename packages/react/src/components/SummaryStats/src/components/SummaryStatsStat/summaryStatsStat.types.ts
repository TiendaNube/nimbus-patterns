import { HTMLAttributes } from "react";

export interface SummaryStatsStatProperties {
  /**
   * Unique identifier for this stat (required for expandable variant).
   */
  id?: string;
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
  trend?: "up" | "down" | "neutral";
  /**
   * Text describing the trend or change (e.g., "+15%", "-5%", "0%").
   */
  trendText?: string;
  /**
   * Tooltip content for the info icon. If provided, displays an info icon.
   */
  infoTooltip?: string;
}

export type SummaryStatsStatProps = SummaryStatsStatProperties &
  Omit<HTMLAttributes<HTMLElement>, "color" | "id">;
