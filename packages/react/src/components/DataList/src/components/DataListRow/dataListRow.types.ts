import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface DataListRowProperties extends Omit<BoxProperties, "padding"> {
  /**
   * Optional padding for the row.
   * @default base
   */
  padding?: "small" | "base" | "none";
  /**
   * Content of the row.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataListRowProps = DataListRowProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
