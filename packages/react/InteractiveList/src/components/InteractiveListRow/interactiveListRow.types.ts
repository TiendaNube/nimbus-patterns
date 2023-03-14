import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<BoxProps, "padding"> & Omit<HTMLAttributes<HTMLElement>, "color">;

export interface InteractiveListRowProps extends Extend {
  /** Content of the row */
  children: ReactNode;
}
