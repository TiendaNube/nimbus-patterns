import { HTMLAttributes } from "react";
import { ToggleProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListToggleItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Toggle props inherited from Nimbus components.
   */
  toggle: any; // Omitted long list of props for docs purposes
}

export type InteractiveListToggleItemProps =
  InteractiveListToggleItemProperties & {
    // Restored long list of props for actual usage
    toggle: ToggleProps;
  } & Omit<HTMLAttributes<HTMLElement>, "color"> &
    Pick<InteractiveListRowProps, "topDivider">;
