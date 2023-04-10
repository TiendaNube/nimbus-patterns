import { HTMLAttributes } from "react";

import { CheckboxProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListCheckboxItemProperties {
  /** Checkbox props inherited from Nimbus components */
  checkbox: CheckboxProps;
}

export type InteractiveListCheckboxItemProps =
  InteractiveListCheckboxItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color"> &
    InteractiveListStructureProps;
