import { ReactNode, HTMLAttributes } from "react";

import { BoxProperties } from "@nimbus-ds/components";

export interface PageBodyProperties {
  /**
   * Content of the page body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type PageBodyProps = PageBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  BoxProperties;
