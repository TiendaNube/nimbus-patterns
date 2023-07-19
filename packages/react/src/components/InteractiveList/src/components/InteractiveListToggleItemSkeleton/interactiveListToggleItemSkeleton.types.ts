import { HTMLAttributes } from "react";
import { ToggleProperties, ToggleProps } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListToggleItemSkeletonProperties
  extends InteractiveListStructureProperties {
  /**
   * Toggle props inherited from Nimbus components.
   */
  toggle: ToggleProperties;
}

export type InteractiveListToggleItemSkeletonProps =
  InteractiveListToggleItemSkeletonProperties & {
    toggle: ToggleProps;
  } & Omit<HTMLAttributes<HTMLElement>, "color">;
