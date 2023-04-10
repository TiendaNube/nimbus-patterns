import { HTMLAttributes, ReactNode } from "react";
import { BoxProperties } from "@nimbus-ds/components";
import { LayoutSection } from "./components";

export interface LayoutComponents {
  Section: typeof LayoutSection;
}

export interface LayoutProperties
  extends Omit<
    BoxProperties,
    "children" | "boxSizing" | "display" | "gridTemplateColumns"
  > {
  /**
   * Content to be rendered inside the layout.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Number of columns to be rendered for the children.
   */
  columns?: "1" | "2 - symmetric" | "2 - asymmetric" | "3";
}

export type LayoutProps = LayoutProperties & HTMLAttributes<HTMLElement>;
