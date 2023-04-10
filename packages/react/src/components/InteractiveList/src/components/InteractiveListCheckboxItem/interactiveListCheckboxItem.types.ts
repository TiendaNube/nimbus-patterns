import { HTMLAttributes } from "react";
import { CheckboxProperties } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListCheckboxItemProperties
  extends InteractiveListStructureProperties {
  /** Checkbox props inherited from Nimbus components */
  checkbox: CheckboxProperties;
}

export type InteractiveListCheckboxItemProps =
  InteractiveListCheckboxItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
