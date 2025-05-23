import { HTMLAttributes } from "react";
import { CheckboxProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListCheckboxItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Checkbox props inherited from Nimbus components.
   */
  checkbox: any; // Omitted long list of props for docs purposes
}

export type InteractiveListCheckboxItemProps =
  InteractiveListCheckboxItemProperties & {
    // Restored long list of props for actual usage
    checkbox: CheckboxProps;
  } & Omit<HTMLAttributes<HTMLElement>, "color"> &
    Pick<InteractiveListRowProps, "topDivider">;
