import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface DataListRowProperties {
  /**
   * Optional padding for the row.
   * @default base
   */
  padding?: "small" | "base" | "none";
  /**
   * Optional padding bottom for the row.
   * @default base
   */
  paddingBottom?: "small" | "base" | "none";
  /**
   * Content of the row.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Determines if the row has a top border.
   * @default true
   */
  topDivider?: boolean;
}

export type DataListRowProps = DataListRowProperties &
  Omit<BoxProperties, "padding"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
