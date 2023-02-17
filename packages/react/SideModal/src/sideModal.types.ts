import { HTMLAttributes, ReactNode } from "react";
import { SidebarProps, ButtonProps } from "@nimbus-ds/components";

type Extends = Pick<
  SidebarProps,
  "position" | "onRemove" | "open" | "padding" | "maxWidth"
> &
  HTMLAttributes<HTMLElement>;

export type Padding = "none" | "base";

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
  paddingHeader?: Padding;
  /** Body padding */
  paddingBody?: Padding;
  /** Footer padding */
  paddingFooter?: Padding;
  /** Footer element actions */
  footer?: {
    primaryAction: ButtonProps;
    secondaryAction: ButtonProps;
  };
}
