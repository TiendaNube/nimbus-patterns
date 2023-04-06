import { HTMLAttributes, ReactNode } from "react";
import { SidebarProps, ButtonProps } from "@nimbus-ds/components";

export type SideModalPadding = "none" | "base";

export interface SideModalProperties {
  /** Title */
  title?: string;
  /** Action Title (ReactNode) */
  titleAction?: ReactNode;
  /** Action Header (ReactNode) */
  headerAction?: ReactNode;
  /** Icon Header (ReactNode) */
  headerIcon?: ReactNode;
  /** Body Content (ReactNode) */
  children?: ReactNode;
  /** Header padding */
  paddingHeader?: SideModalPadding;
  /** Body padding */
  paddingBody?: SideModalPadding;
  /** Footer padding */
  paddingFooter?: SideModalPadding;
  /** Footer element actions */
  footer?: {
    primaryAction: ButtonProps;
    secondaryAction: ButtonProps;
  };
}

export type SideModalProps = SideModalProperties &
  Pick<
    SidebarProps,
    "position" | "onRemove" | "open" | "padding" | "maxWidth"
  > &
  HTMLAttributes<HTMLElement>;
