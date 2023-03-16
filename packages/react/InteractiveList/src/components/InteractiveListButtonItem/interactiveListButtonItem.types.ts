import { HTMLAttributes } from "react";

import { IconButtonProps } from "@nimbus-ds/components";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListButtonItemProps extends Extend {
  /** Button props inherited from Nimbus components */
  iconButton: Omit<
    IconButtonProps,
    "backgroundColor" | "borderColor" | "size" | "source"
  >;
}
