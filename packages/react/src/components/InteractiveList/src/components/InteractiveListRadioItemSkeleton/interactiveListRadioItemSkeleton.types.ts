import { HTMLAttributes } from "react";
import { InteractiveListStructureSkeletonProperties } from "../InteractiveListStructureSkeleton/interactiveListStructureSkeleton.types";

export type InteractiveListRadioItemSkeletonProperties =
  InteractiveListStructureSkeletonProperties;

export type InteractiveListRadioItemSkeletonProps =
  InteractiveListRadioItemSkeletonProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
