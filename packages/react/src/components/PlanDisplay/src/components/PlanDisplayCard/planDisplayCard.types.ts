import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

export type PlanDisplayCardProps = PropsWithChildren<{
  highlighted?: boolean;
}> &
  Omit<
    BoxProps,
    "borderColor" | "borderRadius" | "borderStyle" | "borderWidth" | "boxShadow"
  >;
