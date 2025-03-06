import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayCardHeaderProperties = {
  subtitle: string;
  title: ReactNode;
};
export type PlanDisplayCardHeaderProps =
  PropsWithChildren<PlanDisplayCardHeaderProperties>;
