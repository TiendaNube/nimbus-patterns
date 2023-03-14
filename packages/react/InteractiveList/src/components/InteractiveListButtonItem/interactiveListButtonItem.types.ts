import { HTMLAttributes } from "react";

import { InteractiveListStructureProps } from "../InteractiveListStructure/interactiveListStructure.types";

import { IconButtonProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> &
  InteractiveListStructureProps;

export interface InteractiveListButtonItemProps extends Extend {
  /** Button props inherited from Nimbus components */
  iconButton: Omit<
    IconButtonProps,
    "backgroundColor" | "borderColor" | "size" | "source"
  >;
}
