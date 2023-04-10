import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

export interface InteractiveListRowProperties {
  /** Content of the row */
  children: ReactNode;
}

export type InteractiveListRowProps = InteractiveListRowProperties &
  Omit<BoxProps, "padding"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
