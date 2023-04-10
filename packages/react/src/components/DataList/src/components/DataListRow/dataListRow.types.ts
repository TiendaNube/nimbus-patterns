import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

export interface DataListRowProperties {
  /** Optional padding for the row */
  padding?: "small" | "base" | "none";
  /** Content of the row */
  children: ReactNode;
}

export type DataListRowProps = DataListRowProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProps, "padding">;
