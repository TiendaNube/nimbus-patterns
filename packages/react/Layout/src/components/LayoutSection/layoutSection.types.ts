import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<
  BoxProps,
  "children" | "boxSizing" | "display" | "flexDirection"
> &
  HTMLAttributes<HTMLElement>;

export interface LayoutSectionProps extends Extend {
  children: ReactNode;
}
