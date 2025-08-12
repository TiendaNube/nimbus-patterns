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
  /**
   * Controls whether the left sidebar (menu) is expanded (true) or collapsed (false). When undefined, the component is uncontrolled and uses defaultMenuExpanded.
   */
  menuExpanded?: boolean;
  /**
   * Initial expansion state when uncontrolled.
   */
  defaultMenuExpanded?: boolean;
  /**
   * Callback fired when the expansion state changes.
   */
  onMenuExpandedChange?: (expanded: boolean) => void;
  /**
   * Sidebar width when expanded. Defaults to "18rem".
   */
  menuExpandedWidth?: string | number;
  /**
   * Sidebar width when collapsed (rail). If provided, the sidebar will render in a compact rail while collapsed. Defaults to "4.5rem".
   */
  menuCollapsedWidth?: string | number;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
