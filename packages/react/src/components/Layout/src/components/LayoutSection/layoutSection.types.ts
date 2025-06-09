import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface LayoutSectionProperties {
  /**
   * Content of the section body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type LayoutSectionProps = LayoutSectionProperties &
  Omit<BoxProperties, "children" | "boxSizing" | "display" | "flexDirection"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
