import { HTMLAttributes } from "react";

import { IconButtonProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListButtonItemProperties {
  /** Button props inherited from Nimbus components */
  iconButton: Omit<
    IconButtonProps,
    "backgroundColor" | "borderColor" | "size" | "source"
  >;
}

export type InteractiveListButtonItemProps =
  InteractiveListButtonItemProperties &
    Omit<HTMLAttributes<HTMLElement>, "color"> &
    InteractiveListStructureProps;
