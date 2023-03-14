import { HTMLAttributes } from "react";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

import { RadioProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListRadioItemProps extends Extend {
  /** Radio props inherited from Nimbus components */
  radio: RadioProps;
}
