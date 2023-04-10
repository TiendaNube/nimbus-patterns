import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface LayoutSectionProperties
  extends Omit<
    BoxProperties,
    "children" | "boxSizing" | "display" | "flexDirection"
  > {
  /**
   * Content of the section body.
   */
  children: ReactNode;
}

export type LayoutSectionProps = LayoutSectionProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
