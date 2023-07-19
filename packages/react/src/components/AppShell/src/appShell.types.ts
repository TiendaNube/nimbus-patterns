import { HTMLAttributes, ReactNode } from "react";

import { BoxBaseProps } from "@nimbus-ds/components";
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
  /**
   * Can be used to control the responsive properties of the AppShell menu so you can change which breakpoint the menu hides under.
   */
  menuProperties?: Pick<BoxBaseProps, "display">;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
