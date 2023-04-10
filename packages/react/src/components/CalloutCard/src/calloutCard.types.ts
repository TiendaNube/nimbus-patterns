import { HTMLAttributes, MouseEventHandler, FC, ReactNode } from "react";
import { IconProps } from "@nimbus-ds/icons";

export interface CalloutCardProperties {
  /**
   * CalloutCard color.
   */
  appearance: "primary" | "success" | "warning" | "danger" | "neutral";
  /**
   * The SVG contents to display in the Icon.
   * @TJS-type React.FC<IconProps>
   */
  icon: FC<IconProps>;
  /**
   * Title.
   */
  title: string;
  /**
   * Subtitle.
   */
  subtitle: string;
  /**
   * Slot intended to position the Callout Card link correctly.
   * @TJS-type Nimbus Link
   */
  link?: ReactNode;
  /**
   * Event fired when clicking the component.
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

export type CalloutCardProps = CalloutCardProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
