import { HTMLAttributes, ReactNode } from "react";

import { AppShellHeader } from "./components";

export interface AppShellComponents {
  Header: typeof AppShellHeader;
}

export interface AppShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  menu?: ReactNode;
}
