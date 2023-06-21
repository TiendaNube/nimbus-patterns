import { HTMLAttributes } from "react";
import { RadioProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";
import { InteractiveListRowProps } from "../InteractiveListRow/interactiveListRow.types";

export interface InteractiveListRadioItemProperties
  extends InteractiveListStructureProperties {
  /**
   * Radio props inherited from Nimbus components.
   */
  radio: RadioProps;
}

export type InteractiveListRadioItemProps = InteractiveListRadioItemProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Pick<InteractiveListRowProps, "topDivider">;
