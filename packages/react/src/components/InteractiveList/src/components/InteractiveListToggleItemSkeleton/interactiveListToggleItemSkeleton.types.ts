import { HTMLAttributes } from "react";
import { ToggleProperties } from "@nimbus-ds/components";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export interface InteractiveListToggleItemSkeletonProperties
  extends InteractiveListStructureProperties {
  /**
   * Toggle props inherited from Nimbus components.
   */
  toggle: any; // Omitted long list of props for docs purposes
}

export type InteractiveListToggleItemSkeletonProps =
  InteractiveListToggleItemSkeletonProperties & {
    // Restored long list of props for actual usage
    toggle: ToggleProperties;
  } & Omit<HTMLAttributes<HTMLElement>, "color">;
