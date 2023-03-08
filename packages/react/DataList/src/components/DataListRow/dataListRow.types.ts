import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProps, "padding">;

export interface DataListRowProps extends Extend {
  /** Optional padding for the row */
  padding?: "small" | "base" | "none";
  /** Content of the row */
  children: ReactNode;
}
