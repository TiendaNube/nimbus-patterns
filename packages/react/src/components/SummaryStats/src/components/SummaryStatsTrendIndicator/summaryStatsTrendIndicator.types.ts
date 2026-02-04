import { HTMLAttributes } from "react";

export interface SummaryStatsTrendIndicatorProperties {
  /**
   * The direction of the trend.
   */
  trend: "up" | "down" | "neutral";
  /**
   * The text to display (e.g., "8%", "+15%").
   */
  text?: string;
}

export type SummaryStatsTrendIndicatorProps =
  SummaryStatsTrendIndicatorProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
