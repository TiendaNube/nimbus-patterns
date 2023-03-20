import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<
  BoxProps,
  "children" | "boxSizing" | "display" | "flexDirection"
> &
  Omit<HTMLAttributes<HTMLElement>, "color">;

export interface LayoutSectionProps extends Extend {
  /** Content of the section body */
  children: ReactNode;
}
