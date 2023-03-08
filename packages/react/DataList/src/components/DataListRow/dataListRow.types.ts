import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProps, "padding">;

export interface DataListRowProps extends Extend {
  padding?: "small" | "base" | "none";
  children: ReactNode;
}
