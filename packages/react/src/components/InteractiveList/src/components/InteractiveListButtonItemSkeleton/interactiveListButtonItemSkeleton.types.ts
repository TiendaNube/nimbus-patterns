import { HTMLAttributes } from "react";
import { InteractiveListStructureSkeletonProperties } from "../InteractiveListStructureSkeleton/interactiveListStructureSkeleton.types";

export type InteractiveListButtonItemSkeletonProperties =
  InteractiveListStructureSkeletonProperties;

export type InteractiveListButtonItemSkeletonProps =
  InteractiveListButtonItemSkeletonProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
