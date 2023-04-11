import { HTMLAttributes } from "react";
import { ToggleProperties } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListToggleItemSkeletonProperties
  extends InteractiveListStructureProperties {
  /**
   * Toggle props inherited from Nimbus components.
   */
  toggle: ToggleProperties;
}

export type InteractiveListToggleItemSkeletonProps =
  InteractiveListToggleItemSkeletonProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
