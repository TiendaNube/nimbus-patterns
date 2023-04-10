import { ReactNode, HTMLAttributes } from "react";

import { NavTabsItem } from "./components";

export interface NavTabsComponents {
  Item: typeof NavTabsItem;
}

export interface NavTabsProperties {
  /**
   * Content to be rendered inside the Nav element.
   */
  children: ReactNode;
}

export type NavTabsProps = NavTabsProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
