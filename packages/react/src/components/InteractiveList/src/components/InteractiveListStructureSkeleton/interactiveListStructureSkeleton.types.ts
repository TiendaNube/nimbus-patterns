import { HTMLAttributes } from "react";
import { InteractiveListStructureProperties } from "../InteractiveListStructure/interactiveListStructure.types";

export type InteractiveListStructureSkeletonProperties =
  InteractiveListStructureProperties;

export type InteractiveListStructureSkeletonProps =
  InteractiveListStructureSkeletonProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
