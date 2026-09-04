import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayCardHeaderProperties = {
  subtitle: string;
  title: ReactNode;
  /**
   * Tag rendered to the right of the header's supporting text (`subtitle`).
   * @TJS-type React.ReactNode
   */
  tag?: ReactNode;
};
export type PlanDisplayCardHeaderProps =
  PropsWithChildren<PlanDisplayCardHeaderProperties>;
