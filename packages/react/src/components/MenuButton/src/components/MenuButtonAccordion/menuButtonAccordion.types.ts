import { ReactNode, HTMLAttributes } from "react";
import { MenuButtonProps } from "../../MenuButton";
import { MenuButtonProperties } from "../../menuButton.types";

export interface MenuButtonAccordionProperties {
  /**
   * Content of the menu.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * It will be the accordion anchor and can contain all the props available in the MenuButton component's API.
   * @TJS-type React.ReactNode
   */
  menuButton: MenuButtonProperties;
  /**
   * Required ID used to maintain correct component accessibility, it will be passed on to MenuButtonAccordion's children.
   */
  contentId: string;
  /**
   * Changes the component usage so that control of open and close is controlled from outside the component.
   * @default false
   */
  controlled?: boolean;
}

export type MenuButtonAccordionPros = MenuButtonAccordionProperties & {
  menuButton: MenuButtonProps;
} & Omit<HTMLAttributes<HTMLElement>, "color">;
