import { ReactNode, HTMLAttributes } from "react";

import { BoxProperties } from "@nimbus-ds/components";

export interface PageHeaderProperties {
  /**
   * Main title of the page. Corresponds to an h1 HTML tag.
   */
  title: string;
  /**
   * Optional subtitle for the page.
   */
  subtitle?: string;
  /**
   * Button stack that appears on the right-hand side of the title.
   * @TJS-type React.ReactNode
   */
  buttonStack?: ReactNode;
  /**
   * Optional header content that appears underneath the title and button stack.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
}

export type PageHeaderProps = PageHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProperties, "display" | "flexDirection">;
