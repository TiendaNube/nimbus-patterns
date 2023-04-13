import { HTMLAttributes } from "react";
import { LinkProps } from "@nimbus-ds/components";

export interface HelpLinkProperties {
  /**
   * Link to be rendered inside the HelpLink component.
   */
  link: Omit<LinkProps, "appearance" | "textDecoration">;
}

export type HelpLinkProps = HelpLinkProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
