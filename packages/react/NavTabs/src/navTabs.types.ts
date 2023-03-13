import { ReactNode, HTMLAttributes } from "react";

import { NavTabsItem } from "./components";

export interface NavTabsComponents {
  Item: typeof NavTabsItem;
}

export interface NavTabsProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content to be rendered inside the Nav element  */
  children: ReactNode;
}
