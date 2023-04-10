import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface InteractiveListRowProperties
  extends Omit<BoxProperties, "padding"> {
  /**
   * Content of the row.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type InteractiveListRowProps = InteractiveListRowProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
