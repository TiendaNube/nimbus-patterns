import { ReactNode } from "react";

/**
 * A plan shown by the carousel.
 */
export interface MobilePlanCarouselPlan {
  /**
   * Name of the plan. It names the plan's group for assistive technologies.
   */
  name: string;
  /**
   * The plan card rendered inside the plan's scroll item.
   */
  card: ReactNode;
}

/**
 * Props of the reference mobile composition: a ScrollPane of plan cards with
 * position dots below. Every string is supplied by the consumer.
 */
export interface MobilePlanCarouselProps {
  /**
   * Returns the accessible name of the position dots and the polite
   * announcement for the plan at the zero-based `index` out of `total`.
   */
  getPositionLabel: (index: number, total: number) => string;
  /**
   * Plans in display order.
   */
  plans: MobilePlanCarouselPlan[];
  /**
   * Accessible name of the scroll area region.
   */
  scrollAreaLabel: string;
}
