import { HTMLAttributes, ReactNode } from "react";

import { AppShellHeader } from "./components";

export interface AppShellComponents {
  Header: typeof AppShellHeader;
}

export interface AppShellProperties {
  /**
   * Content for the body of the application.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Optional slot for left sidebar menu.
   * @TJS-type React.ReactNode
   */
  menu?: ReactNode;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
