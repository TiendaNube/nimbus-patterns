import { HTMLAttributes, ReactNode } from "react";

import { AppShellHeader } from "./components";

export interface AppShellComponents {
  Header: typeof AppShellHeader;
}

export interface AppShellProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content for the body of the application */
  children: ReactNode;
  /** Optional slot for left sidebar menu */
  menu?: ReactNode;
}
