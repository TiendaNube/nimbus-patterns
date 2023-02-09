import { ReactNode, HTMLAttributes } from "react";

import { PageHeader, PageBody } from "./components";

export interface PageComponents {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

export interface PageProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  maxWidth?: string;
}
