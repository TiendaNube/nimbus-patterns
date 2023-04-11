import { HTMLAttributes } from "react";
import { IconButtonProperties, IconButtonProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListButtonItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Button props inherited from Nimbus components
   */
  iconButton: Omit<
    IconButtonProperties,
    "backgroundColor" | "borderColor" | "size" | "source"
  >;
}

export type InteractiveListButtonItemProps =
  InteractiveListButtonItemProperties & {
    iconButton: Omit<
      IconButtonProps,
      "backgroundColor" | "borderColor" | "size" | "source"
    >;
  } & Omit<HTMLAttributes<HTMLElement>, "color">;
