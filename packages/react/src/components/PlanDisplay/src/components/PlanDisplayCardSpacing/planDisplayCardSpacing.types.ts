import { BoxProps } from "@nimbus-ds/components";

export type PlanDisplayCardSpacingProps = Omit<
  BoxProps,
  "children" | "borderTopWidth" | "borderColor" | "borderStyle" | "my"
>;
