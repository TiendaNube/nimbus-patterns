import { ReactNode, HTMLAttributes } from "react";

import { DataListRow } from "./components";

export interface DataListComponents {
  Row: typeof DataListRow;
}

export interface DataListProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  children: ReactNode;
}
