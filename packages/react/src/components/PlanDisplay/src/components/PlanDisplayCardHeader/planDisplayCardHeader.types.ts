import { PropsWithChildren, ReactNode } from "react";

/**
 * Properties of the plan display card header.
 */
export interface PlanDisplayCardHeaderProperties {
  /**
   * Supporting text rendered above the title (e.g. the plan family name).
   */
  subtitle: string;
  /**
   * Main content of the header, typically the plan name and its price block.
   * @TJS-type React.ReactNode
   */
  title: ReactNode;
  /**
   * Optional slot rendered to the right of the subtitle (e.g. a `<Tag>` like "Plan actual").
   * When provided, the subtitle row is laid out with space between the subtitle and the tag.
   * @TJS-type React.ReactNode
   */
  tag?: ReactNode;
}

export type PlanDisplayCardHeaderProps =
  PropsWithChildren<PlanDisplayCardHeaderProperties>;
