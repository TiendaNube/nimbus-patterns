import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayCardHeaderProperties = {
  subtitle: string;
  title: ReactNode;
  /**
   * Optional slot rendered to the right of the subtitle (e.g. a `<Tag>` like "Plan actual").
   * When provided, the subtitle row is laid out with space between the subtitle and the tag.
   * @TJS-type React.ReactNode
   */
  tag?: ReactNode;
};
export type PlanDisplayCardHeaderProps =
  PropsWithChildren<PlanDisplayCardHeaderProperties>;
