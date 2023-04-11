import { HTMLAttributes } from "react";
import { IconButtonProperties } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

type IconButtonProps = Omit<
  IconButtonProperties,
  "backgroundColor" | "borderColor" | "size" | "source"
> & { onClick: () => void };

export interface InteractiveListButtonItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Button props inherited from Nimbus components
   */
  iconButton: IconButtonProps;
}

export type InteractiveListButtonItemProps =
  InteractiveListButtonItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
