import { ButtonHTMLAttributes } from "react";
import { MenuButtonProperties } from "@nimbus-ds/menubutton";

export type MenuFooterProperties = Omit<MenuButtonProperties, "children">;
export type MenuFooterProps = MenuFooterProperties &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;
