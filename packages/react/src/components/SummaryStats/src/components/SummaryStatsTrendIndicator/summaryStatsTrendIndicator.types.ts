import { HTMLAttributes } from "react";

/** Trend direction for the indicator (up, down, or neutral). */
export type TrendDirection = "up" | "down" | "neutral";

export interface SummaryStatsTrendIndicatorProperties {
  /**
   * The text to display (e.g., "8%", "+15%").
   */
  text?: string;
  /**
   * The direction of the trend.
   */
  trend: TrendDirection;
}

export type SummaryStatsTrendIndicatorProps =
  SummaryStatsTrendIndicatorProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
