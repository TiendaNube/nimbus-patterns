import { HTMLAttributes } from "react";

import { ToggleProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListToggleItemProperties {
  /** Toggle props inherited from Nimbus components */
  toggle: ToggleProps;
}

export type InteractiveListToggleItemProps =
  InteractiveListToggleItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color"> &
    InteractiveListStructureProps;
