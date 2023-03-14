import { HTMLAttributes } from "react";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

import { CheckboxProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListCheckboxItemProps extends Extend {
  /** Checkbox props inherited from Nimbus components */
  checkbox: CheckboxProps;
}
