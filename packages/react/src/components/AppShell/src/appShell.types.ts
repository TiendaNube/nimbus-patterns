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
   * Optional slot for right sidebar content (e.g., chat panel).
   * @TJS-type React.ReactNode
   */
  right?: ReactNode;
  /**
   * Control responsive visibility of the right slot.
   */
  rightProperties?: Pick<BoxBaseProps, "display">;
  /**
   * When true, interactions inside the right slot will not bubble up to the
   * document. This prevents overlays that dismiss on outside press (like
   * `Sidebar`/`SideModal`) from closing while the user is interacting with the chat.
   */
  rightDismissGuard?: boolean;
  /**
   * Attribute used to detect exempt elements when `rightDismissGuard` is enabled.
   * Any event whose `composedPath()` includes an element matching this attribute
   * will be prevented from bubbling to document-level listeners.
   * Defaults to "data-nimbus-dismiss-exempt".
   */
  dismissExemptAttribute?: string;
  /**
   * Ref for the center children.
   */
  centerChildrenRef?: React.RefObject<HTMLDivElement>;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
