import { HTMLAttributes, ReactNode } from "react";
import { SidebarProps } from "@nimbus-ds/sidebar";
import { ButtonProps } from "@nimbus-ds/button";

type Extends = Pick<
  SidebarProps,
  "position" | "onRemove" | "open" | "padding" | "maxWidth"
> &
  HTMLAttributes<HTMLElement>;

export interface SideModalProps extends Extends {
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
  paddingHeader?: Pick<SidebarProps, "padding">;
  /** Body padding */
  paddingBody?: Pick<SidebarProps, "padding">;
  /** Footer padding */
  paddingFooter?: Pick<SidebarProps, "padding">;
  /** Footer element actions */
  footer?: {
    primaryAction: ButtonProps;
    secondaryAction: ButtonProps;
  };
}
