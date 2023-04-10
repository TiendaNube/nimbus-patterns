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
}

export type DataListProps = DataListProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
