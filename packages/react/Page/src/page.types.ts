import { ReactNode, HTMLAttributes } from "react";

import { PageHeader, PageBody } from "./components";

export interface PageComponents {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

export interface PageProps extends HTMLAttributes<HTMLElement> {
  /** Content to be rendered inside the page body. */
  children: ReactNode;
  /** Optional parameter to define a maximum width of the page content. */
  maxWidth?: string;
}
