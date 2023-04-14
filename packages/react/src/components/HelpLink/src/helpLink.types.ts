import { HTMLAttributes } from "react";
import { LinkProperties, LinkProps } from "@nimbus-ds/components";

export interface HelpLinkProperties {
  /**
   * Link to be rendered inside the HelpLink component.
   * @TJS-type Link
   */
  link: Omit<LinkProperties, "appearance" | "textDecoration">;
}

export type HelpLinkProps = HelpLinkProperties & {
  link: Omit<LinkProps, "appearance" | "textDecoration">;
} & Omit<HTMLAttributes<HTMLElement>, "color">;
