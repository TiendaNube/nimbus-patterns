import { HTMLAttributes } from "react";

import { RadioProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListRadioItemProps extends Extend {
  /** Radio props inherited from Nimbus components */
  radio: RadioProps;
}
