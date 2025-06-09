import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface NavTabsItemProperties {
  /**
   * Icon element to be rendered inside the button.
   * @TJS-type React.ReactNode
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
   * @TJS-type onClick: () => void;
   */
  onClick: () => void;
  /**
   * Text label used for accessibility.
   */
  ariaLabel: string;
}

export type NavTabsItemProps = NavTabsItemProperties &
  Omit<BoxProperties, "onClick"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
