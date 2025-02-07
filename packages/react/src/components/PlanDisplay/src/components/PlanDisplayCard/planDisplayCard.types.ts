import { PropsWithChildren } from "react";

type CardProps = {
  highlighted?: boolean;
};
export type PlanDisplayCardProps = PropsWithChildren<CardProps>;
