import { HTMLAttributes, ReactNode } from "react";

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
  trend?: "up" | "down" | "neutral";
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
  /**
   * Internal prop injected by parent. Do not use directly.
   * @internal
   */
  _index?: number;
}

export type SummaryStatsStatProps = SummaryStatsStatProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
