import { HTMLAttributes, ReactNode } from "react";

export interface SummaryStatsCarouselProperties {
  /**
   * The stat children to render in the carousel.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type SummaryStatsCarouselProps = SummaryStatsCarouselProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
