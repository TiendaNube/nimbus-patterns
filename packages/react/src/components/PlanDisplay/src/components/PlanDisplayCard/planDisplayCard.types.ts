import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

type CardProps = {
  highlighted?: boolean;
};
export type PlanDisplayCardProps = PropsWithChildren<CardProps> &
  Omit<
    BoxProps,
    "borderColor" | "borderRadius" | "borderStyle" | "borderWidth" | "boxShadow"
  >;
