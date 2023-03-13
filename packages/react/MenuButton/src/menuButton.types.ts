import { ButtonHTMLAttributes, ReactNode, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text label for the button */
  label: string;
  /** Function executed when clicking the button */
  onClick?: () => void;
  /** Sets an icon element on the left of the button */
  startIcon?: FC<IconProps>;
  /** Sets the state of the button as active/inactive */
  active?: boolean;
  /** Inner components displayed on the right of the button component */
  children?: ReactNode;
}
