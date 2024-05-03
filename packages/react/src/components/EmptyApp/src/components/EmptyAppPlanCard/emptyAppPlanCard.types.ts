import { HTMLAttributes, ReactNode } from "react";

export interface EmptyAppPlanCardProperties {
  planContext: string;
  planName: string;
  children: ReactNode;
}

export type EmptyAppPlanCardProps = EmptyAppPlanCardProperties &
  HTMLAttributes<HTMLElement>;
