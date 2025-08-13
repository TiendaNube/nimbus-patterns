import { HTMLAttributes, ReactNode } from "react";
import {
  SidebarProperties,
  ButtonProperties,
  ButtonProps,
} from "@nimbus-ds/components";

export type SideModalPadding = "none" | "base";

export interface SideModalProperties
  extends Pick<
    SidebarProperties,
    "position" | "onRemove" | "open" | "padding" | "maxWidth" | "zIndex"
  > {
  /**
   * Choose where the portal should render. Defaults to viewport (body).
   */
  portalWithin?: "viewport" | "appShell";
  /**
   * Explicit portal container element. If provided, overrides portalWithin.
   */
  container?: HTMLElement | null;
  /**
   * Title.
   */
  title?: string;
  /**
   * Action Title
   * @TJS-type React.ReactNode
   */
  titleAction?: ReactNode;
  /**
   * Action Header
   * @TJS-type React.ReactNode
   */
  headerAction?: ReactNode;
  /**
   * Icon Header
   * @TJS-type React.ReactNode
   */
  headerIcon?: ReactNode;
  /**
   * Body Content
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * Header padding.
   */
  paddingHeader?: SideModalPadding;
  /**
   * Body padding.
   */
  paddingBody?: SideModalPadding;
  /**
   * Footer padding.
   */
  paddingFooter?: SideModalPadding;
  /**
   * Footer element actions.
   */
  footer?: {
    primaryAction: ButtonProperties;
    secondaryAction: ButtonProperties;
  };
}

export type SideModalProps = SideModalProperties & {
  footer?: {
    primaryAction: ButtonProps;
    secondaryAction: ButtonProps;
  };
} & HTMLAttributes<HTMLElement>;
