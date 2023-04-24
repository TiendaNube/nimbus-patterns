import { ReactNode, HTMLAttributes } from "react";

import { BoxProperties, BoxProps } from "@nimbus-ds/components";
import { PageHeader, PageBody } from "./components";

export interface PageComponents {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

export interface PageProperties
  extends Omit<BoxProperties, "width" | "maxWidth" | "marginX"> {
  /**
   * Content to be rendered inside the page body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Optional parameter to define a maximum width of the page content.
   */
  maxWidth?: string;
}

export type PageProps = PageProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProps, "width" | "maxWidth" | "marginX">;
