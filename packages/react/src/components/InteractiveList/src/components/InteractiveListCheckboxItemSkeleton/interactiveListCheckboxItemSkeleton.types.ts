import { HTMLAttributes } from "react";
import { InteractiveListStructureSkeletonProperties } from "../InteractiveListStructureSkeleton/interactiveListStructureSkeleton.types";

export type InteractiveListCheckboxItemSkeletonProperties =
  InteractiveListStructureSkeletonProperties;

export type InteractiveListCheckboxItemSkeletonProps =
  InteractiveListCheckboxItemSkeletonProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
