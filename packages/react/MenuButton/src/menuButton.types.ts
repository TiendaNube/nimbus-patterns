import { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon as IconType } from "@tiendanube/icons";

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  startIcon?: IconType;
  active?: boolean;
  children?: ReactNode;
}
