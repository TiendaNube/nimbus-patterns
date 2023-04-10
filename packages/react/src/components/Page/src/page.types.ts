import { ReactNode, HTMLAttributes } from "react";

import { PageHeader, PageBody } from "./components";

export interface PageComponents {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

export interface PageProperties {
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
  Omit<HTMLAttributes<HTMLElement>, "color">;
