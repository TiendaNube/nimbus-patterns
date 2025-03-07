import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

export interface PlanDisplayCardProperties {
  highlighted?: boolean;
}
export type PlanDisplayCardProps =
  PropsWithChildren<PlanDisplayCardProperties> &
    Omit<
      BoxProps,
      | "borderColor"
      | "borderRadius"
      | "borderStyle"
      | "borderWidth"
      | "boxShadow"
    >;
