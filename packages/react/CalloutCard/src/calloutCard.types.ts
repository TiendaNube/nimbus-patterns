import { HTMLAttributes, MouseEventHandler } from "react";
import { Icon as IconType } from "@tiendanube/icons";
import { LinkProps } from "@nimbus-ds/link";

export interface CalloutCardProps extends HTMLAttributes<HTMLElement> {
  /** CalloutCard color */
  appearance: "primary" | "success" | "warning" | "danger" | "neutral";
  /** Icon SVG */
  icon: IconType;
  /** Title */
  title: string;
  /** Subtitle */
  subtitle: string;
  /** Subtitle */
  link?: LinkProps;
  /** Event fired when clicking the component */
  onClick?: MouseEventHandler<HTMLElement>;
}
