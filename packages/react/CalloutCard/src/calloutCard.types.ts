import { HTMLAttributes, MouseEventHandler, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";
import { LinkProps } from "@nimbus-ds/components";

export interface CalloutCardProps extends HTMLAttributes<HTMLElement> {
  /** CalloutCard color */
  appearance: "primary" | "success" | "warning" | "danger" | "neutral";
  /** Icon SVG */
  icon: FC<IconProps>;
  /** Title */
  title: string;
  /** Subtitle */
  subtitle: string;
  /** Subtitle */
  link?: LinkProps;
  /** Event fired when clicking the component */
  onClick?: MouseEventHandler<HTMLElement>;
}
