import { HTMLAttributes } from "react";
import { RadioProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListRadioItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Radio props inherited from Nimbus components.
   */
  radio: any; // Omitted long list of props for docs purposes
}

export type InteractiveListRadioItemProps =
  InteractiveListRadioItemProperties & {
    // Restored long list of props for actual usage
    radio: RadioProps;
  } & Omit<HTMLAttributes<HTMLElement>, "color"> &
    Pick<InteractiveListRowProps, "topDivider">;
