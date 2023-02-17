import { ButtonHTMLAttributes, ReactNode, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  startIcon?: FC<IconProps>;
  active?: boolean;
  children?: ReactNode;
}
