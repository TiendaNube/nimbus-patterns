import { HTMLAttributes } from "react";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

import { ToggleProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListToggleItemProps extends Extend {
  /** Toggle props inherited from Nimbus components */
  toggle: ToggleProps;
}
