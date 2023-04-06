import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

export interface LayoutSectionProperties {
  /** Content of the section body */
  children: ReactNode;
}

export type LayoutSectionProps = LayoutSectionProperties &
  Omit<BoxProps, "children" | "boxSizing" | "display" | "flexDirection"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
