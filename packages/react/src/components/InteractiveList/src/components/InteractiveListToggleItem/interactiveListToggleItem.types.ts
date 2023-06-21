import { HTMLAttributes } from "react";
import { ToggleProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListToggleItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Toggle props inherited from Nimbus components.
   */
  toggle: ToggleProps;
}

export type InteractiveListToggleItemProps =
  InteractiveListToggleItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color"> &
    Pick<InteractiveListRowProps, "topDivider">;
