import { HTMLAttributes } from "react";

import { RadioProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListRadioItemProperties {
  /** Radio props inherited from Nimbus components */
  radio: RadioProps;
}

export type InteractiveListRadioItemProps = InteractiveListRadioItemProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;
