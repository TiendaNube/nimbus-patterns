import { HTMLAttributes, ReactNode } from "react";
import { SidebarProperties, ButtonProperties } from "@nimbus-ds/components";

export type SideModalPadding = "none" | "base";

export interface SideModalProperties
  extends Pick<
    SidebarProperties,
    "position" | "onRemove" | "open" | "padding" | "maxWidth"
  > {
  /**
   * Title.
   */
  title?: string;
  /**
   * Action Title (ReactNode).
   */
  titleAction?: ReactNode;
  /**
   * Action Header (ReactNode).
   */
  headerAction?: ReactNode;
  /** Icon Header (ReactNode) */
  headerIcon?: ReactNode;
  /**
   * Body Content (ReactNode).
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

export type SideModalProps = SideModalProperties & HTMLAttributes<HTMLElement>;
