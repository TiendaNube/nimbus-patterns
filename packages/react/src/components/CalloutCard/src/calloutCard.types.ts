import {
  HTMLAttributes,
  MouseEventHandler,
  FC,
  ComponentPropsWithRef,
} from "react";
import { IconProps } from "@nimbus-ds/icons";
import { Link } from "@nimbus-ds/components";

export interface CalloutCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** CalloutCard color */
  appearance: "primary" | "success" | "warning" | "danger" | "neutral";
  // /** Icon SVG */
  icon: FC<IconProps>;
  /** Title */
  title: string;
  /** Subtitle */
  subtitle: string;
  /** Subtitle */
  link?: ComponentPropsWithRef<typeof Link>;
  /** Event fired when clicking the component */
  onClick?: MouseEventHandler<HTMLElement>;
}
