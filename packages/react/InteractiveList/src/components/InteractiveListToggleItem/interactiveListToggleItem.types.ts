import { HTMLAttributes } from "react";

import { ToggleProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListToggleItemProps extends Extend {
  /** Toggle props inherited from Nimbus components */
  toggle: ToggleProps;
}
