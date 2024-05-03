import { BoxProps } from "@nimbus-ds/components";

export interface EmptyAppPlanItemProperties {
  label: string;
  disabled?: boolean;
}

export type EmptyAppPlanItemProps = EmptyAppPlanItemProperties &
  Omit<BoxProps, "display" | "alignItems" | "gap">;
