import { ButtonHTMLAttributes, ReactNode, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";

export interface MenuButtonProperties {
  /**
   * Text label for the button.
   */
  label: string;
  /**
   * Function executed when clicking the button.
   */
  onClick?: () => void;
  /**
   * Sets an icon element on the left of the button.
   * @TJS-type React.FC<IconProps>
   */
  startIcon?: FC<IconProps>;
  /**
   * Sets the state of the button as active/inactive.
   */
  active?: boolean;
  /**
   * Inner components displayed on the right of the button component.
   */
  children?: ReactNode;
}

export type MenuButtonBaseProps = MenuButtonProperties &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;
