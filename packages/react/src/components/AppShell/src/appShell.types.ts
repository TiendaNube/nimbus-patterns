import { HTMLAttributes, ReactNode } from "react";

import { BoxBaseProps, BoxProps } from "@nimbus-ds/components";
import { AppShellHeader } from "./components";

export interface AppShellComponents {
  Header: typeof AppShellHeader;
}

/**
 * Configuration options for the AppShell flyout (popover) behavior when the menu is collapsed.
 * This consolidates all popover-related props into a single object for simpler usage,
 * while keeping individual top-level props for backward compatibility.
 */
export type AppShellMenuFlyoutOptions = {
  /** How the popover opens. Defaults to 'hover'. */
  trigger?: "hover" | "manual";
  /** Controlled open state for the flyout. */
  open?: boolean;
  /** Uncontrolled initial open state for the flyout. */
  defaultOpen?: boolean;
  /** Callback when the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Hover open delay in ms (only when trigger is 'hover'). */
  hoverOpenDelayMs?: number;
  /** Hover close delay in ms (only when trigger is 'hover'). */
  hoverCloseDelayMs?: number;
} & Omit<BoxProps, "position" | "top" | "left" | "right" | "bottom" | "height" | "zIndex">;

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
   * Controls whether the left sidebar (menu) is expanded (true) or collapsed (false).
   */
  menuExpanded?: boolean;
  /**
   * Sidebar width when expanded. Defaults to "18rem".
   */
  menuExpandedWidth?: BoxBaseProps["width"];
  /**
   * Sidebar width when collapsed (rail). If provided, the sidebar will render in a compact rail while collapsed. Defaults to "4.5rem".
   */
  menuCollapsedWidth?: BoxBaseProps["width"];

  /**
   * Determines how the left sidebar behaves when collapsed.
   * - 'inline': current behavior; width changes affect layout.
   * - 'popover': when collapsed, hovering or clicking the rail shows the expanded menu as an overlay without affecting layout.
   */
  menuBehavior?: "inline" | "popover";

  /**
   * Consolidated configuration for the popover/flyout behavior when `menuBehavior` is 'popover'.
   * Prefer using this over individual top-level props for simpler usage.
   */
  menuFlyout?: AppShellMenuFlyoutOptions;
}

export type AppShellProps = AppShellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
