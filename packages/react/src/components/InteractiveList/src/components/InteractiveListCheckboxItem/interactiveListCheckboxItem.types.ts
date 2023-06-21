import { HTMLAttributes } from "react";
import { CheckboxProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListCheckboxItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Checkbox props inherited from Nimbus components.
   */
  checkbox: CheckboxProps;
}

export type InteractiveListCheckboxItemProps =
  InteractiveListCheckboxItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color"> &
    Pick<InteractiveListRowProps, "topDivider">;
