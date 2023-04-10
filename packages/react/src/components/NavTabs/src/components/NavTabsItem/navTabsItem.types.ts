import { ReactNode, HTMLAttributes } from "react";
import { BoxProps } from "@nimbus-ds/components";

export interface NavTabsItemProperties {
  /**
   * Icon element to be rendered inside the button.
   */
  icon: ReactNode;
  /**
   * Controls whether the button is active or not.
   */
  active?: boolean;
  /**
   * Displays a small badge on top of the button.
   */
  badge?: boolean;
  /**
   * Function executed on click.
   */
  onClick: () => void;
}

export type NavTabsItemProps = NavTabsItemProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  BoxProps;
