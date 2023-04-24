import { ReactNode, HTMLAttributes } from "react";

import { BoxProperties, BoxProps } from "@nimbus-ds/components";

export interface PageBodyProperties extends BoxProperties {
  /**
   * Content of the page body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type PageBodyProps = PageBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  BoxProps;
