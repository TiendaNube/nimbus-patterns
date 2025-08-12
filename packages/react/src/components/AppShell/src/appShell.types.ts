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

  /**
   * Determines how the left sidebar behaves when collapsed.
   * - 'inline': current behavior; width changes affect layout.
   * - 'popover': when collapsed, hovering or clicking the rail shows the expanded menu as an overlay without affecting layout.
   */
  menuBehavior?: "inline" | "popover";

  /**
   * How the popover opens when menuBehavior is 'popover'.
   * - 'hover': opens on hover/focus, closes on leave/blur (with optional delays).
   * - 'click': toggles on click, closes on outside click or Escape.
   * Defaults to 'hover'.
   */
  menuTrigger?: "hover" | "click";

  /**
   * Optional content to render inside the collapsed rail. Falls back to `menu` when not provided.
   * @TJS-type React.ReactNode
   */
  menuCollapsed?: ReactNode;

  /**
   * Optional content to render when expanded (both inline and popover). Falls back to `menu` when not provided.
   * @TJS-type React.ReactNode
   */
  menuExpandedContent?: ReactNode;

  /**
   * Optional width for the popover overlay. Defaults to `menuExpandedWidth` when omitted.
   */
  menuPopoverWidth?: string | number;

  /**
   * Optional z-index token for the popover overlay. Defaults to "900".
   */
  menuPopoverZIndex?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

  /**
   * When using 'hover' trigger, optional open/close delays in milliseconds to reduce flicker.
   */
  menuHoverOpenDelayMs?: number;
  menuHoverCloseDelayMs?: number;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
