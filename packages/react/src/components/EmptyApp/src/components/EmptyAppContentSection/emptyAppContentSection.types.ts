import { BoxProps } from "@nimbus-ds/components";
import { ReactNode } from "react";

export interface EmptyAppContentSectionProperties {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export type EmptyAppContentSectionProps = EmptyAppContentSectionProperties &
  Omit<
    BoxProps,
    | "display"
    | "flexDirection"
    | "px"
    | "py"
    | "gap"
    | "alignItems"
    | "maxWidth"
    | "mx"
  >;
