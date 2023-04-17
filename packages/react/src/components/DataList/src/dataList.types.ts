import { ReactNode, HTMLAttributes } from "react";

import { DataListRow } from "./components";

export interface DataListComponents {
  Row: typeof DataListRow;
}

export interface DataListProperties {
  /**
   * Content of the List component.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Defines whether the List has a bottom border.
   * @default true
   */
  bottomDivider?: boolean;
}

export type DataListProps = DataListProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
