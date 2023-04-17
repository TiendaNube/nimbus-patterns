import { HTMLAttributes, ReactNode } from "react";

export interface HelpLinkProperties {
  /**
   * Content to be rendered inside the HelpLink component.
   * @TJS-type ReactNode
   */
  children: ReactNode;
}

export type HelpLinkProps = HelpLinkProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
