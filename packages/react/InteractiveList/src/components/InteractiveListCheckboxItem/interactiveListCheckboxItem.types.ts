import { HTMLAttributes } from "react";

import { CheckboxProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListCheckboxItemProps extends Extend {
  /** Checkbox props inherited from Nimbus components */
  checkbox: CheckboxProps;
}
